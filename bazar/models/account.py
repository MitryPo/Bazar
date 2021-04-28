from uuid import uuid4
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _
from core.settings import SIMPLE_JWT
from datetime import datetime, timedelta


class UserManager(BaseUserManager):

    def create_user(self, phone, password=None, **kwargs):
        if phone is None:
            raise TypeError('Users must have a phone number.')

        user = self.model(phone=phone, **kwargs)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, phone, password, **kwargs):
        if password is None:
            raise TypeError('Superusers must have a password.')

        user = self.create_user(phone, password, **kwargs)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class UserProfile(AbstractBaseUser, PermissionsMixin):
    phone = models.CharField(
        verbose_name=_("Phone number"),
        unique=True,
        max_length=16)

    username = models.CharField(max_length=50, blank=True)
    balance = models.PositiveIntegerField(
        verbose_name=_("Balance"),
        default=0)

    date_joined = models.DateField(
        default=datetime.utcnow,
        verbose_name='Join date')

    is_online = models.BooleanField(verbose_name=_("Is online"), default=False)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'phone'

    def save(self, *args, **kwargs):
        id = uuid4()
        if not self.id:
            self.username = (str(id.time_low))
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username
