from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.
class City(models.Model):

    name = models.CharField(verbose_name=_("City"), max_length=60)

    class Meta:
        verbose_name_plural = _("Cities")

    def __str__(self):
        return self.name