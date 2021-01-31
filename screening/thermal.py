import os
import math
import time
import copy

import busio
import board

import numpy as np
import pygame
import sys
from scipy.interpolate import griddata

from colour import Color
import pyqrcode

import adafruit_amg88xx

from detect_mask import FaceMaskDetector

from generateQR import generateQR

os.putenv('SDL_FBDEV', '/dev/fb1')
pygame.init()

class TemperatureScreener:
    #low range of the sensor (this will be blue on the screen)
    MINTEMP = 26.

    #high range of the sensor (this will be red on the screen)
    #assumed to be the temperature at which thermal sensor can start detecting heat from human body
    MAXTEMP = 32.

    #how many color values we can have
    COLORDEPTH = 1024
    
    # width, height interpolated from 8x8
    interpolatedSize = 128j

    displayBoxes = 120
    
    # pylint: disable=invalid-slice-index
    points = [(math.floor(ix / 8), (ix % 8)) for ix in range(0, 64)]
    grid_x, grid_y = np.mgrid[0:7:interpolatedSize, 0:7:interpolatedSize]
    # pylint: enable=invalid-slice-index
    
    windowHeight = 480
    windowWidth = 1000

    #sensor is an 8x8 grid so lets do a square
    height = 480
    width = 480
    
    FACE_DETECTOR_NAME = "face_detector"
    MASK_DETECTOR_NAME = "my_mask_detector"
    CONFIDENCE_THRESHOLD = 0.5
    
    FORM_URL = "http://2971e5d3c256.ngrok.io"
    QR_URL = "http://042aa62f6512.ngrok.io"
    
    def __init__(self):
        self.maskDetected = False
        self.font = pygame.font.Font('freesansbold.ttf',20)
        self.displayMaskText = self.font.render("Mask not detected!", True, (255,0,0))
        self.displayMaskTextRect = self.displayMaskText.get_rect()
        self.displayMaskTextRect.center = (TemperatureScreener.windowWidth * 3 // 4, TemperatureScreener.windowHeight * 1 // 4)

    #some utility functions
    def constrain(self, val, min_val, max_val):
        return min(max_val, max(min_val, val))

    def map_value(self, x, in_min, in_max, out_min, out_max):
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min

    def displayQR(self, temperature, lcd):
        url = generateQR(TemperatureScreener.FORM_URL, TemperatureScreener.QR_URL, temperature, scale=9)
        print("HERE IS THE QR CODE")
        lcd.fill((255,255,255))
        image = pygame.image.load('./url.png')
        lcd.blit(image, (0, 0))
        displayURL1 = self.font.render("Scan QR Code or Open the Link:", True, (0,0,0))
        displayURLRect1 = displayURL1.get_rect()
        displayURLRect1.center = (TemperatureScreener.windowWidth * 3 // 4, TemperatureScreener.windowHeight // 2.2)
        lcd.blit(displayURL1, displayURLRect1)
        displayURL2 = self.font.render(url, True, (0,0,0))
        displayURLRect2 = displayURL2.get_rect()
        displayURLRect2.center = (TemperatureScreener.windowWidth * 3 // 4, TemperatureScreener.windowHeight // 1.8)
        lcd.blit(displayURL2, displayURLRect2)
        pygame.display.update()
        time.sleep(20)
        if os.path.exists("url.png"):
            os.remove("url.png")
        lcd.fill((255,255,255))
        self.maskDetected = False
        self.displayMaskText = self.font.render("Mask not detected!", True, (255,0,0))
        self.displayMaskTextRect = self.displayMaskText.get_rect()
        self.displayMaskTextRect.center = (TemperatureScreener.windowWidth * 3 // 4, TemperatureScreener.windowHeight * 1 // 4)


    def main(self):
        mask_detector = FaceMaskDetector(TemperatureScreener.FACE_DETECTOR_NAME, TemperatureScreener.MASK_DETECTOR_NAME, TemperatureScreener.CONFIDENCE_THRESHOLD)
        i2c_bus = busio.I2C(board.SCL, board.SDA)

        #initialize the sensor
        sensor = adafruit_amg88xx.AMG88XX(i2c_bus)

        lcd = pygame.display.set_mode((TemperatureScreener.windowWidth, TemperatureScreener.windowHeight))

        #the list of colors we can choose from
        blue = Color("indigo")
        colors = list(blue.range_to(Color("red"), TemperatureScreener.COLORDEPTH))

        #create the array of colors
        colors = [(int(c.red * 255), int(c.green * 255), int(c.blue * 255)) for c in colors]

        displayPixelWidth = TemperatureScreener.width / TemperatureScreener.displayBoxes
        displayPixelHeight = TemperatureScreener.height / TemperatureScreener.displayBoxes

        lcd.fill((255, 0, 0))

        pygame.display.update()
        pygame.mouse.set_visible(False)

        lcd.fill((255, 255, 255))
        pygame.display.update()

        calTemps = []
        hint = "Please get close to the sensor for 5 seconds"
        displayHint = self.font.render(hint, True, (255,0,0))
        displayHintRect = displayHint.get_rect()
        displayHintRect.center = (TemperatureScreener.windowWidth * 3 // 4, TemperatureScreener.windowHeight // 2)
        
        
        #let the sensor initialize
        time.sleep(.1)
        
        while True:
        
            #read the pixels
            pixels = []
            for row in sensor.pixels:
                pixels = pixels + row
            #temps = copy.deepcopy(pixels)
            #temps = np.reshape(temps, (-1, 8))
        #    print(np.matrix(temps))
        #    print()
        #    print()
            time.sleep(1)
        #    print(pixels)
        #    print()
            pixels = [self.map_value(p, TemperatureScreener.MINTEMP, TemperatureScreener.MAXTEMP, 0, TemperatureScreener.COLORDEPTH - 1) for p in pixels]
            
        #    print(pixels)

            #perform interpolation
            bicubic = griddata(TemperatureScreener.points, pixels, (TemperatureScreener.grid_x, TemperatureScreener.grid_y), method='cubic')
        #    print(bicubic.shape)
        #    rect_arr = bicubic[8:24, 8:24]
            
            if self.maskDetected:
                rect_arr = bicubic[int(TemperatureScreener.interpolatedSize.imag)//4:int(TemperatureScreener.interpolatedSize.imag)*3//4, int(TemperatureScreener.interpolatedSize.imag)//4:int(TemperatureScreener.interpolatedSize.imag)*3//4]
                temp_check_rect = rect_arr.flatten()
                print(temp_check_rect)
                temp_check_rect = [self.map_value(pixel, 0, TemperatureScreener.COLORDEPTH - 1, TemperatureScreener.MINTEMP, TemperatureScreener.MAXTEMP) for pixel in temp_check_rect]
                
                print(max(temp_check_rect))
                
                if (max(temp_check_rect) > 32):
                    print("Temperature Added")
                    calTemps.append(max(temp_check_rect))
                elif (max(temp_check_rect) < 32 and len(calTemps) != 0):
                    calTemps = []
                    
                if(len(calTemps) >= 5):
                    self.displayQR(round(max(calTemps),1), lcd)
                    calTemps = []
                    
                
        #    temps_rect = np.reshape(temp_check_rect, (-1, 16))
        #    print(np.matrix(temps_rect))
        #    print()
        #    print()

            #draw everything
            for ix, row in enumerate(bicubic):
                for jx, pixel in enumerate(row):
                    pygame.draw.rect(lcd, colors[self.constrain(int(pixel), 0, TemperatureScreener.COLORDEPTH- 1)],
                                     (displayPixelHeight * ix, displayPixelWidth * jx,
                                      displayPixelHeight, displayPixelWidth))

            if self.maskDetected:
                pygame.draw.rect(lcd, (255,255,0), (TemperatureScreener.width//4, TemperatureScreener.height//4, TemperatureScreener.width//2, TemperatureScreener.height//2), 5)
            
            if (self.maskDetected and max(temp_check_rect) < 32):
                print(hint)
                lcd.blit(displayHint, displayHintRect)
                
            lcd.blit(self.displayMaskText, self.displayMaskTextRect)
            pygame.display.update()
            
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    pygame.display.quit()
                    sys.exit()
            
            if not self.maskDetected:
                maskHint1 = self.font.render("Wear a mask and look into", True, (255,0,0))
                displayMaskHint1 = maskHint1.get_rect()
                displayMaskHint1.center = (TemperatureScreener.windowWidth * 3 // 4, TemperatureScreener.windowHeight // 2)
                lcd.blit(maskHint1, displayMaskHint1)
                maskHint2 = self.font.render("the camera for 5 seconds", True, (255,0,0))
                displayMaskHint2 = maskHint2.get_rect()
                displayMaskHint2.center = (TemperatureScreener.windowWidth * 3 // 4, TemperatureScreener.windowHeight // 1.8)
                lcd.blit(maskHint2, displayMaskHint2)
                pygame.display.update()
                self.maskDetected = mask_detector.start_detection()
                lcd.fill((255,255,255))
                self.displayMaskText = self.font.render("Mask detected!", True, (0,128,0))
                self.displayMaskTextRect = self.displayMaskText.get_rect()
                self.displayMaskTextRect.center = (TemperatureScreener.windowWidth * 3 // 4, TemperatureScreener.windowHeight * 1 // 4)
                lcd.blit(self.displayMaskText, self.displayMaskTextRect)
                pygame.display.update()
        
    
if __name__ == "__main__":
    TemperatureScreener().main()
