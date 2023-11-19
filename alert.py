import schedule
import time
from datetime import datetime
from plyer import notification

# Sample dataset (replace this with your actual dataset)
dataset = [
    {"event": "Potato", "year": 2023, "month": 11, "day": 22, "time": "05:19"},
    {"event": "Rice", "year": 2025, "month": 10, "day": 23, "time": "12:30"},
    {"event": "Broccoli", "year": 2023, "month": 8, "day": 11, "time": "15:4G5"},
    {"event": "Vegetables", "year": 2023, "month": 7, "day": 24, "time": "15:45"},
    {"event": "Corn", "year": 2024, "month": 4, "day": 1, "time": "15:45"},
    {"event": "Onion", "year": 2023, "month": 5, "day": 12, "time": "15:45"},
    {"event": "Seeds", "year": 2023, "month": 9, "day": 14, "time": "15:45"},
    {"event": "Seeds", "year": 2024, "month": 11, "day": 11, "time": "15:45"},
    {"event": "Orange", "year": 2023, "month": 12, "day": 20, "time": "15:45"},
    {"event": "Apple", "year": 2023, "month": 10, "day": 18, "time": "15:45"},


    # Add more events as needed
]

def send_notification(event):
    title = "Reminder"
    message = f"Expiry Alert⚠️: {event['event']} on {event['year']}-{event['month']}-{event['day']} at {event['time']}"
    notification.notify(
        title=title,
        message=message,
        app_icon=None,  # e.g. 'C:\\icon_32x32.ico'
        timeout=5,  # seconds
    )

def check_schedule():
    current_time = datetime.now().strftime("%H:%M")

    for event in dataset:
        if current_time == event["time"]:
            send_notification(event)

# Schedule the check_schedule function to run every minute
schedule.every(1).seconds.do(check_schedule)

# Keep the script running
while True:
    schedule.run_pending()
    time.sleep(5)
