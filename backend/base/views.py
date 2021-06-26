from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .products import products

@api_view(['GET'])
def getProducts(request):
    return Response(products)

@api_view(['GET'])
def getProduct(request, _id):
    product = None
    for i in products:
        if i['product_id'] == _id:
            product = i
            break

    return Response(product)