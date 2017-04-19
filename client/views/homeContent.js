
Template.homeContent.onRendered(function(){

GoogleMaps.load({ key: 'AIzaSyCA3BTOUSnzhRu9HfdaiaQ8DF4y4XrP27c' });
// , libraries: 'geometry,places'

addClassesToolTips = function (){
$(".reactive-table-input").attr("autocomplete",
"on").attr("data-toggle", "tooltip").attr("title", 'Filter data by typing for example: "izin piped" or "umzu elec" - try a few google style searches'),
$(".reactive-table-columns-dropdown").attr("data-toggle", "tooltip")
.attr("title", "Click the Columns button to select from a list of columns to view or hide"),
$('[data-toggle="tooltip"]').tooltip(),
$(".dropdown-toggle, .input-group-addon").addClass("btn-blue-lg")
},

Meteor.setTimeout(function(){ addClassesToolTips()}, 200)
}),

Template.homeContent.helpers({

  searchMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(-30.84935, 30.35731),
        zoom: 9
      };
    }
  },

    settingsOFSMerged: function() {
        return {
            collection: Collections.OFSMergedView,
            showFilter: true,
            showColumnToggles: true,
            showNavigation: 'auto',
        fields: [
{key: "servName",              label:"Service Name (click to view)",
fn: function(e,t ){ return new Spacebars.SafeString('<a name="'+e+'" class="edtlnk" target="_blank" title="Click to open a new tab with the selected service`s details" href="../service/'+t.orgID+'">'+e+"</a>")} },
{key: "orgID",                 label:"Provided by Org (click to view):",
fn: function(e){ return new Spacebars.SafeString('<a name="'+e+'" class="edtlnk" target="_blank" title="Click to open a new tab with the selected organisation`s details" href="../organisation/'+e+'">'+e+"</a>")} },
{key: "servType",              label:"Service Type",             hidden:1},
{key: "facName",               label:"Facility Name",            hidden:1},
{key: "orgID",                 label:"At site ID (click to view)",sortByValue:0, 
fn: function(e){ return new Spacebars.SafeString('<a name="'+e+'" class="edtlnk" target="_blank" title="Click to open a new tab with the selected facility / site`s details" href="../facility/'+e+'">'+e+"</a>")} },
{key: "facDistMuni",           label:"District Muni",            hidden:1},
{key: "facLocalMuni",          label:"Local Muni"                         },
{key: "facWard",               label:"Ward"                               },
{key: "facCityVillage",        label:"City / Village"                     },
{key: "facGPSCoords",          label:"GPS",                      hidden:1},
{key: "facPCRStatus",          label:"PCR Status",               hidden:1},
{key: "orgNumBeneficiaries",   label:"No. of Benefi-ciaries"              },
{key: "subsidisedRatio",       label:"Subsidy Ratio"                      },
{key: "staffCount",            label:"Staff Count (click to view):",
fn: function(e,t){ return new Spacebars.SafeString('<a name="'+e+'" class="edtlnk" target="_blank" title="Click to open a new tab with the selected organisation`s staff" href="../staff/'+t.orgID+'">'+e+"</a>")} },
{key: "staffQual",             label:"Staff Quali-fied Ratio"             },
{key: "staffFull",             label:"Staff Full-time Ratio",    hidden:1},
{key: "flags",                 label:"Issue flags"                        }
          ] 
        };
    },
});

