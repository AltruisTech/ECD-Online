/************************************************************
- seeds.js loads test data for users and other collections 
- calledby  Meteor.startup()
*************************************************************/

Meteor.startup(function () {

var dummyUserEmail = 'guest@example.com'

var users = [
      {name:"GuestUser",email:"guest@example.com",roles:['guest']},
      {name:"ViewAllUser",email:"view@example.com",roles:['view-all']},
      {name:"ViewUmzumbeUser",email:"umzumbe@example.com",roles:['view-region'],group:'Umzumbe'},
      {name:"EditAllUser",email:"edit@example.com",roles:['edit-all']},
      // {name:"Manage-Users User",email:"manage@example.com",roles:['manage-users']},
      {name:"AdminUser",email:"admin@example.com",roles:['admin']}
    ];


  if (Meteor.users.find({"emails.address": dummyUserEmail}).count() == 0){
_.each(users, function (user) {
  var id;

  id = Accounts.createUser({
    email: user.email,
    password: "44Aiken",
    profile: { name: user.name }
  });

  if (user.group && user.group.length > 0) {
    Roles.addUsersToRoles(id, user.roles, user.group);

// var userRegionGroups = Roles.getGroupsForUser(id, ['view-region'] ) ; 
//   console.log( userRegionGroups );  
  } 
  else if (user.roles && user.roles.length > 0) {
    // Need _id of existing user record so this call must come
    // after `Accounts.createUser` or `Accounts.onCreate`
    Roles.addUsersToRoles(id, user.roles, Roles.GLOBAL_GROUP);
  }

}); // _.each

} // if (users.find() ..)

  if (Collections.Facility.find().count() < 0 ){  // 3 / 9999 DUMMY to hold on this

  var sampleFacility =
  {
    "facName"       : "Facility 1",
    "facDistMuni"   : "District Muni 1",
    "facLocalMuni"  : "Local Muni 1",
    "facCityVillage": "Town 1",
    "facGPSCoords"  : "GPS 1-lat: GPS 1-long"
  };

  var sampleID = Collections.Facility.insert(sampleFacility);
  var seedFacId = Collections.Facility.findOne( {"facName": "Facility 1" } )._id ;
  sampleFacility.facName = "Facility 1";
      // console.log(seedFacId + " " + sampleID) ;
//
  // var copy = Collections.Facility.findOne( {_id: sampleID } ) ;
  // Collections.Facility.insert(sampleFacility);
  var copy = Collections.Facility.findOne( {"facName": "Facility 1" } ) ;
  var replacer = function(key, value) { if (key=="_id"||key=="canvas")
  { return undefined; }
  else return value;
    }
      for (var i = 2; i <= 30; i++){ 
      // copy._id = new Mongo.ObjectID("5539d9dcf046be5b2302aefc"); 
      var copyString = JSON.stringify(copy, replacer).replace(/ 1/g, " "+i).replace(/\"1/g,'"'+i).replace(/\:1/g,':'+i); //convert to JSON string and do replace 
     var insertNewObject = JSON.parse(copyString); //convert back to array
      // console.log(insertNewObject)
       Collections.Facility.insert(insertNewObject);
      } // for
    }  // if


if (Collections.Service.find().count() < 0 ){  // > 9999 DUMMY to hold on this // < 10
var sampleService =
{
  // "_id": "pvLRP7fz4MpoB6vPF",
  "mainDetails": {
    "servName": "Service 1",
    "servType": "Centre-based ECD Programe"
  },
  "registrationDetails": {
    "servProgRegStats": "Status 1",
    "servProgRegNR": "New",
    "servProgRegExpiry": null
  },
  "funding": {
    "servFeesCharged": "100",
    "servMaxFees": 100,
    "servAnnualIncome": 1000,
    "servDSDSLA": "SLA 1",
    "servDOEGradeRSalary": "10000",
    "servTopDonor1": "Donor 1",
    "servTopDonorAmt1": 100,
    // "servDSDSLASigDate": "2016-11-16T00:00:00.000Z",
    // "servDSDSLAExpiryDate": "2016-11-16T00:00:00.000Z",
    "servDSDProgFunding": "Yes"
  },
  "externalDonors": [
    {
      "servExternalFunderName": "ExDonor 1a",
      "servExternalFunderType": "Donor Type 1a"
    },
    {
      "servExternalFunderName": "ExDonor 1b",
      "servExternalFunderType": "Donor Type 1b"
    }
  ],
  "facilities": [
    // "yedFHgcARBrHfPvNm",
    // "f6Z2SqzdN95c2i47g"
  ],
  "registration": {
    "servProgRegStats": "Not Applied",
    "servProgRegNR": "New",
    "servProgRegType": "Type 1",
    "servProgRegDec": "Full",
    // "servProgRegExpiry": "2016-09-05T00:00:00.000Z" 
  },
  "subsidies": {
    "servDSDPerChildSubsidy": true,
    "servDSDPerChildSubsidyNum": 10,
    "servDOEGradeRLearnerSub": "100",
    "servDOEGradeRLearnerSubNum": 10,
    "servDOELearnerships": "Yes",
    "servDOELearnershipsNum": 10
  },
  "topDonors": {
    "servTopDonor1": "Donor 1",
    "servTopDonorAmt1": 100,
    "servTopDonor2": "Donor 1b",
    "servTopDonorAmt2": 100,
    "servTopDonor3": "Donor 1c",
    "servTopDonorAmt3": 100
  },
  "externalFunders": [
    {
      "servExternalFunderName": "Ext Funder 1",
      "servExternalFunderType": "Org Type 1",
      "servExternalFunderDonationType": "Funding 1"
    }
  ]
};

  // Get the Facility._id for the seed service :
  var seedFacId = Collections.Facility.findOne( {"facName": "Facility 1" } )._id ;
   sampleService.facilities.push(seedFacId) ;

Collections.Service.insert(sampleService);
var replacer = function(key, value) { if (key=="_id"||key=="facilitiesxx")
  { return undefined; }
  else return value;
    }

  var copy = Collections.Service.findOne( {"mainDetails.servName": "Service 1" } ) ;
    // console.table(copy) ;
  for (var i = 2; i <= 30; i++){ 
     var newFacId = Collections.Facility.findOne( {"facName": "Facility "+i } )._id ;
     // console.log(newFacId);
     copy.facilities.splice(0,2) ;
     copy.facilities.push(newFacId) ;
     var copyString = JSON.stringify(copy, replacer).replace(/ 1/g, " "+i).replace(/\"1/g,'"'+i).replace(/\:1/g,':'+i); //convert to JSON string and do replace 
     var insertNewObject = JSON.parse(copyString); //convert back to array
      // console.log(insertNewObject.mainDetails.servName)
       Collections.Service.insert(insertNewObject);
      } // for
    }  // if

  if (Collections.ServiceQualityECD.find().count() < 0 ){  // 3 / 9999 DUMMY to hold on this

var sampleServiceQualityECD =
 {
  // "_id": "FNq7BYyXkKRXv8sC7",
  // "serviceId": "pvLRP7fz4MpoB6vPF",
  "nutrition": {
    "servMealsProvided": true,
    "servBreakfastProvider": "Service Provider",
    "servWeeklyMenu": false,
    "servMSnackProvider": "Other",
    "servLunchProvider": "Child`s Caregiver",
    "servPMSnackProvider": "Child`s Caregiver",
    "servFruitProvided": "Sometimes"
  },
  "stimulation": {
    "servDailyProgAvail": "Yes-not on wall",
    "servDailyProgFollow": "Every Day",
    "servChildDivided": "No",
    "servChartsUsed": "Yes",
    "servThemesUsed": "No"
  },
  "serviceQualityB": {
    "servStaffRegister": true,
    "servChildrensFiles": false,
    "servIncidentAbuseRegister": false,
    "servMedicineRegister": false,
    "servAttendanceRegister": true,
    "servVisitorsRegister": false,
    "servEnrollBirthCerts": true,
    "servEnrollContactDetails": false,
    "servEnrollDateofAdmission": false,
    "servEnrollDischargeDate": false,
    "servEnrollMedicalHistory": false,
    "servEnrollSpecialNeedsAllergies": true,
    "servEnrollImmunisationRecords": true
  },
  "serviceQualityC": {
    "servDisciplinePolicy": false,
    "servTransportPolicy": true,
    "servVisitorsRegister": false,
    "servHealthIdentifyIllness": true,
    "servHealthDealwithIllness": false,
    "servHealthMedicine": false,
    "servHealthInfectiousDiseases": true,
    "servHealthHygieneStandards": true
  }
};


  var seedServiceId = Collections.Service.findOne( {"mainDetails.servName": "Service 1" } )._id ;
  sampleServiceQualityECD.serviceId = seedServiceId;
      // console.log(seedServiceId) ;
//
  var sampleID = Collections.ServiceQualityECD.insert(sampleServiceQualityECD);
  var copy = Collections.ServiceQualityECD.findOne( {_id: sampleID } ) ;
      // console.log(sampleID) ;
  for (var i = 2; i <= 30; i++){ 
    var newServiceId = Collections.Service.findOne( {"mainDetails.servName": "Service "+i } )._id ;
    copy.serviceId = newServiceId;
    var copyString = JSON.stringify(copy, replacer).replace(/ 1/g, " "+i).replace(/\"1/g,'"'+i).replace(/\:1/g,':'+i); //convert to JSON string and do replace 
     var insertNewObject = JSON.parse(copyString); //convert back to array
      // console.log(insertNewObject)
       Collections.ServiceQualityECD.insert(insertNewObject);
      } // for
    }  // if

 
 if (Collections.Service.find().count() == 9999){  // 9999 DUMMY to hold on this
//  if (Collections.ServFundingExternalDonors.find().count() == 0){
// Create 3 startup Donors if they are wiped after reset
    [
      {
        servExternalFunderName: "Donor 1 (db)",
      },
      {
        servExternalFunderName: "Donor 2 (db)",
      },
      {
        servExternalFunderName: "Donor 3 (db)",
      }
    ].forEach(function(donor){
      Collections.Service.insert(donor);
    });
    tabData=Collections.Service.find().fetch();
    // Console.log(tabData);
    }  
});

