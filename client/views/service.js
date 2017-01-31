
/************************************************************
- \client\views\*.js files are to define helper functions and event handlers for the template deffined with the same name (.html)
*************************************************************/
  
// create an object Schema in which to store all of our app's schemas.
Template.registerHelper("Collections", Collections);
// Template.registerHelper("Schemas", Schemas);

Template.service.onCreated(function () {
  var self = this;
  self.autorun(function () {
    Session.set("formsToDisplay", "OFSListed");
    AutoForm.resetForm('service1') ;
    AutoForm.resetForm('service4') ;  


  addClassesService = function () {
  console.log('ran: addClassesService');
    // console.log('submitClass helper');
     // class parent form .panel for checkboxes differently
    $(" .panel-title").text(function(index,text){
        return text.replace('Aged','').replace('to',' to ').replace('months',' months').replace('years',' years');
    });  // puts the spaces back into 0to18months etc.
    $(" .panel-heading:contains('External')"   ).addClass("panel-title"  ); 
    // add fa icons to each panel title > i based on the text:
    $(" .panel-title:contains('Service quality')" ).parent().parent().addClass('checkbox-form'); 
    // $( ".panel-title:contains('Funding')" ).prepend($('<i> </i>').addClass("fa fa-usd")); 
    // add fa icons to each panel title > i based on the text:
    $(" .panel-title" ).prepend("<i> </i>");
    $(" .panel-title:contains('Main details') i"         ).addClass("fa fa-info-circle"       ); 
    $(" .panel-title:contains('Registration') i"         ).addClass("fa fa-registered" ); 
    $(" .panel-title:contains('Service quality') i"      ).addClass("fa fa-thumbs-up"         ); 
    $(" .panel-title:contains('Funding') i"              ).addClass("fa fa-usd"               ); 
    $(" .panel-title:contains('Subsidies') i"            ).addClass("fa fa-gift"              ); 
    $(" .panel-title:contains('Top donors') i"           ).addClass("fa fa-heart"             ); 
    $(" .panel-title:contains('External funders') i"     ).addClass("fa fa-sign-in"           ); 
    $(" .panel-title:contains('Nutrition') i"            ).addClass("fa fa-cutlery"           ); 
    $(" .panel-title:contains('Stimulation') i"          ).addClass("fa fa-coffee"            ); 
    $(" .panel-title:contains('Service quality') i"      ).addClass("fa fa-thumbs-up"         ); 

    // $(" .panel-title:contains('Main details') i"         ).addClass("fa fa-info-circle"       ); 
    $(" .panel-title:contains('Qualifications') i"       ).addClass("fa fa-graduation-cap"    ); 
    $(" .panel-title:contains('Other details') i"        ).addClass("fa fa-plus-circle"       ); 
    $(" .panel-title:contains('0 to 18 months') i"          ).addClass("fa fa-universal-access"  ); 
    $(" .panel-title:contains('19 to 35 months') i"         ).addClass("fa fa-linux"             ); 
    $(" .panel-title:contains('3 to 4 years') i"            ).addClass("fa fa-child"             ); 
    $(" .panel-title:contains('4 to 5 years') i"            ).addClass("fa fa-fort-awesome"      ); 
    $(" .panel-title:contains('5 to 6 years') i"            ).addClass("fa fa-bicycle"           ); 
    $(" .panel-title:contains('After school') i"         ).addClass("fa fa-leanpub"           ); 
    $(" .panel-title:contains('Min ') i"              ).addClass("fa fa-medium"            ); 
    // $(" .panel-title:contains('Min ')"           ).text('Min & Max'); 
 
    $(" #sbg-table .ageGroup:contains('Category Totals')" ).parent().addClass('table-totals-row');
    $(" #sbg-table .total" ).addClass('table-totals-row'); 

    $( ".form-inline").removeClass('form-group') ; 
   } // fn addClassesService
  });   // self.autorun
 });  // Template.service.onCreated

