from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import gettext_lazy as _
from decimal import Decimal


# Create your models here.
class UserProfile(User):
    balance = models.DecimalField(verbose_name=_("Balance"), 
                                    max_digits=7, 
                                    decimal_places=2, 
                                    default=Decimal(0.00))
                                    
    is_online = models.BooleanField(verbose_name=_("Is online"), default=False)
    phone = models.CharField(verbose_name=_("Phone number"), max_length=12)

    def __str__(self):
        return self.username