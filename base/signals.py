from django.db.models.signals import pre_save
from django.contrib.auth.models import User

"""Django includes a “signal dispatcher” which helps decoupled applications get notified when actions occur elsewhere in the framework. In a nutshell, signals allow certain senders to notify a set of receivers that some action has taken place. They’re especially useful when many pieces of code may be interested in the same events."""

# This function get called when a user is saved. Fill the username field with the user email value.
def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email  != '':
        user.username = user.email


pre_save.connect(updateUser, sender=User)