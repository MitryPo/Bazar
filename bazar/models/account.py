from uuid import uuid4
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from .post import Post

        
class UserManager(BaseUserManager):

    def create_user(self, phone, password=None, **kwargs):
        if phone is None:
            raise TypeError('Users must have a phone number.')

        user = self.model(phone=phone, **kwargs)
        user.set_password(password)
        user.is_active = True
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
    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    phone = models.CharField('Номер телефона', unique=True, max_length=16)
    username = models.CharField('Имя пользователя', max_length=50)
    date_joined = models.DateField('Дата создания', auto_now=True)
    favorite_posts = models.ManyToManyField(Post, verbose_name='Избранное', related_name='users', blank=True)
    is_online = models.BooleanField('В сети', default=False)
    is_staff = models.BooleanField('Администратор', default=False)

    objects = UserManager()

    USERNAME_FIELD = 'phone'

    def save(self, *args, **kwargs):
        id = uuid4()
        if not self.id:
            self.username = (str(id.time_low))
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username
