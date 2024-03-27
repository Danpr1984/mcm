from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Song, AssignedSong

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'username')


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
	##
    def check_user(self, clean_data):
        user = authenticate(username=clean_data['username'], password=clean_data['password'])
        if not user:
            raise ValidationError('user not found')
        return user


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, clean_data):
        user_obj = User.objects.create_user(username=clean_data['username'], password=clean_data['password'])
        user_obj.save()
        return user_obj


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ('id', 'name', 'artist', 'album', 'image', 'preview_url')


class AssignedSongSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignedSong
        fields = ('song', 'color')

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['song'] = {
            'id': instance.song.id,
            'name': instance.song.name,
            'artist': instance.song.artist,
            'album': instance.song.album,
            'image': instance.song.image,
            'preview_url': instance.song.preview_url,
            # Add more fields as needed
        }
        representation['color'] = instance.color.name

        return representation