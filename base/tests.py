import os.path

import pdb

from django.conf import settings
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from base.models import Product, User, Review

#----------SetUp-----------#

class TestSetUp(APITestCase):
    def setUp(self):
        self.register_url = reverse('register')
        # self.login_url = reverse('login')
        self.products_url = reverse('products')

        self.user_data = {
            'first_name': 'test',
            'username': 'test@test.test',
            'email': 'test@test.test',
            'password': 'password',
        }

        return super().setUp()

    def tearDown(self):
        return super().tearDown()



#----------Product-----------#

class GetProductsTestCase(TestSetUp):

    def test_get_products(self):
        products_count = Product.objects.count()
        response = self.client.get(self.products_url)
        pdb.set_trace()
        if response.status_code != 200:
            print(response.data)
        self.assertEqual(response.data['count'], products_count)
        self.assertEqual(
            len(response.data['results']),
            products_count
            )


class GetProductTestCase(TestSetUp):

    def test_get_product(self):
        product_id = Product.objects.first().product_id
        response = self.client.get(f'/api/products/{product_id}/')
        if response.status_code != 200:
            print(response.data)
        self.assertEqual(response.data['product_id'], product_id)


class ProductDeleteTestCase(TestSetUp):

    def test_delete_product(self):
        initial_product_count = Product.objects.count()
        product_id = Product.objects.first().id
        self.client.delete(f'/api/products/{product_id}/')
        self.assertEqual(
            initial_product_count, Product.objects.count()
            )

        self.assertRaises(
            Product.DoesNotExist,
            Product.objects.get, product_id=product_id
        )




#----------User-----------#

class UserUpdateTestCase(TestSetUp):

    def test_update_user(self):
        product = Product.objects.first()
        self.client.patch(f'/api/users/update/{product}', {
            'username': 'New Name',
            'email': 'New Email'
        },format='json')
        updated = Product.objects.get(product_id=product.product_id)
        self.assertEqual(
            updated.name, 'New Name'
            )


class RegisterUserTestCase(TestSetUp):

    def test_register_user(self):
        initial_user_count = User.objects.count()
        response = self.client.post(self.register_url, self.user_data, format='json')
        pdb.set_trace()
        if response.status_code != 201:
            print(response.data)
            self.assertEqual(response.status_code, 201)
        self.assertEqual(
            User.objects.count(),
            initial_user_count + 1
        )
        for attr, expected_value in self.user_data.items():
            self.assertEqual(response.data[attr], expected_value)


class UserDeleteTestCase(TestSetUp):

    def test_delete_user(self):
        initial_user_count = User.objects.count()
        user_id = User.objects.first().id
        self.client.delete(f'/api/users/delete/{user_id}/')
        self.assertEqual(
            initial_user_count, User.objects.count()
            )
        self.assertRaises(
            User.DoesNotExist,
            User.objects.get, id=user_id
        )
