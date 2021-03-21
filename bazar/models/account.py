from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import gettext_lazy as _
from decimal import Decimal
from .city import City
from .post import Post


# Create your models here.
class UserProfile(User):
    city = models.ForeignKey(City, 
                                default=1, 
                                verbose_name=_("City"), 
                                on_delete=models.CASCADE)

    favorite_posts = models.ManyToManyField(Post, verbose_name=_("Favorite Posts"))

    balance = models.DecimalField(max_digits=7,
                                  decimal_places=2,
                                  verbose_name=_("Balance"),
                                  default=Decimal(0.00))

    is_online = models.BooleanField(verbose_name=_("Is online"), default=False)
    phone = models.CharField(verbose_name=_("Phone number"), max_length=12)

    def __str__(self):
        return self.username
