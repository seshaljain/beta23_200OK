# Generated by Django 3.2.16 on 2022-12-03 09:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0006_auto_20221203_1232'),
        ('ridesharing', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ride',
            name='user',
        ),
        migrations.AddField(
            model_name='ride',
            name='student',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='user.student'),
        ),
    ]
