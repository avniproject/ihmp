const moment = require("moment");
const _ = require("lodash");
import {
    RuleFactory,
    FormElementsStatusHelper,
    FormElementStatusBuilder,
    StatusBuilderAnnotationFactory,
    FormElementStatus,
    VisitScheduleBuilder,
    RuleCondition
} from 'rules-config/rules';

const ANCVHNDViewFilter = RuleFactory("e2cf41de-d962-4110-9d66-70877e2eb59d", "ViewFilter");
const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');

@ANCVHNDViewFilter("18ae0315-e6c7-4d8c-89fa-527e2f8712ca", "IHMP ANC VHND View Filter", 100.0, {})
class PregnancyANCVHNDViewFilterHandlerIHMP {
    static exec(programEncounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new PregnancyANCVHNDViewFilterHandlerIHMP(), programEncounter, formElementGroup, today);
    }

    @WithStatusBuilder
    tt1Date([], statusBuilder) {
        statusBuilder.show().when.latestValueInPreviousEncounters("TT1 Date").is.notDefined;
    }
    
    @WithStatusBuilder
    tt2Date([], statusBuilder) {
        statusBuilder.show().when.latestValueInPreviousEncounters("TT2 Date").is.notDefined;
    }
    
    @WithStatusBuilder
    ttBoosterDate([], statusBuilder) {
        statusBuilder.show().when.latestValueInPreviousEncounters("TT Booster Date").is.notDefined;
    }

}

const ANCASHAFollowupViewFilter = RuleFactory("e2cf41de-d962-4110-9d66-70877e2eb59d", "ViewFilter");

@ANCASHAFollowupViewFilter("18ae0315-e6c7-4d8c-89fa-527e2f8712ca", "IHMP ANC VHND View Filter", 100.0, {})
class PregnancyANCVHNDFollowupViewFilterHandlerIHMP {
    static exec(programEncounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new PregnancyANCVHNDViewFilterHandlerIHMP(), programEncounter, formElementGroup, today);
    }
    
    @WithStatusBuilder
    placeOfAncVhndReferralUtilized([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether ANC VHND referral utilized").is.yes;
    }
}

module.exports = {PregnancyANCVHNDViewFilterHandlerIHMP,PregnancyANCVHNDFollowupViewFilterHandlerIHMP};