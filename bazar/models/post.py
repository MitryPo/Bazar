from uuid import uuid4
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils.safestring import mark_safe
from django.urls import reverse
from django.utils.text import slugify
from core.settings import MEDIA_ROOT
from bazar.models.category import Category
from bazar.models.city import City
from datetime import datetime


class Post(models.Model):
    category = models.ForeignKey(Category,
                                 default=10,
                                 verbose_name=_("Category"),
                                 on_delete=models.CASCADE)

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
                                        verbose_name=_("Publish date"))

    city = models.ForeignKey(City,
                             default=1,
                             verbose_name=_("City"),
                             on_delete=models.CASCADE)

    slug = models.SlugField(max_length=150, blank=True, unique=True)

    @property
    def image_tag(self):
        return mark_safe('<img width="60" src="%s" />' % self.image.url)

    def get_absolute_url(self):
        return reverse("post url", kwargs={"slug": self.slug})

    def generate_slug(self, s):
        id = uuid4()
        new_slug = slugify(s, allow_unicode=True)
        return new_slug + '-' + str(id.hex)

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = self.generate_slug(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
