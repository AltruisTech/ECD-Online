
// Give authorized users access to sensitive data by group
// Meteor.publish('serviceGroup', function (group) {
//   if (Roles.userIsInRole(this.userId, ['view-all','edit-all','admin'], group)) {
//     return Collections.Service.find({});
//     // return Collections.Service.find({group: group}); 
//   } else { this.stop(); return; } 
// });

guestRowLimit = 10 ;
viewAllDataRoles = ['view-all','edit-all','admin'] ;
viewAllDataGroup = '__global_roles__' ;
// userRegionGroups = Roles.getGroupsForUser(this.userId, 'view-region' ) ; 


Meteor.publish('service', function () {
  if (Roles.userIsInRole(this.userId, viewAllDataRoles, viewAllDataGroup  )) { return Collections.Service.find({});
  } else { return Collections.Service.find({}, { limit: guestRowLimit }) }
});

// Meteor.publish('service', function() { 
//   return Collections.Service.find();
// });
Meteor.publish('serviceQualityECD', function() {
  return Collections.ServiceQualityECD.find();
});
Meteor.publish('servBeneficiaryGroup', function(id) {
  return Collections.ServBeneficiaryGroup.find({ orgID: id });
});

Meteor.publish('servBeneficiaryGroupRep', function(id) {
  return Collections.ServBeneficiaryGroupRep.find({ orgID: id });
});

Meteor.publish('ofsMergedView', function () {
var userRegionGroups = Roles.getGroupsForUser(this.userId, 'view-region' ) ; 
  if (Roles.userIsInRole(this.userId, viewAllDataRoles, viewAllDataGroup  )) { return Collections.OFSMergedView.find({});
  } else if (userRegionGroups && userRegionGroups.length > 0 ) { 
    return Collections.OFSMergedView.find({ "facLocalMuni" : { $in: userRegionGroups } } ) ;
  } else { return Collections.OFSMergedView.find({}, { limit: guestRowLimit }) ;}
});

Meteor.publish('ofsMergedViewID', function(id) {
  return Collections.OFSMergedView.find({ orgID: id });
});

Meteor.publish('facility', function () {
var userRegionGroups = Roles.getGroupsForUser(this.userId, 'view-region' ) ; 
  if (Roles.userIsInRole(this.userId, viewAllDataRoles, viewAllDataGroup  )) { return Collections.Facility.find({});
  } else if (userRegionGroups && userRegionGroups.length > 0 ) { 
    return Collections.Facility.find({ "location.facLocalMuni" : { $in: userRegionGroups } } ) ;
  } else { return Collections.Facility.find({}, { limit: guestRowLimit }) ;}
});

Meteor.publish('facilityQualityECD', function() {
  return Collections.FacilityQualityECD.find();
});

Meteor.publish('organisation', function () {
var userRegionGroups = Roles.getGroupsForUser(this.userId, 'view-region' ) ; 
  if (Roles.userIsInRole(this.userId, viewAllDataRoles, viewAllDataGroup  )) { return Collections.Organisation.find({});
  } else if (userRegionGroups && userRegionGroups.length > 9999 ) { 
    return Collections.Organisation.find({ "location.facLocalMuni" : { $in: userRegionGroups } } ) ;
  } else { return Collections.Organisation.find({}, {sort: {_id: 1}, limit: guestRowLimit }) ;}
});

Meteor.publish('staff', function () {
var userRegionGroups = Roles.getGroupsForUser(this.userId, 'view-region' ) ; 
  if (Roles.userIsInRole(this.userId, viewAllDataRoles, viewAllDataGroup  )) { return Collections.Staff.find({});
  } else if (userRegionGroups && userRegionGroups.length > 9999 ) { 
    return Collections.Organisation.Staff({ "location.facLocalMuni" : { $in: userRegionGroups } } ) ;
  } else { return Collections.Staff.find({}, { limit: guestRowLimit }) ;}
});

///////////////////////////////////////////////

Meteor.publish('rep01RegisteredAndFundedECD', function() {  return Collections.Rep01RegisteredAndFundedECD.find(); });

Meteor.publish('rep02StaffTrainingNeeds', function() {  return Collections.Rep02StaffTrainingNeeds.find(); });

Meteor.publish('rep03SitesRequiringBasicServices', function() {  return Collections.Rep03SitesRequiringBasicServices.find(); });

Meteor.publish('rep04BeneficiaryGroupMuni', function() {  return Collections.Rep04BeneficiaryGroupMuni.find(); });


