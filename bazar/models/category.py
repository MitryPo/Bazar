from django.db import models
from django.utils.translation import gettext_lazy as _
from django.urls import reverse
from uuid import uuid4
from .utils import generate_slug


class SubCategory(models.Model):
    name = models.CharField(max_length=50, verbose_name=_("Subcategory name"))
    slug = models.SlugField(max_length=150, blank=True, unique=True)

    class Meta:
        verbose_name = _("Sub category")
        verbose_name_plural = _("Sub categories")

    def get_absolute_url(self):
        return reverse("subcat url", kwargs={"slug": self.slug})

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = generate_slug(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=50, verbose_name=_("Category name"))
    child = models.ManyToManyField(SubCategory, null=True, blank=True)
    slug = models.SlugField(max_length=150, blank=True, unique=True)

    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")

    def get_absolute_url(self):
        return reverse("cat url", kwargs={"slug": self.slug})

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = generate_slug(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
