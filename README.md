# Easy Help Screens Alloy Widget [![Appcelerator Titanium](http://www-static.appcelerator.com/badges/titanium-git-badge-sq.png)](http://appcelerator.com/titanium/) [![Appcelerator Alloy](http://www-static.appcelerator.com/badges/alloy-git-badge-sq.png)](http://appcelerator.com/alloy/)

This is a an example project for Easy Help Screens Widget for [Alloy](http://projects.appcelerator.com/alloy/docs/Alloy-bootstrap/index.html) MVC framework of [Appcelerator](http://www.appcelerator.com)'s [Titanium](http://www.appcelerator.com/platform) platform.

## Purpose
To provide easy, drag and drop solution for creating help screens and support options for your Titanium Alloy app.

## TL; DR

To see the preview of the widget import this project into Titanium Studio and run the project on Android/iOS simulator. That should give you an idea how it works and looks like. 

Or have a look at the screenshots below:

<img src="https://github.com/jakubgg/Easy-Help-Screens-Alloy-Widget/raw/master/readme_images/EasyHelpScreen-iPhone01.jpeg" width="240px">
<img src="https://github.com/jakubgg/Easy-Help-Screens-Alloy-Widget/raw/master/readme_images/EasyHelpScreen-iPhone02.jpeg" width="240px">
<img src="https://github.com/jakubgg/Easy-Help-Screens-Alloy-Widget/raw/master/readme_images/EasyHelpScreen-iPhone03.jpeg" width="240px">

<img src="https://github.com/jakubgg/Easy-Help-Screens-Alloy-Widget/raw/master/readme_images/EasyHelpScreen-Android01.jpeg" width="240px">
<img src="https://github.com/jakubgg/Easy-Help-Screens-Alloy-Widget/raw/master/readme_images/EasyHelpScreen-Android02.jpeg" width="240px">
<img src="https://github.com/jakubgg/Easy-Help-Screens-Alloy-Widget/raw/master/readme_images/EasyHelpScreen-iPad01.jpeg" width="240px">

## Usage [![gitTio](http://gitt.io/badge.png)](http://gitt.io/component/com.codelens.easyhelpscreens)

### Get it from GitTio
You can get it from [gitTio](http://gitt.io/) using [gitTio CLI](http://gitt.io/cli):

`$ gittio install com.codelens.easyhelpscreens`

### Get it from Github

Grab the `com.codelens.easyhelpscreens` widget from the `widgets` folder and drop it in your `app/widgets/` folder.

In your `app/config.json` add:

    "dependencies": {
        "com.codelens.easyhelpscreens": "1.0"
    }

In your `view` add following line to import the widget:

    <Widget src="com.codelens.easyhelpscreens" id="hlpScr"/>

Ideally create separate view called for example `helpScreens.xml` and devote it to the help screens entirely:

`View:`

    <Alloy>
        <Window id="helpScreen" title="Help Menu" exitOnClose="true">
            <Widget src="com.codelens.easyhelpscreens" id="hlpScr"/>
        </Window>
    </Alloy>
    
    
But feel free to experiment.

Once the view opens widget should initialse automatically.

Once it initialise you can play around with it.

## Options

It is a best practise not to leave any rubbish behind. So you can add into your controller following lines (id's assume that you used the view code above): 


    function closeListener (e) {
        $.hlpScr.helpMenu.releaseMenu();
        $.helpScreen.removeEventListener('close',closeListener);
    }
    $.helpScreen.addEventListener('close',closeListener);
    
This should release all resources taken by the widget after closing its view.

## Adding screens and editing items

### Screens
At the moment widget detects iPhone, iPad and Android and you can have help screens in these three categories.

Screens are located in `com.codelens.easyhelpscreens/assets/helpScreens/` then they are divided into `ios` and `android`. `ios` is further divided into `iphone` and `ipad`.

Just drag and drop your help screens into appropriate folders.

### Items
You can have multiple items and each item is a sort of a button that can have multiple help screens.

The structure of the help items and screens attached to them is located in `com.codelens.easyhelpscreens/lib/screens.js`

It looks more or less like this:

    'ios': {
        'iphone' : {
            'imagePath' : '/helpScreens/ios/iphone/',
            'items' : [
                {
                    'screenName' : '1st item iPhone',
                    'images' : [
                        'helpScreens-iphone1.jpg',
                        'helpScreens-iphone2.jpg'
                    ]
                }
            ]
        },
        'ipad' : {
            'imagePath' : '/helpScreens/ios/ipad/',
            'items' : [
                {
                    'screenName' : '1st item iPad',
                    'images' : [
                        'helpScreens-ipad1.jpg',
                        'helpScreens-ipad2.jpg'
                    ]
                }
            },
        'support' : {
            'website' : 'http://code-lens.com',
            'email' :   'support@code-lens.com'
            }
    }

`ios` - this is one of two main categories (`ios` & `android`)

`iphone` - one of two `ios` subcategories (`iphone` & `ipad)

`imagePath` - is the path to the help screens for a given platform/device

`items` - is an array of help items that will be shown on the main help screen

`screenName` - the name of the help item that will be rendered on the screen

`images` - an array of image names that are attached to that `screenName`

To add a new help item use this template:

    {
        'screenName' : 'Put Name Here',
        'images' : [
            'put-the-name-of-the-image-here'
        ]
    }

**Remember** about commas after each object and array item, but last. 

**Tip:** In theory each help item can have unlimited images attached to it, but in practice each image takes time to load and takes some memory. If you attach to many of them older devices might  burst into flames or slow down a bit (not sure which one). 

### Support items

The following lines are support items: 

    'support' : {
            'website' : 'http://code-lens.com',
            'email' :   'support@code-lens.com'
        }
    
 

Support items allow you to add your support website and support email to the help screen. So when the user click one of those items it will open the website in the browser or bring up email editing screen. 

You can have separate support items for `ios` and `android`. 

If you do not want to output support items just change them to `null`:

    'support' : {
            'website' : null,
            'email' :   null
        }
        
### Support items names and email
ATM support items names are located in `widget.js` at lines `78` abd `84`, at some point will move it to the configuration file. 

Email subject and `Type your message here...` are located in `widget.js` at lines `178` and `183`. Look comment above. 

## ToDo

* Move support items names to the config file
* Move email subject and text to the config file

## Changelog

- 1.0.1 Added Support info to the email body
- 1.0 Initial release

# Author
Jakub Gadkowski

If you have any questions please feel free to contact me:

twitter @jakubga, 

github https://github.com/jakubgg

# Licence
The MIT License (MIT)

Copyright (c) 2014 Jakub Gadkowski

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.



----------------------------------
Stuff our legal folk make us say:

Appcelerator, Appcelerator Titanium and associated marks and logos are 
trademarks of Appcelerator, Inc. 

Titanium is Copyright (c) 2008-2013 by Appcelerator, Inc. All Rights Reserved.

Titanium is licensed under the Apache Public License (Version 2). Please
see the LICENSE file for the full license.