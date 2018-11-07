import sys
import RSi.GPIO as GPIO

channel = sys.argv[0]
GPIO.setmode(GPIO.BOARD)
GPIO.setup(channel, GPIO.OUT)
GPIO.output(channel, GPIO.LOW)
print(True)
sys.stdout.flush()