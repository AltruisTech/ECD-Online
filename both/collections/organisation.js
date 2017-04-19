/************************************************************
- \both\collections\*.js is to declare Meteor objects as instances of MongoDB collections
- it also is home to the schema difintions which as act as gatekeepers to the collection
- package: https://github.com/aldeed/meteor-simple-schema/
*************************************************************/

// declare the Meteor objects as instances of the MongoDB collection:
Collections.Organisation = new Mongo.Collection('organisation');

// Attach the schema definition to the collection and define fields, datatypes, constraints and labels:
Collections.Organisation.attachSchema(new SimpleSchema({
      ///////////////////
      mainDetails: {
            type: Object
      },
      'mainDetails.orgID': { label: "Organisation Identifier",
            type: Number },
      'mainDetails.orgName': { label: "Name of Organisation:",
            type: String },
      'mainDetails.orgType': { label: "Type of Organisation:",
            type: String, allowedValues: ['ECD', 'OVC'] },
      'mainDetails.orgLegalEntity': { label: "Legal Entity",
            type: String, allowedValues: ['Private', 'Non-Profit Org', 'Public Org'] },
      'mainDetails.orgYearStarted': { label: "Year Started:",
            optional: true, type: Number },
      'mainDetails.orgNumBeneficiaries': { label: "# Beneficiaries:",
            optional: true, type: Number },
      'mainDetails.orgNumFullTimeStaff': { label: "# Fulltime Staff/Volunteers:",
            optional: true, type: Number },
      'mainDetails.orgNumPartTimeStaff': { label: "# Parttime Staff/Volunteers:",
            optional: true, type: Number },
      'mainDetails.orgNPOReg': { label: "NPO Registered",
            optional: true, type: String, allowedValues: ['N/A(private)', 'Not Applied', 'In Process(pre-submission)', 'In Process(submitted)', 'Registered'] },
      'mainDetails.orgNPORegDate': { label: "Date of NPO Registration",
            optional: true, type: Date },
      'mainDetails.orgNPONum': { label: "NPO Number",
            optional: true, type: String },
      ///////////////////
      primaryContacts: {
            type: Object
      },
      'primaryContacts.orgPrimaryStaffContactName': { label: "Primary Contact Staff Name:",
            type: String },
      'primaryContacts.orgPrimaryStaffContactCell': { label: "Primary Contact Staff Cell:",
            type: Number },
      'primaryContacts.orgPrimaryCommitteeContactName': { label: "Primary Contact: Committee Name:",
            optional: true, type: String },
      'primaryContacts.orgPrimaryCommitteeContactCell': { label: "Primary Contact Committee Cell:",
            optional: true, type: Number },
      ///////////////////
      organisationContact: {
            type: Object
      },
      'organisationContact.orgLandline': { label: "Landline:",
            optional: true, type: Number },
      'organisationContact.orgEmail': { label: "Email:",
            optional: true, type: String },
      'organisationContact.orgPostalAddress1': { label: "Postal address 1:",
            type: String },
      'organisationContact.orgPostalAddress2': { label: "Postal address 2:",
            type: String },
      'organisationContact.orgPostalCode': { label: "Postal code:",
            type: Number },
      'organisationContact.orgWebsite': { label: "Website",
            optional: true, type: String },
      'organisationContact.orgFax': { label: "Fax:",
            optional: true, type: Number },
      'organisationContact.orgPhysicalAddress1': { label: "Physical address 1:",
            optional: true, type: String },
      'organisationContact.orgPhysicalAddress2': { label: "Physical address 2",
            optional: true, type: String },
      'organisationContact.orgCityVillage': { label: "City/Village:",
            optional: true, type: String },
      'organisationContact.orgLocalMuni': { label: "Local Municipality",
            optional: true, type: String },
      ///////////////////
      governance: {
            type: Object
      },
      'governance.orgManagementCommitteeExists': { label: "Management Committee",
            optional: true, type: Boolean },
      'governance.orgConstitutionExists': { label: "Constitution",
            type: Boolean },
      'governance.orgNumberMembersManCom': { label: "No. of members on the management committee",
            optional: true, type: Number },
      'governance.orgManComMinutesKept': { label: "Minutes Kept:",
            optional: true, type: Boolean },
      'governance.orgManComMeetingsinLastYear': { label: "Number of meetings in last 12 months",
            optional: true, type: Number },
      'governance.orgManComTraining': { label: "Has the management committee received training in committee work",
            optional: true, type: Boolean },
      ///////////////////
      managementCommittee: {
            type: Object
      },
      'managementCommittee.orgMCOffice': { label: "OFFICE",
            optional: true, type: String, allowedValues: ['Chairperson', 'Vice-Chairperson', 'Secretary', 'Vice-Secretary', 'Treasurer', 'Vice-Treasurer', 'Member'] },
      'managementCommittee.orgMCName': { label: "NAME",
            optional: true, type: String },
      'managementCommittee.orgMCOccupation': { label: "OCCUPATION ",
            optional: true, type: String },
      'managementCommittee.orgMCAddress': { label: "ADDRESS",
            optional: true, type: String },
      'managementCommittee.orgMCCell': { label: "CELLPHONE",
            optional: true, type: Number },
      'managementCommittee.orgMCIDNumber': { label: "ID Number",
            optional: true, type: Number },
      ///////////////////
      financialManagement: {
            type: Object
      },
      'financialManagement.orgBankAccount': { label: "Dedicated Bank Account",
            type: Boolean },
      'financialManagement.orgBankAccountHolder': { label: "Name of Bank Account Holder",
            optional: true, type: String },
      'financialManagement.orgPBORegistered': { label: "Registered as PBO with SARS",
            type: Boolean },
      'financialManagement.orgAFS': { label: "Audited Financial Statements",
            type: Boolean },
      'financialManagement.orgAFSPreparedonTime': { label: "OrgAFSPreparedonTime",
            type: Boolean },
      'financialManagement.orgDSDNarrativeSubmitted': { label: "Narrative submitted to DSD for last financial year",
            type: Boolean }
}));

