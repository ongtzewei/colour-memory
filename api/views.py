from api.models import Player
from api.serializers import PlayerSerializer, SimplePlayerSerializer
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
        return Player.objects.all().order_by('-score')[:10]
