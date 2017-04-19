/************************************************************
- \both\collections\*.js is to declare Meteor objects as instances of MongoDB collections
- it also is home to the schema difintions which as act as gatekeepers to the collection
- package: https://github.com/aldeed/meteor-simple-schema/
*************************************************************/

// declare the Meteor objects as instances of the MongoDB collection:
Collections.ServiceQualityECD = new Mongo.Collection('serviceQualityECD');

// Attach the schema definition to the collection and define fields, datatypes, constraints and labels:
Collections.ServiceQualityECD.attachSchema(new SimpleSchema({

    ///////////////////
    nutrition: {
        type: Object
    },
    'nutrition.servMealsProvided': { label: "Meals Provided",
        type: Boolean },
    'nutrition.servWeeklyMenu': { label: "Weekly Menu",
        optional: true, type: Boolean },
    'nutrition.servBreakfastProvider': { label: "Breakfast Provided by",
        optional: true, type: String, allowedValues: ['Service Provider', 'Child`s Caregiver', 'Other'] },
    'nutrition.servMSnackProvider': { label: "Morning Snack Provided by",
        optional: true, type: String, allowedValues: ['Service Provider', 'Child`s Caregiver', 'Other'] },
    'nutrition.servLunchProvider': { label: "Lunch Provided by",
        optional: true, type: String, allowedValues: ['Service Provider', 'Child`s Caregiver', 'Other'] },
    'nutrition.servPMSnackProvider': { label: "Afternoon Snack Provided by:",
        optional: true, type: String, allowedValues: ['Service Provider', 'Child`s Caregiver', 'Other'] },
    'nutrition.servFruitProvided': { label: "Fruit Provided:",
        optional: true, type: String, allowedValues: ['No', 'Sometimes', 'Daily'] },
    ///////////////////
    stimulation: {
        type: Object
    },
    'stimulation.servDailyProgAvail': { label: "Daily Program Available",
        optional: true, type: String, allowedValues: ['No', 'Yes-not on wall', 'Yes-on wall'] },
    'stimulation.servDailyProgFollow': { label: "Daily Programe Followed",
        optional: true, type: String, allowedValues: ['No', 'Sometimes', 'Every Day'] },
    'stimulation.servChildDivided': { label: "Children Divided into Groups:",
        optional: true, type: String, allowedValues: ['No', 'Divided into 0-2 3-4 and 5-6 most of the time', 'Divided into 0-2 3-4 and 5-6 all of the time'] },
    'stimulation.servChartsUsed': { label: "Charts Used",
        optional: true, type: String },
    'stimulation.servThemesUsed': { label: "Themes Used",
        optional: true, type: String },
    ///////////////////
    profileCompletionDetails: {
        type: Object
    },
    'profileCompletionDetails.servDateofProfileCompletion': { label: "Date of Profile Completion",
        optional: true, type: Date },
    'profileCompletionDetails.servPersonRespForProfile': { label: "Person Responsible for Profile Completion",
        optional: true, type: String },
    'profileCompletionDetails.servNoOfChildrenOnInspectionDate': { label: "Number of Children present on Inspection Date",
        optional: true, type: Number },
    ///////////////////
    recordKeeping: {
        type: Object
    },
    'recordKeeping.servStaffRegister': { label: "Staff Register",
        optional: true, type: Boolean },
    'recordKeeping.servChildrensFiles': { label: "File for Each Child",
        optional: true, type: Boolean },
    'recordKeeping.servIncidentAbuseRegister': { label: "Incident/abuse Register",
        optional: true, type: Boolean },
    'recordKeeping.servMedicineRegister': { label: "Medicine Register",
        optional: true, type: Boolean },
    'recordKeeping.servAttendanceRegister': { label: "Attendance Register",
        optional: true, type: Boolean },
    'recordKeeping.servVisitorsRegister': { label: "Visitors Register",
        optional: true, type: Boolean },
    'recordKeeping.servEnrollBirthCerts': { label: "Enrollment Forms: Birth Certificates",
        optional: true, type: Boolean },
    'recordKeeping.servEnrollContactDetails': { label: "Enrollment Forms: Contact Details",
        optional: true, type: Boolean },
    'recordKeeping.servEnrollDateofAdmission': { label: "Enrollment Forms: Admission Date",
        optional: true, type: Boolean },
    'recordKeeping.servEnrollDischargeDate': { label: "Enrollment Forms: Discharge Date",
        optional: true, type: Boolean },
    'recordKeeping.servEnrollMedicalHistory': { label: "Enrollment Forms: Medical History",
        optional: true, type: Boolean },
    'recordKeeping.servEnrollSpecialNeedsAllergies': { label: "Enrollment Forms: Special Needs and Allergies",
        optional: true, type: Boolean },
    'recordKeeping.servEnrollImmunisationRecords': { label: "Enrollment Forms: Immunisation Records",
        optional: true, type: Boolean },
    ///////////////////
    policiesAndProcedures: {
        type: Object
    },
    'policiesAndProcedures.servDisciplinePolicy': { label: "Discipline Policy",
        optional: true, type: Boolean },
    'policiesAndProcedures.servTransportPolicy': { label: "Transport Policy",
        optional: true, type: Boolean },
    'policiesAndProcedures.servDisabilityPolicy': { label: "Disability Policy",
        optional: true, type: Boolean },
    'policiesAndProcedures.servHealthIdentifyIllness': { label: "Health Policy: Identifying Sick Children",
        optional: true, type: Boolean },
    'policiesAndProcedures.servHealthDealwithIllness': { label: "Health Policy: Dealing with ill Children",
        optional: true, type: Boolean },
    'policiesAndProcedures.servHealthMedicine': { label: "Health Policy: Medicine Administration",
        optional: true, type: Boolean },
    'policiesAndProcedures.servHealthInfectiousDiseases': { label: "Health Policy: Infectious Diseases",
        optional: true, type: Boolean },
    'policiesAndProcedures.servHealthHygieneStandards': { label: "Health Policy: Hygiene Standards",
        optional: true, type: Boolean },
    'policiesAndProcedures.servHealthStaffHealth': { label: "Health Policy: Staff Health",
        optional: true, type: Boolean },
    ///////////////////
    additionalServicesOffered: {
        type: Object
    },
    'additionalServicesOffered.servLifeSkills': { label: "LifeSkills",
        optional: true, type: Boolean },
    'additionalServicesOffered.servAfterCare': { label: "After Care",
        optional: true, type: Boolean },
    'additionalServicesOffered.servHealthmonitoringSupport': { label: "Health monitoring/support",
        optional: true, type: Boolean },
    'additionalServicesOffered.servHomeVisits': { label: "Home Visits",
        optional: true, type: Boolean },
    'additionalServicesOffered.servHomeworkHelp': { label: "Homework Help",
        optional: true, type: Boolean },
    'additionalServicesOffered.servParentingSkills': { label: "Parenting Skills",
        optional: true, type: Boolean },
    'additionalServicesOffered.servSportsRecreation': { label: "Sports Recreation",
        optional: true, type: Boolean },
    'additionalServicesOffered.servCounselling': { label: "Counselling",
        optional: true, type: Boolean }

}));
// }; // else ie Session.equals("loadingData", false) -> set schema

