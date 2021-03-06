const moment = require("moment");
const _ = require("lodash");
import {
    RuleFactory,
    FormElementsStatusHelper,
    FormElementStatusBuilder,
    StatusBuilderAnnotationFactory,
    FormElementStatus,
    VisitScheduleBuilder
} from 'rules-config/rules';


const RegistrationViewFilter = RuleFactory("36ba19a3-c289-44b7-bf56-eed36e9d7519", "ViewFilter");
const WithStatusBuilder = StatusBuilderAnnotationFactory('individual', 'formElement');

@RegistrationViewFilter("ffa63fd1-a2a9-4e2b-aeb0-b095fe65709d", "IHMP Registration View Filter", 100.0, {})
class RegistrationHandlerIHMP {
    static exec(individual, formElementGroup) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new RegistrationHandlerIHMP(), individual, formElementGroup);
    }

    @WithStatusBuilder
    disability([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Whether any disability").is.yes;
    }

    @WithStatusBuilder
    maritalStatus([], statusBuilder){
        statusBuilder.skipAnswers('Remarried', 'Other');
    }


    @WithStatusBuilder
    dateOfMarriage([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Marital status").containsAnyAnswerConceptName("Currently married","Separated","Divorced","Widow(er)", "Remarried", "Other");
    }

    @WithStatusBuilder
    standardUptoWhichSchoolingCompleted([], statusBuilder) {
        statusBuilder.show().when.ageInYears.is.greaterThanOrEqualTo(7);
    }

    @WithStatusBuilder
    occupation([], statusBuilder) {
        statusBuilder.skipAnswers('Daily wage labourer', 'Skilled manual');
        statusBuilder.show().when.ageInYears.is.greaterThanOrEqualTo(7);
    }

    @WithStatusBuilder
    whetherSterilized([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Marital status").containsAnyAnswerConceptName("Currently married")
            .and.when.ageInYears.is.lessThanOrEqualTo(49);
    }
    @WithStatusBuilder
    specifyOtherRelation([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Relation to head of the family").containsAnswerConceptName("Other");
    }

    @WithStatusBuilder
    specifyOtherReligion([], statusBuilder) {
        statusBuilder.show().when.valueInRegistration("Religion").containsAnswerConceptName("Other");
    }



}

module.exports = {RegistrationHandlerIHMP};
