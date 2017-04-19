
/************************************************************
- \client\views\*.js files are to define helper functions and event handlers for the template defined with the same name (.html)
*************************************************************/

Template.facility.onRendered(function () {
  var self = this;
  self.autorun(function () {

////////////////////////////////////////////////////
// Condensed version:
var XXfacIdeal =
{ 
    "facID" : 1, 
    "healthAndSafety" : {
        "facElectricsSafe" : "Yes", 
        "facPlugSocketsCovered" : "Yes", 
        "facFloorType" : ["Concrete Slab", "Tiles"], // match on any array element
        "facFirstAidKit" : "Yes"
    }, 
 // ..   "structure" : {     } .. + 8 more level 1 keys
}

var xxfac1 =
{ 
    "facID" : 1028, 
    "healthAndSafety" : {
        "facElectricsSafe" : "Yes", 
        "facPlugSocketsCovered" : "No", 
        "facFloorType" : "Concrete Slab", 
        "facFirstAidKit" : ""
    } ,
 // ..   "structure" : {     } .. + 8 more level 1 keys
}

var facsToScore = Collections.FacilityQualityECD.find({"facID" : {$gt: 1040, $lte: 1043} }, {limit: 3, fields: { facID: 1, "structure" : 1, "sanitation": 1, "power": 1} }).fetch();

var facIdeal = Collections.FacilityQualityECD.find({"facID" : {$eq: 1024} }, {limit: 1, fields: { facID: 1, "structure" : 1, "sanitation": 1, "power": 1} }).fetch();

function generateScores() {
  for (var i = 0; i < facsToScore.length; i++) {
    for(var key in  facsToScore[i] ){
     if(key == "_id" || key == "facID" ) continue;
     // else if(key == "facID")  { facsToScore[i].facID = facsToScore["facID"] ; continue; }   
     // if(key == "_id")  { facsToScore[i]._id = facsToScore[_id]; continue; }  
     // else { 
      ValidateHealthAndSafetyObject(facsToScore[i],key,facIdeal[0]);
       // } ; // if(key ..)
    }
      console.log(facsToScore[i]._id + " " + facsToScore[i].facID );
      // console.log(facsToScore[i].scoreResults);
      Meteor.call('updateFacilityQualityECD', facsToScore[i].facID, facsToScore[i].scoreResults ); 
          // Collections.FacilityQualityECD.update({"facID" :  facsToScore[i].facID }, { $set: {"scoreResults": facsToScore[i].scoreResults} } ) ;
       // Messages.update(myMessages[0]._id, {$set: {important: true}});   _id: facsToScore[i]._id}
    }
}

 generateScores();


function ValidateHealthAndSafetyObject(obToValidate, subkey, obToCompareTo) {
// for each L1 key, cycles through the L2 keys of each comparison object:
  var scoreParentResults;
  var scoreResults;
  // Check if previous runs have created an existing scoreResults L1 key, if not create:
  if (obToValidate.scoreResults == null) {
    scoreParentResults = obToValidate.scoreResults = {};
  } else {
    scoreParentResults = obToValidate.scoreResults;

  }
  // Remove any existing scores, then initialise all to zero:
  scoreResults = scoreParentResults[subkey] = {};

  scoreResults.noKey = 0;
  scoreResults.noData = 0;
  scoreResults.dataMatched = 0;
  scoreResults.dataNotMatched = 0;

// assign vars to shorten L1 object refs:
 var subObToValidate = obToValidate[subkey];
 var subObToCompare = obToCompareTo[subkey];

// loop thru each L2 key and compare / validate
  for (var key in subObToValidate) {

    if (subObToValidate[key] == null) {
      scoreResults.noKey++; // not expected but makes it scalable.
    } else {
      if (subObToValidate[key] == undefined || subObToValidate[key] == "") {
        scoreResults.noData++;
      } else {
    
          if(subObToValidate[key] ===Object(subObToValidate[key])){
           console.log("subObToValidate[key] |||"+key+"|||"+subObToValidate[key]);
            continue; // exclude special objects like system functions??
          }
          //  console.log("subObToValidate[key] |||"+key+"|||"+subObToValidate[key]);
          // console.log("subObToCompare[key] |||"+key+"||| "+subObToCompare[key]);
  // single value compared to single value - most COMMONLY EXPECTED (Si ADDED - needed?)
        if (!Array.isArray(subObToValidate[key]) && !Array.isArray(subObToCompare[key])) {
          var matchFound = false;
          // loop thru each array element and check for any matches
          // toString() added for handling numbers, 
          if (!isNaN(subObToValidate[key])) { 
            if ( subObToValidate[key] === subObToCompare[key]  ) {
              scoreResults.dataMatched++;
              matchFound = true;
            } 
           }
          else if (subObToValidate[key].toLowerCase() === subObToCompare[key].toLowerCase()) {
              scoreResults.dataMatched++;
              matchFound = true;
            }
          if (!matchFound) {
            scoreResults.dataNotMatched++;
          }
  // single value compared to array - COMMONLY EXPECTED 
         } else if (!Array.isArray(subObToValidate[key]) && Array.isArray(subObToCompare[key])) {
          var matchFound = false;
          // loop thru each array element and check for any matches
          for (var i = 0; i < subObToCompare[key].length; i++) {
            if (subObToValidate[key].toLowerCase() === subObToCompare[key][i].toLowerCase()) {
              scoreResults.dataMatched++;
              matchFound = true;
              break;
            }
          } // for ends
          if (!matchFound) {
            scoreResults.dataNotMatched++;
          }

        } else if (Array.isArray(subObToValidate[key]) && !Array.isArray(subObToCompare[key])) {
 // array compared to single value - NOT EXPECTED, but scalable
          var matchFound = false;
          for (var i = 0; i < subObToValidate[key].length; i++) {
            if (subObToValidate[key][i].toLowerCase() === subObToCompare[key].toLowerCase()) {
              scoreResults.dataMatched++;
              matchFound = true;
              break;
            }
          }
          if (!matchFound) {
            scoreResults.dataNotMatched++;
          }

        } else {
// array compared to array - DEF NOT EXPECTED, but scalable
          var matchFound = false;
          for (var i = 0; i < subObToCompare[key].length; i++) {
            for (var j = 0; j < subObToValidate[key].length; j++) {
              if (subObToValidate[key][j].toLowerCase() === subObToCompare[key][i].toLowerCase()) {
                scoreResults.dataMatched++;
                matchFound = true;
                break;
              }
            }
            if (matchFound) {
              break;
            }
          }
          if (!matchFound) {
            scoreResults.dataNotMatched++;
          }

        }
      }
    }
  }

}

  }); // self.autorun
 }); // Template.xx.onCreated

 
