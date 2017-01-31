
if (Meteor.isServer ) {
  var cmd, exec, fs;
  fs = Npm.require('fs');
  exec = Npm.require('child_process').exec;
  cmd = Meteor.wrapAsync(exec);

  Meteor.methods({
       // skip Simple Schemma validations by accessing MongoDB native API via Collection.rawCollection():
       'countCollection': function(collectionName){
        // console.log("collectionName: "+ Collections[collectionName]);
         var collectionCount = Collections[collectionName].find().count() ;
         console.log(collectionName + ' : ' + collectionCount) ;
       return collectionCount; 
      }, // countCollection
       'dropCollection': function(collectionName){
        // console.log("collectionName: "+ Collections[collectionName]);
       Collections[collectionName].rawCollection().drop();
      }, // dropCollection
       'loadTestData': function(collectionName, doc ){
       Collections[collectionName].rawCollection().insert(doc);
    }, // loadTestData  

   'loadReportingTables': function() {
       var  res;
       // can't get this to work - help needed:
      // res = cmd(pwd);
      // console.log(res);

      // res = cmd(echo "load('./run/loadReportingTables.js')" | docker exec -i mongodb mongo nag-admin);
      //  console.log(res);
      // res = cmd(echo load("./run/loadReportingTables.js") | docker exec -i mongodb mongo nag-admin);
      //  console.log(res);
       //
       // cmdString='echo load("./run/loadReportingTables.js") | docker exec -i mongodb mongo nag-admin';
       res = cmd("/run/loadReportingTables.sh");
       console.log(res);
//
      return res;
     }, // loadReportingTables
       'updateTestDataExtFun': function(orgID, doc ){
                 Collections.Service.update(
               { "mainDetails.serviceID": orgID},
               { $addToSet: {externalFunders : doc }}
               ) 
               return Collections.Service.find( { "mainDetails.serviceID": orgID}).count();  
       // can't get this to work - help needed:
        // {$set: {externalFunders.$ : doc}});
  // "externalFunders.$.servExternalFunderName" : doc.servExternalFunderName,
  // "externalFunders.$.servExternalFunderType" : doc.servExternalFunderType,
  // "externalFunders.$.servExternalFunderDonationType" : 
  // "externalFunders.$.servExternalFunderFrequency" : doc.servExternalFunderFrequency
    }, // updateTestDataExtFun
       'updateTestDataOrgManComm': function(doc ){
       Collections.Organisation.rawCollection().update(doc);
    }, // updateTestDataOrgManComm
 
  }); // Meteor.methods  
 };

