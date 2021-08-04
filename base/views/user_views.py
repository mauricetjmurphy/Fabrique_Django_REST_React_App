from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from base.models import User
from base.serializers import UserSerializer, UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # Customizing the serializer to obtain any user data that we require.
    def validate(self, attrs):
        data = super().validate(attrs)

        # Retrieving all the serialized data stored in the token
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data

# View for obtaining the web token. 
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# Create users in the database
@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        # Return the token straight away when the user is cretaed
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        # Using a try and except to check if the user already exists in the database
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
# Decorator checks if the user is authenticated before allowing access
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    # Get user object from the token that is sent
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])
    
    user.save()

    return Response(serializer.data)


@api_view(['GET'])
# Decorator checks if the user is authenticated before allowing access
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    # user will be the user from the web token
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
# Decorator checks if the user is authenticated and assigned admin privilages before allowing access
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUsers(request,pk):
    usersForDelete = User.objects.get(id=pk)
    usersForDelete.delete()
    return Response('User was deleted')    