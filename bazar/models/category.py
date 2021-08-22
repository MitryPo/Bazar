from django.db import models
from .utils import generate_slug


class Category(models.Model):
    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    parent = models.ForeignKey('self', verbose_name='Категория родитель', related_name='parents', null=True, on_delete=models.CASCADE)
    name = models.CharField('Название', max_length=50)
    slug = models.SlugField(max_length=50, blank=True, unique=True)

    def save(self, *args, **kwargs):
        self.slug = generate_slug(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
