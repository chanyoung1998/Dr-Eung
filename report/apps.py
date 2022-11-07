from django.apps import AppConfig
from .services import Feedback

class ReportConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'report'
    model = Feedback()

    def ready(self):
        import report.signals
