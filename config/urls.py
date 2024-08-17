from django.contrib import admin
from django.urls import path, include, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions, authentication

schema_view = get_schema_view(
   openapi.Info(
      title="СпортикАПИ",
      default_version='v0.1',
      description="",
      terms_of_service="",
      contact=openapi.Contact(email=""),
      license=openapi.License(name=""),
   ),
   public=True,
   authentication_classes=[authentication.TokenAuthentication],
   permission_classes=[permissions.AllowAny],
)

urlpatterns = [
   re_path(r'^admin/', admin.site.urls),
   re_path(r'^swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
   re_path(r'^swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   re_path(r'^redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
   re_path(r'^users/', include("users.urls")),
]

urlpatterns = [path(f'api/', include(urlpatterns))]
