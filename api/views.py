from api.models import Player
from api.serializers import PlayerSerializer, SimplePlayerSerializer
from datetime import datetime, time, timedelta
from django.utils import timezone
from rest_framework import generics


class PlayerList(generics.ListCreateAPIView):
    '''
    Retrieves the list of all players 
    '''
    queryset = Player.objects.all()
    serializer_class = SimplePlayerSerializer


class PlayerDetail(generics.RetrieveAPIView):
    '''
    Retrieves the details of a specific player
    '''
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer


class RankingList(generics.ListAPIView):
    '''
    Retrieves the list of ranked players 
    '''
    queryset = Player.objects.all()
    serializer_class = SimplePlayerSerializer
    
    def get_queryset(self):
        now = timezone.now().date()
        today_start = datetime.combine(now, time())
        today_end = datetime.combine(now+timedelta(1), time())
        return Player.objects.filter(date_created__lte=today_end, date_created__gte=today_start).order_by('-score')[:10]
