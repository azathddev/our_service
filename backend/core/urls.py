from django.contrib import admin
from django.urls import path, include

from api.views import RootView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('', RootView.as_view())
]