Template.service.helpers({

    isOFSListed: () => Session.equals("formsToDisplay", "OFSListed"),
    isOFSSelected: () => Session.equals("formsToDisplay", "OFSSelected") | Session.equals("formsToDisplay", "OFSAddNew"),
    isQECDSelected: () => Session.equals("formsToDisplay", "QECDSelected"),
    isOFSFacSelected: () => Session.equals("formsToDisplay", "OFSFacSelected"),

    settingsOFSTable: function() {
        return {
            collection: Collections.Service,
            showFilter: true,

           fields: [
    { key: 'mainDetails.serviceID', label: 'Service Identifier' },
    { key: 'mainDetails.servName', label: 'Name of Service:' },
    { key: 'mainDetails.servType', label: 'Type of Service:' },
    { key: 'registration.servProgRegStats', label: 'DSD Programe Registration Status' },
    { key: 'registration.servDoERegStatus', label: 'ServDoERegStatus' }
           // , { key: '_id', label: 'Action', sortByValue: false, fn: function(_id){ return new Spacebars.SafeString('<a name="' + _id +'" class="edtlnk" target="_blank" href="' + _id + '/edit"> View </a>'); }  }
      ],
            showNavigation: 'auto'
        };
    },
     settingsSBG: function() {
        return {
            collection: Collections.ServBeneficiaryGroupRep,
            showFilter: false,
            showColumnToggles: false,
            showNavigation: 'false',
           fields: [
    { key: "ageGroup"   , label: "Age Group"        },
    { key: "male"       , label: "Male"        },
    { key: "female"     , label: "Female"      },
    { key: "african"    , label: "African"     },
    { key: "white"      , label: "White"       },
    { key: "indian"     , label: "Indian"      },
    { key: "coloured"   , label: "Coloured"    },
    { key: "specialNeeds", label: "Special Needs" },
    { key: "total"       , label: "Total for age group" },
      ],
              };
        },
    settingsFacility: function() {
        return {
            collection: Collections.Facility,
             fields: ['facName', 'facDistMuni', 'facLocalMuni', 'facCityVillage'
             // , 'facGPSCoords' 
             // filter: 
           , { key: 'serviceID', label: 'Provides: '+Session.get("selectedOFSName"), 
             fn: function(serviceID){ 
              var serviceFacsArr = Session.get("selectedOFSFacs") || [''] ;
              // var serviceProvider = serviceFacsArr.indexOf(_id) > -1 ? 'Yes' : 'No' ;
                if (serviceFacsArr.indexOf(serviceID) > -1)  { 
                 return   new Spacebars.SafeString('<p class="table-body service-provider-yes">Yes </p>') ; } else {
                  return new Spacebars.SafeString('<p class="table-body service-provider-no">No </p>') ; }
                 } } // key  , sortOrder: 0, sortDirection: -1
           ],
            showNavigation: 'auto'
        };
        },
    selectedOFSDoc: function () {
      return Collections.Service.findOne( { "mainDetails.serviceID": Session.get("selectedOFSId") } ); 
    },
    selectedSBGDoc:  function () {
      return Collections.ServBeneficiaryGroup.findOne( { "orgID": Session.get("selectedOFSId") } ); 
    },
     selectedSQECDDoc: function () {
      return Collections.ServiceQualityECD.findOne( { "serviceID": Session.get("selectedOFSId") } );
    },
    formTypeOFS: function () {
    if (Session.get("selectedOFSId")) {
      return "update";
    } else {
      return "insert"; }
    },
    OFSDesc: function () {
    if (Session.get("selectedOFSId")) {
      return  "Service ID: " + Session.get("selectedOFSId") + ", name: " + Session.get("selectedOFSName") 
    } else if ( Session.equals("formsToDisplay", "OFSAddNew") ) {
       return "Blank form to add a new Service"; 
    } else {
      return "No Service selected yet"; }
    },
    formTypeSQECD: function () {
    if ( Collections.ServiceQualityECD.findOne( { "serviceID": Session.get("selectedOFSId") } ) ) {
      return "update";
    } else {
      return "insert"; }
    }
});

Template.service.events({   
   'click #service-table tbody tr': function(e) {
        // if ($(e.target).hasClass('edtlnk')) {
            var OFSSelectedRow = this;
            e.preventDefault();
            var OFSId = OFSSelectedRow.mainDetails.serviceID ;
            if (typeof subSBGRep !== 'undefined') { subSBGRep.stop() } ;
            subSBGRep = Meteor.subscribe('servBeneficiaryGroupRep', OFSId);
            Meteor.subscribe('servBeneficiaryGroup', OFSId),
             Session.set("formsToDisplay", "OFSSelected");
            Session.set("selectedOFSId", OFSId);
            Session.set("selectedOFSName", OFSSelectedRow.mainDetails.servName);
// Router.go('serviceDetail', {_id: OFSId});
            $('#service-table tr').removeClass('row-selected');
            $(e.target).parent().addClass('row-selected');
             progressBarUpdate(2);  // moves it on to "Edit Form"
             $( ".form-inline").removeClass('form-group') ; 
             Meteor.setTimeout(function(){addClassesService();}, 500);
   },          

   'click #facility-table tr': function(e) {
            var facility = this;
            e.preventDefault();
            Session.set("selectedFacilityId", facility._id);
            var selectedOFSId = Session.get("selectedOFSId")
            var serviceFacsArr = Session.get("selectedOFSFacs") || [''] ;
            var serviceProvider = serviceFacsArr.indexOf(facility._id) > -1 ? true : false ;
              if (serviceProvider)  
                { Collections.Service.update({_id:selectedOFSId},
                {$pull: { facilities: facility._id}}) ;
              }  else
              { Collections.Service.update({_id:selectedOFSId},
                {$addToSet: { facilities: facility._id}}) ; 
               } 
               var serviceFacsArr = Collections.Service.findOne({_id: selectedOFSId}).facilities || [''] ; 

             Session.set("selectedOFSFacs", serviceFacsArr);
   }          
});



