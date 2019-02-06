const moment = require("moment");
const _ = require("lodash");
import {
    RuleFactory,
    FormElementsStatusHelper,
    FormElementStatusBuilder,
    StatusBuilderAnnotationFactory,
    FormElementStatus,
    VisitScheduleBuilder,
    WithName,
} from 'rules-config/rules';

const FPServicesViewFilter = RuleFactory("981b3e41-7fae-4b0e-a0aa-e9a42076414e", "ViewFilter");
const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');


@FPServicesViewFilter("6fcc12fc-f181-453e-b7ea-4d3351710e1d", "IHMP EC FP Services View Filter", 100.0, {})
class ECFPServicesViewFilterHandlerIHMP {
    static exec(programEncounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new ECFPServicesViewFilterHandlerIHMP(), programEncounter, formElementGroup, today);
    }

    @WithStatusBuilder
    otherTopicCoveredInFpCounselling([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("FP counselling topics covered").containsAnswerConceptName("Other");
    }

    @WithName('IHMP Recommendation for RTI symptoms')
    @WithStatusBuilder
    x([], statusBuilder) {
        statusBuilder.show()
            .when.valueInEncounter("Symptoms of RTI").is.defined
            .and.not.when.valueInEncounter("Symptoms of RTI").containsAnswerConceptName("None");
    }
}

module.exports = {ECFPServicesViewFilterHandlerIHMP};

