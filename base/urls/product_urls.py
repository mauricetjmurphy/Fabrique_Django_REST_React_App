from django.urls import path
from base.views import product_views as views

urlpatterns = [

    path('', views.getProducts, name="products"),

    path('search/', views.searchProducts, name="search-products"),

    path('create/', views.createProduct, name="create-product"),

    path('delete/', views.deleteProducts, name="delete-products"),

    path('delete/<str:pk>', views.deleteProduct, name="delete-product"),

    path('<str:pk>/', views.getProduct, name="product"),

    path('<str:pk>/reviews/', views.createProductReview, name="product-review"),

    ]