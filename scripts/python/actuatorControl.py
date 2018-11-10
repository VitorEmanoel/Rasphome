import sys
import RPi.GPIO as GPIO

channel = int(sys.argv[1])
value = int(sys.argv[2])
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(channel, GPIO.OUT)
GPIO.output(channel, value)
print("Sucess")