Template.homeContent.onCreated(function () {
  var self = this;
  self.autorun(function () {  // #1

// var facGPSCoordsArr = Collections.Facility.find({"details.facGPSCoords" : {$ne: ""} }, {limit: 500, fields: {"location.facID" : 1, "details.facGPSCoords": 1, "location.facName": 1} }).fetch();

  var facGPSCoordsArr = Collections.OFSMergedView.find({facGPSCoords : {$ne: ""} }, {limit: 1000, fields: {orgID : 1, facGPSCoords: 1, facName: 1, flags: 1} }).fetch();

 var myObjToArray = []; 
 var currentMarker;

// into an array of arrays like this - for the :
// var locs = [["-30.82935", "30.33731"], ["-30.84935", "30.35731"], ["-30.86935", "30.37731"] ] ;
// see the plan here: http://stackoverflow.com/questions/6593473/lat-long-array-as-markers-on-google-maps-api-v3

 function getGPSCoords(arr)  {
 for (var j = 0; j < arr.length;  j++) {
   var ob = arr[j] ;
    var a1 = ob.facGPSCoords.split("' ").join(",").split("'").join("").split(",");
                      // [["-30 27.382", "30 22.319"], ["-30 81.385", "30 32.574"]]
                         for(var i = 0; i< a1.length;i++){
                         var a2 = a1[i].split(" ");
                         var val1 = parseFloat(a2[0]);
                         var sign  = Math.sign(val1);
                         val1 = Math.abs(val1);
                          var val2 = parseFloat(a2[1]);
                          val2 /= 60;
                         a1[i] = (val1+val2) *sign;
                          }
                          a1[2] = arr[j].orgID;
                          a1[3] = arr[j].facName;
                          a1[4] = arr[j].flags;
                         myObjToArray.push(a1);
                  }; 
              return myObjToArray;
            } ;

  // console.log(getGPSCoords(facGPSCoordsArr));

 // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('searchMap', function(map) {
    // Add a marker to the map once it's ready
      // position: map.options.center, 
   // var locs = [["-30.82935", "30.33731"], ["-30.84935", "30.35731"], ["-30.86935", "30.37731"] ] ;
   var locs = getGPSCoords(facGPSCoordsArr) ;
   var i;
    for (i = 0; i < locs.length; i++) {  
      var issueCount = (locs[i][4].match(/\,/g) || []).length;
      var flaggedIssues = (issueCount == 0) ? 'None' :  locs[i][4] ;
      var markerPinColour = (issueCount >= 4) ? 'red' : (issueCount == 3) ? 'orange' : (issueCount == 2) ? 'yellow' : (issueCount == 1) ? 'blue' : (issueCount == 0) ? 'green' : 'white' ; 
      // var markerPinColour = 'red' ;

    var contentString = '<div class="map-infowindow">'+
            '<h4 class="iw-heading">' + locs[i][3] + ': </h4>'+
            '<p class="iw-text">Flagged issues: ' + flaggedIssues + '</p>'+
            '<a  target="_blank" title="Click to open a new tab with the selected facility / site`s details"' +
            ' href="/facility/'+   locs[i][2] +'">Facility /site details</a> '+
            '</div>';
            // console.log(contentString) ;

    var marker = new google.maps.Marker({
    position: new google.maps.LatLng(locs[i][0], locs[i][1]),
    map: map.instance,
    title: locs[i][3] +": "+ flaggedIssues,
    icon: 'http://maps.google.com/mapfiles/ms/icons/'+ markerPinColour +'-dot.png'
       });
    marker.info = new google.maps.InfoWindow({
          content: contentString
        });

     marker.addListener('click', function() {
      if(currentMarker) {
currentMarker.info.close();
        } 
        currentMarker = this;
     //      marker.info.open(map, this);
     // google.maps.event.addListener(marker, 'click', function() {
        var marker_map = this.getMap();
        this.info.open(marker_map, this);
            });
       }
    });


    function getMuniRegistrationInfo(elem, indx, list) {  // "iteratee" callback fn.  
      var muniInfo =  [ elem.facLocalMuni ] ;
      // muniInfo.push(elem.regSites);
      muniInfo.push(elem.regSites);
      muniInfo.push(elem.unRegSites);
      muniInfo.push('');
      reportMuni.push(muniInfo);
    };

    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(drawStacked01RegistrationStatus);

    function drawStacked01RegistrationStatus() {

    var dataJSON = Collections.Rep01RegisteredAndFundedECD.find().fetch();
    // {facLocalMuni: { /!Ugu,!umzumbe,!Vualamehlo/i }

      reportMuni = [];
      reportHeader =  ['Municipality', 'Registered', 'UnRegistered', { role: 'annotation' } ]
      reportMuni.push(reportHeader);
      /* use the each() function to iterate over every element */
      _.each(dataJSON, getMuniRegistrationInfo);  
      // each_.each(list, iteratee, [context])

    var dataMuni = new google.visualization.arrayToDataTable( reportMuni);

      var options = {
        title: 'Dashboard 01: PCR registration status by Municipality',
        // isStacked: true,
        bars: 'horizontal',
        vAxis: {
          title: 'Municipality'
        },
        hAxis: {
          title: 'No. of sites'
        },
        width: 450,
        height: 800,
        // colors: ['#e0440e', '#e6693e', '#ec8f6e'], // , '#f3b49f', '#f6c7b6'
        legend: { position: 'top', maxLines: 2 },
        bar: { groupWidth: '85%' },

        // axes: {
        //   y: {
        //     0: {side: 'right'}
        //   } },
      };

      var chart = new google.visualization.BarChart(document.getElementById('chart-01-registration-status'));
      chart.draw(dataMuni, options);


    } //  function draw..()

  });   // self.autorun #1

  self.autorun(function () {  // #1b

    function getMuniRegBenInfo(elem, indx, list) {  // "iteratee" callback fn. 
      var muniInfo =  [ elem.facLocalMuni ] ;
      // muniInfo.push(elem.regSites);
      muniInfo.push(elem.regTotal);
      muniInfo.push(elem.unRegTotal);
      muniInfo.push('');
      reportMuni.push(muniInfo);
    };


    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(drawStacked01bRegBenStatus);

    function drawStacked01bRegBenStatus() {

    var dataJSON = Collections.Rep01RegisteredAndFundedECD.find().fetch();
    // {facLocalMuni: { /!Ugu,!umzumbe,!Vualamehlo/i }

      reportMuni = [];
      reportHeader =  ['Municipality', 'Registered', 'UnRegistered', { role: 'annotation' } ]
      reportMuni.push(reportHeader);
      /* use the each() function to iterate over every element */
      _.each(dataJSON, getMuniRegBenInfo);  
      // each_.each(list, iteratee, [context])

    var dataMuni = new google.visualization.arrayToDataTable( reportMuni);

      var options = {
        title: 'Dashboard 01b: Beneficiary count vs registration status',
        // isStacked: true,
        bars: 'horizontal',
        vAxis: {
          title: 'Municipality'
        },
        hAxis: {
          title: 'No. of beneficiaries'
        },
        width: 450,
        height: 800,
        // colors: ['#e0440e', '#e6693e', '#ec8f6e'], // , '#f3b49f', '#f6c7b6'
        legend: { position: 'top', maxLines: 2 },
        bar: { groupWidth: '85%' },

        // axes: {
        //   y: {
        //     0: {side: 'right'}
        //   } },
      };

      var chart = new google.visualization.BarChart(document.getElementById('chart-01-registration-status-ben'));
      chart.draw(dataMuni, options);


    } //  function drawStacked01bRegBenStatus()

  });   // self.autorun #1b

