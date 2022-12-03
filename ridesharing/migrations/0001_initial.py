# Generated by Django 3.2.16 on 2022-12-03 04:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Ride',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('has_vehicle', models.BooleanField(default=False)),
                ('vehicle_type', models.CharField(blank=True, max_length=100)),
                ('finished', models.BooleanField(default=False)),
                ('start_time', models.DateTimeField(null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]