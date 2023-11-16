from django.contrib import admin
from .models import AppUser, Song, Color, AssignedSong

admin.site.register(AppUser)
admin.site.register(Song)
admin.site.register(Color)
admin.site.register(AssignedSong)
