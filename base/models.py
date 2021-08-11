from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Product(models.Model):
    # Set the relationship to the User model (one-to-many relationship). 
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    product_id = models.AutoField(primary_key=True, editable=False)
    product_name = models.CharField(max_length=500, null=True, blank=True)
    availability = models.CharField(max_length=500, null=True, blank=True)
    product_category = models.CharField(max_length=200, null=True, blank=True)
    brand = models.CharField(max_length=500, null=True, blank=True)
    color =models.CharField(max_length=500, null=True, blank=True)
    description = models.TextField( null=True, blank=True)
    gender = models.CharField(max_length=500, null=True, blank=True)
    size = models.CharField(max_length=500, null=True, blank=True)
    material = models.CharField(max_length=500, null=True, blank=True)
    retail_price = models.CharField(max_length=500, null=True, blank=True)
    product_url = models.CharField(max_length=500, null=True, blank=True)
    product_image_url = models.TextField( null=True, blank=True)
    additional_image_link = models.TextField( null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.product_name)


class Order(models.Model):
    # Set the relationship to the User model (one-to-many relationship). 
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidOn = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredOn = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdOn = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdOn)


class OrderItem(models.Model):
    # Set the relationship to the User model (one-to-many relationship). 
    product_id = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)


class ShippingAddress(models.Model):
    # Set the relationship to the User model (one-to-many relationship). 
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.address)


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)