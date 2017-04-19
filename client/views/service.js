
/************************************************************
- \client\views\*.js files are to define helper functions and event handlers for the template deffined with the same name (.html)
*************************************************************/
  
// create an object Schema in which to store all of our app's schemas.
Template.registerHelper("Collections", Collections);
// Template.registerHelper("Schemas", Schemas);

Template.service.onCreated(function(){
  if(Session.equals("formsToDisplay", "OFSSelected") | Session.equals("formsToDisplay", "OFSAddNew"))
    { var e= Collections.Service.findOne({"mainDetails.serviceID": Session.get("selectedOFSId")});
       Session.set("selectedOFSName", e.mainDetails.servName),
    progressBarUpdate(2) ; // moves it on to "Edit Form" AND calls addClassesOrganisation
 }
}) ;

Template.service.onRendered(function () {
  var self = this;
  self.autorun(function () {

    // Session.set("formsToDisplay", "OFSListed");
    // AutoForm.resetForm('service1') ;
    // AutoForm.resetForm('service4') ;  

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
    $(" .panel-title:contains('Record keeping') i"      ).addClass("fa fa-pencil-square-o"     ); 
    $(" .panel-title:contains('Policies and') i"         ).addClass("fa fa-hand-pointer-o"    ); 
    $(" .panel-title:contains('Additional services') i"  ).addClass("fa fa-calendar-plus-o"   ); 
    $(" .panel-title:contains('Profile completion') i"   ).addClass("fa fa-check-square-o"    ); 

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

settingsOFSMerged: function() {
        return {
            collection: Collections.OFSMergedView,
            showFilter: false,
            showColumnToggles: true,
            showNavigation: 'auto',
        fields: [
{key: "servName",              label:"Service Name (click to view)", hidden:1,
fn: function(e,t ){ return new Spacebars.SafeString('<a name="'+e+'" class="edtlnk" target="_blank" title="Click to open a new tab with the selected service`s details" href="../service/'+t.orgID+'">'+e+"</a>")} },
{key: "orgID",                 label:"Provided by Org (click to view):",
fn: function(e){ return new Spacebars.SafeString('<a name="'+e+'" class="edtlnk" target="_blank" title="Click to open a new tab with the selected organisation`s details" href="../organisation/'+e+'">'+e+"</a>")} },
{key: "servType",              label:"Service Type",             hidden:0},
{key: "facName",               label:"Facility Name",            hidden:1},
{key: "orgID",                 label:"At site ID (click to view)",sortByValue:0, 
fn: function(e){ return new Spacebars.SafeString('<a name="'+e+'" class="edtlnk" target="_blank" title="Click to open a new tab with the selected facility / site`s details" href="../facility/'+e+'">'+e+"</a>")} },
{key: "facDistMuni",           label:"District Muni",            hidden:1},
{key: "facLocalMuni",          label:"Local Muni"                         },
{key: "facWard",               label:"Ward"                               },
{key: "facCityVillage",        label:"City / Village"                     },
{key: "facGPSCoords",          label:"GPS",                      hisdden:1},
{key: "facPCRStatus",          label:"PCR Status",               hidden:1},
{key: "orgNumBeneficiaries",   label:"No. of Benefi-ciaries"              },
{key: "subsidisedRatio",       label:"Subsidy Ratio"                      },
{key: "staffCount",            label:"Staff Count (click to view):",
fn: function(e,t){ return new Spacebars.SafeString('<a name="'+e+'" class="edtlnk" target="_blank" title="Click to open a new tab with the selected organisation`s staff" href="../staff/'+t.orgID+'">'+e+"</a>")} },
{key: "staffQual",             label:"Staff Quali-fied Ratio"             },
{key: "staffFull",             label:"Staff Full-time Ratio",    hidden:1},
{key: "flags",                 label:"Issue flags"                        }
          ] 
        };
    },

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



