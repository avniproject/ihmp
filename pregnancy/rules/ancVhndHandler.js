import {
    lib,
    complicationsBuilder as ComplicationsBuilder,
    DecisionRule,
    FormElementsStatusHelper,
    FormElementStatus,
    FormElementStatusBuilder,
    RuleCondition,
    RuleFactory,
    StatusBuilderAnnotationFactory,
    VisitScheduleBuilder
} from 'rules-config/rules';

const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');

const ANCVHNDViewFilter = RuleFactory("e2cf41de-d962-4110-9d66-70877e2eb59d", "ViewFilter");

@ANCVHNDViewFilter("18ae0315-e6c7-4d8c-89fa-527e2f8712ca", "IHMP ANC VHND View Filter", 100.0, {})
class PregnancyANCVHNDViewFilterHandlerIHMP {
    static exec(programEncounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new PregnancyANCVHNDViewFilterHandlerIHMP(), programEncounter, formElementGroup, today);
    }


    @WithStatusBuilder
    tt1Date([], statusBuilder) {
        const programEnrolment = statusBuilder.context.programEncounter.programEnrolment;
        const condition1 = programEnrolment.findObservationValueInEntireEnrolment("TT1 Date");
        const condition2 = programEnrolment.findObservationValueInEntireEnrolment("TT2 Date");
        const condition3 = programEnrolment.findObservationValueInEntireEnrolment("TT Booster Date");
        const condition4 = Boolean( !(condition1 || condition2 || condition3) );
        // console.log(`=====================================> TT1 value of condition 4 is ${condition4}`);
        statusBuilder.show().whenItem(condition4).is.truthy;
    }
    @WithStatusBuilder
    tt2Date([], statusBuilder) {
        const programEnrolment = statusBuilder.context.programEncounter.programEnrolment;
        const condition1 = programEnrolment.findObservationValueInEntireEnrolment("TT2 Date");
        const condition2 = programEnrolment.findObservationValueInEntireEnrolment("TT Booster Date");
        const condition3 = Boolean( !(condition1 || condition2) );
        // console.log(`=====================================> TT2 value of condition 3 is ${condition3}`);
        statusBuilder.show().whenItem(condition3).is.truthy;
    }

    @WithStatusBuilder
    ttBoosterDate([], statusBuilder) {
        const programEnrolment = statusBuilder.context.programEncounter.programEnrolment;
        const condition1 = programEnrolment.findObservationValueInEntireEnrolment("TT1 Date");
        const condition2 = programEnrolment.findObservationValueInEntireEnrolment("TT2 Date");
        const condition3 = programEnrolment.findObservationValueInEntireEnrolment("TT Booster Date");
        const condition4 = Boolean( !(condition1 || condition2 || condition3) );
        // console.log(`=====================================> TT Booster value of condition 4 is ${condition4}`);
        statusBuilder.show().whenItem(condition4).is.truthy;
    }

    @WithStatusBuilder
    pregnancyComplications([programEncounter, fe, today], statusBuilder) {
        const currentTrimester = lib().calculations.currentTrimester(programEncounter.programEnrolment, today);
        if (currentTrimester !== 3) {
            statusBuilder.skipAnswers('Reduced fetal movement', 'Watery discharge before onset of labour');
        }
    }
}

const ANCASHAFollowupViewFilter = RuleFactory('5edbca3a-04bf-4e16-b624-57331a71da39', "ViewFilter");

@ANCASHAFollowupViewFilter("243be415-dc0a-429e-afff-938c493d2de5", "IHMP ANC VHND Followup View Filter", 100.0, {})
class PregnancyANCVHNDFollowupViewFilterHandlerIHMP {
    static exec(programEncounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new PregnancyANCVHNDFollowupViewFilterHandlerIHMP(), programEncounter, formElementGroup, today);
    }

    @WithStatusBuilder
    pregnancyComplications([programEncounter, fe, today], statusBuilder) {
        const currentTrimester = lib().calculations.currentTrimester(programEncounter.programEnrolment, today);
        if (currentTrimester !== 3) {
            statusBuilder.skipAnswers('Reduced fetal movement', 'Watery discharge before onset of labour');
        }
    }

    @WithStatusBuilder
    placeOfAncVhndReferralUtilized([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether ANC VHND referral utilized").is.yes;
    }
}

@DecisionRule({
    name: 'Pregnancy ANC ASHA Form Decisions IHMP',
    uuid: '4d0c9553-7311-4309-a14e-9e5c09e21aa6',
    formUUID: 'e2cf41de-d962-4110-9d66-70877e2eb59d',
    executionOrder: 100.0,
    metadata: {}
})
class PregnancyANCVHNDDecisionsIHMP {

    static highRisks(programEncounter, today) {
        const highRiskBuilder = new ComplicationsBuilder({
            programEnrolment: programEncounter.programEnrolment,
            programEncounter,
            complicationsConcept: 'High Risk Conditions'
        });

        highRiskBuilder.addComplication("Irregular weight gain")
            .whenItem(lib().calculations.isNormalWeightGain(programEncounter.programEnrolment, programEncounter, today)).is.not.truthy;


        console.log('lib.calculations.isNormalWeightGain(programEncounter.programEnrolment, programEncounter, today)');
        console.log(lib().calculations.isNormalWeightGain(programEncounter.programEnrolment, programEncounter, today));
        return highRiskBuilder.getComplications();
    }

    static exec(programEncounter, decisions, context, today) {
        decisions.encounterDecisions.push(PregnancyANCVHNDDecisionsIHMP.highRisks(programEncounter, today));
        return decisions;
    }

}

export {
    PregnancyANCVHNDViewFilterHandlerIHMP,
    PregnancyANCVHNDFollowupViewFilterHandlerIHMP,
    PregnancyANCVHNDDecisionsIHMP
}
