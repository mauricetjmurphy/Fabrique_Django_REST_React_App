# Generated by Django 3.1.4 on 2021-08-14 19:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_auto_20210811_1137'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='numReviews',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='rating',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True),
        ),
    ]
