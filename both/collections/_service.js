/************************************************************
- \both\collections\*.js is to declare Meteor objects as instances of MongoDB collections
- it also is home to the schema difintions which as act as gatekeepers to the collection
- package: https://github.com/aldeed/meteor-simple-schema/
*************************************************************/

// Define Collections and Schemas objects as the parent for all collections and schemas:
Collections = {};
// Schemas = {};


// declare the Meteor objects as instances of the MongoDB collection:
Collections.Service              = new Mongo.Collection('service');

// Attach the schema definition to the collection and define fields, datatypes, constraints and labels:
Collections.Service.attachSchema(new SimpleSchema({
  
///////////////////
mainDetails: {
    type: Object
  },
'mainDetails.serviceID':                       {label: "Service Identifier", 
      type: Number },
'mainDetails.servName':                        {label: "Name of Service:", 
      type: String },
'mainDetails.servType':                        {label: "Type of Service:", 
      type: String, allowedValues: ['Centre-based ECD Programe', 'Non-Centre Based ECD Programe', 'Home-visit ECD Programe'] },
///////////////////
registration: {
    type: Object
  },
'registration.servProgRegStats':                {label: "DSD Programe Registration Status", 
      type: String, allowedValues: ['Not Applied', 'In Process', 'Registered'] },
'registration.servProgRegNR':                   {label: "DSD Programe Registration New/Renewal", 
optional: true,      type: String, allowedValues: ['New', 'Renewal'] },
'registration.servProgRegType':                 {label: "DSD Programe Registration Type:", 
      type: String },
'registration.servProgRegDec':                  {label: "Registration Decision:", 
optional: true,      type: String, allowedValues: ['Conditional', 'Full', 'Rejected'] },
'registration.servProgRegExpiry':               {label: "Programe Registration Expiry Date:", 
optional: true,      type: Date },
'registration.servDoERegStatus':                {label: "ServDoERegStatus", 
optional: true,      type: String },
///////////////////
subsidies: {
    type: Object
  },
'subsidies.servDSDPerChildSubsidy':          {label: "DSD Per Child Subsidy", 
optional: true,      type: Boolean },
'subsidies.servDSDPerChildSubsidyNum':       {label: "Number of DSD Per Child Subsidies", 
optional: true,      type: Number },
'subsidies.servDOEGradeRLearnerSub':         {label: "DOE Grade R per learner subsidy", 
optional: true,      type: String },
'subsidies.servDOEGradeRLearnerSubNum':      {label: "No. of Grade R subsidies", 
optional: true,      type: Number },
'subsidies.servDOELearnerships':             {label: "DOE Learnerships", 
optional: true,      type: String },
'subsidies.servDOELearnershipsNum':          {label: "No. of Learnerships", 
optional: true,      type: Number },
///////////////////
funding: {
    type: Object
  },
'funding.servFeesCharged':                 {label: "Fees Charged", 
optional: true,      type: String },
'funding.servMaxFees':                     {label: "Maximum Monthly Fees", 
optional: true,      type: Number },
'funding.servAnnualIncome':                {label: "Approximate Annual Income", 
optional: true,      type: Number },
'funding.servDSDSLA':                      {label: "DSD Service Level Agreement", 
optional: true,      type: String },
'funding.servDSDSLASigDate':               {label: "DSD SLA Signature Date", 
optional: true,      type: Date },
'funding.servDSDSLAExpiryDate':            {label: "DSD SLA Expiry Date", 
optional: true,      type: Date },
'funding.servDSDProgFunding':              {label: "DSD Programme Funding", 
optional: true,      type: String },
'funding.servDOEGradeRSalary':             {label: "DOE Grade R practitioner salary", 
optional: true,      type: String },
///////////////////
topDonors: {
    type: Object
  },
'topDonors.servTopDonor1':                   {label: "Top Donor Name 1", 
optional: true,      type: String },
'topDonors.servTopDonorAmt1':                {label: "Top Donor Amount 1", 
optional: true,      type: Number },
'topDonors.servTopDonor2':                   {label: "Top Donor Name 2", 
optional: true,      type: String },
'topDonors.servTopDonorAmt2':                {label: "Top Donor Amount 2", 
optional: true,      type: Number },
'topDonors.servTopDonor3':                   {label: "Top Donor Name 3", 
optional: true,      type: String },
'topDonors.servTopDonorAmt3':                {label: "Top Donor Amount 3", 
optional: true,      type: Number },
///////////////////
  externalFunders: {
    type: Array,
    optional: true
  },
  'externalFunders.$': {
    type: Object
  },
'externalFunders.$.servExternalFunderName':          {label: "Name", 
      type: String },
'externalFunders.$.servExternalFunderType':          {label: "Type of Funding Organisation", 
      type: String },
'externalFunders.$.servExternalFunderDonationType':  {label: "What do they provide", 
      type: String },
'externalFunders.servExternalFunderFrequency':     {label: "How many times per year", 
optional: true,      type: Number },
///////////////////
  facilities: {
    type: Array,
    optional: true
  },
  'facilities.$': {
    type: String, max: 30
  }

}));  

// declare the Meteor collections for some misc reporting tables:
Collections.Rep01RegisteredAndFundedECD       = new Mongo.Collection('rep01RegisteredAndFundedECD');
Collections.Rep02StaffTrainingNeeds           = new Mongo.Collection('rep02StaffTrainingNeeds');
Collections.Rep03SitesRequiringBasicServices  = new Mongo.Collection('rep03SitesRequiringBasicServices');
Collections.Rep04BeneficiaryGroupMuni  = new Mongo.Collection('rep04BeneficiaryGroupMuni');
