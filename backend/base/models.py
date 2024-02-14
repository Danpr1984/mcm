"""Models"""
# pylint: disable=E1101

from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    """
    Model to represent extended auth User Class to add additional
    profile information.
    """

    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]

    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    age = models.PositiveIntegerField(null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"Profile for {self.user.username}"
    
    class Meta:
        app_label = 'backend.base'

def create_user_profile(instance, created, *args, **kwargs):
    """
    Signal handler function to create a user profile when a
    new user is created.

    This function is connected to the User model's post_save signal.
    kwargs are required for dispatch signals

    """
    if created:
        Profile.objects.create(user=instance)

models.signals.post_save.connect(create_user_profile, sender=User)

class Color(models.Model):
    name = models.CharField(max_length=50)
    hex_code = models.CharField(max_length=7, default='#000000')

    def __str__(self):
        return str(self.name)


class Song(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
    album = models.CharField(max_length=100)
    image = models.URLField()
    preview_url = models.URLField(null=True)

    def __str__(self):
        return str(self.name)


class AssignedSong(models.Model):
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    color = models.ForeignKey(Color, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name="user_songs")

    def __str__(self):
        return f"{self.song.name}"
