# ECD-Online

A web based information management system for regional networking of early childhood development (ECD) services. A meteor.js project.
- for [this NGO](http://www.nag.org.za/about-us/), local to the author 

This README outlines the details of collaborating on this Meteor application.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Meteor.js](http://www.meteor.com/) 

## Installation

* Ensure that the above prerequisites are installed first.
* `git clone https://github.com/AltruisTech/ECD-Online.git`
* `cd ECD-Online`
* `meteor`

## Running / Development

* `meteor`
* Visit your app at [http://localhost:3000/](http://localhost:3000).
* To stop a running server: `Ctrl+C`

## Prototype app with video overview page : 
* [ECD-Online Prototype Dashboard page](http://app.nag.org.za/) - login required
* [Proposed new organisation work flow screen](http://app.nag.org.za/organisation/1002) - login required
* [ECD-Online Prototype Help page](http://app.nag.org.za/help)

## Logging in
For data privacy reasons, we've restricted data access to only known users at 
this time. 
If you'd like to get added to request a username, please [comment on this discussion](https://github.com/AltruisTech/ECD-Online/issues/1)

## Technology Stack:

*  [Meteor js](https://wiki.dandascalescu.com/essays/why_meteor/) - a trending, robust, well supported js stack with Blaze templating view layer.
*  MongoDB database - with defined collection schemas. And some advanced aggregation pipeline queries. 
*  routing using [iron-route](https://github.com/iron-meteor/iron-router/)
*  forms using the brilliant [meteor-autoform](https://github.com/aldeed/meteor-autoform)  
*  responsive form layouts using the outstanding [CSS Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
 
## Roadmap, in something like this order / priority:

*  Implement [user/group permissions package](https://github.com/alanning/meteor-roles) - started - early stages but under control  
*  [Offline data management](https://github.com/GroundMeteor/db) for mobile volunteers.
*  [Test runner](https://guide.meteor.com/testing.html) implementation for unit, acceptance and later load testing.
*  Interactive dashboard using d3 & dc.js  like [this one](https://anmolkoul.files.wordpress.com/2015/06/projectnew.gif) for donorschoose.org
*  Compile to Android app with [Cordova](https://guide.meteor.com/mobile.html)  
*  Reporting + dashboard with [Tableau](https://www.tableau.com/about/blog/2015/6/tableau-mongodb-visual-analytics-json-speed-thought-39557) (huge NGO discount) 

## INVITATION to collaborate:

### contrbutions requested:

* someone with good full stack web app knowledge to do an architectural and code review of the design
* someone with experience with any of the roadmap items above, particularly the offline data, Cordova and testing items, to assist with integration of those.

### What's in it for you:
* use and even master powerful, trending technolgies, with my guidance
* use your gifts and experience to make a difference in this world, to [people who really need it](https://youtu.be/44G9j91jiC8 )  
* be involved with a fun and rewarding project and a brilliant project team who are really passionate about this

### If you have good knowledge of the above tech stack are would like to contribute to this awesome project, then please get in touch by [commenting on this discussion](https://github.com/AltruisTech/ECD-Online/issues/3) Thanks!


