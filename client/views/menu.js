/************************************************************
- \client\views\*.js files are to define helper functions and event handlers for the template defined with the same name (.html)
*************************************************************/


Template.menu.onCreated(function () {
  var self = this;
  self.autorun(function () {

//Set up basic DIY ScrollMagic:
// console.log(Router.current().route.getName()) ;
 
  scrollWin = function (selector) {
      $('html, body').animate({
      scrollTop: $(selector).offset().top
      }, 1200);
    }
    
    $("[href^=#]").click(function(e) {
     e.preventDefault(); // prevent the "normal" behaviour which would would add the #path suffix to the URL, so best prevented
      scrollWin ($(this).attr("href"));
      // return false; // this appears to not append the #target to href 
  });  // click(function(e)
    
goBackToList = function() {  // resets all form display session variables
            Session.get("selectedOFSId") ? Session.set("formsToDisplay", "OFSSelected") : Session.set("formsToDisplay", "OFSListed");
            Session.set("isOFSListed", true);
            // Session.set("selectedOFSId", null);
            Session.set("selectedQualityId", null);
            Session.set("selectedOFSName", null);
            Session.set("selectedOFSFacs", null);
     };

// trying GA here for want of a better place
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-55234275-4', 'auto');
  ga('send', 'pageview');      

   });  // self.autorun()
 }); // Template.menu.onCreated()

Template.menu.helpers({
  pageTitlefromRoute: function() {
// zimme:active-route : Returns true if current route's path is '/'.
    if (ActiveRoute.path('/') ) { return "Home" } ; 
    if (ActiveRoute.name('staff') ) { return "Staff" } ; 
    if (ActiveRoute.name('facility') ) { return "Facility" } ; 
    if (ActiveRoute.name('service') ) { return "Service" } ; 
    if (ActiveRoute.name('organisation') ) { return "Organisation" } ; 
    if (ActiveRoute.name('loadData') ) { return "Test data loading" } ;
    if (ActiveRoute.name('reporting') ) { return "Reporting tables" } ;
    if (ActiveRoute.name('help') ) { return "Help" } ;
  }

});

Template.menu.events({   
   "click .advanced-nav li": function(e) { 
    Session.set("formsToDisplay", "OFSListed");
    if (typeof progressBarUpdate !== 'undefined') { progressBarUpdate(1) } ;// Takes progress back to "Select from list" 
   },
});

Template.progressBar.onRendered(function () {
  // var self = this;
  // self.autorun(function () {
$('[data-toggle="tooltip"]').tooltip(); 
   // },
});

Template.progressBar.onCreated(function () {
  var self = this;
  self.autorun(function () {
progressBarUpdate = function(stepClicked) {
for (var i = 1; i <= 8; i++) {
  selector = '#prog-'+ i +'-select li'; 
  if (i <= stepClicked -2 ) {
    $(selector).addClass('visited').removeClass('active next previous');
    }
  else if (i == stepClicked -1 ) {
    $(selector).addClass('previous visited').removeClass('active next');
    }
  else if (i == stepClicked) {
    $(selector ).addClass('active').removeClass('visited next previous');
    }
  else if (i == stepClicked +1) {
    $(selector).addClass('next').removeClass('visited active previous');
    }
  if (i >= stepClicked + 2 ) {
    $(selector).removeClass('visited active next previous');
    }
  }  // for
    if (ActiveRoute.name('service') ) {  
       Meteor.setTimeout(function(){addClassesService();}, 200);
   }    else 
   if (ActiveRoute.name('facility') ) { 
       Meteor.setTimeout(function(){addClassesFacility();}, 200);
   } else if (ActiveRoute.name('organisation') )  { 
       Meteor.setTimeout(function(){addClassesOrganisation();}, 200);
   } else if (ActiveRoute.name('staff') ) { 
       Meteor.setTimeout(function(){addClassesStaff();}, 200);
   } 
}; // fn

   });  // self.autorun()
 }); // Template.menu.onCreated()

Template.progressBar.events({   
   "click #prog-1-select": function(e) { 
     if ( $('#table-cont-services').length )
       { progressBarUpdate(1);  
         scrollWin('#table-cont-services'); }
     else { goBackToList(); 
     Session.set("formsToDisplay", "OFSListed");
     progressBarUpdate(1);  // moves it back to "Select from list"     
       } // else 
   },
   "click #prog-2-select": function(e) { 
     if (Session.get("selectedOFSId")) 
       {  Session.set("formsToDisplay", "OFSSelected");
         progressBarUpdate(2);  // moves it on to "Edit Form"
       //   e.preventDefault(), // this is prevents the #path suffix being added to the URL
       //   scrollWin('#form-cont-services') ;
       }
     else { alert("You must select a service row before you can edit it");
     } // else
   },
   "click #prog-3-select": function(e) { 
    if (! ActiveRoute.path(new RegExp('service|facility'))) {
      alert("Only the service and facility pages have quality data - please choose another option");
    }
     else if (Session.get("selectedOFSId")) 
       {  Session.set("formsToDisplay", "QECDSelected");
         progressBarUpdate(3);  // moves it on to "Edit quality data"
         // scrollWin('#form-cont-services') ;
        }
     else { alert("You must select a service/facility data row before you can edit it's quality data");
     } // else
   },
   "click #prog-4-select": function(e) { 
    if (! ActiveRoute.path(new RegExp('service|organisation'))) {
      alert("Only the service and organisation pages have linked facility data - please choose another option");
    }
     else { 
        Session.set("formsToDisplay", "OFSFacSelected");
        progressBarUpdate(4);  // moves it on to "Link to facilities"
       }
    },
   "click #prog-5-select": function(e) { 
    Session.set("formsToDisplay", "OFSAddNew");
    Session.set("selectedOFSId", null);
    // Session.set("addNewOFS", true);
    AutoForm.resetForm('service1') ;
    progressBarUpdate(5);  // moves it on to 'OR "add new" form'
    // scrollWin('#form-cont-services');
   }
 });


Template.footer.events({
   "click #return-to-top a":function(e){
       e.preventDefault(), // this is prevents the #path suffix being added to the URL
      scrollWin("#advanced-nav ");
      }
  });
