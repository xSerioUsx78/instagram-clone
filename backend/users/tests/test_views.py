from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from ..models import Following


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
        self.user = User.objects.create_test_user()

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
        self.user = User.objects.create_test_user()
        self.token = Token.objects.create(user=self.user)
        self.with_credentials()

    def with_credentials(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')

    def test_logout_success(self):
        res = self.client.post(self.url, {}, format="json")

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Token.objects.count(), 0)


class UserDetailTestCase(APITestCase):

    def setUp(self):
        self.url = reverse("users:user")
        self.user = User.objects.create_test_user()
        self.token = Token.objects.create(user=self.user)
        self.with_credentials()

    def with_credentials(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')

    def test_user_detail_success(self):

        res = self.client.get(self.url)
        
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        
        self.assertEqual(len([res.json()]), 1)


class UserInfoTestCase(APITestCase):

    def setUp(self):
        self.user = User.objects.create_test_user()
        self.token = Token.objects.create(user=self.user)
        self.with_credentials()

    def with_credentials(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')
    
    def url(self, username):
        return reverse("users:info", kwargs={"username": username})

    def test_user_info_success(self):
        res = self.client.get(self.url("test"))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.json()), 5)
    
    def test_user_info_fail(self):
        res = self.client.get(self.url("wrong_username"))
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)


class FollowUserTestCase(APITestCase):
    
    def setUp(self):
        self.url = reverse("users:follow")
        self.user = User.objects.create_test_user()
        self.user2 = User.objects.create_test_user(2)
        self.token = Token.objects.create(user=self.user)
        self.with_credentials()

    def with_credentials(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')

    def test_user_follow_success(self):
        data = {
            "username": "test2"
        }

        res = self.client.post(self.url, data, format="json")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Following.objects.count(), 1)

    def test_user_was_followed(self):
        data = {
            "username": "test2"
        }

        # We send the request twice.
        # So we sure that the user already in database.
        self.client.post(self.url, data, format="json")
        res = self.client.post(self.url, data, format="json")
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(Following.objects.count(), 1)

    def test_user_follow_fail(self):
        data = {
            "username": "not_in_db"
        }

        res = self.client.post(self.url, data, format="json")
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Following.objects.count(), 0)


class UnFollowUserTestCase(APITestCase):
    
    def setUp(self):
        self.url = reverse("users:unfollow")
        self.user = User.objects.create_test_user()
        self.user2 = User.objects.create_test_user(2)
        self.token = Token.objects.create(user=self.user)
        Following.objects.create(
            follower_user=self.user, following_user=self.user2
        )
        self.with_credentials()

    def with_credentials(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')

    def test_user_unfollow_success(self):
        data = {
            "username": "test2"
        }

        res = self.client.delete(self.url, data, format="json")
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Following.objects.count(), 0)

    def test_user_unfollow_fail(self):

        data = {
            "username": "not_in_db"
        }

        res = self.client.delete(self.url, data, format="json")
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Following.objects.count(), 1)


class UserSuggestionsTestCase(APITestCase):
    
    def setUp(self):
        self.url = reverse("users:suggestions")
        self.user = User.objects.create_test_user()
        self.token = Token.objects.create(user=self.user)
        self.with_credentials()

    def with_credentials(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')

    def test_user_suggestions_success(self):
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)