///////////////////////////////////////////////
//  drawStacked02StaffTrainingNeeds

  self.autorun(function () {

    function getMuniStaffTrainingInfo(elem, indx, list) {  // "iteratee" callback fn. 
      var muniInfo =  [ elem.facLocalMuni ] ;
      muniInfo.push(elem.qualifiedCount);
      muniInfo.push(elem.unQualifiedCount);
      muniInfo.push('');
      reportMuni.push(muniInfo);
    };

    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(drawStacked02StaffTrainingNeeds);

    function drawStacked02StaffTrainingNeeds() {

    var dataJSON = Collections.Rep02StaffTrainingNeeds.find().fetch();

      reportMuni = [];
      reportHeader =  ['Municipality', 'qualified', 'UNqualified', { role: 'annotation' } ]
      reportMuni.push(reportHeader);
      /* use the each() function to iterate over every element */
      _.each(dataJSON, getMuniStaffTrainingInfo);  
      // each_.each(list, iteratee, [context])

    var dataMuni = new google.visualization.arrayToDataTable( reportMuni);

      var options = {
        title: 'Dashboard 02: Staff training Needs by Municipality',
        isStacked: true,
        hAxis: {
          title: 'Municipality'
        },
        vAxis: {
          title: 'No. of staff qualified vs unqualified'
        },
        width: 800,
        height: 400,
        // colors: ['#e0440e', '#e6693e', '#ec8f6e'], // , '#f3b49f', '#f6c7b6'
        legend: { position: 'top', maxLines: 2 },
        bar: { groupWidth: '85%' }
      };

      var chart = new google.visualization.ColumnChart(document.getElementById('chart-02-staff-training-needs'));
      chart.draw(dataMuni, options);
    } //  function drawStacked01BasicServices()

  });   // self.autorun #2

