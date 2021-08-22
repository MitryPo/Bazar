from django.core.management.base import BaseCommand, CommandError
from bazar.models import City
from core.settings import FIXTURE_DIR


class Command(BaseCommand):

    def handle(self, *args, **options):
        path = FIXTURE_DIR+'/cities.txt'
        City.objects.all().delete()
        with open(path, 'r', encoding='utf-8') as f:
            for line in f:
                c = City()
                c.name = line.strip('\n')
                c.save()
        print('Cities have been loaded...')        