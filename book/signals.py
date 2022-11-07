from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import *

import kss
from math import ceil

LINES = 10

@receiver(post_save, sender=Content)
def post_save_chapter(sender, **kwargs):
    chapter = kwargs['instance']

    if chapter.content_lines:
        return
    chapter.content = "".join(chapter.content.split("\n"))
    chapter.content_lines = kss.split_sentences(chapter.content)
    chapter.pages = ceil(len(chapter.content_lines) / LINES)
    chapter.book.chapters += 1

    chapter.save()
    chapter.book.save()

@receiver(post_delete, sender=Content)
def post_delete_chapter(sender, **kwargs):
    chapter = kwargs['instance']
    chapter.book.chapters -= 1
    chapter.book.save()
