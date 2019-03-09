import {
    FormElementRule,
    FormElementsStatusHelper,
    StatusBuilderAnnotationFactory} from 'rules-config/rules';
import {WithName} from "rules-config";

const WithStatusBuilder = StatusBuilderAnnotationFactory('encounter', 'formElement');

@FormElementRule({
    name: 'IHMP Marriage Register form rules',
    uuid: 'f8857d51-815c-4fee-a58a-310ed98af389',
    formUUID: 'e8fac8b3-b043-461d-8a32-6bdce9a33dc7',
    executionOrder: 100.0,
    metadata: {}
})
class MarriageRegisterFormHandler {
    static exec(encounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new MarriageRegisterFormHandler(), encounter, formElementGroup, today);
    }

    @WithName("Age at the time of first menses - completed years")
    @WithStatusBuilder
    firstMens([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("gender").is.female;
    }

    @WithName("How many years after starting menstruating, did you get married?")
    @WithStatusBuilder
    marriedAfterMens([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("gender").is.female;
    }

    @WithName("Attended Life Skills Education course")
    @WithStatusBuilder
    ageAtMarriage([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("gender").is.female;
    }

    @WithName("When attended LSE course - years")
    @WithStatusBuilder
    lseCourse([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Attended Life Skills Education course").is.yes;
    }
}


module.exports = { MarriageRegisterFormHandler};
