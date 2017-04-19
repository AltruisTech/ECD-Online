/************************************************************
- Iron router is router that works on the server and the browser, designed specifically for Meteor.
- http://iron-meteor.github.io/iron-router/ 
*************************************************************/

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/', {
  name: 'homeContent',
  waitOn: function () { return [
      Meteor.subscribe('ofsMergedView'),
      Meteor.subscribe('facility'),
      Meteor.subscribe('rep01RegisteredAndFundedECD'),
      Meteor.subscribe('rep02StaffTrainingNeeds'),
      Meteor.subscribe('rep03SitesRequiringBasicServices'),
      Meteor.subscribe('rep04BeneficiaryGroupMuni')
      ];
  },
});

Router.route('/help', {
  name: 'helpContent'
});

Router.route('/service/:ServiceId', {
  name: 'service',
  waitOn: function () { 
      var params = this.params;
      OFSId = parseInt(params.ServiceId);
      return [ Meteor.subscribe('ofsMergedViewID', OFSId),
      Meteor.subscribe('service', OFSId),
      Meteor.subscribe('serviceQualityECD', OFSId),
      Meteor.subscribe('servBeneficiaryGroupRep', OFSId),
      Meteor.subscribe('servBeneficiaryGroup', OFSId)
      ];
 }, // waitOn
  onAfterAction: function () {
    function onAfterAction() {
      if (String(OFSId) == '*') {
        Session.set("formsToDisplay", "OFSListed");
      } else {
        Session.set("formsToDisplay", "OFSSelected");
        Session.set("selectedOFSId", parseInt(OFSId));
      }
    }
    return onAfterAction;
  }()
});

// given a url like "/organisation/1005"
Router.route('/organisation/:OrgId', {
  name: 'organisation',
  waitOn: function () {
      var params = this.params;
      OFSId = parseInt(params.OrgId);
      return [
      Meteor.subscribe('ofsMergedViewID', OFSId),
      Meteor.subscribe('organisation', OFSId)];
  }, // waitOn
  onAfterAction: function () {
      if (OFSId == '*') {
        Session.set("formsToDisplay", "OFSListed");
      } else {
        Session.set("formsToDisplay", "OFSSelected");
        Session.set("selectedOFSId", parseInt(OFSId));
      }
    }
});

Router.route('/facility/:facId', {
  name: 'facility',
  waitOn: function () {
    function waitOn() {
      var params = this.params;
      OFSId = parseInt(params.facId);
      return [Meteor.subscribe('ofsMergedViewID', OFSId),
      Meteor.subscribe('facility', OFSId),
      Meteor.subscribe('facilityQualityECD', OFSId)];
    }
    return waitOn;
  }(), // waitOn
  onAfterAction: function () {
    function onAfterAction() {
      if (String(OFSId) == '*') {
        Session.set("formsToDisplay", "OFSListed");
      } else {
        Session.set("formsToDisplay", "OFSSelected");
        Session.set("selectedOFSId", parseInt(OFSId));
      }
    }
    return onAfterAction;
  }()
});

Router.route('/staff/:OrgId', {
  name: 'staff',
  waitOn: function () {
    function waitOn() {
      var params = this.params;
      OFSId = parseInt(params.OrgId);
      return [
      // Meteor.subscribe('ofsMergedViewID', OFSId),
      Meteor.subscribe('staff', OFSId)];
    }

    return waitOn;
  }() });

Router.route('/loadData', {
  name: 'loadData',
  waitOn: function () {
    function waitOn() {
      return [Meteor.subscribe('service'),
      Meteor.subscribe('serviceQualityECD'),
      Meteor.subscribe('facility'),
      Meteor.subscribe('facilityQualityECD'),
      Meteor.subscribe('organisation'),
      // Meteor.subscribe('servBeneficiaryGroup'),
      Meteor.subscribe('staff')];
    }

    return waitOn;
  }(), // waitOn
  action: function () {
    function action() {
      this.render('loadData');
    }

    return action;
  }()
});

Router.route('/reporting', {
  name: 'reporting',
  waitOn: function () {
    function waitOn() {
      return [Meteor.subscribe('ofsMergedView'),
      Meteor.subscribe('rep01RegisteredAndFundedECD'),
      Meteor.subscribe('rep02StaffTrainingNeeds'),
      Meteor.subscribe('rep03SitesRequiringBasicServices'),
      Meteor.subscribe('rep04BeneficiaryGroupMuni')
      // );  // waitOn .. return
      ];
    }

    return waitOn;
  }(),
  action: function () {
    function action() {
      // this.next();
      this.render('reporting');
    }

    return action;
  }()
});
