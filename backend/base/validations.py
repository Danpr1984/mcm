from django.core.exceptions import ValidationError
from django.contrib.auth.models import User

def custom_validation(data):
    username = data['username'].strip()
    password = data['password'].strip()
    re_password = data['re_password'].strip()
    ##
    if not username or User.objects.filter(username=username).exists():
        raise ValidationError('choose another username')
    ##
    if not password or len(password) < 8:
        raise ValidationError('choose another password, min 8 characters')

    if not re_password == password:
        raise ValidationError('Passwords do not match')
    ##
    if not username:
        raise ValidationError('choose another username')
    return data


def validate_email(data):
    email = data['email'].strip()
    if not email:
        raise ValidationError('an email is needed')
    return True

def validate_username(data):
    username = data['username'].strip()
    if not username:
        raise ValidationError('choose another username')
    return True

def validate_password(data):
    password = data['password'].strip()
    if not password:
        raise ValidationError('a password is needed')
    return True
