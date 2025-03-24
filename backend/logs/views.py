from django.shortcuts import render

from rest_framework.response import Response
from django.http import JsonResponse
from django.db.models import Q
from logs.models import EventLog
from .serializers import EventLogSerializer
from rest_framework.decorators import api_view


from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from logs.models import EventLog
from logs.serializers import EventLogSerializer
import time
# import asyncio

@api_view(['GET'])
def search_logs(request):
    search_string = request.GET.get('query', '').strip()
    start_time = request.GET.get('start_time', '0')
    end_time = request.GET.get('end_time', '9999999999')

    # Convert start_time and end_time to integers
    try:
        start_time = int(start_time)
        end_time = int(end_time)
    except ValueError:
        return Response({"error": "Invalid time format"}, status=400)

    search_start = time.time()
    # Base Query
    logs = EventLog.objects.filter(start_time__gte=start_time, end_time__lte=end_time)

    if "=" in search_string:
        field, value = search_string.split("=", 1)
        filter_kwargs = {f"{field}__icontains": value}
        logs = logs.filter(**filter_kwargs)
    elif search_string:
        # General search for IP addresses or other values
        logs = logs.filter(Q(src_addr__icontains=search_string) | Q(dst_addr__icontains=search_string))

    search_time = round(time.time() - search_start, 4)
    log_status = "Found" if logs.exists() else "No logs found"
    # Serialize data and return response
    serializer = EventLogSerializer(logs, many=True)
    return Response({
        "search_time": search_time,
        "log_status": log_status,
        "results": serializer.data})  # ✅ Wrap in a "results" key
