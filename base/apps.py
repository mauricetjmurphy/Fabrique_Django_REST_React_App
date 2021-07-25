from django.apps import AppConfig


class BaseConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'base'

    # Configuring the app to be aware if the signals function
    def ready(self):
        import base.signals
