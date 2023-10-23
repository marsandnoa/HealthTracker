"""
URL configuration for HealthTrack project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from users import CustomUserView,CalendarView,CalendarEntryView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/create/', CustomUserView.create_my_CustomUser, name='create_my_CustomUser'),
    path('user/findall/', CustomUserView.get_all_my_CustomUsers, name='get_my_CustomUser'),
    path('user/findbyid/<int:CustomUser_id>/', CustomUserView.get_CustomUser_by_id, name='get_CustomUser_by_id'),
    path('user/update/<int:pk>/', CustomUserView.update_my_CustomUser, name='update_my_CustomUser'),
    path('user/delete/<int:pk>/', CustomUserView.delete_my_CustomUser, name='delete_my_CustomUser'),
    path('user/login/', CustomUserView.login_custom_user, name='login_my_CustomUser'),
    
    path('calendar/create/', CalendarView.create_calendar, name='create_calendar'),
    path('calendar/findall/', CalendarView.find_all_calendars, name='get_user_calendars'),
    path('calendar/findbyid/<int:calendar_id>/', CalendarView.get_calendar, name='get_calendar_by_id'),
    path('calendar/update/<int:calendar_id>/', CalendarView.update_calendar, name='update_calendar'),
    path('calendar/delete/<int:calendar_id>/', CalendarView.delete_calendar, name='delete_calendar'),
    path('calendar/findbyuserexercise/<int:user>/', CalendarView.findbyuserExercise, name='get_calendar_exercise_by_user'),
    path('calendar/findbyusercalories/<int:user>/', CalendarView.findbyuserCalories, name='get_calendar_calories_by_user'),
    path('calendar/findbyusernotes/<int:user>/', CalendarView.findbyuserNotes, name='get_calendar_notes_by_user'),
    
    path('calendarentry/create/<int:calendar_id>/', CalendarEntryView.create_calendar_entry, name='create_calendar_entry'),
    path('calendarentry/findbycalendar/<int:calendar_id>/', CalendarEntryView.get_calendar_entries_by_calendar, name='get_entries_by_calendar'),
    path('calendarentry/update/<int:pk>/', CalendarEntryView.update_calendar_entry, name='update_calendar_entry'),
    path('calendarentry/delete/<int:pk>/', CalendarEntryView.delete_calendar_entry, name='delete_calendar_entry'),
    
]
