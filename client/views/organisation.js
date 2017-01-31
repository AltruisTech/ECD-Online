/************************************************************
- \client\views\*.js files are to define helper functions and event handlers for the template deffined with the same name (.html)
*************************************************************/

Template.organisation.onCreated(function () {
    Session.set("formsToDisplay", "OFSListed");
 });

Template.organisation.onRendered(function () {
  var self = this;
  self.autorun(function () {

  addClassesOrganisation = function () {
  console.log('self.autorun: addClassesOrganisation');
    // console.log('submitClass helper');
     // class parent form .panel for checkboxes differently
    $( ".panel-title:contains('Financial'):contains('Governance')" ).parent().parent().addClass('checkbox-form'); 
    // add fa icons to each panel title > i based on the text:
    $( ".panel-title" ).prepend("<i> </i>")
    $(" .panel-title:contains('Main details') i"         ).addClass("fa fa-info-circle"       ); 
    $(" .panel-title:contains('Staff contact') i"        ).addClass("fa fa-phone"             ); 
    $(" .panel-title:contains('Commitee contact') i"     ).addClass("fa fa-slideshare"        ); 
    $(" .panel-title:contains('Services provided') i"    ).addClass("fa"                      ); 
    $(" .panel-title:contains('Governance') i"           ).addClass("fa fa-institution"       ); 
    $(" .panel-title:contains('Management committee') i" ).addClass("fa fa-group"             ); 
    $(" .panel-title:contains('Financial management') i" ).addClass("fa fa-line-chart"         );

    $( ".form-inline").removeClass('form-group') ; 
   } // fn addClassesOrganisation
  }); // self.autorun
 }); // Template.xx.onCreated
  
Template.organisation.helpers({
    // isOrgSelected: () => Session.get('selectedOSFId') ,
    isOFSListed: () => Session.equals("formsToDisplay", "OFSListed"),
    isOFSSelected: () => Session.equals("formsToDisplay", "OFSSelected") | Session.equals("formsToDisplay", "OFSAddNew"),
    isQECDSelected: () => Session.equals("formsToDisplay", "QECDSelected"),
    isOFSFacSelected: () => Session.equals("formsToDisplay", "OFSFacSelected"),

    settingsOFSTable: function() {
        return {
            collection: Collections.Organisation,

           fields: [
    { key: 'mainDetails.orgID', label: 'Organisation Identifier' },
    { key: 'mainDetails.orgName', label: 'Name of Organisation:' },
    { key: 'mainDetails.orgNumBeneficiaries', label: '# Beneficiaries:' },
    { key: 'mainDetails.orgNumFullTimeStaff', label: '# Fulltime Staff/Volunteers:' },
    { key: 'staffContact.orgPostalAddress2', label: 'Postal address 2:' }
          ] ,  
            showNavigation: 'auto'
        };
    },

   selectedOFSDoc: function () {
      return Collections.Organisation.findOne( { "mainDetails.orgID": Session.get("selectedOFSId") } ); 
    },
    formTypeOFS: function () {
    if (Session.get("selectedOFSId")) {
      return "update";
    } else {
      return "insert"; }
    },
    OFSDesc: function () {
    if (Session.get("selectedOFSId")) {
      return  "Org ID: " + Session.get("selectedOFSId") + ", name: " + Session.get("selectedOFSName") 
    } else if ( Session.equals("formsToDisplay", "OFSAddNew") ) {
       return "Blank form to add a new Organisation"; 
    } else {
      return "No Organisation selected yet"; }
    }

});

Template.organisation.events({   
   'click #service-table tbody tr': function(e) {
        // if ($(e.target).hasClass('edtlnk')) {
            var OFSSelectedRow = this;
            e.preventDefault();
            Session.set("formsToDisplay", "OFSSelected");
            Session.set("selectedOFSId", OFSSelectedRow.mainDetails.orgID);
            Session.set("selectedOFSName", OFSSelectedRow.mainDetails.orgName);
            $('#service-table tr').removeClass('row-selected');
            $(e.target).parent().addClass('row-selected');
            // AutoForm.resetForm('service1') ;
                document.getElementById("serviceId") ? document.getElementById("serviceId").value = OFSSelectedRow.mainDetails.orgID  : '' ;
             progressBarUpdate(2);  // moves it on to "Edit Form"
    $( ".form-inline").removeClass('form-group') ; 
    // class parent form .panel for checkboxes differently
         $( ".panel-title:contains('Org quality ')" ).parent().parent().addClass('checkbox-form'); 

        // }
   },          
     
});

