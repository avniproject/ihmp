const _ = require('lodash');

module.exports = _.merge({},
    require('./registration/rules/registrationHandler'),
    require('./eligibleCouple/rules/enrolmentHandler'),
    require('./eligibleCouple/rules/monthlyNeedsAssessmentHandler'),
    require('./eligibleCouple/rules/fpServicesHandler'),
    require('./eligibleCouple/rules/visitSchedule'),
    require('./eligibleCouple/rules/encounterCancelHandler')
);
