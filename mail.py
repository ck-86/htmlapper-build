#!/usr/bin/python

import smtplib
import base64
import sys


filename = sys.argv[1]
sendto = sys.argv[2]

# Read a file and encode it into base64 format
fo = open(filename, "rb")
filecontent = fo.read()
encodedcontent = base64.b64encode(filecontent)  # base64

sender = 'webmaster@tutorialpoint.com'
reciever = 'amrood.admin@gmail.com'

marker = "AUNIQUEMARKER"

body ="""
Download Your Apk from the attachment.
"""
# Define the main headers.
part1 = """From: Team HTMLApper <me@fromdomain.net>
To: <"""+sendto+""">
Subject: Your Apk attachement
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary=%s
--%s
""" % (marker, marker)

# Define the message action
part2 = """Content-Type: text/plain
Content-Transfer-Encoding:8bit

%s
--%s
""" % (body,marker)

# Define the attachment section
part3 = """Content-Type: multipart/mixed; name=\"%s\"
Content-Transfer-Encoding:base64
Content-Disposition: attachment; filename=%s

%s
--%s--
""" %(filename, filename, encodedcontent, marker)
msg = part1 + part2 + part3

server = smtplib.SMTP('smtp.gmail.com', 587)
server.ehlo()
server.starttls()
server.ehlo()
#Next, log in to the server
server.login("htmlapper", "vee91rajgoogle")

#Send the mail
server.sendmail("htmlapper@gmail.com", sendto, msg)