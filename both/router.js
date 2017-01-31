/************************************************************
- Iron router is router that works on the server and the browser, designed specifically for Meteor.
- http://iron-meteor.github.io/iron-router/ 
*************************************************************/

Router.configure({
  layoutTemplate: 'layout'
  ,   loadingTemplate: 'loading'
});


Router.route('/', {
  name: 'homeContent',
  waitOn: function(){
  return [
  Meteor.subscribe('rep01RegisteredAndFundedECD'), 
  Meteor.subscribe('rep02StaffTrainingNeeds'), 
  Meteor.subscribe('rep03SitesRequiringBasicServices'),
  Meteor.subscribe('rep04BeneficiaryGroupMuni')
     ];
   },
 action: function() {
  this.render('homeContent');
  }
});

Router.route('/service',  {
  name: 'service',
 waitOn: function() {
  Session.setDefault("selectedOFSId", 1010);
  var id = Session.get("selectedOFSId");
  // console.log(Session.get("selectedOFSId"));
  return [
  Meteor.subscribe('service'),
  // below 2 are now handled by the template view:
  // Meteor.subscribe('servBeneficiaryGroup', id),
  // Meteor.subscribe('servBeneficiaryGroupRep', id),
  Meteor.subscribe('serviceQualityECD'),
  // Meteor.subscribe('facility')
     ]; 
   }, // waitOn
  action: function () {
       this.next();
       this.render('service');
  } 
});


Router.route('/organisation', function () {
  this.render('organisation');
	this.subscribe('organisation');
  this.subscribe('facility');
});

Router.route('/facility', function () {
  this.render('facility');
	this.subscribe('facility');
	this.subscribe('facilityQualityECD');
});

Router.route('/staff', function () {
  this.render('staff');
	this.subscribe('staff');
  // temp additions to run the Papa.parse( ) readCSV.js data loads from ths template / route
});

Router.route('/loadData', {
  name: 'loadData',
 waitOn: function () {
  return [
  Meteor.subscribe('service'),
  Meteor.subscribe('serviceQualityECD'),
  Meteor.subscribe('facility'),
  Meteor.subscribe('facilityQualityECD'),
  Meteor.subscribe('organisation'),
  // Meteor.subscribe('servBeneficiaryGroup'),
  Meteor.subscribe('staff')
     ]; 
   }, // waitOn
  action: function () {
    this.render('loadData');
  }   
});

Router.route('/reporting', {
  name: 'reporting',
  waitOn: function(){
  return [
  Meteor.subscribe('rep01RegisteredAndFundedECDWard'), 
  Meteor.subscribe('rep01RegisteredAndFundedECD'), 
  Meteor.subscribe('rep02StaffTrainingNeedsWard'), 
  Meteor.subscribe('rep02StaffTrainingNeeds'), 
  Meteor.subscribe('rep03SitesRequiringBasicServicesWard'),
  Meteor.subscribe('rep03SitesRequiringBasicServices'),
  Meteor.subscribe('rep04BeneficiaryGroupMuni')
       // );  // waitOn .. return
     ];
   },
 action: function () {
  this.render('reporting');
  }
});

