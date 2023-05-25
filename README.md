# MyApp

This project was created in Node version 18.13.0

## Install Dependencies

Go to the project directory and run command "npm install"

## Build the project

Go to the project directory and run command "npm run build"

## Start the server

Go to the project directory and run command "npm start"


## API Description
POST '/vendor/apparel/add' : this api takes one apparel data in the request body and adds it into the data.json file

POST '/vendor/apparel/update' : this api takes one apparel data and updates the already existing apparel, it return error message if the apparel is not found

POST '/vendor/apparels/update' : this api takes multiple apparels data and update them all in one go, it return error message if any one apparel is not found

POST '/user/apparel/find' : this api takes an apparel configuration (i.e. quality and size) as input and finds all the apparels that match the particular configuration. And then it returns the minimum price apparel that matches with the given configuration.

* apparel data format sample : {"id":"1234","quality":"HI","base_price":123464,"size":"XXL"} 
* in quality only 'HI' | 'ME' | 'AV' are allowed
* int size only 'XXL' | 'XL' | 'M' | 'S'

##
Things that can be added to improve performance for a larger scale application : 

* The application with get slower exponentially with every increase in apparel data. To improve performance Id can be stored in different storage unit alogn with address of each apparel. 
