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

const RegistrationViewFilter = RuleFactory("b9762a13-fe53-4a33-a76c-21953b30f38f", "ViewFilter");
const WithStatusBuilder = StatusBuilderAnnotationFactory('individual', 'formElement');


@RegistrationViewFilter("23b90622-dbd2-49bc-b46c-86e3088dcaa7", "IHMP Household Registration View Filter", 100.0, {})
class householdRegistrationHandler {
    static exec(individual, formElementGroup) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new householdRegistrationHandler(), individual, formElementGroup);
    }


    @WithStatusBuilder
    specifyOtherReligion([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Religion").containsAnswerConceptName("Other");
    }



}

module.exports = {householdRegistrationHandler};
