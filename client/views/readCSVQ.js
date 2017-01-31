
Template.loadData.events({
  'click #load-quality-data': function(e) {
      // var service = this;
      e.preventDefault();
      // Session.set("loadingTestData", true);

var testForData = Collections.ServiceQualityECD.find().count() ;

      var tableCountMsg = 'ServQuality: ' + Collections.ServiceQualityECD.find().count()  + ' , FacQuality: ' +
           Collections.FacilityQualityECD.find().count() ;
       console.log('Quality Table counts before load: ' + tableCountMsg);

if  (typeof testForData == 'undefined') 
  { console.log( 'Not able to count data for table: ServiceQualityECD'); }
 else if (testForData > 10 ) {  // 3 / 9999 DUMMY to hold on this
   alert( 'Test data will NOT be loaded for tables: ServiceQualityECD, FacilityQualityECD as they appear to already have at least 10 rows'); }
 else if (testForData == 0) {  // 3 / 9999 DUMMY to hold on this
   alert( 'Test data will be loaded for 0-row tables: ServiceQualityECD, FacilityQualityECD'); 

    var csvfile = "/data/OFS10_120.csv";

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

    $.get(csvfile, function (data) {
        // var csvData = Papa.parse(data);
    Papa.parse( data , {
    // Papa.parse(template.find('#csv-file').files[0], {
          header: true,
          skipEmptyLines: true,
          complete: function(results) {
               _.each(results.data, function(csvData) {
                   // console.log(csvData.servMealsProvided + ' , ' + csvData.facHazardsWater);

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
    "serviceQualityB" : {
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
    "serviceQualityC" : {
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
    "serviceQualityD" : {
  "servGeoType" : stringToBoolean(csvData.servGeoType),
  "servDateofProfileCompletion" : stringToBoolean(csvData.servDateofProfileCompletion),
  "servPersonRespForProfile" : stringToBoolean(csvData.servPersonRespForProfile),
  "servNoOfChildrenOnInspectionDate" : +csvData.servNoOfChildrenOnInspectionDate,
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
  "facToysandResourcesStoredSafely" : csvData.facToysandResourcesStoredSafely
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
    "office" : {
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
  "facOutdoorEquipIssues" : csvData.facOutdoorEquipIssues,
  "facSitePerimeterEnclosed" : csvData.facSitePerimeterEnclosed
    },
    "outdoorsEquipment" : {
  "facOutdoorEquipRottenWood" : csvData.facOutdoorEquipRottenWood,
  "facOutdoorEquipUnstable" : csvData.facOutdoorEquipUnstable,
  "facOutdoorEquipSharpObjects" : csvData.facOutdoorEquipSharpObjects,
  "facOutdoorEquipUnsafeSeats" : csvData.facOutdoorEquipUnsafeSeats,
  "facOutdoorEquipTooHighNoRails" : csvData.facOutdoorEquipTooHighNoRails,
  "facOutdoorEquipFrayedRopes" : csvData.facOutdoorEquipFrayedRopes,
  "facGate" : csvData.facGate
    }
} ;
  
       Meteor.call('loadTestData', 'ServiceQualityECD', insertSQ);
       Meteor.call('loadTestData', 'FacilityQualityECD', insertFQ);
  
      }); // _.each
      var tableCountMsg = 'ServQuality: ' + Collections.ServiceQualityECD.find().count()  + ' , FacQuality: ' +
           Collections.FacilityQualityECD.find().count() ;
       alert('Quality Table counts after load: ' + tableCountMsg);

       // Session.set("loadingTestData", false);
      } // complete
     }); //  Papa.parse 
    }); //  $.get(csvfile

  }  // if count() < 3 
  } // click #load-data': function(e)
}); // Template.loadData.events

