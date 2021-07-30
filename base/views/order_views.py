from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from base.models import Product, User, Order, OrderItem, ShippingAddress
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken, OrderSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    print('yes')
    user = request.user
    data = request.data


    orderItems = data['orderItems']
    if(orderItems and len(orderItems) == 0):
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # Create order
        order = Order.objects.create(
            user = user,
            paymentMethod = data['paymentMethod'],
            taxPrice = data['taxPrice'],
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
            product = Product.objects.get(product_id=i['id'])
            item = OrderItem.objects.create(
                product_id=product,
                order=order,
                name=product.product_name,
                qty=i['qty'],
                price=i['price'],
                image=product.product_image_url,
            )
        
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)