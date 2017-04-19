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

## Logging in
For data privacy reasons, we've restricted data access to only known users at 
this time. 
If you'd like to get added to request a username, please [comment on this discussion] (https://github.com/AltruisTech/ECD-Online/issues/1)

## Running / Development

* `meteor`
* Visit your app at [http://localhost:3000/](http://localhost:3000).
* To stop a running server: `Ctrl+C`

## Prototype app with video overview page : http://app.nag.org.za/help

## Technology Stack:

*    [Meteor js](https://wiki.dandascalescu.com/essays/why_meteor/) stack with Blaze templating view layer.
*    MongoDB database - I steered away from my original relational thinking
*    routing using [iron-route](https://github.com/iron-meteor/iron-router/)
*    forms using [meteor-autoform](https://github.com/aldeed/meteor-autoform)  
*    responsive form layouts using [CSS Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
 
## Roadmap, in something like this order / priority:

*    Implement [user/group permissions package](https://github.com/alanning/meteor-roles) - started - early stages but under control  
*    [Offline data management](https://github.com/GroundMeteor/db) for mobile volunteers.
*    [Test runner](https://guide.meteor.com/testing.html) implementation for unit, acceptance and later load testing.
*    Interactive dashboard using d3 & dc.js  like [this one](https://anmolkoul.files.wordpress.com/2015/06/projectnew.gif) for donorschoose.org
*    Compile to Android app with [Cordova](https://guide.meteor.com/mobile.html)  
*    Reporting + dashboard with [Tableau](https://www.tableau.com/about/blog/2015/6/tableau-mongodb-visual-analytics-json-speed-thought-39557) (huge NGO discount) 

## INVITATION to collaborate:

If you're able and willing to contribute to this project - either a code review or one of the above roadmap items, please [comment on this discussion](https://github.com/AltruisTech/ECD-Online/issues/3) Thanks!
