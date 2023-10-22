# Generated by Django 4.2.5 on 2023-10-22 23:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_budget_effectiveinterestrate'),
    ]

    operations = [
        migrations.CreateModel(
            name='Calendar',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('calendarName', models.CharField(max_length=100)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='calendar', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='CalendarEntry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('date', models.DateField()),
                ('entry', models.CharField(max_length=100)),
                ('calendar', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='entry', to='users.calendar')),
            ],
        ),
        migrations.RemoveField(
            model_name='budgetentry',
            name='budget',
        ),
        migrations.DeleteModel(
            name='Budget',
        ),
        migrations.DeleteModel(
            name='BudgetEntry',
        ),
    ]