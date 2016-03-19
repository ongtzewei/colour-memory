from api import views
from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^ranking/$', views.RankingList.as_view(), name='ranking-list'),
    url(r'^players/$', views.PlayerList.as_view(), name='player-list'),
    url(r'^players/(?P<pk>[-\w]+)$', views.PlayerDetail.as_view(), name='player-detail'),
    url(r'^', include('rest_framework.urls', namespace='rest_framework'))
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

