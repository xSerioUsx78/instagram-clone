from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token


User = get_user_model()


class UserRegisterTestCase(APITestCase):

    def setUp(self):
        self.url = reverse("users:register")


    def test_register_success(self):

        data = {
            "username": "test",
            "email": "test@gmail.com",
            "password": "testuser123"
        }

        res = self.client.post(self.url, data, format="json")

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, "test")
    
    def test_register_fail(self):

        data = {
            "username": "",
            "email": "",
            "password": ""
        }

        res = self.client.post(self.url, data, format="json")

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(len(res.json()), 3)
        self.assertEqual(User.objects.count(), 0)


class UserLoginTestCase(APITestCase):

    def setUp(self):
        self.url = reverse("users:login")
        self.user = User.objects.create_user(username="test", email="test@gmail.com", password="testuser123")

    def test_login_success(self):

        data = {
            "username": "test",
            "password": "testuser123"
        }

        res = self.client.post(self.url, data, format="json")

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(Token.objects.count(), 1)
        self.assertEqual(len(res.json()), 2)
    
    def test_login_fail(self):

        data = {
            "username": "test",
            "password": "wrongpassword"
        }

        res = self.client.post(self.url, data, format="json")

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Token.objects.count(), 0)
        self.assertEqual(len(res.json()), 1)


class UserLogoutTestCase(APITestCase):

    def setUp(self):
        self.url = reverse("users:logout")
        self.user = User.objects.create_user(username="test", email="test@gmail.com", password="testuser123")
        self.token = Token.objects.create(user=self.user)

    def test_logout_success(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')
        res = self.client.post(self.url, {}, format="json")

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Token.objects.count(), 0)
    
    def test_logout_fail(self):
        res = self.client.post(self.url, {}, format="json")
        
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Token.objects.count(), 1)