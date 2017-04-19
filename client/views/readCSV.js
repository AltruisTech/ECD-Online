
Template.loadData.events({
  'click #delete-ofs-data': function(e) {
      // var service = this;
      e.preventDefault();

var tableList = [ 'Organisation' , 'Facility', 'ServiceQualityECD', 'FacilityQualityECD' ,'Service', 'Staff', 'ServBeneficiaryGroup' ] ;

var r = confirm('Seven test tables will have their data DELETED - are you sure? Don`t take this decision lightly ;) ');
if (r == true) {
    alert('OK, deleteing data.. ');
    _.each(tableList, function(tableName){
   Meteor.call('dropCollection', tableName );  
   console.log(tableName + "contents DELETED " );
    });
    } else {
    alert('Phew, nothing deleted :)');
    }

},
  'click #count-ofs-data': function(e) {
      // var service = this;
      e.preventDefault();
    var tableList = [ 'Organisation' , 'Facility', 'ServiceQualityECD', 'FacilityQualityECD' ,'Service', 'Staff', 'ServBeneficiaryGroup' ] ;
     // tableCountMsgPrev = "1 " ;
     var tableCountMsg , tableCountMsgPrev ; 

    _.each(tableList, function(collectionName){
      // console.log(collectionName);
    var collectionCount = Collections[collectionName].find().count() ;
      // var collectionCount = Meteor.call('countCollectionZZ', collectionName );         
      // console.log(collectionName + collectionCount);
      // var tableCountMsg = tableCountMsgPrev.concat(collectionName, ': ', collectionCount.toString(), ', ' );
      tableCountMsg += collectionName + ': ' + collectionCount + ', ' ;
      tableCountMsgPrev = tableCountMsg ;
      // console.log(tableCountMsg);
    });
       // alert('All test data table counts: ' + tableCountMsg);
      console.log(tableCountMsg);
},
 'click #load-ofs-data': function(e) {
      // var service = this;
      e.preventDefault();
 

var cleanString = function(string){ // to santise cel numbers and ID numbers
     if ( string != null ) { 
         var newString = string.replace(/9/g,"3").replace(/8/g,"6").replace(/2/g,"7").replace(/5/g,"2").replace(/1/g,"8").replace(/2/g,"7");
      return newString;
        } 
      else { return ""; }
  };

var testForData = Collections.Service.find().count() ;

      var tableCountMsg = 'Org: ' + Collections.Organisation.find().count() + ' , Service: ' + 
       Collections.Service.find().count() + ' , Facility: ' + 
       Collections.Facility.find().count() ;
       console.log('OFS Table counts before load: ' + tableCountMsg);

if  (typeof testForData == 'undefined') 
  { console.log( 'Not able to count data for table: Service'); }
 else if (testForData > 10 ) {  // 3 / 9999 DUMMY to hold on this
   alert( 'Test data will NOT be loaded for tables: Service, Facility, Organisation as they appear to already have at least 10 rows'); }
 else if (testForData == 0) {  // 3 / 9999 DUMMY to hold on this
   alert( 'Test data will be loaded for 0-row tables: Service, Facility, Organisation'); 
    // console.log('btnReadCsv clicked')
  //parse the data file
    // var csvfile = "/data/OFS2_01.csv";
    var csvfile = "/data/OFS10_120.csv";
   console.log( 'Row count for table: Service = 0, so loading test data from: ' + csvfile); 
    $.get(csvfile, function (data) {
        // var csvData = Papa.parse(data);
    Papa.parse( data , {
    // Papa.parse(template.find('#csv-file').files[0], {
          header: true,
          skipEmptyLines: true,
          complete: function(results) {
               _.each(results.data, function(csvData) {
                   // console.log(+csvData.orgID + 1000 + ' , ' + csvData.orgName);

var insertOrg =  {
    "mainDetails" : {
  "orgID" : +csvData.orgID + 1000,
  "orgName" : csvData.orgName,
  "orgType" : csvData.orgType,
  "orgLegalEntity" : csvData.orgLegalEntity,
  "orgYearStarted" : csvData.orgYearStarted,
  "orgNumBeneficiaries" : +csvData.orgNumBeneficiaries,
  "orgNumFullTimeStaff" : +csvData.orgNumFullTimeStaff,
  "orgNumPartTimeStaff" : +csvData.orgNumPartTimeStaff,
  "orgNPOReg" : csvData.orgNPOReg,
  "orgNPORegDate" : csvData.orgNPORegDate,
  "orgNPONum" : csvData.orgNPONum
    },
    "staffContact" : {
  "orgPrimaryStaffContactName" : cleanString(csvData.orgPrimaryStaffContactName),
  "orgPrimaryStaffContactCell" : cleanString(csvData.orgPrimaryStaffContactCell),
  "orgLandline" : csvData.orgLandline,
  "orgEmail" : csvData.orgEmail,
  "orgPostalAddress1" : csvData.orgPostalAddress1,
  "orgPostalAddress2" : csvData.orgPostalAddress2,
  "orgPostalCode" : csvData.orgPostalCode
    },
    "commiteeContact" : {
  "orgPrimaryCommitteeContactName" : csvData.orgPrimaryCommitteeContactName,
  "orgPrimaryCommitteeContactCell" : cleanString(csvData.orgPrimaryCommitteeContactCell),
  "orgWebsite" : csvData.orgWebsite,
  "orgFax" : csvData.orgFax,
  "orgPhysicalAddress1" : csvData.orgPhysicalAddress1,
  "orgPhysicalAddress2" : csvData.orgPhysicalAddress2,
  "orgCityVillage" : csvData.orgCityVillage,
  "orgLocalMuni" : csvData.orgLocalMuni
    },
    "governance" : {
  "orgManagementCommitteeExists" : csvData.orgManagementCommitteeExists,
  "orgConstitutionExists" : csvData.orgConstitutionExists,
  "orgNumberMembersManCom" : +csvData.orgNumberMembersManCom,
  "orgManComMinutesKept" : csvData.orgManComMinutesKept,
  "orgManComMeetingsinLastYear" : +csvData.orgManComMeetingsinLastYear,
  "orgManComTraining" : csvData.orgManComTraining
    },
    "managementCommittee" : {
  "orgMCOffice" : csvData.orgMCOffice,
  "orgMCName" : csvData.orgMCName,
  "orgMCOccupation" : csvData.orgMCOccupation,
  "orgMCAddress" : csvData.orgMCAddress,
  "orgMCCell" : cleanString(csvData.orgMCCell)
    },
    "financialManagement" : {
  "orgBankAccount" : csvData.orgBankAccount,
  "orgBankAccountHolder" : csvData.orgBankAccountHolder,
  "orgPBORegistered" : csvData.orgPBORegistered,
  "orgAFS" : csvData.orgAFS,
  "orgAFSPreparedonTime" : csvData.orgAFSPreparedonTime,
  "orgDSDNarrativeSubmitted" : csvData.orgDSDNarrativeSubmitted
    }
};

 var insertFacility =  {    

    "location" : {
  "facID" : +csvData.orgID + 1000,
  "facName" : csvData.facName,
  "facDistMuni" : csvData.facDistMuni,
  "facLocalMuni" : csvData.facLocalMuni,
  "facWard" : csvData.facWard,
  "facTradAuth" : csvData.facTradAuth,
  ///////// NB below 6 coped from Org data as dropped from spreadsheet:
  "facPhAddress1" : csvData.orgPhysicalAddress1,
  "facPhAddress2" : csvData.orgPhysicalAddress2,
  "facCityVillage" : csvData.orgCityVillage,
  "facPostAddress1" : csvData.orgPostalAddress1,
  "facPostAddress2" : csvData.orgPostalAddress2,
  "facPostCode" : csvData.orgPostalCode,
  ///////// 
  "facLocationDescription" : csvData.facLocationDescription
    },
    "operation" : {
  "facOperatingDays" : csvData.facOperatingDays,
  "facStartTime" : csvData.facStartTime,
  "facCloseTime" : csvData.facCloseTime,
  "facHasSchoolHols" : csvData.facHasSchoolHols,
  "facNearestPSchool" : csvData.facNearestPSchool,
  "facNearestClinic" : csvData.facNearestClinic,
  "facNearestLandMark" : csvData.facNearestLandMark
    },
    "registration" : {
  "facPCRStatus" : csvData.facPCRStatus,
  "facPCRApplType" : csvData.facPCRApplType,
  "facPCRCategory" : csvData.facPCRCategory,
  "facPCRConditionInf" : csvData.facPCRConditionInf,
  "facPCRConditionEquip" : csvData.facPCRConditionEquip,
  "facPCRConditionHS" : csvData.facPCRConditionHS,
  "facPCRConditionStaff" : csvData.facPCRConditionStaff,
  "facPCRIssueDate" : csvData.facPCRIssueDate,
  "facPCRExpiryDate" : csvData.facPCRExpiryDate,
  "facPCRRegNum" : csvData.facPCRRegNum,
  "facPCRPermittedChildren" : +csvData.facPCRPermittedChildren,
  "facEHPInspectionDate" : csvData.facEHPInspectionDate,
  "facEHRefNumber" : csvData.facEHRefNumber,
  "facEHInternalArea" : csvData.facEHInternalArea,
  "facPCREHRecommendation" : csvData.facPCREHRecommendation,
  "facEHPermittedChildren" : csvData.facEHPermittedChildren
    },
    "details" : {
  "facType" : csvData.facType,
  "facStructureType" : csvData.facStructureType,
  "facLandOwner" : csvData.facLandOwner,
  "facOccupancy" : csvData.facOccupancy,
  "facLandAllocated" : csvData.facLandAllocated,
  "facLandAllocatedTo" : csvData.facLandAllocatedTo,
  "facGPSCoords" : csvData.facGPSCoords,
  "facPropertySize" : +csvData.facPropertySize,
  "facSlope" : csvData.facSlope,
  "facBuildingSize" : +csvData.facBuildingSize,
  "facRoadAccess" : csvData.facRoadAccess
    }
} ;


  var insertService =  {

    "mainDetails" : {
  "serviceID" : +csvData.orgID + 1000,
  "servName" : csvData.orgName,
  "servType" : csvData.servType
    },
    "registration" : {
  "servProgRegStats" : csvData.servProgRegStats,
  "servProgRegNR" : csvData.servProgRegNR,
  "servProgRegType" : csvData.servProgRegType,
  "servProgRegDec" : csvData.servProgRegDec,
  "servProgRegExpiry" : csvData.servProgRegExpiry,
  "servDoERegStatus" : csvData.servDoERegStatus
    },
    "subsidies" : {
  "servDSDPerChildSubsidy" : csvData.servDSDPerChildSubsidy,
  "servDSDPerChildSubsidyNum" : +csvData.servDSDPerChildSubsidyNum,
  "servDOEGradeRLearnerSub" : csvData.servDOEGradeRLearnerSub,
  "servDOEGradeRLearnerSubNum" : +csvData.servDOEGradeRLearnerSubNum,
  "servDOELearnerships" : csvData.servDOELearnerships,
  "servDOELearnershipsNum" : +csvData.servDOELearnershipsNum
    },
    "funding" : {
  "servFeesCharged" : csvData.servFeesCharged,
  "servMaxFees" : +csvData.servMaxFees,
  "servAnnualIncome" : +csvData.servAnnualIncome,
  "servDSDSLA" : csvData.servDSDSLA,
  "servDSDSLASigDate" : csvData.servDSDSLASigDate,
  "servDSDSLAExpiryDate" : csvData.servDSDSLAExpiryDate,
  "servDSDProgFunding" : csvData.servDSDProgFunding,
  "servDOEGradeRSalary" : csvData.servDOEGradeRSalary
    },
    "topDonors" : {
  "servTopDonor1" : csvData.servTopDonor1,
  "servTopDonorAmt1" : +csvData.servTopDonorAmt1,
  "servTopDonor2" : csvData.servTopDonor2,
  "servTopDonorAmt2" : +csvData.servTopDonorAmt2,
  "servTopDonor3" : csvData.servTopDonor3,
  "servTopDonorAmt2" : +csvData.servTopDonorAmt2
    },
    "externalFunders" : {
  "servExternalFunderName" : csvData.servExternalFunderName,
  "servExternalFunderType" : csvData.servExternalFunderType,
  "servExternalFunderDonationType" : csvData.servExternalFunderDonationType,
  "servExternalFunderFrequency" : +csvData.servExternalFunderFrequency
    }
} ;

       Meteor.call('loadTestData', 'Organisation', insertOrg);
       Meteor.call('loadTestData', 'Service', insertService);
       Meteor.call('loadTestData', 'Facility', insertFacility);
      }); // _.each
      var tableCountMsg = 'Org: ' + Collections.Organisation.find().count() + ' , Service: ' + 
       Collections.Service.find().count() + ' , Facility: ' + 
		   Collections.Facility.find().count() ;
       alert('OFS Table counts after load: ' + tableCountMsg);
      } // complete
     }); //  Papa.parse 
   }); //  $.get(csvfile
  }  // if count() < 3 
  } // click #load-data': function(e)
}); // Template.loadData.events

 