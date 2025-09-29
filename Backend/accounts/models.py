from django.db import models
from django.contrib.auth.models import AbstractUser

from .managers import UserManager


class User(AbstractUser):
    ROLE_CHOICES = (
        ("admin", "Admin"),
        ("user", "User"),
    )
    username = None
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="user")
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    
    objects = UserManager()
