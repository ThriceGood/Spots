
Spots is a website for sharing skatespots directly from a users location.

It is mainly intended to be used on a mobile device. A users location is gotten using the HTML5 geolocation API and the Google Geocode API. Location based features are disabled when a user is on a desktop browser.

(As of now, location features only work with Android Firefox browser. Possibly because the site is currently not set up with https)

Its intended use is: A person out skating finds a skatespot that they wish to log for themselves or to share with others. They visit the website on their mobile browser, log in, and click the 'add spot' button in the menu. They are presented with a form to fill out with some information about the skatespot. A hidden form field is automatcially populated with the users coordinates gotten through the HTML5 geolocation API, the address field as automatically filled out with the address gotten by a query to Google's Geocode API. The user clicks save and the information along with a photo is saved to the server and can be viewed by anyone visiting the site.

The application uses a Node.js/Express backend with a MongoDB/Mongoose database setup. The frontend use HTML5, CSS and Bootstrap for style and Javascript and JQuery for the mechanical aspects of the frontend. The mapping framework used is OpenLayers4.

The application consistes of a single page with the forms displaying dynamically in modal boxes.

Here is the main page as seen from a desktop browser. From a desktop the user can only view spots and register to the site.

![alt tag](https://raw.githubusercontent.com/ThriceGood/Spots/master/readme_images/index_big.png)

When a user clicks a spot icon (skateboard) a modal appears containing the information about that skatespot.

![alt tag](https://raw.githubusercontent.com/ThriceGood/Spots/master/readme_images/info_modal_big.png)


