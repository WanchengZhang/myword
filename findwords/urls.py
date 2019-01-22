from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^findwords$', views.findwords, name='findwords'),
	url(r'^result$', views.result, name='result'),
	url(r'^searchwords$', views.searchwords, name='searchwords'),
	url(r'^searesult$', views.searesult, name='searesult'),
]
