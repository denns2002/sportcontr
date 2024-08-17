from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from users.utils.generate_random_str import generate_random_str


class Tests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.login = generate_random_str()
        self.email = f"{generate_random_str()}@email.com"
        self.password = generate_random_str()
        response = self.client.post(
            reverse('register'),
            {
                "username": self.login,
                "email": self.email,
                "password": self.password,
                "password_2": self.password,
                "first_name": generate_random_str(),
                "last_name": generate_random_str(),
            }
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user = get_user_model().objects.get(
            email=self.email,
        )
        self.user.is_active = True
        self.client.login(username=self.login, password=self.password)

    def test_registration(self):
        password = generate_random_str()
        response = self.client.post(
            reverse('register'),
            {
                "username": generate_random_str(),
                "email": f"{generate_random_str()}@email.com",
                "password": password,
                "password_2": password,
                "first_name": generate_random_str(),
                "last_name": generate_random_str(),
            }
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_double_reg(self):
        response = self.client.post(
            reverse('register'),
            {
                "username": self.login,
                "email": self.email,
                "password": self.password,
                "password_2": self.password,
                "first_name": generate_random_str(),
                "last_name": generate_random_str(),
            }
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # def test_login(self):
    #     response = self.client.post(
    #         reverse('login'),
    #         {
    #             'username': self.login,
    #             'password': self.password
    #         }
    #     )
    #     print(response.status_code)
    #     print(response.content.decode())
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_incorrect_login(self):
        response = self.client.post(
            reverse('login'),
            {
                'username': generate_random_str(),
                'password': self.password
            }
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_incorrect_password_login(self):
        response = self.client.post(
            reverse('login'),
            {
                'username': self.login,
                'password': generate_random_str(),
            }
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

