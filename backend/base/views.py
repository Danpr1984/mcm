import json


from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from django.http import JsonResponse
from django.contrib import auth
from django.contrib.auth.models import User
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_POST
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from .models import AssignedSong, Color, Song

@method_decorator(csrf_protect, name='dispatch')
class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({ 'isAuthenticated': 'success' })
            else:
                return Response({ 'isAuthenticated': 'error' })
        except:
            return Response({ 'error': 'Something went wrong when checking authentication status' })


# @method_decorator(csrf_protect, name='dispatch')
# class LoginView(APIView):
#     permission_classes = (permissions.AllowAny, )

#     def post(self, request, format=None):
#         data = self.request.data

#         username = data['username']
#         password = data['password']
#         print(username)
#         print(password)

#         try:
#             user = auth.authenticate(username=username, password=password)
#             print(user)

#             if user is not None:
#                 auth.login(request, user)
#                 return Response({ 'success': 'User authenticated' })
#             else:
#                 return Response({ 'error': 'Error Authenticating' })
#         except:
#             return Response({ 'error': 'Something went wrong when logging in' })

@api_view(['POST'])
@permission_classes([AllowAny])
@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse({'detail': 'Please provide username and password.'}, status=400)

    user = auth.authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

    auth.login(request, user)
    serializer = UserSerializer(user)
    return  Response({'user': serializer.data}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
@require_POST
def register_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    re_password  = data.get('re_password')

    try:
        if password == re_password:
            if User.objects.filter(username=username).exists():
                return Response({ 'error': 'Username already exists' })
            else:
                if len(password) < 8:
                    return Response({ 'error': 'Password must be at least 8 characters' })
                else:
                    user = User.objects.create_user(username=username, password=password)

                    user.save()
                    auth.login(request, user)
                    serializer = UserSerializer(user)

                    return Response({'user': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({ 'error': 'Passwords do not match' })
    except:
            return Response({ 'error': 'Something went wrong when registering account' })





# @method_decorator(csrf_protect, name='dispatch')
# class SignupView(APIView):
#     permission_classes = (permissions.AllowAny, )

#     def post(self, request, format=None):
#         data = self.request.data

#         username = data['username']
#         password = data['password']
#         re_password  = data['re_password']

#         try:
#             if password == re_password:
#                 if User.objects.filter(username=username).exists():
#                     return Response({ 'error': 'Username already exists' })
#                 else:
#                     if len(password) < 6:
#                         return Response({ 'error': 'Password must be at least 6 characters' })
#                     else:
#                         user = User.objects.create_user(username=username, password=password)

#                         user.save()



#                         return Response({ 'success': 'User created successfully' })
#             else:
#                 return Response({ 'error': 'Passwords do not match' })
#         except:
#                 return Response({ 'error': 'Something went wrong when registering account' })




class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({ 'success': 'CSRF cookie set' })


def get_csrf(request):
    response = JsonResponse({'detail': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    return response


@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'isAuthenticated': True})


@api_view(['GET'])
@permission_classes([AllowAny])
def whoami_view(request):

    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    serializer = UserSerializer(request.user)
    return Response({'user': serializer.data}, status=status.HTTP_200_OK)

class UserView(APIView):
    permission_classes =(permissions.IsAuthenticated, )

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)



class AssignColorToSong(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request):
        color = request.data.get('color')
        track = request.data.get('track')['track']
        user = request.user

        color = Color.objects.get(name=color['name'])
        track_id = track['id']
        name = track['name']
        artist = track['artists'][0]['name']
        album = track['album']['name']
        image = track['album']['images'][0]['url']
        preview_url = track['preview_url']

        song = Song(id=track_id, name=name, artist=artist, album=album, image=image, preview_url=preview_url)

        song.save()

        user_assigned_song = AssignedSong(color=color, user=user, song=song)

        user_assigned_song.save()
      
        return Response({"message" : 'Route works'})
