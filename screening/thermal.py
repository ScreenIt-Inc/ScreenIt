"""This example is for Raspberry Pi (Linux) only!
   It will not work on microcontrollers running CircuitPython!"""

import os
import math
import time
import copy

import busio
import board

import numpy as np
import pygame
from scipy.interpolate import griddata

from colour import Color
import pyqrcode

import adafruit_amg88xx

i2c_bus = busio.I2C(board.SCL, board.SDA)

#low range of the sensor (this will be blue on the screen)
MINTEMP = 26.

#high range of the sensor (this will be red on the screen)
MAXTEMP = 32.

#how many color values we can have
COLORDEPTH = 1024

os.putenv('SDL_FBDEV', '/dev/fb1')
pygame.init()

#initialize the sensor
sensor = adafruit_amg88xx.AMG88XX(i2c_bus)

# width, height interpolated from 8x8
interpolatedSize = 128j

displayBoxes = 120

# pylint: disable=invalid-slice-index
points = [(math.floor(ix / 8), (ix % 8)) for ix in range(0, 64)]
grid_x, grid_y = np.mgrid[0:7:interpolatedSize, 0:7:interpolatedSize]
# pylint: enable=invalid-slice-index

#sensor is an 8x8 grid so lets do a square
height = 480
width = 480

#the list of colors we can choose from
blue = Color("indigo")
colors = list(blue.range_to(Color("red"), COLORDEPTH))

#create the array of colors
colors = [(int(c.red * 255), int(c.green * 255), int(c.blue * 255)) for c in colors]

displayPixelWidth = width / displayBoxes
displayPixelHeight = height / displayBoxes

lcd = pygame.display.set_mode((width, height))

lcd.fill((255, 0, 0))

pygame.display.update()
pygame.mouse.set_visible(False)

lcd.fill((0, 0, 0))
pygame.display.update()

#some utility functions
def constrain(val, min_val, max_val):
    return min(max_val, max(min_val, val))

def map_value(x, in_min, in_max, out_min, out_max):
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min

def displayQR(temperature):
    print("HERE IS THE QR CODE")
    url_str = 'https://docs.google.com/forms/d/e/1FAIpQLSdT-DBapgWGKcHGVlQj9MGPwh2uMVD8NWoPoFuR41yXDRBD_w/viewform?usp=pp_url&entry.1891876285=33'
    url_str = url_str[:-2] + str(round(temperature, 1))
    url = pyqrcode.create(url_str, error='Q')
    url.png('url.png', scale=7)
    lcd.fill((255,255,255))
    image = pygame.image.load('./url.png')
    lcd.blit(image, (0, 0))
    pygame.display.update()
    time.sleep(20)
    if os.path.exists("url.png"):
        os.remove("url.png")
    
def displayHighTempSign():
    print("TEMPERATURE ABOVE 37 DEGREES! PLEASE CONTACT BUILDING ADMINISTRATION")
    messagePart1 = "TEMPERATURE ABOVE 37 DEGREES!"
    messagePart2 = "PLEASE CONTACT BUILDING ADMINISTRATION."
    font = pygame.font.Font('freesansbold.ttf',20)
    displayText1 = font.render(messagePart1, True, (255,255,255))
    displayTextRect1 = displayText1.get_rect()
    displayTextRect1.center = (width // 2, height // 4)
    displayText2 = font.render(messagePart2, True, (255,255,255))
    displayTextRect2 = displayText2.get_rect()
    displayTextRect2.center = (width // 2, height // 2)
    lcd.fill((255,0,0))
    lcd.blit(displayText1, displayTextRect1)
    lcd.blit(displayText2, displayTextRect2)
    pygame.display.update()
    time.sleep(15)

#let the sensor initialize
time.sleep(.1)

safeTemps = []
highTemps = []
hint = "Please get close to the sensor for 5 seconds"
font = pygame.font.Font('freesansbold.ttf',20)
displayText = font.render(hint, True, (255,0,0))
displayTextRect = displayText.get_rect()
displayTextRect.center = (width // 2, height // 10)

while True:
    
    #read the pixels
    pixels = []
    for row in sensor.pixels:
        pixels = pixels + row
    temps = copy.deepcopy(pixels)
    temps = np.reshape(temps, (-1, 8))
#    print(np.matrix(temps))
#    print()
#    print()
    time.sleep(1)
#    print(pixels)
#    print()
    pixels = [map_value(p, MINTEMP, MAXTEMP, 0, COLORDEPTH - 1) for p in pixels]
#    print(pixels)

    #perform interpolation
    bicubic = griddata(points, pixels, (grid_x, grid_y), method='cubic')
#    print(bicubic.shape)
#    rect_arr = bicubic[8:24, 8:24]
    rect_arr = bicubic[int(interpolatedSize.imag)//4:int(interpolatedSize.imag)*3//4, int(interpolatedSize.imag)//4:int(interpolatedSize.imag)*3//4]
    temp_check_rect = rect_arr.flatten()
    temp_check_rect = [map_value(pixel, 0, COLORDEPTH - 1, MINTEMP, MAXTEMP) for pixel in temp_check_rect]
    print(max(temp_check_rect))
    
    if (max(temp_check_rect) > 34 and max(temp_check_rect) <= 37):
        print("Temperature is between 34 and 37")
        safeTemps.append(max(temp_check_rect))
    elif (max(temp_check_rect) > 37):
        print("Higher than 37")
        highTemps.append(max(temp_check_rect))
    elif (max(temp_check_rect) < 32 and (len(highTemps) != 0 or len(safeTemps) != 0)):
        safeTemps = []
        highTemps = []
        
    if(len(highTemps) == 5):
        displayHighTempSign()
        highTemps = []
        safeTemps = []
    elif(len(safeTemps) == 5):
        displayQR(max(safeTemps))
        safeTemps = []
        highTemps = []
        
#    temps_rect = np.reshape(temp_check_rect, (-1, 16))
#    print(np.matrix(temps_rect))
#    print()
#    print()

    #draw everything
    for ix, row in enumerate(bicubic):
        for jx, pixel in enumerate(row):
            pygame.draw.rect(lcd, colors[constrain(int(pixel), 0, COLORDEPTH- 1)],
                             (displayPixelHeight * ix, displayPixelWidth * jx,
                              displayPixelHeight, displayPixelWidth))

    pygame.draw.rect(lcd, (255,255,0), (width//4, height//4, width//2, height//2), 5)
    
    if (max(temp_check_rect) < 32):
        print(hint)
        lcd.blit(displayText, displayTextRect)
    pygame.display.update()
