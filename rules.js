const _ = require('lodash');

module.exports = _.merge({},
    require('./registration/rules/registrationHandler'),
    require('./eligibleCouple/rules/enrolmentHandler'),
    require('./eligibleCouple/rules/monthlyNeedsAssessmentHandler')

);
