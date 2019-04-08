const _ = require("lodash");
import {
    FormElementsStatusHelper,
    FormElementStatus,
    FormElementStatusBuilder,
    RuleCondition,
    RuleFactory,
    StatusBuilderAnnotationFactory,
    VisitScheduleBuilder,
    WithName,
} from 'rules-config/rules';

const BirthViewFilter = RuleFactory("18ce4e59-9393-4c01-922a-e73bcbcb5c24", "ViewFilter");
const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');


@BirthViewFilter("ae52fb53-da5a-4289-9337-7977b52f5c3b", "IHMP Birth View Filter", 100.0, {})
class ChildBirthViewFilterHandlerIHMP {

    static exec(programEncounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new ChildBirthViewFilterHandlerIHMP(), programEncounter, formElementGroup, today);
    }


    @WithStatusBuilder
    otherDetailsFirstFeedGivenToTheNewborn([], statusBuilder) {
        console.log('came to otherDetailsFirstFeedGivenToTheNewborn');
        statusBuilder.show().when.valueInEncounter("First feed given to the newborn").containsAnswerConceptName("Other");
    }
}

module.exports = {ChildBirthViewFilterHandlerIHMP};
