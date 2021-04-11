from django.utils.text import slugify

def generate_slug(s):
        new_slug = slugify(s, allow_unicode=True)
        return new_slug


