from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("email address"))
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    fullname = models.CharField(max_length=100)
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email", "password", "fullname"]

    objects = CustomUserManager()

    def __str__(self):
        return self.email

class Calendar(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='calendar')
    calendarName = models.CharField(max_length=100)
    
    def __str__(self):
        return self.calendarName
    
class CalendarEntry(models.Model):
    calendar = models.ForeignKey(Calendar, on_delete=models.CASCADE, related_name='entry')
    name = models.CharField(max_length=100)
    date = models.DateField()
    entry = models.CharField(max_length=100)
    
    def __str__(self):
        return f"Expense for {self.name}"