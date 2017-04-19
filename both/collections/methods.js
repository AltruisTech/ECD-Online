if (Meteor.isServer) {
  var cmd, exec, fs;
  fs = Npm.require('fs');
  exec = Npm.require('child_process').exec;
  cmd = Meteor.wrapAsync(exec);

  Meteor.methods({
    // skip Simple Schemma validations by accessing MongoDB native API via Collection.rawCollection():
    'countCollectionXX': function () {
      function countCollectionZZ(collectionName) {
        // console.log("collectionName: "+ Collections[collectionName]); 
       var collectionCount = Collections[collectionName].find().count();
        // console.log(collectionName + ' : ' + collectionCount);
        return collectionCount;
      }
      return countCollectionZZ; 
    }(), // countCollection
 
     'countCollectionZZ': function(collectionName){
      var collectionCount = Collections[collectionName].find().count();
    // PlayersList.remove(selectedPlayer);  // rather below as more secure
        // console.log(collectionName + ' : ' + collectionCount);
      return collectionCount;
    },
 
    'updateFacilityQualityECD': function(facID, obj) {
      Collections.FacilityQualityECD.rawCollection().update({facID: facID }, { $set: {"scoreResults": obj } } ) ;
        // Collections.Organisation.rawCollection().update(doc);
      // return xx ;
    },

    'countCollection': function () {
      function countCollection(collectionName) {
        Collections[collectionName].rawCollection().find().count();
      }
      return countCollection;
    }(), // countCollection

     'dropCollection': function () {
      function dropCollection(collectionName) {
        // console.log("collectionName: "+ Collections[collectionName]);
        Collections[collectionName].rawCollection().drop();
      }
      return dropCollection;
    }(), // dropCollection
    'loadTestData': function () {
      function loadTestData(collectionName, doc) {
        Collections[collectionName].rawCollection().insert(doc);
      }
      return loadTestData;
    }(), // loadTestData

    // 'loadReportingTables': function () {
    //   function loadReportingTables() {
    //     var res;
        // can't get this to work - help needed:
        // res = cmd(pwd);
        // console.log(res);

        // res = cmd(echo "load('./run/loadReportingTables.js')" | docker exec -i mongodb mongo nag-admin);
        //  console.log(res);
        // res = cmd(echo load("./run/loadReportingTables.js") | docker exec -i mongodb mongo nag-admin);
        //  console.log(res);

        // cmdString='echo load("./run/loadReportingTables.js") | docker exec -i mongodb mongo nag-admin';
        // res = cmd("/run/loadReportingTables.sh");
        // console.log(res);
        // return res;
      // }

    //   return loadReportingTables;
    // }(), // loadReportingTables
    'updateTestDataExtFun': function () {
      function updateTestDataExtFun(orgID, doc) {
        Collections.Service.update({ "mainDetails.serviceID": orgID }, { $addToSet: { externalFunders: doc } });
        return Collections.Service.find({ "mainDetails.serviceID": orgID }).count();
        // can't get this to work - help needed:
        // {$set: {externalFunders.$ : doc}});
        // "externalFunders.$.servExternalFunderName" : doc.servExternalFunderName,
        // "externalFunders.$.servExternalFunderType" : doc.servExternalFunderType,
        // "externalFunders.$.servExternalFunderDonationType" :
        // "externalFunders.$.servExternalFunderFrequency" : doc.servExternalFunderFrequency
      }

      return updateTestDataExtFun;
    }(), // updateTestDataExtFun

    'updateTestDataOrgManComm': function () {
      function updateTestDataOrgManComm(doc) {
        Collections.Organisation.rawCollection().update(doc);
      }

      return updateTestDataOrgManComm;
    }() 
  }); // Meteor.methods
};
