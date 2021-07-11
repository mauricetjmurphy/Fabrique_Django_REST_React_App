from base.models import Product
from csv import DictReader
from datetime import datetime

from django.core.management import BaseCommand

from base.models import Product
from pytz import UTC


DATETIME_FORMAT = '%m/%d/%Y %H:%M'


ALREDY_LOADED_ERROR_MESSAGE = """
If you need to reload the product data from the CSV file,
first delete the db.sqlite3 file to destroy the database.
Then, run `python manage.py migrate` for a new empty
database with tables"""


class Command(BaseCommand):
    # Show this when the user types help
    help = "Loads data from product_data.csv into our Product model"

    def handle(self, *args, **options):
        if  Product.objects.exists():
            print('Product data already loaded...exiting.')
            print(ALREDY_LOADED_ERROR_MESSAGE)
            return
       
        print("Loading products data for products available")
        for row in DictReader(open('./product_data.csv')):
            product = Product()
            product.product_name = row['product_name']
            product.availability = row['availability']
            product.product_category = row['product_category']
            product.brand = row['brand']
            product.color = row['color']
            product.description = row['description']
            product.gender = row['gender']
            product.size = row['size']
            product.material = row['material']
            product.retail_price = row['retail_price']
            product.product_url = row['product_url']
            product.product_image_url = row['product_image_url']
            product.additional_image_link = row['additional_image_link']
            product.createdAt = datetime.now()

            # raw_submission_date = row['submission date']
            # submission_date = UTC.localize(
            #     datetime.strptime(raw_submission_date, DATETIME_FORMAT))
            # product.submission_date = submission_date
            product.save()


      