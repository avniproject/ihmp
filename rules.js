const _ = require('lodash');

module.exports = _.merge({},
    require('./registration/rules/registrationHandler'),
    require('./eligibleCouple/rules/enrolmentHandler'),
    require('./eligibleCouple/rules/monthlyNeedsAssessmentHandler'),
    require('./eligibleCouple/rules/fpServicesHandler'),
    require('./eligibleCouple/rules/visitSchedule'),
    require('./eligibleCouple/rules/rtiServicesHandler'),
    require('./eligibleCouple/rules/eligibilityCheck'),
    require('./pregnancy/rules/enrolmentHandler'),
    require('./pregnancy/rules/abortionHandler'),
    require('./pregnancy/rules/ancASHAHandler'),
    require('./pregnancy/rules/ancVhndHandler'),
    require('./pregnancy/rules/deliveryHandler'),
    require('./pregnancy/rules/pncHandler'),
    require('./pregnancy/rules/pncDecisions'),
    require('./pregnancy/rules/visitSchedule'),
    require('./pregnancy/rules/postAbortionHandler'),
    require('./shared/encounterCancellation/rules/encounterCancelHandler'),
    require('./shared/encounterCancellation/rules/visitSchedule'),
    require('./child/rules/nutritionalStatus'),
    require('./child/rules/checkListViewFilterIHMP'),
    require('./census/rules/censusFormHandler'),
    require('./child/rules/birthFormHandler'),
    require('./child/rules/neonatalFormHandler'),
    require('./child/rules/visitSchedule'),
    require('./marriageRegister/rules/marriageRegisterFormHandler'),
    require('./deathRegister/rules/deathRegisterFormHandler'),
    require('./asha/rules/ashaFormHandler'),
);
