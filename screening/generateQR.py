import pyqrcode
ENDPOINT = '/customerform'

'''
Argument INFO

siteBaseUrl:
	wheres the site

error: 
	Error level   |   % of code can be correct
		L 					7% 
		M 					15% 
		Q 					25% 			(most common choice)
		H 					30%

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
def generateQR(siteBaseUrl, error='Q', save_Location='url.svg', scale=8):
	url = pyqrcode.create(siteBaseUrl + ENDPOINT, error=error)
	url.svg(save_Location, scale=scale)


