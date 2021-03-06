/************************************************************
- \both\collections\*.js is to declare Meteor objects as instances of MongoDB collections
- it also is home to the schema difintions which as act as gatekeepers to the collection
- package: https://github.com/aldeed/meteor-simple-schema/
*************************************************************/

// declare the Meteor objects as instances of the MongoDB collection:
Collections.FacilityQualityECD = new Mongo.Collection('facilityQualityECD');

// Attach the schema definition to the collection and define fields, datatypes, constraints and labels:
Collections.FacilityQualityECD.attachSchema(new SimpleSchema({
      'facID': { label: "Facility Identifier",
            type: Number },
      ///////////////////
      separationOfAges: {
            type: Object
      },
      'separationOfAges.facChildSeparatedbyAge': { label: "Are children separated 0-2;3-4;5-6",
            type: String, allowedValues: ['Yes', 'No'] },
      'separationOfAges.facAftercareSeparated': { label: "Are aftercare children aged 6+ kept separate",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      ///////////////////
      drinkingWater: {
            type: Object
      },
      'drinkingWater.facWaterSupply': { label: "How is water supplied",
            type: String, allowedValues: ['Municiapl-Site connection', 'Municipal-Community Standpipe', 'Municipal-Truck Delivery', 'Own Borehole', 'Protected Spring', 'Unprotected Spring', 'Rainwater', 'River'] },
      'drinkingWater.facWaterTreatment': { label: "Is water treated according to national health guidelines",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      ///////////////////
      rooms: {
            type: Object
      },
      'rooms.facRoomsNum': { label: "How many activity/play rooms are there?",
            type: Number },
      'rooms.facRoom1Size': { label: "Room 1 Size",
            type: Number },
      'rooms.facRoom2Size': { label: "Room 2 Size",
            optional: true, type: Number },
      'rooms.facRoom3Size': { label: "Room 3 Size",
            optional: true, type: Number },
      'rooms.facRoom4Size': { label: "Room 4 Size",
            optional: true, type: Number },
      'rooms.facRoom5Size': { label: "Room 5 Size",
            optional: true, type: Number },
      ///////////////////
      structure: {
            type: Object
      },
      'structure.facRoofType': { label: "Type of Roof",
            type: String, allowedValues: ['Tiles', 'Corrugated Metal Sheets', 'Thatched', 'Plastic', 'Tarpaulin/Canvas', 'Asbestos'] },
      'structure.facRoofLeaks': { label: "Does the roof have leaks",
            type: String, allowedValues: ['Yes', 'No'] },
      'structure.facRoofAttached': { label: "Is the roof securely attached to the building ",
            type: String, allowedValues: ['Yes', 'No'] },
      'structure.facCementFoundation': { label: "Is there a cement foundation",
            type: String, allowedValues: ['Yes', 'No'] },
      'structure.facWallQuality': { label: "Do the walls have large cracks, crumbling or holes",
            type: String, allowedValues: ['Yes', 'No'] },
      'structure.facFloorType': { label: "Floor Type",
            type: String, allowedValues: ['Earth', 'Dung', 'Concrete Slab', 'Vinyl Sheets/tiles', 'Carpet', 'Wood', 'Ceramic Tiles'] },
      'structure.facExternalDoorsNum': { label: "How many external doors",
            type: Number },
      'structure.facDoorQuality': { label: "Are they in a good state of repair",
            type: String, allowedValues: ['Yes', 'No'] },
      'structure.facExternalWindowsOpen': { label: "How many external windows in the playrooms can open",
            type: String },
      'structure.facWindowQual': { label: "Are windows cracked or missing glass panes?",
            type: String, allowedValues: ['Yes', 'No'] },
      ///////////////////
      kitchen: {
            type: Object
      },
      'kitchen.facKitchenSeparate': { label: "Is there a separate kitchen/cooking area",
            type: String, allowedValues: ['Yes', 'No'] },
      'kitchen.facKitchenSize': { label: "Kitchen Size (sqm)",
            type: Number },
      'kitchen.facFridge': { label: "Is there a fridge or cooling facility ",
            type: String, allowedValues: ['Yes', 'No'] },
      'kitchen.facCleaningMaterials': { label: "Are there cleaning materials",
            type: String, allowedValues: ['Yes', 'No'] },
      'kitchen.facCookingEquip': { label: "Is there cooking equipment available",
            type: String, allowedValues: ['Yes', 'No'] },
      'kitchen.facKitchenHotWater': { label: "Is there piped hot water in the kitchen",
            type: String, allowedValues: ['Yes', 'No'] },
      'kitchen.facKitchenAccess': { label: "Is the kitchen accessible by children",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      ///////////////////
      officeAndSickbay: {
            type: Object
      },
      'officeAndSickbay.facSickBaySeparate': { label: "Is there a dedicated space used only for a sickbay?",
            type: String, allowedValues: ['Yes', 'No'] },
      'officeAndSickbay.facSickbayOfficeShared': { label: "Is the sickbay part of the office?",
            type: String, allowedValues: ['Yes', 'No'] },
      'officeAndSickbay.facOfficeSpace': { label: "Is there a dedicated space used only for office/administration work",
            type: String, allowedValues: ['Yes', 'No'] },
      'officeAndSickbay.facOfficeSeparate': { label: "Is the office space a separate room",
            type: String, allowedValues: ['Yes', 'No'] },
      'officeAndSickbay.facOfficeSize': { label: "Office size (sqm)",
            type: Number },
      ///////////////////
      power: {
            type: Object
      },
      'power.facElectricity': { label: "Does the ECD centre have electricity",
            type: String, allowedValues: ['Yes', 'No'] },
      'power.facVisibility': { label: "Staff and children can see to read inside",
            type: String, allowedValues: ['Yes', 'No'] },
      'power.facLightSource': { label: "Source of fuel for lights",
            type: String, allowedValues: ['Electricity', 'Gas', 'Paraffin', 'Wood or Coal'] },
      'power.facCookingFuelSource': { label: "Source of fuel for cooking",
            type: String, allowedValues: ['Electricity', 'Gas', 'Paraffin', 'Wood or Coal'] },
      ///////////////////
      sanitation: {
            type: Object
      },
      'sanitation.facSanitationType': { label: "Type of Sanitation",
            type: String, allowedValues: ['Municipal Water Borne sewage', 'On site septic tank', 'On site municipal VIP', 'On site informal pit latrine', 'Potties', 'Buckets', 'Municipal-communal ablution block', 'Chemical Toilets', 'No toilets'] },
      'sanitation.facToiletsAdultNum': { label: "Number of toilets for adults",
            type: Number },
      'sanitation.facToiletsChildNum': { label: "Number of toilets for children",
            type: Number },
      'sanitation.facPottiesNum': { label: "No. of potties",
            type: Number },
      'sanitation.facToiletSeatsChildSafe': { label: "Child safe toilet seats",
            type: String, allowedValues: ['Yes', 'No'] },
      'sanitation.facToiletsClean': { label: "Toilets are clean",
            type: String, allowedValues: ['Yes', 'No'] },
      'sanitation.facToiletsStableFloors': { label: "Stable toilet floors",
            type: String, allowedValues: ['Yes', 'No'] },
      'sanitation.facToiletsCovered': { label: "Lids or covers on toilets",
            type: String, allowedValues: ['Yes', 'No'] },
      'sanitation.facHandWashType': { label: "What type of hand wash facility is provided",
            type: String, allowedValues: ['Tap', 'Tippy Tap', 'Bowl or bucket of water', 'None'] },
      'sanitation.facHandWashNum': { label: "No. of handwash facilities",
            type: Number },
      'sanitation.facSoapandTowels': { label: "Soap and Towels/facecloths Provided",
            type: String, allowedValues: ['Yes', 'No'] },
      'sanitation.facHandWashReachable': { label: "Children can reach hand wash facility",
            type: String, allowedValues: ['Yes', 'No'] },
      'sanitation.facNappyChangingAwayFromFood': { label: "Nappy changing area away from food",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'sanitation.facNappyChangingCleanable': { label: "Nappy area surface easily cleaned",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      ///////////////////
      outdoors: {
            type: Object
      },
      'outdoors.facOutdoorPlaySize': { label: "What size is the outdoor play area (sqm)",
            type: Number },
      'outdoors.facJungleGym': { label: "Jungle gym",
            type: String, allowedValues: ['Yes', 'No'] },
      'outdoors.facSwings': { label: "Swings",
            type: String, allowedValues: ['Yes', 'No'] },
      'outdoors.facSandpit': { label: "Sandpit",
            type: String, allowedValues: ['Yes', 'No'] },
      'outdoors.facSlide': { label: "Slide",
            type: String, allowedValues: ['Yes', 'No'] },
      'outdoors.facOutdoorEquipOther': { label: "Other",
            optional: true, type: String, allowedValues: ['Yes', 'No'] },
      'outdoors.facOutdoorEquipIssues': { label: "Visible issues with outdoor equipment",
            type: String },
      ///////////////////
      outdoorsEquipment: {
            type: Object
      },
      'outdoorsEquipment.facOutdoorEquipRottenWood': { label: "Visible issues with: Rotten Wood",
            type: String, allowedValues: ['Yes', 'No'] },
      'outdoorsEquipment.facOutdoorEquipUnstable': { label: "Visible issues with: Unstable",
            type: String, allowedValues: ['Yes', 'No'] },
      'outdoorsEquipment.facOutdoorEquipSharpObjects': { label: "Visible issues with: Sharp Objects",
            type: String, allowedValues: ['Yes', 'No'] },
      'outdoorsEquipment.facOutdoorEquipUnsafeSeats': { label: "Visible issues with: Unsafe Seats",
            type: String, allowedValues: ['Yes', 'No'] },
      'outdoorsEquipment.facOutdoorEquipTooHighNoRails': { label: "Visible issues with: To high without guard rails",
            type: String, allowedValues: ['Yes', 'No'] },
      'outdoorsEquipment.facOutdoorEquipFrayedRopes': { label: "Visible issues with: Frayed loose ropes",
            type: String, allowedValues: ['Yes', 'No'] },
      ///////////////////
      healthAndSafety: {
            type: Object
      },
      'healthAndSafety.facClinicContact': { label: "Contact with a clinic",
            type: String, allowedValues: ['Yes', 'No'] },
      'healthAndSafety.facFireExtinguisherNum': { label: "Number of Fire Extinguishers",
            type: Number },
      'healthAndSafety.facMedicineandCleaningoutofReach': { label: "Medicines and Cleaning Agents out of reach in marked containers",
            type: String, allowedValues: ['Yes', 'No'] },
      'healthAndSafety.facElectricsSafe': { label: "Electrical Wiring and Boards appear safe",
            type: String, allowedValues: ['Yes', 'No'] },
      'healthAndSafety.facPlugSocketsCovered': { label: "Electric Plug sockets are covered",
            type: String, allowedValues: ['Yes', 'No'] },
      'healthAndSafety.facRubbishBinsAvailable': { label: "Rubbish Bins Available",
            type: String, allowedValues: ['Yes', 'No'] },
      'healthAndSafety.facRefuseDisposal': { label: "Refuse Disposal",
            type: String, allowedValues: ['Municipal Collection', 'Centre takes to dump', 'Open pit on site', 'No refuse management'] },
      'healthAndSafety.facMunicipalRefuseCollection': { label: "Municipal Refuse Collection",
            type: String, allowedValues: ['1xper week', '2xper week', '1xevery two weeks', 'ad hoc', 'N/A'] },
      'healthAndSafety.facOnSiteRefuseBurning': { label: "On site refuse burning",
            type: String, allowedValues: ['1xper week', '2xper week', '1xevery two weeks', 'ad hoc', 'N/A'] },
      'healthAndSafety.facSandpitCovered': { label: "Sandpit covered overnight",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'healthAndSafety.facSandpitSalted': { label: "Sandpit salted every 6 weeks",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'healthAndSafety.facVerminorAnimals': { label: "Rats, vermin or animals on site",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'healthAndSafety.facOutsideAreaRubbishFree': { label: "Outside Space free from rubbish",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'healthAndSafety.facFirstAidKit': { label: "First Aid Kit",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'healthAndSafety.facFirstAidKitStocked': { label: "First Aid Kit - well stocked",
            type: String, allowedValues: ['Yes', 'No'] },
      'healthAndSafety.facInsideClean': { label: "Inside Space is Clean",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'healthAndSafety.facTidyPremises': { label: "Tidy Premises",
            type: String, allowedValues: ['Yes', 'No'] },
      'healthAndSafety.facFoodGarden': { label: "Food Garden",
            type: String, allowedValues: ['Yes', 'No'] },
      'healthAndSafety.facPurchasesVegetables': { label: "Extra Vegetables are Purchased",
            type: String, allowedValues: ['Yes', 'No'] },
      'healthAndSafety.facToysandResourcesStoredSafely': { label: "Toys and Resources Stored Safely",
            type: String, allowedValues: ['Yes', 'No'] },
      'healthAndSafety.facSitePerimeterEnclosed': { label: "Site Perimeter enclosed",
            type: String, allowedValues: ['Wall', 'Fence', 'Hedge', 'Nothing', 'Other'] },
      'healthAndSafety.facGate': { label: "Lockable, child-proof Gate",
            type: String, allowedValues: ['Yes', 'No'] },
      ///////////////////
      equipment: {
            type: Object
      },
      'equipment.facWheelchairRamp': { label: "Ramp for Wheelchair Users",
            type: String, allowedValues: ['Yes', 'No'] },
      'equipment.facMattressesAvailable': { label: "Mattresses Available",
            type: String, allowedValues: ['Yes', 'No'] },
      'equipment.facMattressesSufficient': { label: "Mattresses Sufficient",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facMattressesGoodCondition': { label: "Matresses Good Condition",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facChairsAvailable': { label: "Chairs, boxes or cushions Available",
            type: String, allowedValues: ['Yes', 'No'] },
      'equipment.facChairsSufficient': { label: "Chairs, boxes or cushions Sufficient",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facChairsGoodCondition': { label: "Chairs, boxes or cushions Good Condition",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facTablesAvailable': { label: "Tables or Work Surfaces Available",
            type: String, allowedValues: ['Yes', 'No'] },
      'equipment.facTablesSufficient': { label: "Tables or Work Surfaces  Sufficient",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facTablesGoodCondition': { label: "Tables or Work Surfaces  Good Condition",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facStorageAvailable': { label: "Shelves or Storage Available",
            type: String, allowedValues: ['Yes', 'No'] },
      'equipment.facStorageSufficient': { label: "Shelves or Storage  Sufficient",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facStorageGoodCondition': { label: "Shelves or Storage  Good Condition",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facFloorCoveringAvailable': { label: "Floor Covering Available",
            type: String, allowedValues: ['Yes', 'No'] },
      'equipment.facFloorCoveringSufficient': { label: "Floor Covering  Sufficient",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facFloorCoveringGoodCondition': { label: "Floor Covering  Good Condition",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facCookingUtensilsAvailable': { label: "Cooking Utensils Available",
            type: String, allowedValues: ['Yes', 'No'] },
      'equipment.facCookingUtensilsSufficient': { label: "Cooking Utensils  Sufficient",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facCookingUtensilsGoodCondition': { label: "Cooking Utensils  Good Condition",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facOfficeEquipmentAvailable': { label: "Office Equipment Available",
            type: String, allowedValues: ['Yes', 'No'] },
      'equipment.facOfficeEquipmentSufficient': { label: "Office Equipment  Sufficient",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facOfficeEquipmentGoodCondition': { label: "Office Equipment  Good Condition",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facChildrensBooksAvailable': { label: "Childrens Books Available",
            type: String, allowedValues: ['Yes', 'No'] },
      'equipment.facChildrensBooksSufficient': { label: "Childrens Books  Sufficient",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facChildrensBooksGoodCondition': { label: "Childrens Books  Good Condition",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facConstructionToysAvailable': { label: "Construction Toys Available",
            type: String, allowedValues: ['Yes', 'No'] },
      'equipment.facConstructionToysSufficient': { label: "Construction Toys  Sufficient",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facConstructionToysGoodCondition': { label: "Construction Toys  Good Condition",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facPuzzlesAvailable': { label: "Puzzles and Concept Toys Available",
            type: String, allowedValues: ['Yes', 'No'] },
      'equipment.facPuzzlesSufficient': { label: "Puzzles and Concept Toys  Sufficient",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facPuzzlesGoodCondition': { label: "Puzzles and Concept Toys  Good Condition",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facArtMaterialsAvailable': { label: "Art Materials Available",
            type: String, allowedValues: ['Yes', 'No'] },
      'equipment.facArtMaterialsSufficient': { label: "Art Materials  Sufficient",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facArtMaterialsGoodCondition': { label: "Art Materials  Good Condition",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facPostersChartsAvailable': { label: "Posters and Charts Available",
            type: String, allowedValues: ['Yes', 'No'] },
      'equipment.facPostersChartsSufficient': { label: "Posters and Charts  Sufficient",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facPostersChartsGoodCondition': { label: "Posters and Charts  Good Condition",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facOutdoorToysAvailable': { label: "Outdoor Toys Available",
            type: String, allowedValues: ['Yes', 'No'] },
      'equipment.facOutdoorToysSufficient': { label: "Outdoor Toys  Sufficient",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facOutdoorToysGoodCondition': { label: "Outdoor Toys  Good Condition",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facFantasyPlayAvailable': { label: "Fantasy Play Material Available",
            type: String, allowedValues: ['Yes', 'No'] },
      'equipment.facFantasyPlaySufficient': { label: "Fantasy Play Material  Sufficient",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      'equipment.facFantasyPlayGoodCondition': { label: "Fantasy Play Material  Good Condition",
            type: String, allowedValues: ['Yes', 'No', 'N/A'] },
      ///////////////////
      hazards: {
            type: Object
      },
      'hazards.facHazardsWater': { label: "Hazards Accessible: Bodies of Water",
            type: String, allowedValues: ['Yes', 'No'] },
      'hazards.facHazardsHoles': { label: "Hazards Accessible: Large Holes",
            type: String, allowedValues: ['Yes', 'No'] },
      'hazards.facHazardsRoads': { label: "Hazards Accessible: Roads",
            type: String, allowedValues: ['Yes', 'No'] },
      'hazards.facHazardsRailway': { label: "Hazards Accessible: Railway Tracks",
            type: String, allowedValues: ['Yes', 'No'] },
      'hazards.facHazardsOpenFlame': { label: "Hazards Accessible: Open Flames",
            type: String, allowedValues: ['Yes', 'No'] },
      'hazards.facHazardsElectrical': { label: "Hazards Accessible: Electrical Cables, wires, boards",
            type: String, allowedValues: ['Yes', 'No'] },
      'hazards.facHazardsRefusePit': { label: "Hazards Accessible: Refuse Pit",
            type: String, allowedValues: ['Yes', 'No'] },
      'hazards.facHazardsParrafinGas': { label: "Hazards Accessible: Paraffin/Gas",
            type: String, allowedValues: ['Yes', 'No'] }
}));
