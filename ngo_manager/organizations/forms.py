from django import forms
from .models import DonationCampaign


class DonationCampaignForm(forms.ModelForm):
    class Meta:
        model = DonationCampaign
        fields = ['title', 'description', 'goal_amount', 'collected_amount']
        labels = {
            'title': 'Назва збору',
            'description': 'Опис збору',
            'goal_amount': 'Цільова сума',
            'collected_amount': 'Зібрана сума',
        }