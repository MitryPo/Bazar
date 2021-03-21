from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils.safestring import mark_safe
from django.urls import reverse
from django.template.defaultfilters import slugify
from core.settings import MEDIA_ROOT
from .category import Category
from .city import City
from datetime import datetime


class Post(models.Model):
    category = models.ForeignKey(Category, default=1, verbose_name=_(
        "Category"), on_delete=models.CASCADE)
    title = models.CharField(max_length=50, verbose_name=_("Product title"))
    description = models.TextField(blank=True, 
                                    null=True, 
                                    verbose_name=_("Product description"))

    image = models.ImageField(upload_to='product_images', 
                                default=MEDIA_ROOT+'/unnamed.png', 
                                height_field=None, 
                                width_field=None, 
                                max_length=None,
                                blank=True,
                                null=True, verbose_name=_("Product image"),)

    price = models.PositiveIntegerField(verbose_name=_("Product price"), 
                                        default=0)

    sold = models.BooleanField(default=False)
    date_created = models.DateTimeField(default=datetime.now, 
                                        verbose_name=_("Date of publish"))

    city = models.ForeignKey(City, default=1, 
                                verbose_name=_("City"), 
                                on_delete=models.CASCADE)
    

    @property
    def image_tag(self):
        return mark_safe('<img width="60" src="%s" />' % self.image.url)

    def __str__(self):
        return self.title
