$(document).ready(function () {
    loadTypeTreeks();
    loadTreeks();
    $("#itemTypes li").click(function () {
        $.each($("#itemTypes li"), function (val, item) {
            $(item).removeClass("active");
        });
        $(this).addClass("active");
        var Idtipo = $(this).text();
        if (this.id == "all") {
            $.each($(".tipo"), function (val, item) {
                $(item).show();
            });
        } else {
            $.each($(".tipo"), function (val, item) {
                if (item.id == Idtipo) {
                    $(item).show();
                } else {
                    $(item).hide();                    
                }
            });
        } 
    });
});

function loadTreeks() {
    $.ajax({
        url: 'http://127.0.0.1:8000/Treeking_list',
        type: 'GET',
        async: false,
        beforeSend: function (xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", '{{ csrf_token }}');
        },
        success: function (arg) {
            CreateProducts(arg);
        },
        error: function (request, status, error) {
            console.log(request.responseText);
        }
    })
}

function loadTypeTreeks() {
    $.ajax({
        url: 'http://127.0.0.1:8000/TipoTreeking_list',
        type: 'GET',
        async: false,
        beforeSend: function (xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", '{{ csrf_token }}');
        },
        success: function (arg) {
            createListTypes(arg);
        },
        error: function (request, status, error) {
            console.log(request.responseText);
        }
    })
}

function createListTypes(data) {
    var html = $("#itemTypes").html();
    $.each(data, function (item, val) {
        html += '<li role="presentation" title="' + val["Description_tipo"] + '"><a>' + val["Name_tipo"] + '</a></li>'
    });
    $("#itemTypes").html(html);
}

function CreateProducts(data) {
    var html = $("#products").html();
    var par = true;
    $.each(data, function (item, val) {
        if (par) {
            html += '<div class="row justify-content-center no-gutters mb-5 mb-lg-0 tipo" id="' + val["Tipo"] + '">';
            html += '<div class="col-lg-6"><img class="img-fluid" src="http://127.0.0.1:8000/media/' + val["ImageBase"] + '" alt="" /></div>';
            html += '<div class="col-lg-6">';
            html += '<div class="bg-black text-center h-100 project">';
            html += '<div class="d-flex h-100">';
            html += '<div class="project-text w-100 my-auto text-center text-lg-left">';
            html += '<h4 class="text-white">' + val["Name_treeking"] + '</h4>';
            html += '<p class="mb-0 text-white-50">' + val["Description_treekingr"] + '</p>';
            html += '<hr class="d-none d-lg-block mb-0 ml-0" />';
            html += '</div></div></div></div></div>';
            par = false;
        } else {
            html += '<div class="row justify-content-center no-gutters tipo" id="' + val["Tipo"] + '">';
            html += '<div class="col-lg-6"><img class="img-fluid" src="http://127.0.0.1:8000/media/' + val["ImageBase"] + '" alt="" /></div>';
            html += '<div class="col-lg-6 order-lg-first">';
            html += '<div class="bg-black text-center h-100 project">';
            html += '<div class="d-flex h-100">';
            html += '<div class="project-text w-100 my-auto text-center text-lg-right">';
            html += '<h4 class="text-white">' + val["Name_treeking"] + '</h4>';
            html += '<p class="mb-0 text-white-50">' + val["Description_treekingr"] + '</p>';
            html += '<hr class="d-none d-lg-block mb-0 mr-0" />';
            html += '</div></div></div></div></div>';
            par = true;
        }
    })
    $("#products").html(html);
}