from django.db import models


class Organization(models.Model):
    name = models.CharField(max_length=200, verbose_name="Назва організації")
    description = models.TextField(verbose_name="Опис")
    founded_year = models.PositiveIntegerField(verbose_name="Рік заснування")
    volunteer_count = models.PositiveIntegerField(verbose_name="Кількість волонтерів")

    def __str__(self):
        return self.name


class Resource(models.Model):
    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name='resources',
        verbose_name="Організація"
    )
    name = models.CharField(max_length=200, verbose_name="Назва ресурсу")
    quantity = models.PositiveIntegerField(verbose_name="Кількість")
    description = models.TextField(blank=True, verbose_name="Опис")

    def __str__(self):
        return f"{self.name} ({self.organization.name})"


class Project(models.Model):
    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name='projects',
        verbose_name="Організація"
    )
    title = models.CharField(max_length=200, verbose_name="Назва проєкту")
    description = models.TextField(verbose_name="Опис")
    start_date = models.DateField(verbose_name="Дата початку")
    end_date = models.DateField(null=True, blank=True, verbose_name="Дата завершення")

    def __str__(self):
        return f"{self.title} ({self.organization.name})"

class DonationCampaign(models.Model):
    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name='donation_campaigns',
        verbose_name="Організація"
    )
    title = models.CharField(max_length=200, verbose_name="Назва збору")
    description = models.TextField(verbose_name="Опис збору")
    goal_amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цільова сума")
    collected_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name="Зібрано")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата створення")

    def __str__(self):
        return f"{self.title} ({self.organization.name})"