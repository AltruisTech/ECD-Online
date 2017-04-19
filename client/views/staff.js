/************************************************************
- \client\views\*.js files are to define helper functions and event handlers for the template deffined with the same name (.html)
*************************************************************/

Template.staff.onCreated(function () {
  // now done in router.js :
//   var self = this; //   self.autorun(function () { 
//     self.subscribe('service');
    Session.set("formsToDisplay", "OFSListed");
 });

Template.staff.onCreated(function () {
  var self = this;
  self.autorun(function () {

  addClassesStaff = function () {
  console.log('self.autorun: addClassesStaff');
    // console.log('submitClass helper');
     // class parent form .panel for checkboxes differently
    $( ".panel-title:contains('Financial'):contains('Governance')" ).parent().parent().addClass('checkbox-form'); 
    // add fa icons to each panel title > i based on the text:
    $(" .panel-title" ).prepend("<i> </i>");
    $(" .panel-title:contains('Main details') i"         ).addClass("fa fa-info-circle"       ); 
    $(" .panel-title:contains('Qualifications') i"       ).addClass("fa fa-graduation-cap"    ); 
    $(" .panel-title:contains('Other details') i"        ).addClass("fa fa-plus-circle"       ); 

    $( ".form-inline").removeClass('form-group') ; 
   } // fn addClassesStaff
  }); // self.autorun
 }); // Template.xx.onCreated

// Template.staff.onRendered(function () { 
//   Meteor.setTimeout(function(){addClassesStaff();}, 500);
//   });
  
Template.staff.helpers({
    // isOrgSelected: () => Session.get('selectedOSFId') ,
    isOFSListed: () => Session.equals("formsToDisplay", "OFSListed"),
    isOFSSelected: () => Session.equals("formsToDisplay", "OFSSelected") | Session.equals("formsToDisplay", "OFSAddNew"),
    isQECDSelected: () => Session.equals("formsToDisplay", "QECDSelected"),
    isOFSFacSelected: () => Session.equals("formsToDisplay", "OFSFacSelected"),


    settingsOFSTable: function() {
        return {
            collection: Collections.Staff,

           fields: [
    { key: 'mainDetails.staffName', label: 'Staff Name' },
    { key: 'mainDetails.staffID', label: 'ID Number (changed)' },
    { key: 'mainDetails.orgID', label: 'Organisation ID' },
    { key: 'mainDetails.staffContactNumber', label: 'Contact Number (changed)' },
    // { key: 'mainDetails.staffRace', label: 'Race' },
    { key: 'mainDetails.staffGender', label: 'Gender' },
    { key: 'mainDetails.staffPosition', label: 'Main Position' },
    // { key: 'qualifications.staffSchoolLevel', label: 'Highest level of school education' },
    { key: 'qualifications.staffECDQualificationLevel', label: 'Formal ECD Qualification – (NQF Level 1,4,5,6/Degree)' },
    // { key: 'qualifications.staffECDQualificationStatus', label: 'Formal ECD Qualification-Enrolled/Complete' },
    // { key: 'qualifications.staffECDQualificationInstitute', label: 'Training Institute for formal ECD Qualification' },
    // { key: 'qualifications.staffECDSkillsTrainingDays', label: 'Days of ECD PS Training Attended' },
    // { key: 'qualifications.staffECDSkillsTrainingInstitute', label: 'Training Institute for Program Skills training' },
    // { key: 'otherDetails.staffMonthlyRemuneration', label: 'Remuneration (R/month)' },
    { key: 'otherDetails.staffYearsECDExperience', label: 'Years of Experience in ECD' },
    { key: 'otherDetails.staffStartDate', label: 'Start date at organisation' },
    { key: 'otherDetails.staffFullPartTime', label: 'Fulltime/Part-time' },
    // { key: 'otherDetails.staffWillingtoTrain', label: 'Willing to be trained' },
    // { key: 'otherDetails.staffCPRClearance', label: 'CPR Clearance' },
          ] ,  
            showNavigation: 'auto'
        };
    },

   selectedOFSDoc: function () {
      return Collections.Staff.findOne( { "mainDetails.staffID": Session.get("selectedOFSId") } ); 
    },
    // selectedSQECDDoc: function () {
    //   return Collections.OrganisationQualityECD.findOne( { "serviceID": Session.get("selectedOFSId") } );
    //   // BUT no OrganisationQualityECD yet, so UNUSED
    // },
    // isselectedOFS: function () {
    // return Session.equals("selectedOFSId", this._id);
    // },
    formTypeOFS: function () {
    if (Session.get("selectedOFSId")) {
      return "update";
    } else {
      return "insert"; }
    },
    OFSDesc: function () {
    if (Session.get("selectedOFSId")) {
      return  "Staff ID: " + Session.get("selectedOFSId") + ", name: " + Session.get("selectedOFSName") 
    } else if ( Session.equals("formsToDisplay", "OFSAddNew") ) {
       return "Blank form to add a new Staff"; 
    } else {
      return "No Staff selected yet"; }
    }
    // formTypeSQECD: function () {
    // if ( Collections.ServiceQualityECD.findOne( { "serviceID": Session.get("selectedOFSId") } ) ) {
    //   return "update";
    // } else {
    //   return "insert"; }
    // },

});

Template.staff.events({   
   'click #service-table tbody tr': function(e) {
        // if ($(e.target).hasClass('edtlnk')) {
            var OFSSelectedRow = this;
            e.preventDefault();
            Session.set("formsToDisplay", "OFSSelected");
            Session.set("selectedOFSId", OFSSelectedRow.mainDetails.staffID);
            Session.set("selectedOFSName", OFSSelectedRow.mainDetails.staffName);
            // Session.set("selectedOSFName", service.servName);
            // Session.set("selectedOSFFacs", service.facilities);
            $('#service-table tr').removeClass('row-selected');
            $(e.target).parent().addClass('row-selected');
            // AutoForm.resetForm('service1') ;
            // AutoForm.resetForm('service4') ; 
            // $("#serviceId").val(service._id);
            document.getElementById("serviceId") ? document.getElementById("serviceId").value = OFSSelectedRow.mainDetails.staffID  : '' ;
            // console.log('Org ID: '+service._id);
    progressBarUpdate(2);  // moves it on to "Edit Form"
    $( ".form-inline").removeClass('form-group') ; 
    // $( ".submit-custom").parent().removeClass('form-group').addClass('submit-custom'); 

        // }
   },          
     
});

