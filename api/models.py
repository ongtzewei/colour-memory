from django.db import models
from django.utils.translation import ugettext_lazy as _

class Player(models.Model):
    name = models.CharField(max_length=32, default=_('Anonymous'))
    email = models.EmailField(max_length=254, null=True, blank=True)
    score = models.PositiveSmallIntegerField(default=0)
    date_created = models.DateTimeField(auto_now_add=True)
    class Meta:
        app_label = 'api'
        db_table = 'api_player'
        ordering = ('date_created', 'score')
        
    def __str__(self):
        return self.name