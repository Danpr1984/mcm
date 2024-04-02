from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer, RegisterSerializer


class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class FetchUser(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        seralizer = UserSerializer(user, many=False)
        return Response(seralizer.data)
