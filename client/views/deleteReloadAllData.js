
Template.loadData.events({

'click #reporting-table-reload': function(e) {
      // var service = this;
      e.preventDefault();
      // console.log(Meteor.call('loadReportingTables')) ;
      Meteor.call('loadReportingTables') ;
},

'click #delete-reload-all-data': function(e) {
      // var service = this;
      e.preventDefault();

    // var csvFileOFS   = "/data/OFS10_120.csv";
    // var csvFileOther = "/data/Other10_120.csv";
    var csvFileOFS   = "/data/OFS11_260.csv";
    var csvFileOther = "/data/Other11_260.csv";

var tableList = [ 'Organisation' , 'Facility', 'ServiceQualityECD', 'FacilityQualityECD' ,'Service', 'Staff', 'ServBeneficiaryGroup' ] ;

var r = confirm('Seven test tables will have their data DELETED - are you sure? Don`t take this decision lightly ;) ');
if (r == true) {
    alert('OK, deleteing data.. ');
    _.each(tableList, function(tableName){
   Meteor.call('dropCollection', tableName );  
   // console.log(tableName + "contents DELETED " );
    });
    } 
var cleanString = function(string){ // to santise cel numbers and ID numbers
     if ( string != null ) { 
         var newString = string.replace(/9/g,"3").replace(/8/g,"6").replace(/2/g,"7").replace(/5/g,"2").replace(/1/g,"8").replace(/2/g,"7");
      return newString;
        } 
      else { return ""; }
  };

String.prototype.capitalise = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var cleanName = function(string){ // to clean up typos in municipality or other place names
     if ( string != null ) { 
         var newString = string.replace(/Umziwabantu/g,"Umuziwabantu").replace(/Umuziwabant/g,"Umuziwabantu").replace(/Umuziwabantuu/g,"Umuziwabantu").replace(/ $/g,"").capitalise(); 
      return newString;
        } 
      else { return ""; }
  };

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

var stringToBoolean = function(string){
    if ( string != null ) { switch(string.toLowerCase().trim()){
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        // default: return Boolean(string);
        default: return false;
        } 
      }
      else { return false; }
};

var testForData = Collections.Service.find().count() ;

      var tableCountMsg = 'Org: ' + Collections.Organisation.find().count() + ' , Service: ' + 
       Collections.Service.find().count() + ' , Facility: ' + 
       Collections.Facility.find().count() ;
       // console.log('OFS Table counts before load: ' + tableCountMsg);

// if  (typeof testForData == 'undefined') 
//   { console.log( 'Not able to count data for table: Service'); }
//  else if (testForData > 10 ) {  // 3 / 9999 DUMMY to hold on this
//    alert( 'Test data will NOT be loaded for tables: Service, Facility, Organisation as they appear to already have at least 10 rows'); }
//  else if (testForData == 0) {  // 3 / 9999 DUMMY to hold on this
//    alert( 'Test data will be loaded for 0-row tables: Service, Facility, Organisation'); 
//    //parse the data file
//    console.log( 'Row count for table: Service = 0, so loading test data from: ' + csvfile); 
    $.get(csvFileOFS, function (data) {
    Papa.parse( data , {
          header: true,
          skipEmptyLines: true,
          complete: function(results) {
               _.each(results.data, function(csvData) {
 
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
    "primaryContacts" : {
  "orgPrimaryStaffContactName" : csvData.orgPrimaryStaffContactName.shuffle(),
  "orgPrimaryStaffContactCell" : csvData.orgPrimaryStaffContactCell.shuffle(),
  "orgPrimaryCommitteeContactName" : csvData.orgPrimaryCommitteeContactName.shuffle(),
  "orgPrimaryCommitteeContactCell" : csvData.orgPrimaryCommitteeContactCell.shuffle()
    },
    "organisationContact" : {
  "orgWebsite" : csvData.orgWebsite,
  "orgFax" : csvData.orgFax,
  "orgPhysicalAddress1" : csvData.orgPhysicalAddress1,
  "orgPhysicalAddress2" : csvData.orgPhysicalAddress2,
  "orgCityVillage" : csvData.orgCityVillage,
  "orgLocalMuni" : csvData.orgLocalMuni,
  "orgLandline" : csvData.orgLandline,
  "orgEmail" : csvData.orgEmail,
  "orgPostalAddress1" : csvData.orgPostalAddress1,
  "orgPostalAddress2" : csvData.orgPostalAddress2,
  "orgPostalCode" : csvData.orgPostalCode
    },
    "governance" : {
  "orgManagementCommitteeExists" : csvData.orgManagementCommitteeExists,
  "orgConstitutionExists" : csvData.orgConstitutionExists,
  "orgNumberMembersManCom" : +csvData.orgNumberMembersManCom,
  "orgManComMinutesKept" : csvData.orgManComMinutesKept,
  "orgManComMeetingsinLastYear" : +csvData.orgManComMeetingsinLastYear,
  "orgManComTraining" : csvData.orgManComTraining
    },
  //   "managementCommittee" : {
  // "orgMCOffice" : csvData.orgMCOffice,
  // "orgMCName" : csvData.orgMCName,
  // "orgMCOccupation" : csvData.orgMCOccupation,
  // "orgMCAddress" : csvData.orgMCAddress,
  // "orgMCCell" : csvData.orgMCCell.shuffle()
  //   },
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
  // "facName" : csvData.facName,  NB NB NB NB NB NB NB NB NB NB TEMP STEP - borrow orgName:
  "facName" : csvData.orgName,  
  "facDistMuni" : csvData.facDistMuni,
  "facLocalMuni" : cleanName(csvData.facLocalMuni),
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
  "facGeoType" : csvData.servGeoType,
  "facPropertySize" : +csvData.facPropertySize,
  "facSlope" : csvData.facSlope,
  "facBuildingSize" : +csvData.facBuildingSize,
  "facRoadAccess" : csvData.facRoadAccess
    }
} ;

 var insertService =  {

    "mainDetails" : {
  "serviceID" : +csvData.orgID + 1000,
  // "servName" : csvData.servName,  NB NB NB NB NB NB NB NB NB NB TEMP STEP - borrow orgName:
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

  var insertSQ =  {
  
  "serviceID" : +csvData.orgID + 1000,
    "nutrition" : {
  "servMealsProvided" : csvData.servMealsProvided,
  "servWeeklyMenu" : csvData.servWeeklyMenu,
  "servBreakfastProvider" : csvData.servBreakfastProvider,
  "servMSnackProvider" : csvData.servMSnackProvider,
  "servLunchProvider" : csvData.servLunchProvider,
  "servPMSnackProvider" : csvData.servPMSnackProvider,
  "servFruitProvided" : csvData.servFruitProvided
    },
    "stimulation" : {
  "servDailyProgAvail" : csvData.servDailyProgAvail,
  "servDailyProgFollow" : csvData.servDailyProgFollow,
  "servChildDivided" : csvData.servChildDivided,
  "servChartsUsed" : csvData.servChartsUsed,
  "servThemesUsed" : csvData.servThemesUsed
    },
    "recordKeeping" : {
  "servStaffRegister" : stringToBoolean(csvData.servStaffRegister),
  "servChildrensFiles" : stringToBoolean(csvData.servChildrensFiles),
  "servIncidentAbuseRegister" : stringToBoolean(csvData.servIncidentAbuseRegister),
  "servMedicineRegister" : stringToBoolean(csvData.servMedicineRegister),
  "servAttendanceRegister" : stringToBoolean(csvData.servAttendanceRegister),
  "servVisitorsRegister" : stringToBoolean(csvData.servVisitorsRegister),
  "servEnrollBirthCerts" : stringToBoolean(csvData.servEnrollBirthCerts),
  "servEnrollContactDetails" : stringToBoolean(csvData.servEnrollContactDetails),
  "servEnrollDateofAdmission" : stringToBoolean(csvData.servEnrollDateofAdmission),
  "servEnrollDischargeDate" : stringToBoolean(csvData.servEnrollDischargeDate),
  "servEnrollMedicalHistory" : stringToBoolean(csvData.servEnrollMedicalHistory),
  "servEnrollSpecialNeedsAllergies" : stringToBoolean(csvData.servEnrollSpecialNeedsAllergies),
  "servEnrollImmunisationRecords" : stringToBoolean(csvData.servEnrollImmunisationRecords)
    },
    "policiesAndProcedures" : {
  "servDisciplinePolicy" : stringToBoolean(csvData.servDisciplinePolicy),
  "servTransportPolicy" : stringToBoolean(csvData.servTransportPolicy),
  "servDisabilityPolicy" : stringToBoolean(csvData.servDisabilityPolicy),
  "servHealthIdentifyIllness" : stringToBoolean(csvData.servHealthIdentifyIllness),
  "servHealthDealwithIllness" : stringToBoolean(csvData.servHealthDealwithIllness),
  "servHealthMedicine" : stringToBoolean(csvData.servHealthMedicine),
  "servHealthInfectiousDiseases" : stringToBoolean(csvData.servHealthInfectiousDiseases),
  "servHealthHygieneStandards" : stringToBoolean(csvData.servHealthHygieneStandards),
  "servHealthStaffHealth" : stringToBoolean(csvData.servHealthStaffHealth)
    },
    "profileCompletionDetails" : {
  "servDateofProfileCompletion" : stringToBoolean(csvData.servDateofProfileCompletion),
  "servPersonRespForProfile" : stringToBoolean(csvData.servPersonRespForProfile),
  "servNoOfChildrenOnInspectionDate" : +csvData.servNoOfChildrenOnInspectionDate
    },
   "additionalServicesOffered" : {
  "servLifeSkills" : stringToBoolean(csvData.servLifeSkills),
  "servAfterCare" : stringToBoolean(csvData.servAfterCare),
  "servHealthmonitoringSupport" : stringToBoolean(csvData.servHealthmonitoringSupport),
  "servHomeVisits" : stringToBoolean(csvData.servHomeVisits),
  "servHomeworkHelp" : stringToBoolean(csvData.servHomeworkHelp),
  "servParentingSkills" : stringToBoolean(csvData.servParentingSkills),
  "servSportsRecreation" : stringToBoolean(csvData.servSportsRecreation),
  "servCounselling" : stringToBoolean(csvData.servCounselling)
    }

} ;

var insertFQ =  {    

"facID" : +csvData.orgID + 1000,
    "hazards" : {
  "facHazardsWater" : csvData.facHazardsWater,
  "facHazardsHoles" : csvData.facHazardsHoles,
  "facHazardsRoads" : csvData.facHazardsRoads,
  "facHazardsRailway" : csvData.facHazardsRailway,
  "facHazardsOpenFlame" : csvData.facHazardsOpenFlame,
  "facHazardsElectrical" : csvData.facHazardsElectrical,
  "facHazardsRefusePit" : csvData.facHazardsRefusePit,
  "facHazardsParrafinGas" : csvData.facHazardsParrafinGas
    },
    "healthAndSafety" : {
  "facClinicContact" : csvData.facClinicContact,
  "facFireExtinguisherNum" : +csvData.facFireExtinguisherNum,
  "facMedicineandCleaningoutofReach" : csvData.facMedicineandCleaningoutofReach,
  "facElectricsSafe" : csvData.facElectricsSafe,
  "facPlugSocketsCovered" : csvData.facPlugSocketsCovered,
  "facRubbishBinsAvailable" : csvData.facRubbishBinsAvailable,
  "facRefuseDisposal" : csvData.facRefuseDisposal,
  "facMunicipalRefuseCollection" : csvData.facMunicipalRefuseCollection,
  "facOnSiteRefuseBurning" : csvData.facOnSiteRefuseBurning,
  "facSandpitCovered" : csvData.facSandpitCovered,
  "facSandpitSalted" : csvData.facSandpitSalted,
  "facVerminorAnimals" : csvData.facVerminorAnimals,
  "facOutsideAreaRubbishFree" : csvData.facOutsideAreaRubbishFree,
  "facFirstAidKit" : csvData.facFirstAidKit,
  "facFirstAidKitStocked" : csvData.facFirstAidKitStocked,
  "facInsideClean" : csvData.facInsideClean,
  "facTidyPremises" : csvData.facTidyPremises,
  "facFoodGarden" : csvData.facFoodGarden,
  "facPurchasesVegetables" : csvData.facPurchasesVegetables,
  "facToysandResourcesStoredSafely" : csvData.facToysandResourcesStoredSafely,
  "facSitePerimeterEnclosed" : csvData.facSitePerimeterEnclosed,
  "facGate" : csvData.facGate
    },
    "equipment" : {
  "facWheelchairRamp" : csvData.facWheelchairRamp,
  "facMattressesAvailable" : csvData.facMattressesAvailable,
  "facMattressesSufficient" : csvData.facMattressesSufficient,
  "facMattressesGoodCondition" : csvData.facMattressesGoodCondition,
  "facChairsAvailable" : csvData.facChairsAvailable,
  "facChairsSufficient" : csvData.facChairsSufficient,
  "facChairsGoodCondition" : csvData.facChairsGoodCondition,
  "facTablesAvailable" : csvData.facTablesAvailable,
  "facTablesSufficient" : csvData.facTablesSufficient,
  "facTablesGoodCondition" : csvData.facTablesGoodCondition,
  "facStorageAvailable" : csvData.facStorageAvailable,
  "facStorageSufficient" : csvData.facStorageSufficient,
  "facStorageGoodCondition" : csvData.facStorageGoodCondition,
  "facFloorCoveringAvailable" : csvData.facFloorCoveringAvailable,
  "facFloorCoveringSufficient" : csvData.facFloorCoveringSufficient,
  "facFloorCoveringGoodCondition" : csvData.facFloorCoveringGoodCondition,
  "facCookingUtensilsAvailable" : csvData.facCookingUtensilsAvailable,
  "facCookingUtensilsSufficient" : csvData.facCookingUtensilsSufficient,
  "facCookingUtensilsGoodCondition" : csvData.facCookingUtensilsGoodCondition,
  "facOfficeEquipmentAvailable" : csvData.facOfficeEquipmentAvailable,
  "facOfficeEquipmentSufficient" : csvData.facOfficeEquipmentSufficient,
  "facOfficeEquipmentGoodCondition" : csvData.facOfficeEquipmentGoodCondition,
  "facChildrensBooksAvailable" : csvData.facChildrensBooksAvailable,
  "facChildrensBooksSufficient" : csvData.facChildrensBooksSufficient,
  "facChildrensBooksGoodCondition" : csvData.facChildrensBooksGoodCondition,
  "facConstructionToysAvailable" : csvData.facConstructionToysAvailable,
  "facConstructionToysSufficient" : csvData.facConstructionToysSufficient,
  "facConstructionToysGoodCondition" : csvData.facConstructionToysGoodCondition,
  "facPuzzlesAvailable" : csvData.facPuzzlesAvailable,
  "facPuzzlesSufficient" : csvData.facPuzzlesSufficient,
  "facPuzzlesGoodCondition" : csvData.facPuzzlesGoodCondition,
  "facArtMaterialsAvailable" : csvData.facArtMaterialsAvailable,
  "facArtMaterialsSufficient" : csvData.facArtMaterialsSufficient,
  "facArtMaterialsGoodCondition" : csvData.facArtMaterialsGoodCondition,
  "facPostersChartsAvailable" : csvData.facPostersChartsAvailable,
  "facPostersChartsSufficient" : csvData.facPostersChartsSufficient,
  "facPostersChartsGoodCondition" : csvData.facPostersChartsGoodCondition,
  "facOutdoorToysAvailable" : csvData.facOutdoorToysAvailable,
  "facOutdoorToysSufficient" : csvData.facOutdoorToysSufficient,
  "facOutdoorToysGoodCondition" : csvData.facOutdoorToysGoodCondition,
  "facFantasyPlayAvailable" : csvData.facFantasyPlayAvailable,
  "facFantasyPlaySufficient" : csvData.facFantasyPlaySufficient,
  "facFantasyPlayGoodCondition" : csvData.facFantasyPlayGoodCondition
    },
    "separationOfAges" : {
  "facChildSeparatedbyAge" : csvData.facChildSeparatedbyAge,
  "facAftercareSeparated" : csvData.facAftercareSeparated
    },
    "rooms" : {
  "facRoomsNum" : +csvData.facRoomsNum,
  "facRoom1Size" : +csvData.facRoom1Size,
  "facRoom2Size" : +csvData.facRoom2Size,
  "facRoom3Size" : +csvData.facRoom3Size,
  "facRoom4Size" : +csvData.facRoom4Size,
  "facRoom5Size" : +csvData.facRoom5Size
    },
    "structure" : {
  "facRoofType" : csvData.facRoofType,
  "facRoofLeaks" : csvData.facRoofLeaks,
  "facRoofAttached" : csvData.facRoofAttached,
  "facCementFoundation" : csvData.facCementFoundation,
  "facWallQuality" : csvData.facWallQuality,
  "facFloorType" : csvData.facFloorType,
  "facExternalDoorsNum" : +csvData.facExternalDoorsNum,
  "facDoorQuality" : csvData.facDoorQuality,
  "facExternalWindowsOpen" : csvData.facExternalWindowsOpen,
  "facWindowQual" : csvData.facWindowQual
    },
    "kitchen" : {
  "facKitchenSeparate" : csvData.facKitchenSeparate,
  "facKitchenSize" : +csvData.facKitchenSize,
  "facFridge" : csvData.facFridge,
  "facCleaningMaterials" : csvData.facCleaningMaterials,
  "facCookingEquip" : csvData.facCookingEquip,
  "facKitchenHotWater" : csvData.facKitchenHotWater,
  "facKitchenAccess" : csvData.facKitchenAccess
    },
    "officeAndSickbay" : {
  "facSickBaySeparate" : csvData.facSickBaySeparate,
  "facSickbayOfficeShared" : csvData.facSickbayOfficeShared,
  "facOfficeSpace" : csvData.facOfficeSpace,
  "facOfficeSeparate" : csvData.facOfficeSeparate,
  "facOfficeSize" : +csvData.facOfficeSize
    },
    "power" : {
  "facElectricity" : csvData.facElectricity,
  "facVisibility" : csvData.facVisibility,
  "facLightSource" : csvData.facLightSource,
  "facCookingFuelSource" : csvData.facCookingFuelSource
    },
    "drinkingWater" : {
  "facWaterSupply" : csvData.facWaterSupply,
  "facWaterTreatment" : csvData.facWaterTreatment
    },
    "sanitation" : {
  "facSanitationType" : csvData.facSanitationType,
  "facToiletsAdultNum" : +csvData.facToiletsAdultNum,
  "facToiletsChildNum" : +csvData.facToiletsChildNum,
  "facPottiesNum" : +csvData.facPottiesNum,
  "facToiletSeatsChildSafe" : csvData.facToiletSeatsChildSafe,
  "facToiletsClean" : csvData.facToiletsClean,
  "facToiletsStableFloors" : csvData.facToiletsStableFloors,
  "facToiletsCovered" : csvData.facToiletsCovered,
  "facHandWashType" : csvData.facHandWashType,
  "facHandWashNum" : +csvData.facHandWashNum,
  "facSoapandTowels" : csvData.facSoapandTowels,
  "facHandWashReachable" : csvData.facHandWashReachable,
  "facNappyChangingAwayFromFood" : csvData.facNappyChangingAwayFromFood,
  "facNappyChangingCleanable" : csvData.facNappyChangingCleanable
    },
    "outdoors" : {
  "facOutdoorPlaySize" : +csvData.facOutdoorPlaySize,
  "facJungleGym" : csvData.facJungleGym,
  "facSwings" : csvData.facSwings,
  "facSandpit" : csvData.facSandpit,
  "facSlide" : csvData.facSlide,
  "facOutdoorEquipOther" : csvData.facOutdoorEquipOther,
  "facOutdoorEquipIssues" : csvData.facOutdoorEquipIssues
    },
    "outdoorsEquipment" : {
  "facOutdoorEquipRottenWood" : csvData.facOutdoorEquipRottenWood,
  "facOutdoorEquipUnstable" : csvData.facOutdoorEquipUnstable,
  "facOutdoorEquipSharpObjects" : csvData.facOutdoorEquipSharpObjects,
  "facOutdoorEquipUnsafeSeats" : csvData.facOutdoorEquipUnsafeSeats,
  "facOutdoorEquipTooHighNoRails" : csvData.facOutdoorEquipTooHighNoRails,
  "facOutdoorEquipFrayedRopes" : csvData.facOutdoorEquipFrayedRopes
    }
} ;
  
       Meteor.call('loadTestData', 'ServiceQualityECD', insertSQ);
       Meteor.call('loadTestData', 'FacilityQualityECD', insertFQ);
       Meteor.call('loadTestData', 'Organisation', insertOrg);
       Meteor.call('loadTestData', 'Service', insertService);
       Meteor.call('loadTestData', 'Facility', insertFacility);
      }); // _.each
      var tableCountMsg = 'Org: ' + Collections.Organisation.find().count() + ' , Service: ' + 
       Collections.Service.find().count() + ' , Facility: ' + 
		   Collections.Facility.find().count() ;
       // alert('OFS Table counts after load: ' + tableCountMsg);
      } // complete
     }); //  Papa.parse 
   }); //  $.get(csvFileOFS
 
// OFS end, now OTHER - Staff + SBG ++ ######################################################

// ###################################################

   // console.log( 'Row count for table: Staff < 10, so loading test data from: ' + csvfile); 
    $.get(csvFileOther, function (data) {
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
  "staffID" : +csvData.staffID.shuffle(),
  "orgID" : +csvData.stafforgID + 1000,
  "staffName" : csvData.staffName.shuffle(),
  // "staffIDNumber" : csvData.staffIDNumber.shuffle(),
  "staffContactNumber" : csvData.staffContactNumber.shuffle(),
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
  // "staffMonthlyRemuneration" : ((+csvData.staffMonthlyRemuneration + 431) * 100 + 765432).shuffle(),
  "staffMonthlyRemuneration" : "9765431".shuffle(),
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
  "orgMCCell" : csvData.orgMCCell.shuffle(),
  "orgMCIDNumber" : csvData.orgMCIDNumber.shuffle()
    }
 };

        // console.log( 'updateServExternalFunders: ' + updateServExternalFunders.orgID ) ;
        // console.log( updateServExternalFunders.externalFunders ) ;

       if (+insertStaff.mainDetails.orgID > 1000) { Meteor.call('loadTestData', 'Staff', insertStaff); 
        }
       if (+insertservBen.orgID > 1000) { Meteor.call('loadTestData', 'ServBeneficiaryGroup', insertservBen); 
            }
       if (updateServExternalFunders.orgID > 21000) {
        var updOutput = Meteor.call('updateTestDataExtFun', updateServExternalFunders.orgID,updateServExternalFunders.externalFunders ); 
          // console.log( 'updateServExternalFunders: ' + updateServExternalFunders.orgID + ' count: ' + updOutput) ;
               //  Collections.Service.update(
               // {'mainDetails.serviceID': updateServExternalFunders.orgID},
               // { $addToSet: {'externalFunders' : updateServExternalFunders.externalFunders} }                ) 
        }       
       // if (updateOrgManagementCommittee.orgID > 1000) { Meteor.call('updateTestDataOrgManComm', updateOrgManagementCommittee); } 
       // insertStaff.orgID > 999 ? Meteor.call('loadTestData', 'Facility', insertFacility);
      }); // _.each
      // var tableCountMsg = 'Staff: ' + Meteor.call('countCollection',  'Staff') + ' , ServbenGroup: ' +  Meteor.call('countCollection',  'ServbeneficiaryGroup') ;
          var tableCountMsg = 'Staff: ' +  Collections.Staff.find().count()  + ' , ServbenGroup: ' +  Collections.ServBeneficiaryGroup.find().count() ;
       // alert('Other Table counts after load: ' + tableCountMsg);
      } // complete
     }); //  Papa.parse 
   }); //  $.get(csvFileOther

  // }  // if count() < 3 - check REMOVED for AllData version
  } // click #load-data': function(e)
}); // Template.loadData.events

 