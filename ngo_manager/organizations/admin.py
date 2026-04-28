from django.contrib import admin
from .models import Organization, Resource, Project, DonationCampaign


admin.site.register(Organization)
admin.site.register(Resource)
admin.site.register(Project)
admin.site.register(DonationCampaign)