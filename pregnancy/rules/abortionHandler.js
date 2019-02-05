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
import {complicationsBuilder as ComplicationsBuilder} from "rules-config";

const ViewFilter = RuleFactory('32428a7e-d553-4172-b697-e8df3bbfb61d', "ViewFilter");
const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');

@ViewFilter('ff6e57aa-6b6f-421e-b9c6-415d5e623a7a', 'Pregnancy Abortion ViewFilter IHMP', 100.0, {})
class PregnancyAbortionViewFilterIHMP {
    static exec(programEncounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new PregnancyAbortionViewFilterIHMP(), programEncounter, formElementGroup, today);
    }

    @WithName('Have you taken treatment after spontaneous abortion?')
    @WithStatusBuilder
    x([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter('Type of Abortion').containsAnswerConceptName('Spontaneous abortion');
    }

    @WithName('Abortion complaints')
    @WithStatusBuilder
    y([], statusBuilder) {
        statusBuilder.skipAnswers('Abdominal pain');
    }
}

export {
    PregnancyAbortionViewFilterIHMP
}
