/************************************************************
- \both\collections\*.js is to declare Meteor objects as instances of MongoDB collections
- it also is home to the schema difintions which as act as gatekeepers to the collection
- package: https://github.com/aldeed/meteor-simple-schema/
*************************************************************/

// declare the Meteor objects as instances of the MongoDB collection:
Collections.ServiceQualityECD    = new Mongo.Collection('serviceQualityECD');

// Attach the schema definition to the collection and define fields, datatypes, constraints and labels:
Collections.ServiceQualityECD.attachSchema(new SimpleSchema({

///////////////////
nutrition: {
    type: Object
  },
'nutrition.servMealsProvided':               {label: "Meals Provided", 
      type: Boolean },
'nutrition.servWeeklyMenu':                  {label: "Weekly Menu", 
optional: true,      type: Boolean },
'nutrition.servBreakfastProvider':           {label: "Breakfast Provided by", 
optional: true,      type: String, allowedValues: ['Service Provider', 'Child`s Caregiver', 'Other'] },
'nutrition.servMSnackProvider':              {label: "Morning Snack Provided by", 
optional: true,      type: String, allowedValues: ['Service Provider', 'Child`s Caregiver', 'Other'] },
'nutrition.servLunchProvider':               {label: "Lunch Provided by", 
optional: true,      type: String, allowedValues: ['Service Provider', 'Child`s Caregiver', 'Other'] },
'nutrition.servPMSnackProvider':             {label: "Afternoon Snack Provided by:", 
optional: true,      type: String, allowedValues: ['Service Provider', 'Child`s Caregiver', 'Other'] },
'nutrition.servFruitProvided':               {label: "Fruit Provided:", 
optional: true,      type: String, allowedValues: ['No', 'Sometimes', 'Daily'] },
///////////////////
stimulation: {
    type: Object
  },
'stimulation.servDailyProgAvail':              {label: "Daily Program Available", 
optional: true,      type: String, allowedValues: ['No', 'Yes-not on wall', 'Yes-on wall'] },
'stimulation.servDailyProgFollow':             {label: "Daily Programe Followed", 
optional: true,      type: String, allowedValues: ['No', 'Sometimes', 'Every Day'] },
'stimulation.servChildDivided':                {label: "Children Divided into Groups:", 
optional: true,      type: String, allowedValues: ['No', 'Divided into 0-2 3-4 and 5-6 most of the time', 'Divided into 0-2 3-4 and 5-6 all of the time'] },
'stimulation.servChartsUsed':                  {label: "Charts Used", 
optional: true,      type: String },
'stimulation.servThemesUsed':                  {label: "Themes Used", 
optional: true,      type: String },
///////////////////
serviceQualityB: {
    type: Object
  },
'serviceQualityB.servStaffRegister':               {label: "Staff Register", 
optional: true,      type: Boolean },
'serviceQualityB.servChildrensFiles':              {label: "File for Each Child", 
optional: true,      type: Boolean },
'serviceQualityB.servIncidentAbuseRegister':       {label: "Incident/abuse Register", 
optional: true,      type: Boolean },
'serviceQualityB.servMedicineRegister':            {label: "Medicine Register", 
optional: true,      type: Boolean },
'serviceQualityB.servAttendanceRegister':          {label: "Attendance Register", 
optional: true,      type: Boolean },
'serviceQualityB.servVisitorsRegister':            {label: "Visitors Register", 
optional: true,      type: Boolean },
'serviceQualityB.servEnrollBirthCerts':            {label: "Enrollment Forms: Birth Certificates", 
optional: true,      type: Boolean },
'serviceQualityB.servEnrollContactDetails':        {label: "Enrollment Forms: Contact Details", 
optional: true,      type: Boolean },
'serviceQualityB.servEnrollDateofAdmission':       {label: "Enrollment Forms: Admission Date", 
optional: true,      type: Boolean },
'serviceQualityB.servEnrollDischargeDate':         {label: "Enrollment Forms: Discharge Date", 
optional: true,      type: Boolean },
'serviceQualityB.servEnrollMedicalHistory':        {label: "Enrollment Forms: Medical History", 
optional: true,      type: Boolean },
'serviceQualityB.servEnrollSpecialNeedsAllergies': {label: "Enrollment Forms: Special Needs and Allergies", 
optional: true,      type: Boolean },
'serviceQualityB.servEnrollImmunisationRecords':   {label: "Enrollment Forms: Immunisation Records", 
optional: true,      type: Boolean },
///////////////////
serviceQualityC: {
    type: Object
  },
'serviceQualityC.servDisciplinePolicy':            {label: "Discipline Policy", 
optional: true,      type: Boolean },
'serviceQualityC.servTransportPolicy':             {label: "Transport Policy", 
optional: true,      type: Boolean },
'serviceQualityC.servDisabilityPolicy':            {label: "Disability Policy", 
optional: true,      type: Boolean },
'serviceQualityC.servHealthIdentifyIllness':       {label: "Health Policy: Identifying Sick Children", 
optional: true,      type: Boolean },
'serviceQualityC.servHealthDealwithIllness':       {label: "Health Policy: Dealing with ill Children", 
optional: true,      type: Boolean },
'serviceQualityC.servHealthMedicine':              {label: "Health Policy: Medicine Administration", 
optional: true,      type: Boolean },
'serviceQualityC.servHealthInfectiousDiseases':    {label: "Health Policy: Infectious Diseases", 
optional: true,      type: Boolean },
'serviceQualityC.servHealthHygieneStandards':      {label: "Health Policy: Hygiene Standards", 
optional: true,      type: Boolean },
'serviceQualityC.servHealthStaffHealth':           {label: "Health Policy: Staff Health", 
optional: true,      type: Boolean },
///////////////////
serviceQualityD: {
    type: Object
  },
'serviceQualityD.servGeoType':                     {label: "Geo Type", 
optional: true,      type: String },
'serviceQualityD.servDateofProfileCompletion':     {label: "Date of Profile Completion", 
optional: true,      type: Date },
'serviceQualityD.servPersonRespForProfile':        {label: "Person Responsible for Profile Completion", 
optional: true,      type: String },
'serviceQualityD.servNoOfChildrenOnInspectionDate':{label: "Number of Children present on Inspection Date", 
optional: true,      type: Number },
'serviceQualityD.servLifeSkills':                  {label: "LifeSkills", 
optional: true,      type: Boolean },
'serviceQualityD.servAfterCare':                   {label: "After Care", 
optional: true,      type: Boolean },
'serviceQualityD.servHealthmonitoringSupport':    {label: "Health monitoring/support", 
optional: true,      type: Boolean },
'serviceQualityD.servHomeVisits':                  {label: "Home Visits", 
optional: true,      type: Boolean },
'serviceQualityD.servHomeworkHelp':                {label: "Homework Help", 
optional: true,      type: Boolean },
'serviceQualityD.servParentingSkills':             {label: "Parenting Skills", 
optional: true,      type: Boolean },
'serviceQualityD.servSportsRecreation':            {label: "Sports Recreation", 
optional: true,      type: Boolean },
'serviceQualityD.servCounselling':                 {label: "Counselling", 
optional: true,      type: Boolean },

}));      
// }; // else ie Session.equals("loadingData", false) -> set schema
