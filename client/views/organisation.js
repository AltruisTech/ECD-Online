/************************************************************
- \client\views\*.js files are to define helper functions and event handlers for the template deffined with the same name (.html)
*************************************************************/

// Template.organisation.onCreated(function () {
//     Session.set("formsToDisplay", "OFSListed");
//  });

Template.organisation.onCreated(function(){
  if(Session.equals("formsToDisplay", "OFSSelected") | Session.equals("formsToDisplay", "OFSAddNew"))
    { var e= Collections.Organisation.findOne({"mainDetails.orgID": Session.get("selectedOFSId")});
       Session.set("selectedOFSName", e.mainDetails.orgName)
    // , progressBarUpdate(2) ; // moves it on to "Edit Form" AND calls addClassesOrganisation
 }
}) ;


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
    $(" .panel-title:contains('Primary contacts') i"     ).addClass("fa fa-phone"             ); 
    $(" .panel-title:contains('Organisation contact') i" ).addClass("fa fa-slideshare"        ); 
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

settingsOFSMerged: function() {
        return {
            collection: Collections.OFSMergedView,
            showFilter: false,
            showColumnToggles: true,
            showNavigation: 'auto',
        fields: [
{key: "servName",              label:"Service Name (click to view)",
fn: function(e,t ){ return new Spacebars.SafeString('<a name="'+e+'" class="edtlnk" target="_blank" title="Click to open a new tab with the selected service`s details" href="../service/'+t.orgID+'">'+e+"</a>")} },
//  {key: "orgID",                 label:"Provided by Org (click to view):",
// fn: function(e){ return new Spacebars.SafeString('<a name="'+e+'" class="edtlnk" target="_blank" title="Click to open a new tab with the selected organisation`s details" href="../organisation/'+e+'">'+e+"</a>")} },
{key: "servType",              label:"Service Type",             hidden:0},
{key: "facName",               label:"Facility Name",            hidden:1},
{key: "orgID",                 label:"At site ID (click to view)",sortByValue:0, 
fn: function(e){ return new Spacebars.SafeString('<a name="'+e+'" class="edtlnk" target="_blank" title="Click to open a new tab with the selected facility / site`s details" href="../facility/'+e+'">'+e+"</a>")} },
{key: "facDistMuni",           label:"District Muni",            hidden:1},
{key: "facLocalMuni",          label:"Local Muni"                         },
{key: "facWard",               label:"Ward"                               },
{key: "facCityVillage",        label:"City / Village"                     },
{key: "facGPSCoords",          label:"GPS",                      hidden:1},
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
            var OFSSelectedRow = this;
            e.preventDefault();
        // }
   }
});

