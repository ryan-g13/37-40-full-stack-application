# Lab 37 - 39 
Author: Ryan Groesch
Version 1.3.0

# Overview
This application has a fully functional backend that allows the use of a pubcrawl application that can geolocate you and suggest a route to follow based on your price and number of stops. 

## Components
```
Provider
  App
    AuthRedirect
    Landing
      // handle login and signup
    Dashboard
      // display main app
```

* Implement a Landing route that allows a user to signup and login to the application.
* Manage the frontend routes based on the clients authorization
  * If the user is not logged in they should be forced to remain on the landing route(s)
  * If the user is logged in they should not permitted to remain on the landing route(s)

# Built with: 
## Front End 
- React 
- Redux
- HTML5, CSS3 

## Back End
- Node.js 
- Express.js
- MongoDB (Mongoose)
- GraphHopper API
- Twilio API
- Google Places API 

# Changes
6/5/2018 - skelton completed and basic form functionality
6/6/2018 - cookies for user sessions have been implemented 
6/7/2018 - Validation included for the sign-up form.