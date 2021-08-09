from django.urls import path
from base.views import product_views as views

urlpatterns = [

   

    path('', views.getProducts, name="products"),

    path('search/', views.searchProducts, name="search-products"),

    path('<str:pk>/', views.getProduct, name="product"),

    path('<str:pk>/reviews/', views.createProductReview, name="product-review"),

      path('delete/', views.deleteProducts, name="delete-products"),
   
    ]