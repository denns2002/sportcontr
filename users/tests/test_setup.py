from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from users.utils.generate_random_str import generate_random_str


class TestMyModelSetup(TestCase):

    def test_register(self):
        self.client = APIClient()
        login = generate_random_str()
        email = f"{generate_random_str()}@email.com"
        password = generate_random_str()
        response = self.client.post(
            reverse('register'),
            {
                "username": login,
                "email": email,
                "password": password,
                "password_2": password,
                "first_name": generate_random_str(),
                "last_name": generate_random_str(),
            }
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user = get_user_model().objects.get(
            email=email,
        )
        self.user.is_active = True
        self.client.login(username=login, password=password)
