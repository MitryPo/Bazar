from bazar.models import Post, City, Category
from django.core.management.base import BaseCommand, CommandError
from core.settings import FIXTURE_DIR, MEDIA_ROOT
import json, random, glob


class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Loading posts...')
        postsPath = FIXTURE_DIR+'/posts.json'
        imagePath = MEDIA_ROOT+'/product_images/**.jpg'
        Post.objects.all().delete()
        with open(postsPath, 'r', encoding='utf-8') as f:
            tmpstr = f.read()
            data = json.loads(tmpstr)
        for i in range(5):
            for item in data:
                post = Post()
                post.city = City.objects.get(id=random.randint(1,11))
                post.category = Category.objects.get(id=random.randint(1,10))
                post.price = random.randrange(start=150, stop=15000, step=50)
                post.title = item['title']
                post.description = item['description']
                post.image = random.choice(glob.glob(imagePath))
                post.save()
                print(item)