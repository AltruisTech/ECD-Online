/************************************************************
- \both\collections\*.js is to declare Meteor objects as instances of MongoDB collections
- it also is home to the schema difintions which as act as gatekeepers to the collection
- package: https://github.com/aldeed/meteor-simple-schema/
*************************************************************/

// declare the Meteor objects as instances of the MongoDB collection:
Collections.Facility              = new Mongo.Collection('facility');

// Attach the schema definition to the collection and define fields, datatypes, constraints and labels:
Collections.Facility.attachSchema(new SimpleSchema({
///////////////////
location: {
    type: Object
  },
'location.facID':                           {label: "Facility Identifier", 
      type: Number },
'location.facName':                         {label: "Facility Name", 
optional: true,      type: String },
'location.facDistMuni':                     {label: "District Municipality", 
      type: String },
'location.facLocalMuni':                    {label: "Local Municipality:", 
      type: String },
'location.facWard':                         {label: "Ward:", 
      type: Number },
'location.facTradAuth':                     {label: "Traditional Authority:", 
optional: true,      type: String },
'location.facPhAddress1':                   {label: "Physical address 1:", 
      type: String },
'location.facPhAddress2':                   {label: "Physical address 2", 
      type: String },
'location.facCityVillage':                  {label: "City/Village:", 
      type: String },
'location.facPostAddress1':                 {label: "Postal address 1:", 
optional: true,      type: String },
'location.facPostAddress2':                 {label: "Postal address 2:", 
optional: true,      type: String },
'location.facPostCode':                     {label: "Postal code:", 
optional: true,      type: Number },
'location.facLocationDescription':          {label: "Address Description", 
optional: true,      type: String },
///////////////////
operation: {
    type: Object
  },
// 'operation.facOperatingDays':                {label: "Operating days:", 
//       type: String, allowedValues: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'] },
   'operation.facOperatingDays': {
      type: Array,
      minCount: 2,
      label: "Operating days:",
      autoform: {
         options: [
            {  label: "Monday",  value: "Monday"    },
            {  label: "Tuesday", value: "Tuesday"  },
            {  label: "Wednesday", value: "Wednesday"},
            {  label: "Thursday", value: "Thursday"  },
            {  label: "Friday",   value: "Friday"    },
            {  label: "Saturday", value: "Saturday"  },
            {  label: "Sunday",  value: "Sunday"    }
         ]
      }
   },
   "operation.facOperatingDays.$": {
      type: String
   },

'operation.facStartTime':                    {label: "Start Time:", 
      type: Date },
'operation.facCloseTime':                    {label: "Closing Time:", 
      type: Date },
'operation.facHasSchoolHols':                {label: "Has school holidays", 
      type: Boolean },
'operation.facNearestPSchool':               {label: "Nearest Primary School:", 
      type: String },
'operation.facNearestClinic':                {label: "Nearest Clinic:", 
      type: String },
'operation.facNearestLandMark':              {label: "Nearest Tuckshop/Church/Store:", 
optional: true,      type: String },
///////////////////
registration: {
    type: Object
  },
'registration.facPCRStatus':                    {label: "PCR Status", 
      type: Boolean },
'registration.facPCRApplType':                  {label: "PCR Application Type", 
optional: true,      type: String, allowedValues: ['New', 'Renewal'] },
'registration.facPCRCategory':                  {label: "PCR Registration Category", 
optional: true,      type: String, allowedValues: ['Full', 'Conditional'] },
'registration.facPCRConditionInf':              {label: "Conditional Registration Reason: Infrastructure", 
optional: true,      type: Boolean },
'registration.facPCRConditionEquip':            {label: "Conditional Registration Reason: Equipment", 
optional: true,      type: Boolean },
'registration.facPCRConditionHS':              {label: "Conditional Registration Reason: Health and Safety", 
optional: true,      type: Boolean },
'registration.facPCRConditionStaff':            {label: "Conditional Registration Reason: Staff Skills", 
optional: true,      type: Boolean },
'registration.facPCRIssueDate':                 {label: "PCR Issue Date", 
optional: true,      type: Date },
'registration.facPCRExpiryDate':                {label: "PCR Expiry Date", 
optional: true,      type: Date },
'registration.facPCRRegNum':                    {label: "PCR Registration Number", 
optional: true,      type: Number },
'registration.facPCRPermittedChildren':         {label: "PCR No. of Children Permitted", 
optional: true,      type: String },
'registration.facEHPInspectionDate':            {label: "EHP Inspection Date", 
optional: true,      type: Date },
'registration.facEHRefNumber':                  {label: "EH Reference Number", 
optional: true,      type: String },
'registration.facEHInternalArea':               {label: "EH Area Internal Space (sqm)", 
optional: true,      type: String },
'registration.facPCREHRecommendation':          {label: "EH Registration Recommendation", 
optional: true,      type: Boolean },
'registration.facEHPermittedChildren':          {label: "EH No. of Children Permitted", 
optional: true,      type: Number },
///////////////////
details: {
    type: Object
  },
'details.facType':                         {label: "Facility Type:", 
      type: String, allowedValues: ['Separate purpose-built or freestanding site', ' Private home', ' Multi-purpose building', 'School Premises', 'Clinic', 'Other'] },
'details.facStructureType':                {label: "Type of structure:", 
      type: String, allowedValues: ['Conventional-brick or block', 'Traditional-mud', 'Shipping container', 'Prefab', 'Shack', 'Other'] },
'details.facLandOwner':                    {label: "Land Ownership:", 
      type: String, allowedValues: ['Private', 'NPO(this organisation)', 'Public', 'Other'] },
'details.facOccupancy':                    {label: "Occupancy:", 
optional: true,      type: String, allowedValues: ['Title Deeds', ' PTO', ' Letter to Occupy', ' Lease'] },
'details.facLandAllocated':                {label: "If Private, has other land been allocated for a future centre:", 
optional: true,      type: Boolean },
'details.facLandAllocatedTo':              {label: "If land has been allocated, who to?", 
optional: true,      type: String, allowedValues: ['Private Individual', 'NPO (this organisation)', 'Other'] },
'details.facGPSCoords':                    {label: "GPS Co-ordinates", 
optional: true,      type: String },
'details.facPropertySize':                 {label: "Estimated Size of the Property (sqm)", 
      type: Number },
'details.facSlope':                        {label: "Slope of the property", 
      type: String, allowedValues: ['Flat', ' Gently Sloped', ' Steep'] },
'details.facBuildingSize':                 {label: "What is the overall size of the building (sqm)", 
      type: Number },
'details.facRoadAccess':                   {label: "Is the site accessible by road", 
      type: Boolean }

}));  

