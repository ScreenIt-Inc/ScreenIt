import pyqrcode
import requests
import pygame
from pyshorteners import Shortener
import os
from dotenv import load_dotenv

load_dotenv()

FORM_ENDPOINT = '/customerform'
UUID_ENDPOINT = '/api/form/opennewformuuid'

'''
Argument INFO

siteBaseUrl:
    wheres the site

error:
    Error level   |   % of code can be corrected
        L                   7%
        M                   15%
        Q                   25%             (most common choice)
        H                   30%

    increasing level increases image required resolution

save_Location:
    image save location

scale:
    The scale parameter sets how large to draw a single module.
    By default one point (1/72 inch) is used to draw a single module.
    This may make the code to small to be read efficiently.
    Increasing the scale will make the code larger.
    This method will accept fractional scales (e.g. 2.5).
'''
#saves to url
def generateQR(formBaseUrl, qrBaseUrl, temp, short_url=True, error='Q', save_Location='url.png', scale=8):
    r = requests.get(url=qrBaseUrl+UUID_ENDPOINT+'/'+str(temp))
    uuid_data = r.json()
    if uuid_data['success']:
        url_str = formBaseUrl + FORM_ENDPOINT + '/' + uuid_data['data']['uuid']
        url = pyqrcode.create(url_str, error=error)
        url.png(save_Location, scale=scale)
        if short_url:
            url_shortener = Shortener(api_key=os.getenv("BITLY_ACCESS_TOKEN"))
            url_str = url_shortener.bitly.short(url_str)
            print ("Short URL is {}".format(url_str))
    return url_str

# For testing purposes
#if __name__ == "__main__":
#    generateQR("http://2738ad1858f0.ngrok.io", "http://e93d15c57bec.ngrok.io", 35, short_url=False) # Keep short_url false for testing. Bit.ly only provides limited free short URLs.