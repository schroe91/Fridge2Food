from flask import render_template
from flask_mail import Message
from app import mail
    
def send_email(subject, sender, recipients, text_body, html_body):
   msg = Message(subject, sender=sender, recipients=recipients)
   msg.body = text_body
   msg.html = html_body
   mail.send(msg)
   return ''
    
def send_reset_email(user):
    token = user.generate_auth_token()
    print(token)
    send_email('Reset your password', sender='fridge2food@gmail.com', recipients=[user.email], text_body=render_template('reset_password.txt', user=user, token=token), html_body=render_template('reset_password.html', user=user, token=token))
    return ''