/************************************************************
- \both\collections\*.js is to declare Meteor objects as instances of MongoDB collections
- it also is home to the schema difintions which as act as gatekeepers to the collection
- package: https://github.com/aldeed/meteor-simple-schema/
*************************************************************/

// declare the Meteor objects as instances of the MongoDB collection:
Collections.Staff              = new Mongo.Collection('staff');

// Attach the schema definition to the collection and define fields, datatypes, constraints and labels:
Collections.Staff.attachSchema(new SimpleSchema({
/////////////////// 
mainDetails: {
    type: Object
  },
'mainDetails.staffID':                         {label: "ID Number", 
      type: Number },
'mainDetails.staffName':                       {label: "Staff Name", 
      type: String },
'mainDetails.staffContactNumber':              {label: "Contact Number", 
      type: Number },
'mainDetails.staffRace':                       {label: "Race", 
      type: String, allowedValues: ['Black', 'White', 'Coloured', 'Indian', 'Other'] },
'mainDetails.staffGender':                     {label: "Gender", 
      type: String, allowedValues: ['F', 'M'] },
'mainDetails.staffPosition':                   {label: "Main Position", 
      type: String, allowedValues: ['Supervisor', 'Teacher(3-5)', 'Carer(0-2)', 'Assistant', 'Cook', 'Cleaner', 'Security', 'Facilities'] },
///////////////////
qualifications: {
    type: Object
  },
'qualifications.staffSchoolLevel':                {label: "Highest level of school education", 
      type: String, allowedValues: ['None', 'Grade7 or below', ' Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'] },
'qualifications.staffECDQualificationLevel':      {label: "Formal ECD Qualification – (NQF Level 1,4,5,6/Degree)", 
      type: String, allowedValues: ['NQF1', 'NQF4', 'NQF5', 'NQF6', 'Degree'] },
'qualifications.staffECDQualificationStatus':     {label: "Formal ECD Qualification-Enrolled/Complete", 
optional: true,      type: String, allowedValues: ['Enrolled', 'Complete'] },
'qualifications.staffECDQualificationInstitute':  {label: "Training Institute for formal ECD Qualification", 
optional: true,      type: String },
'qualifications.staffECDSkillsTrainingDays':      {label: "No. of days of ECD Program Skills Training Attended", 
optional: true,      type: Number },
'qualifications.staffECDSkillsTrainingInstitute': {label: "Training Institute for Program Skills training", 
optional: true,      type: String },
///////////////////
otherDetails: {
    type: Object
  },
'otherDetails.staffMonthlyRemuneration':        {label: "Remuneration (R/month)", 
optional: true,      type: Number },
'otherDetails.staffYearsECDExperience':         {label: "Years of Experience in ECD", 
      type: Number },
'otherDetails.staffStartDate':                  {label: "Start date at organisation", 
optional: true,      type: Date },
'otherDetails.staffFullPartTime':               {label: "Fulltime/Part-time", 
      type: String, allowedValues: ['Full-time', 'Part-time'] },
'otherDetails.staffWillingtoTrain':             {label: "Willing to be trained", 
optional: true,      type: Boolean },
'otherDetails.staffCPRClearance':               {label: "CPR Clearance", 
optional: true,      type: Boolean },
///////////////////
'staffRepQualified':             {label: "Qualified - Reporting field, set by DB rule", 
optional: true,      type: Boolean }
}));  
