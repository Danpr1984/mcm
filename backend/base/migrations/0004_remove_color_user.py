# Generated by Django 4.2.6 on 2023-11-20 17:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_alter_assignedsong_user_delete_userprofile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='color',
            name='user',
        ),
    ]
