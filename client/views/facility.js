
/************************************************************
- \client\views\*.js files are to define helper functions and event handlers for the template defined with the same name (.html)
*************************************************************/

Template.facility.onCreated(function () {
  var self = this;
  self.autorun(function () {

  addClassesFacility = function () {
  console.log('self.autorun: addClassesFacility');
    // console.log('submitClass helper');
     // class parent form .panel for checkboxes differently
    $( ".panel-title:contains('quipment'):contains('Hazard'):contains('Outdoors')" ).parent().parent().addClass('checkbox-form'); 
    // add fa icons to each panel title > i based on the text:
    $( ".panel-title" ).prepend("<i> </i>");
    $(" .panel-title:contains('Location') i"             ).addClass("fa fa-map-marker"        ); 
    $(" .panel-title:contains('Operation') i"            ).addClass("fa fa-gears"             ); 
    $(" .panel-title:contains('Registration') i"         ).addClass("fa fa-registered"        ); 
    $(" .panel-title:contains('Details') i"              ).addClass("fa fa-info-circle"       ); 
    $(" .panel-title:contains('Separation of ages') i"   ).addClass("fa fa-random"            ); 
    $(" .panel-title:contains('Rooms') i"               ).addClass("fa fa-hotel"             ); 
    $(" .panel-title:contains('Structure') i"            ).addClass("fa fa-home"              ); 
    $(" .panel-title:contains('Kitchen') i"              ).addClass("fa fa-cutlery"           ); 
    $(" .panel-title:contains('Office') i"               ).addClass("fa fa-fax / laptop"      ); 
    $(" .panel-title:contains('Power') i"               ).addClass("fa fa-plug"              ); 
    $(" .panel-title:contains('Drinking water') i"       ).addClass("fa fa-tint"              ); 
    $(" .panel-title:contains('Sanitation') i"           ).addClass("fa fa-bath"              ); 
    $(" .panel-title:contains('Outdoors') i"             ).addClass("fa fa-tree"              ); 
    $(" .panel-title:contains('Outdoors equipment') i"   ).addClass("fa fa-simplybuilt"       ); 
    $(" .panel-title:contains('Hazards') i"              ).addClass("fa fa-warning"           ); 
    $(" .panel-title:contains('Health and safety') i"    ).addClass("fa fa-fire-extinguisher" ); 
    $(" .panel-title:contains('Equipment') i"            ).addClass("fa fa-wrench"            ); 

    $( ".form-inline").removeClass('form-group') ; 
   } // fn addClassesFacility
  }); // self.autorun
 }); // Template.xx.onCreated

Template.facility.onRendered(function () { 
  function submitClass () {
  // console.log('onRendered');
    // $( ".submit-custom").parent().removeClass('form-group').addClass('submit-custom'); 
    // class parent form .panel for checkboxes differently
   };
  });
 
Template.facility.helpers({
    isOFSListed: () => Session.equals("formsToDisplay", "OFSListed"),
    isOFSSelected: () => Session.equals("formsToDisplay", "OFSSelected") | Session.equals("formsToDisplay", "OFSAddNew"),
    isQECDSelected: () => Session.equals("formsToDisplay", "QECDSelected"),
    isOFSFacSelected: () => Session.equals("formsToDisplay", "OFSFacSelected"),

    settingsFac: function() {
        return {
            collection: Collections.Facility,

           fields: [
    { key: 'location.facID', label: 'Facility Identifier' },
    { key: 'location.facName', label: 'Facility Name' },
    { key: 'location.facTradAuth', label: 'Traditional Authority:' },
    { key: 'location.facPhAddress1', label: 'Physical address 2:' },
    { key: 'location.facCityVillage', label: 'City/Village:' },
    { key: 'registration.facPCRStatus', label: 'PCR Status' }
          ] ,
            showNavigation: 'auto'
        };
    },
    selectedOFSDoc: function () {
      return Collections.Facility.findOne( { "location.facID": Session.get("selectedOFSId") } ); 
    },
    selectedSQECDDoc: function () {
      return Collections.FacilityQualityECD.findOne( { "facID": Session.get("selectedOFSId") } );
      // return selectedSQECD ;  || null
    },
    formTypeOFS: function () {
    if (Session.get("selectedOFSId")) {
      return "update";
    } else {
      return "insert"; }
    },
    OFSDesc: function () {
    if (Session.get("selectedOFSId")) {
      return  "Facility ID: " + Session.get("selectedOFSId") + ", location: " + Session.get("selectedOFSName") 
    } else if ( Session.equals("formsToDisplay", "OFSAddNew") ) {
       return "Blank form to add a new Facility"; 
    } else {
      return "No Facility selected yet"; }
    },
    formTypeSQECD: function () {
    if ( Collections.FacilityQualityECD.findOne( { "facID": Session.get("selectedOFSId") } ) ) {
      return "update";
    } else {
      return "insert"; }
    }
});

Template.facility.events({   
   'click #service-table tbody tr': function(e) {
        // if ($(e.target).hasClass('edtlnk')) {
            var OFSSelectedRow = this;
            e.preventDefault();
            Session.set("formsToDisplay", "OFSSelected");
            Session.set("selectedOFSId", OFSSelectedRow.location.facID);
            Session.set("selectedOFSName", OFSSelectedRow.location.facPhAddress1 + ' , ' + OFSSelectedRow.location.facCityVillage);
            // console.log("Facility ID: " + Session.get("selectedOFSId") + ", location: " + Session.get("selectedOFSName") );
            $('#service-table tr').removeClass('row-selected');
            $(e.target).parent().addClass('row-selected');
            // AutoForm.resetForm('service1') ;
            document.getElementById("serviceId") ? document.getElementById("serviceId").value = OFSSelectedRow.location.facID : '' ;
            // console.log('Fac ID: '+service._id);
    progressBarUpdate(2);  // moves it on to "Edit Form"
    $( ".form-inline").removeClass('form-group') ; 
    // $( ".submit-custom").parent().removeClass('form-group').addClass('submit-custom'); 
    // class parent form .panel for checkboxes differently
         // $( ".panel-title:contains('Fac quality ')" ).parent().parent().addClass('checkbox-form'); 

        // }
   }  
});

