from api.models import Player
from datetime import datetime, time, timedelta
from django.utils import timezone
from rest_framework import serializers


class SimplePlayerSerializer(serializers.HyperlinkedModelSerializer):
    position = serializers.SerializerMethodField()
    class Meta:
        model = Player
        fields = ('position', 'name', 'score',)
    
    def get_position(self, obj):
        now = timezone.now().date()
        today_start = datetime.combine(now, time())
        today_end = datetime.combine(now+timedelta(1), time())
        queryset = Player.objects.filter(date_created__lte=today_end, date_created__gte=today_start).order_by('-score')
        return list(queryset.values_list('id', flat=True)).index(obj.id)


class PlayerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Player
        fields = ('name', 'score', 'email')
