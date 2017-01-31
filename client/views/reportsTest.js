
Template.homeContent.onCreated(function () {
  var self = this;
  self.autorun(function () {  // #1

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

Template.reporting.events({
  'click #build-test-reports': function(e) {
      // var service = this;
      e.preventDefault();
    // var dataFile = "/data/yelp_test_set_5.json";


function print_filter(filter){
    var f=eval(filter);
    if (typeof(f.length) != "undefined") {}else{}
    if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
    if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
    console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
} 

var dataSet = [
    {"name":"Amahlubi and Educare Centre","pcrStatus":"Full Registration","localMunicipality":"Hibiscus Coast","yearStarted":1998,"numberOfBeneficiaries":82,"noOfChildrenWithSubsidies":60,"numberOfFullTimeStaffOrVolunteers":6}
,    {"name":"Betania Creche","pcrStatus":"Full Registration","localMunicipality":"Hibiscus Coast","yearStarted":1985,"numberOfBeneficiaries":200,"noOfChildrenWithSubsidies":200,"numberOfFullTimeStaffOrVolunteers":6}
,    {"name":"Ebeneza Creche and Educare Centre","pcrStatus":"Full Registration","localMunicipality":"Hibiscus Coast","yearStarted":2005,"numberOfBeneficiaries":200,"noOfChildrenWithSubsidies":100,"numberOfFullTimeStaffOrVolunteers":5}
,    {"name":"Ekuthokozeni Creche","pcrStatus":"Full Registration","localMunicipality":"Umuziwabantu","yearStarted":1991,"numberOfBeneficiaries":84,"noOfChildrenWithSubsidies":70,"numberOfFullTimeStaffOrVolunteers":5}
,    {"name":"Fundukuzenzela creche","pcrStatus":"Full Registration","localMunicipality":"Hibiscus Coast","yearStarted":1997,"numberOfBeneficiaries":106,"noOfChildrenWithSubsidies":"","numberOfFullTimeStaffOrVolunteers":4}
,    {"name":"Khayelihle creche","pcrStatus":"Full Registration","localMunicipality":"Umdoni","yearStarted":1986,"numberOfBeneficiaries":101,"noOfChildrenWithSubsidies":50,"numberOfFullTimeStaffOrVolunteers":5}
,    {"name":"Khulamntwana Creche","pcrStatus":"Full Registration","localMunicipality":"Umzumbe","yearStarted":1988,"numberOfBeneficiaries":301,"noOfChildrenWithSubsidies":100,"numberOfFullTimeStaffOrVolunteers":8}
,    {"name":"Khulanathi Day Care","pcrStatus":"Full Registration","localMunicipality":"Hibiscus Coast","yearStarted":2008,"numberOfBeneficiaries":110,"noOfChildrenWithSubsidies":115,"numberOfFullTimeStaffOrVolunteers":7}
,    {"name":"Khulisa Pre primary","pcrStatus":"Full Registration","localMunicipality":"Umdoni","yearStarted":1995,"numberOfBeneficiaries":159,"noOfChildrenWithSubsidies":120,"numberOfFullTimeStaffOrVolunteers":5}
,    {"name":"Maybuye i-Africa Creche","pcrStatus":"Full registration","localMunicipality":"Ezinqoleni","yearStarted":2006,"numberOfBeneficiaries":118,"noOfChildrenWithSubsidies":90,"numberOfFullTimeStaffOrVolunteers":5}
,    {"name":"Mkhoba Creche","pcrStatus":"Full Registration","localMunicipality":"Umuziwabantu","yearStarted":1993,"numberOfBeneficiaries":80,"noOfChildrenWithSubsidies":60,"numberOfFullTimeStaffOrVolunteers":4}
,    {"name":"Ntimbankulu creche","pcrStatus":"Full registration","localMunicipality":"Umzumbe","yearStarted":1985,"numberOfBeneficiaries":97,"noOfChildrenWithSubsidies":100,"numberOfFullTimeStaffOrVolunteers":3}
,    {"name":"Nyandezulu creche","pcrStatus":"Full Registration","localMunicipality":"Hibiscus Coast","yearStarted":1985,"numberOfBeneficiaries":102,"noOfChildrenWithSubsidies":125,"numberOfFullTimeStaffOrVolunteers":4}
,    {"name":"Ntokozweni Creche","pcrStatus":"Full registration","localMunicipality":"Hibiscus Coast","yearStarted":1980,"numberOfBeneficiaries":120,"noOfChildrenWithSubsidies":108,"numberOfFullTimeStaffOrVolunteers":5}
,    {"name":"Siphamandla Creche","pcrStatus":"Full Registration","localMunicipality":"Hibiscus Coast","yearStarted":1997,"numberOfBeneficiaries":80,"noOfChildrenWithSubsidies":60,"numberOfFullTimeStaffOrVolunteers":6}
,    {"name":"Sisizakele creche","pcrStatus":"Full Registration","localMunicipality":"Umdoni","yearStarted":1985,"numberOfBeneficiaries":83,"noOfChildrenWithSubsidies":79,"numberOfFullTimeStaffOrVolunteers":5}
,    {"name":"Siyabonga Creche","pcrStatus":"Full Registration","localMunicipality":"Hibiscus Coast","yearStarted":1998,"numberOfBeneficiaries":140,"noOfChildrenWithSubsidies":120,"numberOfFullTimeStaffOrVolunteers":8}
,    {"name":"Siyakhula creche","pcrStatus":"Full Registration","localMunicipality":"Hibiscus Coast","yearStarted":2008,"numberOfBeneficiaries":92,"noOfChildrenWithSubsidies":62,"numberOfFullTimeStaffOrVolunteers":6}
,    {"name":"Sizanani Machi Creche","pcrStatus":"Full Registration","localMunicipality":"Umuziwabantu","yearStarted":1994,"numberOfBeneficiaries":110,"noOfChildrenWithSubsidies":0,"numberOfFullTimeStaffOrVolunteers":6}
,    {"name":"St Anthony Creche","pcrStatus":"Full Registration","localMunicipality":"Hibiscus Coast","yearStarted":2002,"numberOfBeneficiaries":102,"noOfChildrenWithSubsidies":54,"numberOfFullTimeStaffOrVolunteers":5}
,    {"name":"Thandokuhle Creche","pcrStatus":"Full Registration","localMunicipality":"Hibiscus Coast","yearStarted":1991,"numberOfBeneficiaries":100,"noOfChildrenWithSubsidies":60,"numberOfFullTimeStaffOrVolunteers":4}
,    {"name":"Thandolwabantwana Creche","pcrStatus":"Full Registration","localMunicipality":"Hibiscus Coast","yearStarted":1995,"numberOfBeneficiaries":116,"noOfChildrenWithSubsidies":125,"numberOfFullTimeStaffOrVolunteers":7}
,    {"name":"Theza Creche","pcrStatus":"full registration","localMunicipality":"Umzumbe","yearStarted":1995,"numberOfBeneficiaries":85,"noOfChildrenWithSubsidies":85,"numberOfFullTimeStaffOrVolunteers":4}
,    {"name":"Tin Town creche","pcrStatus":"Full Registration","localMunicipality":"Hibiscus Coast","yearStarted":1985,"numberOfBeneficiaries":165,"noOfChildrenWithSubsidies":128,"numberOfFullTimeStaffOrVolunteers":6}
,    {"name":"Vulingqondo Creche","pcrStatus":"Full Registration","localMunicipality":"Hibiscus Coast","yearStarted":2007,"numberOfBeneficiaries":92,"noOfChildrenWithSubsidies":120,"numberOfFullTimeStaffOrVolunteers":5}
,    {"name":"Zulu Creche","pcrStatus":"Full Registration","localMunicipality":"Hibiscus Coast","yearStarted":2006,"numberOfBeneficiaries":84,"noOfChildrenWithSubsidies":40,"numberOfFullTimeStaffOrVolunteers":4}
  ];

        
    var dateFormat = d3.time.format("%m/%d/%Y");
    dataSet.forEach(function(d) {

         d.subsidisedRatio  = 100 * (d.noOfChildrenWithSubsidies / d.numberOfBeneficiaries );
         d.staffChildRatio  =  (d.numberOfBeneficiaries / d.numberOfFullTimeStaffOrVolunteers  );
     });

    //Create a Crossfilter instance
    var ndx = crossfilter(dataSet);

    //Define Dimensions
    var orgName = ndx.dimension(function(d)     { return d.name; });
    var municipality = ndx.dimension(function(d) { return d.localMunicipality; });
    var PCRStatus    = ndx.dimension(function(d) { return d.pcrStatus; });
    var YearStarted = ndx.dimension(function(d) { return d.yearStarted; });
    var Beneficiaries = ndx.dimension(function(d) { return d.numberOfBeneficiaries; });
    var Subsidised = ndx.dimension(function(d) { return d.noOfChildrenWithSubsidies; });
    var unSubsidised = ndx.dimension(function(d) { return d.numberOfBeneficiaries - d.noOfChildrenWithNoSubsidies; });
    var FullTimeStaff = ndx.dimension(function(d) { return d.numberOfFullTimeStaffOrVolunteers; });

    var subsidisedRatio = ndx.dimension(function(d) { return d.subsidisedRatio; });
    var staffChildRatio = ndx.dimension(function(d) { return d.staffChildRatio; });

    //Calculate metrics
    // var organisationsByMunicipality= municipality.group(); 
    var orgsByMunicipality     = municipality.group();
    var orgsByYearStarted       = YearStarted.group();

// print_filter("ndx");
// print_filter("orgsByMunicipality");
// below 2 DON'T WORK:
// var PCRStatus3 = _.first(_.values(PCRStatus), 3);
// console.log(PCRStatus3);


    // Calculate Groups
    var PCRStatusMunicipality          = municipality.group().reduceSum(function(d) { return d.PCRStatus;                     });
    var totalBeneficiariesMunicipality = municipality.group().reduceSum(function(d) { return d.numberOfBeneficiaries;         });
    var totalSubsidisedMunicipality    = municipality.group().reduceSum(function(d) { return d.totalSubsidisedMunicipality;     });
    var totalUnSubsidisedMunicipality  = municipality.group().reduceSum(function(d) { return d.unSubsidised;   });

// https://github.com/square/crossfilter/issues/102#issuecomment-31570749  :

function reduceAddAvg(attr) {
  return function(p,v) {
    ++p.count
    p.sum += v[attr];
    p.avg = Math.round(p.sum/p.count);
    return p;
  };
}
function reduceRemoveAvg(attr) {
  return function(p,v) {
    --p.count
    p.sum -= v[attr];
    p.avg = p.sum/p.count;
    return Math.round(p.sum/p.count);
  };
}
function reduceInitAvg() {
  return {count:0, sum:0, avg:0};
}
// var statesAvgGroup = statesAvgDimension.group().reduce(reduceAddAvg('savings'), reduceRemoveAvg('savings'), reduceInitAvg);

    var subsidisedRatioOrg          = orgName.group().reduce(reduceAddAvg('subsidisedRatio'), reduceRemoveAvg('subsidisedRatio'), reduceInitAvg);
    var subsidisedRatioMunicipality = municipality.group().reduce(reduceAddAvg('subsidisedRatio'), reduceRemoveAvg('subsidisedRatio'), reduceInitAvg);
    // var subsidisedRatioOrg               = orgName.group().reduceSum(function(d) { return d.subsidisedRatio;   });
    var staffChildRatioOrg          = orgName.group().reduce(reduceAddAvg('staffChildRatio'), reduceRemoveAvg('staffChildRatio'), reduceInitAvg);
    var staffChildRatioMunicipality = municipality.group().reduce(reduceAddAvg('staffChildRatio'), reduceRemoveAvg('staffChildRatio'), reduceInitAvg);

// eg. orgsByMunicipality(5) = [
//     {"key":"Hibiscus Coast","value":16},
//     {"key":"Umdoni","value":3},

//eg. staffChildRatioMunicipality(5) = [
//     {"key":"Hibiscus Coast","value":{"count":16,"sum":353.7523809523809,"avg":22}},

// print_filter("staffChildRatioMunicipality");

    // var totalBeneficiariesPCRStatus    = PCRStatus.group().reduceSum(function(d) {
    var totalSubsidisedOrg               = orgName.group().reduceSum(function(d) { return d.noOfChildrenWithSubsidies;   });
    // var totalUnSubsidisedOrg             = orgName.group().reduceSum(function(d) { return d.noOfChildrenWithNoSubsidies; });
    // var totalBeneficiariesYearStarted  = YearStarted.group().reduceSum(function(d) { return d.numberOfBeneficiaries; });
    var netBeneficiaries = ndx.groupAll().reduceSum(function(d) {return d.numberOfBeneficiaries; });
    // var topSubsidisedOrg = totalSubsidisedOrg.top(10);

    var totalBeneficiariesYearStarted  = YearStarted.group().reduceSum(function(d) { return d.Beneficiaries;    });
    // var orgsByPCRStatus_1             = PCRStatus_1_filter.group();
    // PCRStatus.filterAll() 
    var PCRStatus_1_filter            = PCRStatus.filterExact("Full Registration");
    var PCRStatusMunicipalityStatus1   = municipality.group().reduceSum(function(d) { return d.PCRStatus;                     });
    // var PCRStatus_2_filter            = PCRStatus.filter(function(d) { if (d ==="Full registration" ) {return d;} });
    var PCRStatus_2_filter            = PCRStatus.filterExact("Full registration");
    var PCRStatusMunicipalityStatus2   = municipality.group().reduceSum(function(d) { return d.PCRStatus;                     });
    // var PCRStatus_3_filter            = PCRStatus.filter(function(d) { if (d ==="full registration" ) {return d;} });
        var PCRStatus_3_filter            = PCRStatus.filterExact("full registration");
    var PCRStatusMunicipalityStatus3   = municipality.group().reduceSum(function(d) { return d.PCRStatus;                     });

    // PCRStatus.filterAll()
    // var all = ndx.groupAll();


// values are all 0 for these:
// print_filter("PCRStatus_1_filter");
// print_filter("PCRStatus_2_filter");
// print_filter("totalSubsidisedMunicipality");


// var beneficiariesBarChart  = dc.barChart("#bar-chart"); 
var beneficiariesBarChart          = dc.barChart("#bar-chart"); 
var PCRStatusBarChart          = dc.barChart("#bar-chart-2"); 
var subsidisedRatioMunicipalityChart  = dc.barChart("#row-chart");

// We set the charts dimension (x-axis), group (y-axis), and range 

  beneficiariesBarChart
    .gap(20)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .width(600)
    .height(200)
    .dimension(municipality)
    .group(totalUnSubsidisedMunicipality, "No. of un-subsidised")
    .stack(totalSubsidisedMunicipality, "No. of subsidised");
  
    // beneficiariesBarChart
    PCRStatusBarChart
    .gap(20)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .width(600)
    .height(200)
    .dimension(municipality)
    .group(PCRStatusMunicipalityStatus1, "PCRStatusMunicipality") ;
    // .stack(totalSubsidisedMunicipality);
   // .centerBar(true)
 
    subsidisedRatioMunicipalityChart
        // .width(400)
        .height(280)
        .transitionDuration(1000)
        // .margins({top: 10, right: 50, bottom: 100, left: 50})
        // .colors(d3.scale.category20())
        .centerBar(false)
        // .gap(20)
        .elasticY(true)
        .elasticX(true)
         .dimension(municipality)
        .group(subsidisedRatioMunicipality, "Subsidised Ratio")
        .valueAccessor(function(d) {return d.value.avg;})
        .x(d3.scale.ordinal().domain(municipality))
        // .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .ordering(function(d){return d.value;})
        // .yAxis().ticks(10);
        // .yAxis().tickFormat(d3.format("s"))
      // .legend(dc.legend().x(200).y(50).itemHeight(13).gap(5))
      .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true) ;

dc.renderAll(); 

 } //  'click #build-test-reports'
}); // Template.reporting.events


