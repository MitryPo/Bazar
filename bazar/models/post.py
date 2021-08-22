from uuid import uuid4
from django.db import models
from django.utils.safestring import mark_safe
from django.urls import reverse
from .utils import generate_slug
from core.settings import AUTH_USER_MODEL
from bazar.models.category import Category
from bazar.models.city import City


class Post(models.Model):
    class Meta:
        verbose_name = 'Объявление'
        verbose_name_plural = 'Объявления'

    category = models.ForeignKey(Category, verbose_name='Категория товара', related_name='posts',
                                 null=True, on_delete=models.SET_NULL)

    title = models.CharField('Название объявления', max_length=50)
    description = models.TextField('Описание объявления', blank=True, null=True)
    image = models.ImageField('Фото объявления', upload_to='product_images', default='unnamed.png',
                              height_field=None, width_field=None, max_length=None, null=True)

    price = models.CharField('Цена', max_length=9, default='Бесплатно')
    sold = models.BooleanField('Товар продан', default=False)
    date_created = models.DateTimeField('Дата создания', auto_now=True)
    city = models.ForeignKey(City, verbose_name='Местоположение', related_name='posts',
                             default=None, null=True, on_delete=models.SET_NULL)

    slug = models.SlugField(max_length=150, auto_created=True, blank=True, unique=True)
    creator = models.ForeignKey(AUTH_USER_MODEL, verbose_name='Продавец', related_name='posts', on_delete=models.CASCADE)

    @property
    def image_tag(self):
        return mark_safe('<img width="60" src="%s" />' % self.image.url)

    def get_absolute_url(self):
        return reverse("post url", kwargs={"slug": self.slug})

    def save(self, *args, **kwargs):
        uid = uuid4()
        self.slug = generate_slug(self.title, uid.hex)
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.title} {self.city}'
