from django.contrib import admin
from django.urls import path
from game import views as gameView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', gameView.main),
]