///////////////////////////////////////////////
//  drawStacked02StaffTrainingNeeds

  self.autorun(function () {

    function getMuniStaffTrainingInfo(elem, indx, list) {  // "iteratee" callback fn. 
      var muniInfo =  [ elem.facLocalMuni ] ;
      muniInfo.push(elem.qualifiedCount);
      muniInfo.push(elem.unQualifiedCount);
      muniInfo.push('');
      reportMuni.push(muniInfo);
    };

    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(drawStacked02StaffTrainingNeeds);

    function drawStacked02StaffTrainingNeeds() {

    var dataJSON = Collections.Rep02StaffTrainingNeeds.find().fetch();

      reportMuni = [];
      reportHeader =  ['Municipality', 'qualified', 'UNqualified', { role: 'annotation' } ]
      reportMuni.push(reportHeader);
      /* use the each() function to iterate over every element */
      _.each(dataJSON, getMuniStaffTrainingInfo);  
      // each_.each(list, iteratee, [context])

    var dataMuni = new google.visualization.arrayToDataTable( reportMuni);

      var options = {
        title: 'Dashboard 02: Staff training Needs by Municipality',
        isStacked: true,
        hAxis: {
          title: 'Municipality'
        },
        vAxis: {
          title: 'No. of staff qualified vs unqualified'
        },
        width: 800,
        height: 400,
        // colors: ['#e0440e', '#e6693e', '#ec8f6e'], // , '#f3b49f', '#f6c7b6'
        legend: { position: 'top', maxLines: 2 },
        bar: { groupWidth: '85%' }
      };

      var chart = new google.visualization.ColumnChart(document.getElementById('chart-04-sbg-totals'));
      chart.draw(dataMuni, options);
    } //  function drawStacked01BasicServices()

  });   // self.autorun #2

///////////////////////////////////////////////

  self.autorun(function () {

    function getMuniServicesInfo(elem, indx, list) {  // "iteratee" callback fn. 
      var muniInfo =  [ elem.facLocalMuni ] ;
      muniInfo.push(elem.facNoPipedWaterCount);
      muniInfo.push(elem.facNoElectricityCount);
      muniInfo.push(elem.facNoSanitationCount);
      muniInfo.push('');
      reportMuni.push(muniInfo);
    };

    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(drawStacked03BasicServices);

    function drawStacked03BasicServices() {

    dataJSON = Collections.Rep03SitesRequiringBasicServices.find().fetch();

      reportMuni = [];
      reportHeader =  ['Municipality', 'No piped-water sites', 'No electricity sites', 'No sanitation sites', { role: 'annotation' } ]
      reportMuni.push(reportHeader);
      /* use the each() function to iterate over every element */
      _.each(dataJSON, getMuniServicesInfo);  
      // each_.each(list, iteratee, [context])

    var dataMuni = new google.visualization.arrayToDataTable( reportMuni);

      var options = {
        title: 'Dashboard 03: ECD Sites Requiring Basic Services',
        isStacked: true,
        hAxis: {
          title: 'Municipality'
        },
        vAxis: {
          title: 'No. of sites lacking each service'
        },
        width: 800,
        height: 400,
        // colors: ['#e0440e', '#e6693e', '#ec8f6e'], // , '#f3b49f', '#f6c7b6'
        legend: { position: 'top', maxLines: 2 },
        bar: { groupWidth: '85%' }
      };

      var chart = new google.visualization.ColumnChart(document.getElementById('chart-03-basic-services'));
      chart.draw(dataMuni, options);
    } //  function drawStacked01BasicServices()

  });   // self.autorun #3
  

///////////////////////////////////////////////

  self.autorun(function () {

    function getMuniBeneficiaryInfo(elem, indx, list) {  // "iteratee" callback fn. 
      var muniInfo =  [ elem.facLocalMuni ] ;
      muniInfo.push(elem.aged0to18months);
      muniInfo.push(elem.aged19to35months);
      muniInfo. push(elem.aged3to4years);
      muniInfo.push(elem.aged4to5years);
      muniInfo.push(elem.aged5to6years);
      muniInfo.push(elem.afterSchool);
      muniInfo.push('');
      reportMuni.push(muniInfo);
    };

    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(drawStacked04BeneficiaryGroups);

    function drawStacked04BeneficiaryGroups() {

    dataJSON = Collections.Rep04BeneficiaryGroupMuni.find().fetch();

      reportMuni = [];
      reportHeader =  ['Municipality', '0to18months', '19to35months', '3to4years', '4to5years', '5to6years', 'afterSchool', { role: 'annotation' } ]
      reportMuni.push(reportHeader);
      /* use the each() function to iterate over every element */
      _.each(dataJSON, getMuniBeneficiaryInfo);  
      // each_.each(list, iteratee, [context])

    var dataMuni = new google.visualization.arrayToDataTable( reportMuni);

      var options = {
        title: 'Dashboard 04: Service Beneficiary totals per age group',
        isStacked: true,
        hAxis: {
          title: 'Municipality'
        },
        vAxis: {
          title: 'Age group totals'
        },
        width: 800,
        height: 400,
        // colors: ['#e0440e', '#e6693e', '#ec8f6e'], // , '#f3b49f', '#f6c7b6'
        legend: { position: 'top', maxLines: 2 },
        bar: { groupWidth: '85%' }
      };

      var chart = new google.visualization.ColumnChart(document.getElementById('chart-04-sbg-totals'));
      chart.draw(dataMuni, options);
    } //  function drawStacked01BasicServices()

  });   // self.autorun #4

 });  // Template.homeContent.onCreated - LONG SECTION

