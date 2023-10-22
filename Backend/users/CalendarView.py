from .models import Calendar
from .serializers import CalendarSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

# Create a new calendar for the currently authenticated user
@api_view(['POST'])
def create_calendar(request):
    user = request.user  # Get the authenticated user
    if request.method == 'POST':
        calendar_serializer = CalendarSerializer(data=request.data)
        if calendar_serializer.is_valid():
            calendar_serializer.save(user=user)
            return Response(calendar_serializer.data, status=status.HTTP_201_CREATED)
        return Response(calendar_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_user_calendars(request):
    user = request.user  # Get the authenticated user
    calendars = Calendar.objects.filter(user=user)
    serializer = CalendarSerializer(calendars, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_calendar(request, calendar_id):
    try:
        calendar = Calendar.objects.get(id=calendar_id)
    except Calendar.DoesNotExist:
        return Response({'error': 'Calendar not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = CalendarSerializer(calendar)
    return Response(serializer.data)


@api_view(['PUT', 'PATCH'])
def update_calendar(request, calendar_id):
    try:
        calendar = Calendar.objects.get(id=calendar_id)
    except Calendar.DoesNotExist:
        return Response({'error': 'Calendar not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        calendar_serializer = CalendarSerializer(calendar, data=request.data)
    elif request.method == 'PATCH':
        calendar_serializer = CalendarSerializer(calendar, data=request.data, partial=True)

    if calendar_serializer.is_valid():
        calendar_serializer.save()
        return Response(calendar_serializer.data)
    return Response(calendar_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])

def delete_calendar(request, calendar_id):
    try:
        calendar = Calendar.objects.get(id=calendar_id)
    except Calendar.DoesNotExist:
        return Response({'error': 'Calendar not found'}, status=status.HTTP_404_NOT_FOUND)

    calendar.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def find_all_calendars(request):
    calendars = Calendar.objects.all()
    serializer = CalendarSerializer(calendars, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def findbyuserExercise(request, user):
    try:
        calendar = Calendar.objects.get(user=user,calendarName="Exercise")
    except Calendar.DoesNotExist:
        return Response({'error': 'Calendar not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = CalendarSerializer(calendar)
    return Response(serializer.data)
@api_view(['GET'])
def findbyuserCalories(request, user):
    try:
        calendar = Calendar.objects.get(user=user,calendarName="Calories")
    except Calendar.DoesNotExist:
        return Response({'error': 'Calendar not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = CalendarSerializer(calendar)
    return Response(serializer.data)
@api_view(['GET'])
def findbyuserNotes(request, user):
    try:
        calendar = Calendar.objects.get(user=user,calendarName="Notes")
    except Calendar.DoesNotExist:
        return Response({'error': 'Calendar not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = CalendarSerializer(calendar)
    return Response(serializer.data)