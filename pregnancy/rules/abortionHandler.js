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
import RuleHelper from "../../RuleHelper";

const ViewFilter = RuleFactory('32428a7e-d553-4172-b697-e8df3bbfb61d', "ViewFilter");
const Decision = RuleFactory('32428a7e-d553-4172-b697-e8df3bbfb61d', 'Decision');
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

    @WithName('Post abortion complaints')
    @WithStatusBuilder
    y([], statusBuilder) {
        statusBuilder.skipAnswers('Abdominal pain');
    }

    @WithName('When was the treatment taken after spontaneous abortion')
    @WithStatusBuilder
    z([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter('Whether treatment taken after spontaneous abortion').containsAnswerConceptName('Yes');
    }

    @WithName('Whether treatment taken for post abortion complaints')
    @WithStatusBuilder
    a([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter('Post abortion complaints').containsAnyAnswerConceptName('Foul smelling vaginal discharge or blood', 'Lower abdominal pain', 'Per vaginal bleeding', 'Fever', 'Other');
    }

}

@Decision('b3e83264-229a-4f6e-adb7-b24d17d117d5', 'PregnancyAbortionDecisionIHMP', 100.0, {})
class PregnancyAbortionDecisionIHMP {
    static referrals(programEncounter) {
        const referralAdvice = new ComplicationsBuilder({
            programEnrolment: programEncounter.programEnrolment,
            programEncounter: programEncounter,
            complicationsConcept: 'Refer to the hospital immediately for'
        });

        if (!programEncounter) return referralAdvice.getComplications();

        referralAdvice.addComplication("Abdominal pain")
            .when.valueInEncounter("Post abortion complaints").containsAnswerConceptName("Abdominal pain")
            .and.valueInEncounter('Whether taken treatment for post abortion complication').is.no;

        referralAdvice.addComplication("Per vaginal bleeding")
            .when.valueInEncounter("Post abortion complaints").containsAnswerConceptName("Per vaginal bleeding")
            .and.valueInEncounter('Whether taken treatment for post abortion complication').is.no;

        referralAdvice.addComplication("Fever")
            .when.valueInEncounter("Post abortion complaints").containsAnswerConceptName("Fever")
            .and.valueInEncounter("Place of abortion").containsAnswerConceptName("Home")
            .and.valueInEncounter('Whether taken treatment for post abortion complication').is.no;

        referralAdvice.addComplication("Spontaneous abortion")
            .when.valueInEncounter("Type of Abortion").containsAnswerConceptName("Spontaneous abortion")
            .and.valueInEncounter('Whether treatment taken after spontaneous abortion').is.no;

        return referralAdvice.getComplications();
    }

    static exec(programEncounter, decisions, context, today) {
        RuleHelper.replaceRecommendation(decisions, 'encounterDecisions', PregnancyAbortionDecisionIHMP.referrals(programEncounter));
        return decisions;
    }
}

export {
    PregnancyAbortionViewFilterIHMP,
    PregnancyAbortionDecisionIHMP
}
