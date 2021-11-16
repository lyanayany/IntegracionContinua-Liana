from django.contrib import admin
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers  import JSONParser
from .models import Tipo_treeking, Treeking
from .serializers import Tipo_treekingSerializer, TreekingSerializer
# Register your models here.

admin.site.register(Tipo_treeking)
admin.site.register(Treeking)