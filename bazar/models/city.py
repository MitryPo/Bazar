from django.db import models
from .utils import generate_slug


class City(models.Model):
    class Meta:
        verbose_name = 'Город'
        verbose_name_plural = 'Города'

    name = models.CharField('Название города', max_length=60)
    slug = models.SlugField(max_length=150, auto_created=True, blank=True, unique=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = generate_slug(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
