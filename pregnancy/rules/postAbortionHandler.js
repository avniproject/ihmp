import {
    FormElementsStatusHelper,
    FormElementStatus,
    FormElementStatusBuilder,
    RuleCondition,
    RuleFactory,
    StatusBuilderAnnotationFactory,
    VisitScheduleBuilder,
    WithName
} from 'rules-config/rules';

const ViewFilter = RuleFactory('b9a823eb-0251-4697-a34a-49f3f8ab0c04', "ViewFilter");
const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');

@ViewFilter('54ea8146-fe0d-4cdc-a12e-9eabb5323683', 'Pregnancy Post Abortion ViewFilter IHMP', 100.0, {})
class PregnancyPostAbortionViewFilterIHMP {
    static exec(programEncounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new PregnancyPostAbortionViewFilterIHMP(), programEncounter, formElementGroup, today);
    }

    @WithName('Currently suffering from any post abortion complaints')
    @WithStatusBuilder
    b([], statusBuilder) {
        statusBuilder.skipAnswers('Abdominal pain');
    }

    @WithName('Whether treatment taken for spontaneous abortion within 24 hours')
    @WithStatusBuilder
    x([], statusBuilder) {
        statusBuilder.show().when.valueInLastEncounter('Type of Abortion', ["Abortion"]).containsAnswerConceptName('Spontaneous abortion');
    }


    @WithName('Whether taken treatment for post abortion complication')
    @WithStatusBuilder
    z([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter('Post abortion complaints').containsAnyAnswerConceptName('Foul smelling vaginal discharge or blood','Lower abdominal pain','Per vaginal bleeding','Fever', 'Other');
    }

    @WithName('Duration of post abortion treatment in days')
    @WithStatusBuilder
    c([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter('Whether taken treatment for post abortion complication').containsAnswerConceptName('Yes');
    }


    @WithName('Whether complication cured')
    @WithStatusBuilder
    a([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter('Whether taken treatment for post abortion complication').containsAnswerConceptName('Yes');
    }


}

export {
    PregnancyPostAbortionViewFilterIHMP
}
