sfrom channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from myapp.consumers import MyConsumer

application = ProtocolTypeRouter({
    'websocket': URLRouter([
        path('ws/myendpoint/', MyConsumer.as_asgi()),
    ])
})