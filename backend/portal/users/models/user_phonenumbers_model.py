from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class UserPhonenumber(models.Model):
    telephone = PhoneNumberField(region="RU", unique=True)
    user = models.ForeignKey('User', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.telephone}"
