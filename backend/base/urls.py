from django.urls import path
from . import views

urlpatterns = [
	path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserView.as_view(), name='user'),
    path('csrf_cookie', views.GetCSRFToken.as_view()),
    path('csrf', views.get_csrf, name='api-csrf'),
    path('assign_color_to_song/', views.AssignColorToSong.as_view(), name='assign_color_to_song'),
    path('reassign_color/', views.ReAssignColor.as_view(), name='reassign_color'),
    path('remove_color_song/', views.RemovedAssignedSong.as_view(), name='remove_color_song'),
    path('user_songs/', views.UserSongsView.as_view(), name='user_songs'),
]
