from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils.safestring import mark_safe
from .category import Category


class Post(models.Model):
    category = models.ForeignKey(Category, verbose_name=_("Category"), on_delete=models.CASCADE)
    title = models.CharField(verbose_name=_("Product title"), max_length=50)
    description = models.TextField(verbose_name=_("Product description"), default='undefined')
    image = models.ImageField(verbose_name=_("Product image"),
                                 upload_to='product_images', 
                                 height_field=None, width_field=None, max_length=None,
                                 blank=True, 
                                 null=True,)
    price = models.IntegerField(verbose_name=_("Product price"), default='free')

    @property
    def image_tag(self):
        return mark_safe('<img width="60" src="%s" />' % self.image.url)

    def __str__(self):
        return self.title