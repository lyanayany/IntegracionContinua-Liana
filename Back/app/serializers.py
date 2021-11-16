from django.contrib.auth.models import User, Group

from rest_framework import serializers

from .models import Tipo_treeking, Treeking

class UserSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()

    def create(self, validated_data):
        instance = User()
        instance.first_name = validated_data.get('first_name')
        instance.last_name = validated_data.get('last_name')
        instance.username = validated_data.get('username')
        instance.email = validated_data.get('email')
        instance.set_password(validated_data.get('password'))
        instance.save()
        return instance

    def validate_username(self, data):
        users = User.objects.filter(username = data)
        if len(users) != 0:
            raise serializers.ValidationError({'message':'Este nombre de usuario ya existe, ingrese uno nuevo.'}, code=400)
        else:
            return data


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    email = serializers.EmailField()

    def validate(self,data):
        user = User.objects.filter(username = data["username"]).first()
        if user is not None:
            if user.check_password(data["password"]):
                instance = User()
                instance.username = data["username"]
                instance.password = data["password"]
                instance.email = user.email
                return instance
            else:
                raise serializers.ValidationError({'message':'La contraseña no es la correcta.'}, code=400 )
        else:
             raise serializers.ValidationError({'message':'El usuario no existe.'}, code=400)


class Tipo_treekingSerializer(serializers.Serializer):    
    Id_tipo = serializers.ReadOnlyField()
    Name_tipo = serializers.CharField(max_length = 100)     
    Description_tipo = serializers.CharField(max_length = 5000)  
    Active_tipo = serializers.BooleanField()
    
    class Meta:        
        model = Tipo_treeking
        fields = ['Id_tipo', 'Name_tipo', 'Description_tipo', 'Active_tipo']

class TreekingSerializer(serializers.Serializer):    
    Id_treeking = serializers.ReadOnlyField()
    Name_treeking = serializers.CharField(max_length = 100)
    Description_treekingr = serializers.CharField(max_length = 500)
    ImageBase = serializers.CharField()
    Tipo =  serializers.CharField()
    Activo_treeking = serializers.BooleanField()    

    class Meta:        
        model = Treeking
        fields = ['Id_treeking','Name_treeking', 'Description_treekingr', 'ImageBase', 'Tipo','Activo_treeking']