from rest_framework.views import APIView
from rest_framework import permissions, status
from django.contrib.auth import login, logout
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie

from .serializers import UserRegisterSerializer, AssignedSongSerializer, UserSerializer, UserLoginSerializer
from .models import AssignedSong, Color, Song
from .validations import custom_validation, validate_username, validate_password

class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
	##
    def post(self, request):
        print(request.data)
        data = request.data
        assert validate_username(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
	##
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)


class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({ 'success': 'CSRF cookie set' })


def get_csrf(request):
    response = JsonResponse({'detail': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    return response


class UserSongsView(APIView):
    permission_classes =(permissions.IsAuthenticated, )

    def get(self, request):
        assigned_songs = request.user.user_songs.all()
        song_serializer = AssignedSongSerializer(assigned_songs, many=True)
        return Response({'user_songs': song_serializer.data}, status=status.HTTP_200_OK)


class AssignColorToSong(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request):
        color = request.data.get('color')
        track = request.data.get('track')
        user = request.user


        color = Color.objects.get(name=color)
        track_id = track['id']
        name = track['name']
        artist = track['artists'][0]['name']
        album = track['album']['name']
        image = track['album']['images'][0]['url']
        preview_url = track['preview_url']

        song, created = Song.objects.get_or_create(
            id=track_id, 
            defaults={'name': name, 'artist': artist, 'album': album, 'image': image, 'preview_url': preview_url}
        )

        AssignedSong.objects.filter(user=user, song=song).delete()

        user_assigned_song = AssignedSong(color=color, user=user, song=song)
        user_assigned_song.save()

        return Response({"message" : 'Route works'})


class ReAssignColor(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request):
        color = request.data.get('color')
        track = request.data.get('track')
        user = request.user

        track_id = track['id']


        assigned_song = AssignedSong.objects.get(user=user, song__id=track_id)
        new_color = Color.objects.get(name=color)

        assigned_song.color = new_color
        assigned_song.save()

        print(assigned_song)


        return Response({"message" : 'Route works'})


class RemovedAssignedSong(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        track_id = request.data.get('id')
        user = request.user


        try:
            assigned_song = AssignedSong.objects.get(user=user, song__id=track_id)
            print(assigned_song)
            assigned_song.delete()

            return Response({"message": 'Assigned song removed successfully'})
        except AssignedSong.DoesNotExist:
            return Response({'detail': 'Assigned song not found for the user and track ID.'}, status=404)
