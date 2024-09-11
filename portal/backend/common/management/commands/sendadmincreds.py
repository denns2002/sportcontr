import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.urls import reverse
from django.utils.crypto import get_random_string
from dotenv import load_dotenv

from mailings.utils.send_email import send_email


class Command(BaseCommand):
    load_dotenv()
    help = 'Регистрирует администратора и отправляет данные для входа'

    def handle(self, *args, **options):
        user = get_user_model().objects.create(
            username=os.environ["ADMIN_LOGIN"],
            email=os.environ["ADMIN_EMAIL"],
            first_name=os.environ["ADMIN_FIRST_NAME"],
            last_name=os.environ["ADMIN_LAST_NAME"],
            is_staff=True,
            is_active=True,
            is_verified=True,
            is_superuser=True
        )
        password = get_random_string(length=15)
        user.set_password(password)
        user.save()

        send_email(
            email_subject="Ваш портал создан!",
            email_body="Здравствуйте, вы создали свой портал, вот ваши данные"
                       "для входа в качестве администратора:\n"
                       f"логин: {user.username}\n"
                       f"пароль: {password}\n"
                       "Никому не сообщайте данные для входа!\n"
                       "Рекомендуем сменить пароль и удалить данное письмо.",
            to_emails=[os.environ["ADMIN_EMAIL"]]
        )
        print('Пользователь создан и данные успешно отправлены!')