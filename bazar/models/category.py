from django.db import models
from django.utils.translation import gettext_lazy as _
from django.urls import reverse
from django.template.defaultfilters import slugify


class Category(models.Model):
    name = models.CharField(max_length=50, verbose_name=_("Name of category"))

    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")


    def __str__(self):
        return self.name
