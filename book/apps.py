from django.apps import AppConfig
from .services import *


class BookConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'book'
    models = {
        "summerizer": ExtractiveSummarizaion(),
        "keyword_extractor": KeywordExtractor()
    }

    def ready(self):
        import book.signals