Template.reporting.onCreated(function () {
  var self = this;
 });  // Template.reporting.onCreated

// Template.reporting.events({   
//    'click #run-text-reports': function(e) {
//             // e.preventDefault();
//        console.log("Clicked run-text-reports");
//    }
//  });  // Template.reporting.events

Template.reporting.helpers({

    // isReportSelected: () => Session.equals("formsToDisplay", "reps"),

    settingsRep01: function() {
        return {
            collection: Collections.Rep01RegisteredAndFundedECD,
            showFilter: true,
            showColumnToggles: false,
            showNavigation: 'auto',
            rowsPerPage:  15,
           fields: [
    { key: "facLocalMuni"   , label: "Local Municipality"         },
    // { key: "facWard"      , label: "Ward" , sortOrder: 1   },
    { key: "regSites"           , label: "Reg. Sites"             },
    { key: "regSubsidised"     , label: "Reg. Sub"        },
    { key: "regUnSubsidised"   , label: "Reg. UnSub"      },
    // { key: "regTotal"           , label: "Reg. Total"             },
    { key: "unRegSites"        , label: "UnReg. Sites"           },
    { key: "unRegSubsidised"   , label: "unReg. Sub"      },
    { key: "unRegUnSubsidised" , label: "UnReg. UnSub"    },
    // { key: "unRegTotal:"        , label: "UnReg. Total"           },
    // { key: "totalSites:"        , label: "Tot. Sites"             },
    // { key: "totalSubsidised:"   , label: "Tot. Subsidised"        },
    // { key: "totalUnSubsidised:" , label: "Tot. UnSubsidised"      },
    { key: "totalBeneficiaries" , label: "Tot. Ben`s"    },
                   ],
        };
    },

     settingsRep02: function() { 
        return {
            collection: Collections.Rep02StaffTrainingNeeds,
            showFilter: false,
            showColumnToggles: false,
            showNavigation: 'auto',
            rowsPerPage:  15,
            fields: [
    { key: "facLocalMuni" , label: "Local Municipality"     },
    // { key: "facWard"      , label: "Ward" , sortOrder: 1   },
    { key: "siteCount"    , label: "No. of Sites"           },
    { key: "totalBeneficiaries" , label: "Total Beneficiaries"   },
    { key: "qualifiedCount" , label: "Total Qualified Staff"  },
    { key: "unQualifiedCount" , label: "Total UnQualified Staff"},
      ],
       };
     },

     settingsRep03: function() {
        return {
            collection: Collections.Rep03SitesRequiringBasicServices,
            showFilter: false,
            showColumnToggles: false,
            showNavigation: 'never',
            rowsPerPage:  30,
           fields: [
    { key: "facLocalMuni"   , label: "Local Municipality", sortOrder: 0   },
    // { key: "facWard"      , label: "Ward" , sortOrder: 1   },
    { key: "Sites"    , label: "Total No. of Sites"     },
    { key: "facNoElectricityCount", label: "No. of sites without electricity" },
    { key: "facNoPipedWaterCount", label: "No. of sites without piped water"},
    { key: "facNoSanitationCount", label: "No. of sites without formal sanitation"},
      ],
       };
     },

     settingsRep04: function() { 
        return {
            collection: Collections.Rep04BeneficiaryGroupMuni,
            showFilter: false,
            showColumnToggles: false,
            showNavigation: 'auto',
           rowsPerPage:  15,
           fields: [
    { key: "facLocalMuni" , label: "Local Municipality"     },
    { key: "aged0to18months"    , label: "0 to 18 mo"            },
    { key: "aged19to35months"    , label: "19 to 35 mo"           },
    { key: "aged3to4years"       , label: "3 to 4 yr"              },
    { key: "aged4to5years"       , label: "4 to 5 yr"              },
    { key: "aged5to6years"       , label: "5 to 6 yr"              },
    { key: "aged4to5years"       , label: "4 to 5 yr"              },
    // { key: "afterSchool"     , label: "after School"            },
    { key: "male"            , label: "Male"                   },
    { key: "female"          , label: "Female"                 },
    // { key: "african"         , label: "African"                },
    // { key:" indian"          , label: "Indian"                 },
    // { key:" coloured"        , label: "Coloured"               },
    // { key:" specialNeeds"    , label: "Special Needs"           },
    // { key: "total"           , label: "Total"                  },
      ],
       };
     },

});
