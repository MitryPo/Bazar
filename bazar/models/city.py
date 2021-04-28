from django.db import models
from django.utils.translation import gettext_lazy as _
from django.urls import reverse
from .utils import generate_slug
# Create your models here.


class City(models.Model):
    name = models.CharField(verbose_name=_("City"), max_length=60)
    slug = models.SlugField(max_length=150, blank=True, unique=True)

    class Meta:
        verbose_name_plural = _("Cities")

    def get_absolute_url(self):
        return reverse("city url", kwargs={"slug": self.slug})

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = generate_slug(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
