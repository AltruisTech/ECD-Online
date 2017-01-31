/************************************************************
- \both\collections\*.js is to declare Meteor objects as instances of MongoDB collections
- it also is home to the schema difintions which as act as gatekeepers to the collection
- package: https://github.com/aldeed/meteor-simple-schema/
*************************************************************/

// declare the Meteor objects as instances of the MongoDB collection:
Collections.ServBeneficiaryGroup              = new Mongo.Collection('servBeneficiaryGroup');
Collections.ServBeneficiaryGroupRep              = new Mongo.Collection('servBeneficiaryGroupRep');

// Attach the schema definition to the collection and define fields, datatypes, constraints and labels:
Collections.ServBeneficiaryGroup.attachSchema(new SimpleSchema({
'aged0to18months': {
    type: Object
  },
'aged0to18months.servBen0to18M':                    {label: "0-18mnths Male", 
optional: true,      type: Number },
'aged0to18months.servBen0to18F':                    {label: "0-18mnths Female", 
optional: true,      type: Number },
'aged0to18months.servBen0to18African':              {label: "0-18mnths African", 
optional: true,      type: Number },
'aged0to18months.servBen0to18White':                {label: "0-18mnths White", 
optional: true,      type: Number },
'aged0to18months.servBen0to18Indian':               {label: "0-18mnths Indian", 
optional: true,      type: Number },
'aged0to18months.servBen0to18Coloured':             {label: "0-18mnths Coloured", 
optional: true,      type: Number },
'aged0to18months.servBen0to18SN':                   {label: "0-18mnths Special Needs", 
optional: true,      type: Number },
///////////////////
'aged19to35months': {
    type: Object
  },
'aged19to35months.servBen19to35M':                   {label: "19-35 mnths Male", 
optional: true,      type: Number },
'aged19to35months.servBen19to35F':                   {label: "19-35 mnths Female", 
optional: true,      type: Number },
'aged19to35months.servBen19to35African':             {label: "19-35 mnths African", 
optional: true,      type: Number },
'aged19to35months.servBen19to35White':               {label: "19-35 mnths White", 
optional: true,      type: Number },
'aged19to35months.servBen19to35Indian':              {label: "19-35 mnths Indian", 
optional: true,      type: Number },
'aged19to35months.servBen19to35Coloured':            {label: "19-35 mnths Coloured", 
optional: true,      type: Number },
'aged19to35months.servBen19to35SN':                  {label: "19-35 mnths Special Needs", 
optional: true,      type: Number },
///////////////////
'aged3to4years': {
    type: Object
  },
'aged3to4years.servBen3to4M':                     {label: "3-4 yrs Male", 
optional: true,      type: Number },
'aged3to4years.servBen3to4F':                     {label: "3-4 yrs Female", 
optional: true,      type: Number },
'aged3to4years.servBen3to4African':               {label: "3-4 yrs African", 
optional: true,      type: Number },
'aged3to4years.servBen3to4White':                 {label: "3-4 yrs White", 
optional: true,      type: Number },
'aged3to4years.servBen3to4Indian':                {label: "3-4 yrs Indian", 
optional: true,      type: Number },
'aged3to4years.servBen3to4Coloured':              {label: "3-4 yrs Coloured", 
optional: true,      type: Number },
'aged3to4years.servBen3to4SN':                    {label: "3-4 yrs Special Needs", 
optional: true,      type: Number },
///////////////////
'aged4to5years': {
    type: Object
  },
'aged4to5years.servBen4to5M':                     {label: "4-5 yrs Male", 
optional: true,      type: Number },
'aged4to5years.servBen4to5F':                     {label: "4-5 yrs Female", 
optional: true,      type: Number },
'aged4to5years.servBen4to5African':               {label: "4-5 yrs African", 
optional: true,      type: Number },
'aged4to5years.servBen4to5White':                 {label: "4-5 yrs White", 
optional: true,      type: Number },
'aged4to5years.servBen4to5Indian':                {label: "4-5 yrs Indian", 
optional: true,      type: Number },
'aged4to5years.servBen4to5Coloured':              {label: "4-5 yrs Coloured", 
optional: true,      type: Number },
'aged4to5years.servBen4to5SN':                    {label: "4-5 yrs Special Needs", 
optional: true,      type: Number },
///////////////////
'aged5to6years': {
    type: Object
  },
'aged5to6years.servBen5to6M':                     {label: "5-6 yrs Male", 
optional: true,      type: Number },
'aged5to6years.servBen5to6F':                     {label: "5-6 yrs Female", 
optional: true,      type: Number },
'aged5to6years.servBen5to6African':               {label: "5-6 yrs African", 
optional: true,      type: Number },
'aged5to6years.servBen5to6White':                 {label: "5-6 yrs White", 
optional: true,      type: Number },
'aged5to6years.servBen5to6Indian':                {label: "5-6 yrs Indian", 
optional: true,      type: Number },
'aged5to6years.servBen5to6Coloured':              {label: "5-6 yrs Coloured", 
optional: true,      type: Number },
'aged5to6years.servBen5to6SN':                    {label: "5-6 yrs Special Needs", 
optional: true,      type: Number },
///////////////////
afterSchool: {
    type: Object
  },
'afterSchool.servBenAfterSchoolM':             {label: "After School Care Male", 
optional: true,      type: Number },
'afterSchool.servBenAfterSchoolF':             {label: "After School Care Female", 
optional: true,      type: Number },
'afterSchool.servBenAfterSchoolAfrican':       {label: "After School Care African", 
optional: true,      type: Number },
'afterSchool.servBenAfterSchoolWhite':         {label: "After School Care White", 
optional: true,      type: Number },
'afterSchool.servBenAfterSchoolIndian':        {label: "After School Care Indian", 
optional: true,      type: Number },
'afterSchool.servBenAfterSchoolColoured':      {label: "After School Care Coloured", 
optional: true,      type: Number },
'afterSchool.servBenAfterSchoolSN':            {label: "After School Care Special Needs", 
optional: true,      type: Number },
///////////////////
'minMax': {
    type: Object
  },
'minMax.servBenMinAge':                   {label: "Minimum Age", 
      type: Number },
'minMax.servBenMaxAge':                   {label: "Maximum Age", 
      type: Number }
}));  
