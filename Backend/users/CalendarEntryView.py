from .models import CalendarEntry
from .serializers import CalendarEntrySerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
def create_calendar_entry(request, calendar_id):
    if request.method == 'POST':
        data = {
            'calendar': calendar_id,
            'name': request.data.get('name'),
            'date': request.data.get('date'),
            'entry': request.data.get('entry')
        }

        calendar_entry_serializer = CalendarEntrySerializer(data=data)
        if calendar_entry_serializer.is_valid():
            calendar_entry_serializer.save()
            return Response(calendar_entry_serializer.data, status=status.HTTP_201_CREATED)
        return Response(calendar_entry_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])

def get_calendar_entries(request, calendar_id):
    try:
        calendar_entries = CalendarEntry.objects.filter(calendar_id=calendar_id)
        serializer = CalendarEntrySerializer(calendar_entries, many=True)
        return Response(serializer.data)
    except CalendarEntry.DoesNotExist:
        return Response({'error': 'Calendar entries not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])

def get_calendar_entry(request, entry_id):
    try:
        calendar_entry = CalendarEntry.objects.get(id=entry_id)
        serializer = CalendarEntrySerializer(calendar_entry)
        return Response(serializer.data)
    except CalendarEntry.DoesNotExist:
        return Response({'error': 'Calendar entry not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT', 'PATCH'])

def update_calendar_entry(request, pk):
    try:
        calendar_entry = CalendarEntry.objects.get(id=pk)
    except CalendarEntry.DoesNotExist:
        return Response({'error': 'Calendar entry not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        calendar_entry_serializer = CalendarEntrySerializer(calendar_entry, data=request.data)
    elif request.method == 'PATCH':
        calendar_entry_serializer = CalendarEntrySerializer(calendar_entry, data=request.data, partial=True)

    if calendar_entry_serializer.is_valid():
        calendar_entry_serializer.save()
        return Response(calendar_entry_serializer.data)
    return Response(calendar_entry_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_calendar_entry(request, pk):
    calendar_entries = CalendarEntry.objects.filter(id=pk)
    try:
        if calendar_entries.exists():
            calendar_entries.first().delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'error': 'Calendar entry not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': 'An error occurred while deleting the calendar entry'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_calendar_entries_by_calendar(request, calendar_id):
    try:
        calendar_entries = CalendarEntry.objects.filter(calendar_id=calendar_id)
        serializer = CalendarEntrySerializer(calendar_entries, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except CalendarEntry.DoesNotExist:
        return Response({'error': 'Calendar entries not found'}, status=status.HTTP_404_NOT_FOUND)