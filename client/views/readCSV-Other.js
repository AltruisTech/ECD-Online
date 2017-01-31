  
// Template.readCSV.events({
//   "click .btnReadCsv": function(event, template) {
//       Papa.parse(template.find('#csv-file').files[0], {

// Meteor.startup(function () {
// Template.staff.onRendered(function () {
//   var self = this;
//   self.autorun(setTimeout( function () {

Template.loadData.events({
  'click #load-other-data': function(e) {
      // var service = this;
      e.preventDefault();
      // Session.set("loadingData", true);

var tableList = [ "Staff" , 'ServBeneficiaryGroup' ] ;

var cleanString = function(string){ // to santise cel numbers and ID numbers
     if ( string != null ) { 
         var newString = string.replace(/9/g,"3").replace(/8/g,"6").replace(/2/g,"7").replace(/5/g,"2").replace(/1/g,"8").replace(/2/g,"7");
      return newString;
        } 
      else { return ""; }
  };

   // var testForData = Collections.ServBeneficiaryGroup.find().count() ;
   var testForData = Collections.Staff.find().count() ;
    // var testForData = Meteor.call('countCollection', 'Staff') ;

    var tableCountMsg = 'Staff: ' +  Collections.Staff.find().count()  + ' , ServbenGroup: ' +  Collections.ServBeneficiaryGroup.find().count() 
       alert('Other Table counts before load: ' + tableCountMsg);

if  (typeof testForData == 'undefined') 
  { console.log( 'Not able to count data for table: Service'); }
 else if (testForData > 10 ) {  // 3 / 9999 DUMMY to hold on this
   alert( 'Test data will NOT be loaded for tables: Staff, ServbeneficiaryGroup as they appear to already have at least 10 rows'); }
 else if (testForData < 10 ) {  // 3 / 9999 DUMMY to hold on this
   alert( 'Test data will be loaded for 0-row tables: Staff, ServBeneficiaryGroup'); 
    // console.log('btnReadCsv clicked')
  //parse the data file
    // var csvfile = "/data/Other2_01.csv";
    var csvfile = "/data/Other10_120.csv";
   console.log( 'Row count for table: Staff < 10, so loading test data from: ' + csvfile); 
    $.get(csvfile, function (data) {
        // var csvData = Papa.parse(data);
    Papa.parse( data , {
    // Papa.parse(template.find('#csv-file').files[0], {
          header: true,
          skipEmptyLines: true,
          complete: function(results) {
               _.each(results.data, function(csvData) {
                   // console.log(+csvData.orgID + 1000 + ' , ' + csvData.orgName);

  var insertStaff =  {
   "mainDetails" : {
  "staffID" : +cleanString(csvData.staffID),
  "orgID" : +csvData.stafforgID + 1000,
  "staffName" : csvData.staffName,
  // "staffIDNumber" : cleanString(csvData.staffIDNumber),
  "staffContactNumber" : cleanString(csvData.staffContactNumber),
  "staffRace" : csvData.staffRace,
  "staffGender" : csvData.staffGender,
  "staffPosition" : csvData.staffPosition
    },
    "qualifications" : {
  "staffSchoolLevel" : csvData.staffSchoolLevel,
  "staffECDQualificationLevel" : csvData.staffECDQualificationLevel,
  "staffECDQualificationStatus" : csvData.staffECDQualificationStatus,
  "staffECDQualificationInstitute" : csvData.staffECDQualificationInstitute,
  "staffECDSkillsTrainingDays" : +csvData.staffECDSkillsTrainingDays,
  "staffECDSkillsTrainingInstitute" : csvData.staffECDSkillsTrainingInstitute
    },
    "otherDetails" : {
  "staffMonthlyRemuneration" : (+csvData.staffMonthlyRemuneration + 111) * 10000 + 7654,
  "staffYearsECDExperience" : +csvData.staffYearsECDExperience,
  "staffStartDate" : csvData.staffStartDate,
  "staffFullPartTime" : csvData.staffFullPartTime,
  "staffWillingtoTrain" : csvData.staffWillingtoTrain,
  "staffCPRClearance" : csvData.staffCPRClearance
    }
} ;

 var insertservBen =  {    

  "orgID" : +csvData.servBenorgID + 1000,
    "aged0to18months" : {
  "servBen0to18M" : +csvData.servBen0to18M,
  "servBen0to18F" : +csvData.servBen0to18F,
  "servBen0to18African" : +csvData.servBen0to18African,
  "servBen0to18White" : +csvData.servBen0to18White,
  "servBen0to18Indian" : +csvData.servBen0to18Indian,
  "servBen0to18Coloured" : +csvData.servBen0to18Coloured,
  "servBen0to18SN" : +csvData.servBen0to18SN
    },
    "aged19to35months" : {
  "servBen19to35M" : +csvData.servBen19to35M,
  "servBen19to35F" : +csvData.servBen19to35F,
  "servBen19to35African" : +csvData.servBen19to35African,
  "servBen19to35White" : +csvData.servBen19to35White,
  "servBen19to35Indian" : +csvData.servBen19to35Indian,
  "servBen19to35Coloured" : +csvData.servBen19to35Coloured,
  "servBen19to35SN" : +csvData.servBen19to35SN
    },
    "aged3to4years" : {
  "servBen3to4M" : +csvData.servBen3to4M,
  "servBen3to4F" : +csvData.servBen3to4F,
  "servBen3to4African" : +csvData.servBen3to4African,
  "servBen3to4White" : +csvData.servBen3to4White,
  "servBen3to4Indian" : +csvData.servBen3to4Indian,
  "servBen3to4Coloured" : +csvData.servBen3to4Coloured,
  "servBen3to4SN" : +csvData.servBen3to4SN
    },
    "aged4to5years" : {
  "servBen4to5M" : +csvData.servBen4to5M,
  "servBen4to5F" : +csvData.servBen4to5F,
  "servBen4to5African" : +csvData.servBen4to5African,
  "servBen4to5White" : +csvData.servBen4to5White,
  "servBen4to5Indian" : +csvData.servBen4to5Indian,
  "servBen4to5Coloured" : +csvData.servBen4to5Coloured,
  "servBen4to5SN" : +csvData.servBen4to5SN
    },
    "aged5to6years" : {
  "servBen5to6M" : +csvData.servBen5to6M,
  "servBen5to6F" : +csvData.servBen5to6F,
  "servBen5to6African" : +csvData.servBen5to6African,
  "servBen5to6White" : +csvData.servBen5to6White,
  "servBen5to6Indian" : +csvData.servBen5to6Indian,
  "servBen5to6Coloured" : +csvData.servBen5to6Coloured,
  "servBen5to6SN" : +csvData.servBen5to6SN
    },
    "afterSchool" : {
  "servBenAfterSchoolM" : +csvData.servBenAfterSchoolM,
  "servBenAfterSchoolF" : +csvData.servBenAfterSchoolF,
  "servBenAfterSchoolAfrican" : +csvData.servBenAfterSchoolAfrican,
  "servBenAfterSchoolWhite" : +csvData.servBenAfterSchoolWhite,
  "servBenAfterSchoolIndian" : +csvData.servBenAfterSchoolIndian,
  "servBenAfterSchoolColoured" : +csvData.servBenAfterSchoolColoured,
  "servBenAfterSchoolSN" : +csvData.servBenAfterSchoolSN
    },
    "minMax" : {
  "servBenMinAge" : +csvData.servBenMinAge,
  "servBenMaxAge" : +csvData.servBenMaxAge
    }
 };

 var updateServExternalFunders =  {    
  "orgID" : +csvData.servExternalFunderorgID + 1000,
    "externalFunders" : {
  "servExternalFunderName" : csvData.servExternalFunderName,
  "servExternalFunderType" : csvData.servExternalFunderType,
  "servExternalFunderDonationType" : csvData.servExternalFunderDonationType,
  "servExternalFunderFrequency" : csvData.servExternalFunderFrequency
    }
 };

 var updateOrgManagementCommittee =  {    
  "orgID" : +csvData.orgMCorgID + 1000,
    "managementCommittee" : {
  "orgMCOffice" : csvData.orgMCOffice,
  "orgMCName" : csvData.orgMCName,
  "orgMCOccupation" : csvData.orgMCOccupation,
  "orgMCAddress" : csvData.orgMCAddress,
  "orgMCCell" : cleanString(csvData.orgMCCell),
  "orgMCIDNumber" : cleanString(csvData.orgMCIDNumber)
    }
 };

              // console.log('insertStaff: ' +  insertStaff.mainDetails.orgID ) ;
              // console.log( insertStaff ) ;
              // console.log( 'insertservBen: ' + insertservBen.orgID ) ;
              // console.log( insertservBen ) ;
        // console.log( 'updateServExternalFunders: ' + updateServExternalFunders.orgID ) ;
        // console.log( updateServExternalFunders.externalFunders ) ;

       if (+insertStaff.mainDetails.orgID > 1000) { Meteor.call('loadTestData', 'Staff', insertStaff); 
        }
       if (+insertservBen.orgID > 1000) { Meteor.call('loadTestData', 'ServBeneficiaryGroup', insertservBen); 
            }
       if (updateServExternalFunders.orgID > 21000) {
        var updOutput = Meteor.call('updateTestDataExtFun', updateServExternalFunders.orgID,updateServExternalFunders.externalFunders ); 
          console.log( 'updateServExternalFunders: ' + updateServExternalFunders.orgID + ' count: ' + updOutput) ;
               //  Collections.Service.update(
               // {'mainDetails.serviceID': updateServExternalFunders.orgID},
               // { $addToSet: {'externalFunders' : updateServExternalFunders.externalFunders} }                ) 
        }       
       // if (updateOrgManagementCommittee.orgID > 1000) { Meteor.call('updateTestDataOrgManComm', updateOrgManagementCommittee); } 
       // insertStaff.orgID > 999 ? Meteor.call('loadTestData', 'Facility', insertFacility);
      }); // _.each
      // var tableCountMsg = 'Staff: ' + Meteor.call('countCollection',  'Staff') + ' , ServbenGroup: ' +  Meteor.call('countCollection',  'ServbeneficiaryGroup') ;
          var tableCountMsg = 'Staff: ' +  Collections.Staff.find().count()  + ' , ServbenGroup: ' +  Collections.ServBeneficiaryGroup.find().count() ;
       alert('Other Table counts after load: ' + tableCountMsg);
      } // complete
     }); //  Papa.parse 
   }); //  $.get(csvfile
  }  // if count() < 3 
  } // click #load-data': function(e)
}); // Template.loadData.events

 //  }, 2000)) ;  // setTimeout(self.autorun
 // });  // Template.staff.onCreated

// });  // Meteor.startup(function ()