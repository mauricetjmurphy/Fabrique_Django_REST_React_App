from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from base.models import Product, User, Order, OrderItem, ShippingAddress
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status

@api_view(['POST'])
@permission_classes(['IsAuthenticated'])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']
    if(orderItems and len(orderItems) == 0):
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # Create order
        order = Order.objects.create(
            user = user,
            paymentMethos = data['paymentMethod'],
            taxtPrice = data['taxPrice'],
            shippingPrice = data['shippingPrice'],
            totalPrice = data['totalPrice']
        )
        # Create shipping address
        shipping = ShippingAddress.objects.create(
            order=order,
            address = data['shippingAddress']['address'],
            city = data['shippingAddress']['city'],
            postalCode = data['shippingAddress']['postalCode'],
            country = data['shippingAddress']['country'],
        )
        # Create order items and set the order to orderItem relationship
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )
        

    return Response('ORDER')