const _ = require('lodash');

module.exports = _.merge({},
    require('./registration/rules/registrationHandler'),
    require('./eligibleCouple/rules/enrolmentHandler'),
    require('./eligibleCouple/rules/monthlyNeedsAssessmentHandler'),
    require('./eligibleCouple/rules/fpServicesHandler'),
    require('./eligibleCouple/rules/visitSchedule'),
    require('./eligibleCouple/rules/encounterCancelHandler'),
    require('./pregnancy/rules/enrolmentHandler'),
    require('./pregnancy/rules/ancASHAHandler'),
    require('./pregnancy/rules/pncHandler'),
    require('./pregnancy/rules/pncDecisions'),
    require('./pregnancy/rules/visitSchedule')
);
