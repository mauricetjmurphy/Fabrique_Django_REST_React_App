# Generated by Django 3.2.4 on 2021-06-27 09:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='id',
        ),
        migrations.AlterField(
            model_name='product',
            name='product_id',
            field=models.AutoField(editable=False, primary_key=True, serialize=False),
        ),
    ]
