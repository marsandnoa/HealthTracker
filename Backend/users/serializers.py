# serializers.py
from rest_framework import serializers
from .models import CustomUser, Calendar, CalendarEntry

class CustomUserSerializerFull(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__' 
class CustomUserSerializerPartial(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'email','fullname','id')
        
class CalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calendar
        fields = '__all__' 

class CalendarEntry(serializers.ModelSerializer):
    class Meta:
        model = CalendarEntry
        fields = '__all__' 