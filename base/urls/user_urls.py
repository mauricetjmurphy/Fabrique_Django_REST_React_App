from django.urls import path
from base.views import user_views as views

urlpatterns = [

    # path('', views.getUsers, name="users"),
    # Route for obtaining the web token. Generates a new token every time it accessed.
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('register/', views.registerUser, name='register'),

    path('profile/', views.getUserProfile, name="user-profile"),
    path('profile/update/', views.updateUserProfile, name="user-profile-update"),

    path('', views.getUsers, name="users"),
    
    # Make sure urls with dynamic values are towards the end of the list
    path('<str:pk>/', views.getUserById, name="user"),

    path('update/<str:pk>/', views.updateUser, name="user-update"),

    path('delete/<str:pk>/', views.deleteUser, name="user-delete"),
    

    ]
