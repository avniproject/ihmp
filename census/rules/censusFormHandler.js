import {
    FormElementRule,
    FormElementsStatusHelper,
    StatusBuilderAnnotationFactory} from 'rules-config/rules';

const WithStatusBuilder = StatusBuilderAnnotationFactory('encounter', 'formElement');

@FormElementRule({
    name: 'IHMP Census form rules',
    uuid: '5b22f525-97c0-4501-b3cf-404f88098b19',
    formUUID: '224a34c7-4101-49e3-9dcc-2c7c0b4d36ba',
    executionOrder: 100.0,
    metadata: {}
})
class CensusFormHandler {
    static exec(encounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new CensusFormHandler(), encounter, formElementGroup, today);
    }

    @WithStatusBuilder
    disability([], statusBuilder) {
        statusBuilder.show()
            .when.valueInEncounter("Whether any disability").is.yes;
    }

    @WithStatusBuilder
    maritalStatus([], statusBuilder){
        statusBuilder.skipAnswers('Remarried', 'Other');
    }


    @WithStatusBuilder
    dateOfMarriage([], statusBuilder) {
        statusBuilder.show()
            .when.valueInEncounter("Marital status")
            .containsAnyAnswerConceptName("Currently married","Separated","Divorced","Widow(er)", "Remarried", "Other");
    }

    @WithStatusBuilder
    education([], statusBuilder) {
        statusBuilder.show()
            .when.ageInYears.is.greaterThanOrEqualTo(7);
    }

    @WithStatusBuilder
    occupation([], statusBuilder) {
        statusBuilder.show()
            .when.ageInYears.is.greaterThanOrEqualTo(7);
    }

    @WithStatusBuilder
    whetherSterilized([], statusBuilder) {
        statusBuilder.show()
            .when.valueInEncounter("Marital status").containsAnyAnswerConceptName("Currently married")
            .and.when.ageInYears.is.lessThanOrEqualTo(49);
    }
}


module.exports = {CensusFormHandler};
