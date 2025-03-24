import os
from django.core.management.base import BaseCommand
from logs.models import EventLog

# class Command(BaseCommand):
#     help = "Import event logs from extracted files into the database"

#     def handle(self, *args, **kwargs):
#         events_dir = "D:/assignment/events"  # Ensure this is the correct path

#         if not os.path.exists(events_dir):
#             self.stdout.write(self.style.ERROR(f"Directory not found: {events_dir}"))
#             return

#         for filename in os.listdir(events_dir):
#             file_path = os.path.join(events_dir, filename)

#             if os.path.isfile(file_path):
#                 self.stdout.write(self.style.SUCCESS(f"Processing file: {filename}"))

#                 with open(file_path, "r") as file:
#                     for line in file:
#                         fields = line.strip().split()

#                         if len(fields) < 15:  # Checking for 15 fields
#                             self.stdout.write(self.style.WARNING(f"Skipping malformed line in {filename}: {line}"))
#                             continue

#                         # Extract fields properly
#                         serial_no = int(fields[0])
#                         version = int(fields[1])
#                         account_id = fields[2]
#                         instance_id = fields[3]
#                         src_addr = fields[4]
#                         dst_addr = fields[5]
#                         src_port = int(fields[6])
#                         dst_port = int(fields[7])
#                         protocol = int(fields[8])
#                         packets = int(fields[9])
#                         bytes = int(fields[10])
#                         start_time = int(fields[11])
#                         end_time = int(fields[12])
#                         action = fields[13]
#                         log_status = fields[14]  # Separate field now

#                         # Insert into the database
#                         EventLog.objects.create(
#                             serial_no=serial_no,
#                             version=version,
#                             account_id=account_id,
#                             instance_id=instance_id,
#                             src_addr=src_addr,
#                             dst_addr=dst_addr,
#                             src_port=src_port,
#                             dst_port=dst_port,
#                             protocol=protocol,
#                             packets=packets,
#                             bytes=bytes,
#                             start_time=start_time,
#                             end_time=end_time,
#                             action=action,
#                             log_status=log_status  # Now correctly assigned
#                         )

#                 self.stdout.write(self.style.SUCCESS(f"Finished processing: {filename}"))

#         self.stdout.write(self.style.SUCCESS("All files processed successfully."))


import os
from django.core.management.base import BaseCommand
from logs.models import EventLog

class Command(BaseCommand):
    help = 'Update file names in database based on serial_no'

    def handle(self, *args, **kwargs):
        log_folder = "D:/assignment/events"

        for filename in os.listdir(log_folder):
            file_path = os.path.join(log_folder, filename)

            with open(file_path, "r") as file:
                for line in file:
                    data = line.strip().split()  # Adjust parsing as per your logs
                    
                    if len(data) > 0:
                        serial_no =int(data[0])   # Assuming serial_no is first column

                        # Update file_name in the model
                        EventLog.objects.filter(serial_no=serial_no).update(file_name=filename)

        self.stdout.write(self.style.SUCCESS('Successfully updated file names!'))
