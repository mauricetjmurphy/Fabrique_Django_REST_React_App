from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Product, User, Review
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken, ReviewSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status

@api_view(['GET'])
def searchProducts(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    products = Product.objects.filter(product_name__icontains=query)

    page = request.query_params.get('page')
    paginator = Paginator(products, 12)
    
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1
    
    page = int(page)

    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('category')
    if query == None:
        products = Product.objects.all()
    else:
        products = Product.objects.filter(product_category__icontains=query)

    page = request.query_params.get('page')
    paginator = Paginator(products, 4)
    
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1
    
    page = int(page)


    serializer = ProductSerializer(products, many=True)
    return Response({'products':serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(pk=pk)
    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    product = Product.objects.get(product_id=pk)
    user = request.user
    data = request.data
    
    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    else:
        review = Review.objects.create(
            user=user,
            product = product,
            name = user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        review.save()


        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating
        
        product.rating = total / len(reviews)
        product.save()

        return Response({'Review added'})