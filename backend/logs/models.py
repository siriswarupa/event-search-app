from django.db import models

# Create your models here.


class EventLog(models.Model):
    serial_no = models.IntegerField()
    version = models.IntegerField()
    account_id = models.CharField(max_length=50)
    instance_id = models.CharField(max_length=50)
    src_addr = models.GenericIPAddressField()
    dst_addr = models.GenericIPAddressField()
    src_port = models.IntegerField()
    dst_port = models.IntegerField()
    protocol = models.IntegerField()
    packets = models.IntegerField()
    bytes = models.IntegerField()
    start_time = models.BigIntegerField()
    end_time = models.BigIntegerField()
    action = models.CharField(max_length=10)
    log_status = models.CharField(max_length=10)
    file_name = models.CharField(max_length=255, null=True, db_column="filename")


    def __str__(self):
        return f"{self.src_addr} -> {self.dst_addr} ({self.action})"
