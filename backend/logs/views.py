from django.shortcuts import render

from rest_framework.response import Response
from django.http import JsonResponse
from django.db.models import Q
from logs.models import EventLog
from .serializers import EventLogSerializer
from rest_framework.decorators import api_view



# @api_view(['GET'])
# def search_logs(request):
#     query = request.GET.get("query", "")  # The search string (IP, account ID, etc.)
#     start_time = request.GET.get("start_time")
#     end_time = request.GET.get("end_time")

#     # Base Query
#     logs = EventLog.objects.all()

#     # Handle specific field-based search (e.g., dstaddr=221.181.27.227)
#     if "=" in query:
#         field, value = query.split("=", 1)
#         filter_kwargs = {f"{field}__icontains": value}
#         logs = logs.filter(**filter_kwargs)
#     elif query:
#         # General search across multiple fields
#         logs = logs.filter(
#             Q(account_id__icontains=query) |
#             Q(instance_id__icontains=query) |
#             Q(src_addr__icontains=query) |
#             Q(dst_addr__icontains=query)
#         )

#     # Filter by time range
#     if start_time and end_time:
#         logs = logs.filter(start_time__gte=start_time, end_time__lte=end_time)

#     # Convert to JSON
#     results = list(logs.values("serial_no", "account_id", "instance_id", "src_addr", "dst_addr", "start_time", "end_time", "filename"))

#     return JsonResponse({"results": results}, safe=False)



# @api_view(['GET'])
# def search_logs(request):
#     search_string = request.GET.get('query', '')
#     start_time = request.GET.get('start_time', 0)
#     end_time = request.GET.get('end_time', 9999999999)

#     logs = EventLog.objects.filter(
#         start_time__gte=start_time,
#         end_time__lte=end_time
#     )

#     if search_string:
#         logs = logs.filter(src_addr__icontains=search_string) | logs.filter(dst_addr__icontains=search_string)

#     serializer = EventLogSerializer(logs, many=True)
#     return Response(serializer.data)



# from django.db.models import Q
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from logs.models import EventLog
# from logs.serializers import EventLogSerializer

# @api_view(['GET'])
# def search_logs(request):
#     search_string = request.GET.get('query', '').strip()
#     start_time = request.GET.get('start_time', '0')
#     end_time = request.GET.get('end_time', '9999999999')

#     # Convert start_time and end_time to integers
#     try:
#         start_time = int(start_time)
#         end_time = int(end_time)
#     except ValueError:
#         return Response({"error": "Invalid time format"}, status=400)

#     # Base Query
#     logs = EventLog.objects.filter(start_time__gte=start_time, end_time__lte=end_time)

#     # Handling field-based search (e.g., dstaddr=221.181.27.227)
#     if "=" in search_string:
#         field, value = search_string.split("=", 1)
#         filter_kwargs = {f"{field}__icontains": value}
#         logs = logs.filter(**filter_kwargs)
#     elif search_string:
#         # General search for IP addresses or other values
#         logs = logs.filter(Q(src_addr__icontains=search_string) | Q(dst_addr__icontains=search_string))

#     # Serialize data and return response
#     serializer = EventLogSerializer(logs, many=True)
#     return Response(serializer.data)




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
    # logs = await asyncio.to_thread(
    #     lambda: EventLog.objects.filter(
    #         start_time__gte=start_time, end_time__lte=end_time
    #     ).filter(
    #         Q(src_addr__icontains=search_string) | Q(dst_addr__icontains=search_string)
    #     )
    # )

    # Handling field-based search (e.g., dstaddr=221.181.27.227)
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
