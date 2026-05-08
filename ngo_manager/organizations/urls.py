from django.urls import path
from .views import (
    organization_list,
    create_donation_campaign,
    edit_donation_campaign,
    delete_donation_campaign
)

urlpatterns = [
    path('', organization_list, name='organization_list'),

    path(
        'organization/<int:organization_id>/donation/create/',
        create_donation_campaign,
        name='create_donation_campaign'
    ),

    path(
        'donation/<int:campaign_id>/edit/',
        edit_donation_campaign,
        name='edit_donation_campaign'
    ),

    path(
        'donation/<int:campaign_id>/delete/',
        delete_donation_campaign,
        name='delete_donation_campaign'
    ),
]