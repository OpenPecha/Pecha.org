import os
import smtplib
import logging
import time
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import sys
from bson import ObjectId

# Add the project root to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import settings first
from sefaria.settings import *

# Now we can import db which uses settings
from sefaria.system.database import db

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler("reminder_logs.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# SMTP configuration
SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = os.getenv("SMTP_PORT")
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
SENDER_EMAIL = os.getenv("SENDER_EMAIL")

print(SMTP_SERVER, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SENDER_EMAIL)

def get_plan_title(plan_id):
    """Get plan title from plans collection using plan_id"""
    try:
        # Convert string plan_id to ObjectId if needed
        if isinstance(plan_id, str):
            plan_id = ObjectId(plan_id)
            
        plan = db['plans'].find_one({"_id": plan_id})
        return plan.get('title', 'Unknown Plan') if plan else 'Unknown Plan'
    except Exception as e:
        logger.error(f"Error getting plan title: {e}")
        return 'Unknown Plan'

def send_reminder_email(user_plan):
    """Send reminder email for a specific plan"""
    try:
        # Get plan title from plans collection
        plan_id = user_plan.get('plan_id')
        if not plan_id:
            logger.error(f"No plan_id found in user_plan: {user_plan}")
            return
            
        plan_title = get_plan_title(plan_id)
        
        # Get user email from user_plan
        user_email = user_plan.get('user_email')
        if not user_email:
            logger.error(f"No user_email found in user_plan: {user_plan}")
            return
        
        # Create message
        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = user_email
        msg['Subject'] = "Your Daily Pecha Plan Reminder"
        
        # Calculate progress
        progress = user_plan.get('progress', {})
        total_days = progress.get('total_days', 0)
        days_completed = progress.get('days_completed', 0)
        days_remaining = progress.get('days_remaining', 0)
        completion_percentage = progress.get('completion_percentage', 0)
        
        body = f"""
        Hello!

        Here's your daily reminder about your Pecha plan progress:

        Plan: {plan_title}
        Days Completed: {days_completed}
        Days Remaining: {days_remaining}
        Completion: {completion_percentage:.1f}%

        Keep up the good work!
        """
            
        msg.attach(MIMEText(body, 'plain'))

        # Send email
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        text = msg.as_string()
        server.sendmail(SENDER_EMAIL, user_email, text)
        server.quit()
        
        logger.info(f"Reminder sent successfully to {user_email} for plan {plan_title}")
    except Exception as e:
        logger.error(f"Error sending reminder: {e}")
        logger.error(f"SMTP Settings: Server={SMTP_SERVER}, Port={SMTP_PORT}, User={SMTP_USER}")

def check_and_send_reminders():
    """Check for plans that need reminders and send them"""
    try:
        current_time = datetime.now().strftime("%H:%M")
        logger.info(f"Checking for reminders at {current_time}")

        # Find all incomplete plans where reminder time matches current time
        plans = db['user_plans'].find({
            "is_completed": False,
            "settings.notification_enabled": True,
            "settings.reminder_time": current_time
        })

        plans_found = False
        for plan in plans:
            plans_found = True
            send_reminder_email(plan)

        if not plans_found:
            logger.info(f"No plans found with reminder time {current_time}")

    except Exception as e:
        logger.error(f"Error checking reminders: {e}")

def main():
    """Main function to run reminder service"""
    logger.info("Starting reminder service...")
    
    while True:
        check_and_send_reminders()
        # Wait for 60 seconds before checking again
        time.sleep(60)

if __name__ == "__main__":
    main()