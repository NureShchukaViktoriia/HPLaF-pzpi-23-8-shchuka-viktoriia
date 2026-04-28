from django.shortcuts import render, redirect, get_object_or_404
from .models import Organization, DonationCampaign
from .forms import DonationCampaignForm


def organization_list(request):
    organizations = Organization.objects.prefetch_related(
        'resources',
        'projects',
        'donation_campaigns'
    ).all()

    return render(request, 'organizations/organization_list.html', {
        'organizations': organizations
    })


def create_donation_campaign(request, organization_id):
    organization = get_object_or_404(Organization, id=organization_id)

    if request.method == 'POST':
        form = DonationCampaignForm(request.POST)
        if form.is_valid():
            donation_campaign = form.save(commit=False)
            donation_campaign.organization = organization
            donation_campaign.save()
            return redirect('organization_list')
    else:
        form = DonationCampaignForm()

    return render(request, 'organizations/donation_form.html', {
        'form': form,
        'organization': organization,
        'title': 'Створення збору пожертв'
    })


def edit_donation_campaign(request, campaign_id):
    campaign = get_object_or_404(DonationCampaign, id=campaign_id)

    if request.method == 'POST':
        form = DonationCampaignForm(request.POST, instance=campaign)
        if form.is_valid():
            form.save()
            return redirect('organization_list')
    else:
        form = DonationCampaignForm(instance=campaign)

    return render(request, 'organizations/donation_form.html', {
        'form': form,
        'organization': campaign.organization,
        'title': 'Редагування збору пожертв'
    })


def delete_donation_campaign(request, campaign_id):
    campaign = get_object_or_404(DonationCampaign, id=campaign_id)

    if request.method == 'POST':
        campaign.delete()
        return redirect('organization_list')

    return render(request, 'organizations/donation_confirm_delete.html', {
        'campaign': campaign
    })