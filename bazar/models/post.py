from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils.safestring import mark_safe
from .category import Category
from .city import City


class Post(models.Model):
    category = models.ForeignKey(Category, default=1, verbose_name=_("Category"), on_delete=models.CASCADE)
    title = models.CharField(verbose_name=_("Product title"), max_length=50)
    description = models.TextField(verbose_name=_("Product description"), blank=True, null=True)
    image = models.ImageField(verbose_name=_("Product image"),
                                 upload_to='product_images', 
                                 height_field=None, width_field=None, max_length=None,
                                 blank=True, 
                                 null=True)
    price = models.PositiveIntegerField(verbose_name=_("Product price"), blank=True, null=True)
    city = models.ForeignKey(City, default=1, verbose_name=_("City"), on_delete=models.CASCADE)

    @property
    def image_tag(self):
        return mark_safe('<img width="60" src="%s" />' % self.image.url)

    def __str__(self):
        return self.title