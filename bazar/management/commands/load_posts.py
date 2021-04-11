from time import sleep
from bazar.models.account import UserProfile
from bazar.models import Post, City, Category
from django.core.management.base import BaseCommand, CommandError
from core.settings import FIXTURE_DIR, MEDIA_ROOT
import json, random, glob


class Command(BaseCommand):

    def handle(self, *args, **options):
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
                post.creator = UserProfile.objects.get(id=1)
                post.category = Category.objects.get(id=random.randint(1,9))
                post.price = random.randrange(start=150, stop=15000, step=50)
                post.title = item['title']
                post.description = item['description']
                post.image = random.choice(glob.glob(imagePath))            
                post.save()
                print(item)
        print('Posts have been loaded...')