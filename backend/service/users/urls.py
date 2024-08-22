from django.urls import re_path, path

from users.views.change_email_view import (
    ChangeEmailAPIView,
    activate_new_email
)
from users.views.email_verify_view import activate
from users.views.login_view import LoginAPIView, VerifyAPIView
from users.views.logout_view import Logout
from users.views.register_view import RegisterAPIView
from users.views.reset_password_view import (
    RequestPasswordResetAPIView,
    PasswordTokenCheckAPI, SetPasswordTokenAPI
)
from users.views.user_view import UserListAPIView, UserDetailAPIView

urlpatterns = [
    re_path(r"^login/", LoginAPIView.as_view(), name="login"),
    re_path(r"^verify/", VerifyAPIView.as_view(), name='verify', ),
    re_path(r"^logout/", Logout.as_view(), name="logout"),
    re_path(r"^register/", RegisterAPIView.as_view(), name="register"),
    re_path(r"^email-verify/", activate, name="email-verify"),
    re_path(r"^request-pass-reset/", RequestPasswordResetAPIView.as_view(), name="request-pass-reset"),
    path("password-token-check/<uidb64>/<token>/", PasswordTokenCheckAPI.as_view(), name="password-token-check"),
    re_path(r"^set-password-token/", SetPasswordTokenAPI.as_view(), name="set-password-token"),
    re_path(r"^change-email/", ChangeEmailAPIView.as_view(), name="change-email"),
    re_path(r"^email-verify-new/", activate_new_email, name="email-verify-new"),

    re_path(r"^user-list/", UserListAPIView.as_view(), name="user-list"),
    path("user-detail/<int:id>/", UserDetailAPIView.as_view(), name="user-detail"),
]
