
Spots is a website for sharing skatespots directly from a users location.
-------------------------------------------------------------------------

It is mainly intended to be used on a mobile device. A users location is gotten using the HTML5 geolocation API and the Google Geocode API. Location based features are disabled when a user is on a desktop browser.

Currently live [here](http://207.154.240.240:3000)

Its intended use is: A person out skating finds a skatespot that they wish to log for themselves or to share with others. They visit the website on their mobile browser, log in, and click the 'add spot' button in the menu. They are presented with a form to fill out with some information about the skatespot. A hidden form field is automatcially populated with the users coordinates gotten through the HTML5 geolocation API, the address field is automatically filled out with the address gotten by a query to Google's Geocode API. The user clicks save and the information along with a photo is saved to the server and can be viewed by anyone visiting the site.

The application uses a Node.js/Express backend with a MongoDB/Mongoose database setup. The frontend use HTML5, CSS and Bootstrap for style and Javascript and JQuery for the mechanical aspects of the frontend. The mapping framework used is OpenLayers4.

The application consistes of a single page with the forms displaying dynamically in modal boxes.

Here is the main page as seen from a desktop browser. From a desktop the user can only view spots and register to the site.

![alt tag](https://raw.githubusercontent.com/ThriceGood/Spots/master/readme_images/index_big.png)

When a user clicks a spot icon (skateboard) a modal appears containing the information about that skatespot.

![alt tag](https://raw.githubusercontent.com/ThriceGood/Spots/master/readme_images/info_modal_big.png)

The main intent of this application is to be used on a mobile device so the rest of the images will be from the point of view of a mobile device.

![alt tag](https://raw.githubusercontent.com/ThriceGood/Spots/master/readme_images/index_small.png)

![alt tag](https://raw.githubusercontent.com/ThriceGood/Spots/master/readme_images/info_modal_small.png)

The resposive menu.

![alt tag](https://raw.githubusercontent.com/ThriceGood/Spots/master/readme_images/open_menu_small.png)

The registration form.

![alt tag](https://raw.githubusercontent.com/ThriceGood/Spots/master/readme_images/open_reg_form_small.png)

When a user types a username in an AJAX request is made to the server to find out if it is unique. If not the user is notified and the form submission is disabled.

![alt tag](https://raw.githubusercontent.com/ThriceGood/Spots/master/readme_images/name_check_small.png)

When a unique username is entered form submission is enabled. There is also basic HTML5 form validation on each form element.

![alt tag](https://raw.githubusercontent.com/ThriceGood/Spots/master/readme_images/name_correct_small.png)

After a user registers they are automatically signed in. They now have access to the location features 'find me' and 'add spot'

![alt tag](https://raw.githubusercontent.com/ThriceGood/Spots/master/readme_images/location_features_small.png)

After a user logs in the map is centered on the location they selected from the registration form. This is after a dublin user has signed in. The default map location is Vienna.

![alt tag](https://raw.githubusercontent.com/ThriceGood/Spots/master/readme_images/dublin_user.png)

When a user taps 'find me' their location is gotten from the geolocation API and the maps zooms to that location. An icon displays the users current location. In testing I found that the accuracy of the geolocation API can vary between 10 - 50 meters, but is most of the time pretty close.

![alt tag](https://raw.githubusercontent.com/ThriceGood/Spots/master/readme_images/find_me_small.png)

When a user finds a skatespot they wish to save they can tap 'add spot'. A form is presented to them with the address auto filled. The address is gotten with an AJAX query to Google's Geocode API using the coordinates gotten from the HTML5 geolocation API. These coordinates are added to a hidden form field so they can be saved to the database. Every field is manditory including the photo field.

![alt tag](https://raw.githubusercontent.com/ThriceGood/Spots/master/readme_images/add_spot_small.png)

After they save the spot it will appear on the main map and its information can be viewed by everybody.

![alt tag](https://raw.githubusercontent.com/ThriceGood/Spots/master/readme_images/after_spot_add_small.png)

There is also an about page to explain how to use the application.

![alt tag](https://raw.githubusercontent.com/ThriceGood/Spots/master/readme_images/about_page_small.png)









