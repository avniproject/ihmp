const moment = require("moment");
const _ = require("lodash");
import {
    lib,
    RuleFactory,
    FormElementsStatusHelper,
    FormElementStatusBuilder,
    StatusBuilderAnnotationFactory,
    FormElementStatus,
    VisitScheduleBuilder,
    complicationsBuilder as ComplicationsBuilder,
    RuleCondition,
    WorkListUpdationRule
} from 'rules-config/rules';

const MonthlyAssessmentViewFilter = RuleFactory("8b5bf56e-346a-486e-b00e-9fa604fa0b54", "ViewFilter");
const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');

let applicableForFamilyPlanning = function (programEncounter) {
    return new RuleCondition({programEncounter: programEncounter}).valueInEnrolment("Whether sterilized").is.no
        .and.not.valueInEncounter("Whether currently pregnant").is.yes
        .matches();
};


@MonthlyAssessmentViewFilter("f9d1d4b2-437c-4040-8ecc-34e928466efb", "IHMP EC Monthly needs assessment View Filter", 100.0, {})
class ECMonthlyNeedsAssessmentViewFilterHandlerIHMP {
    static exec(programEncounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new ECMonthlyNeedsAssessmentViewFilterHandlerIHMP(), programEncounter, formElementGroup, today);
    }

    menstrualSurveillance(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe=>{
            let statusBuilder = new FormElementStatusBuilder({programEncounter:programEncounter, formElement:fe});
            statusBuilder.show().when.valueInEnrolment("Whether sterilized").is.no;
            return statusBuilder.build();
        });
    }

    menstrualSurveillanceCounselling(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe=>{
            let statusBuilder = new FormElementStatusBuilder({programEncounter:programEncounter, formElement:fe});
            statusBuilder.show().when.valueInEnrolment("Whether sterilized").is.no;
            return statusBuilder.build();
        });
    }

    familyPlanning(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe=>{
            let statusBuilder = new FormElementStatusBuilder({programEncounter:programEncounter, formElement:fe});
            statusBuilder.show().whenItem(applicableForFamilyPlanning(programEncounter)).is.truthy;
            return statusBuilder.build();
        });
    }

    fpCounselling(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map(fe=>{
            let statusBuilder = new FormElementStatusBuilder({programEncounter:programEncounter, formElement:fe});
            statusBuilder.show().whenItem(applicableForFamilyPlanning(programEncounter)).is.truthy;
            return statusBuilder.build();
        });
    }

    @WithStatusBuilder
    whetherMissedMonthlyPeriods([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether got monthly periods").is.no
            .and.when.not.valueInLastEncounter("Whether currently pregnant",["Monthly needs assessment"]).is.yes;
    }

    @WithStatusBuilder
    whetherUndergonePregnancyTestIfMissedMonthlyPeriods([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether missed monthly periods").is.yes;
    }

    @WithStatusBuilder
    resultOfUpt([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether undergone pregnancy test if missed monthly periods").is.yes;
    }

    @WithStatusBuilder
    whetherCurrentlyPregnant([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether got monthly periods").is.no;
    }

    @WithStatusBuilder
    ifNotGettingPeriodsWhetherLactatingMotherIrregularPeriods([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether got monthly periods").is.no
            .and.not.valueInEncounter("Whether currently pregnant").is.yes;
    }

    @WithStatusBuilder
    missedPeriodsAndNotDoneUptCounselling([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether undergone pregnancy test if missed monthly periods").is.no;
    }

    @WithStatusBuilder
    whetherUsingAnyFamilyPlanningMethodCurrently([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Whether sterilized").is.no
            .and.not.valueInEncounter("Whether currently pregnant").is.yes;
    }

    @WithStatusBuilder
    familyPlanningMethodUsedCurrently([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether using any family planning method currently").is.yes;
    }

    @WithStatusBuilder
    sinceLastHowManyMonthIsSheUsingTheFpMethod([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether using any family planning method currently").is.yes;
    }

    @WithStatusBuilder
    whetherDesireToUseAnyFpMethodsInFuture([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether using any family planning method currently").is.no
            .and.when.not.valueInEncounter("Whether currently pregnant").is.yes;
    }

    @WithStatusBuilder
    fpMethodPreferenceForFutureUse([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether desire to use any FP methods in future").is.yes;
    }

    @WithStatusBuilder
    ihmpFpCounsellingToDelayFirstConception([], statusBuilder) {
        statusBuilder.show().when.ageInYears.is.lessThanOrEqualTo(19)
            .and.valueInEnrolment("Gravida").is.equals(0)
            .and.whenItem(applicableForFamilyPlanning(statusBuilder.context.programEncounter)).is.truthy;
    }

    @WithStatusBuilder
    ihmpFpCounsellingForSpacingToNonUser([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Age of youngest child").asAge.is.lessThan(2)
            .and.when.valueInEncounter("Whether using any family planning method currently").is.no
            .and.valueInEnrolment("Number of living children").is.lessThan(2)
            .and.whenItem(applicableForFamilyPlanning(statusBuilder.context.programEncounter)).is.truthy;
    }

    @WithStatusBuilder
    ihmpFpCounsellingForSpacingToUser([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Age of youngest child").asAge.is.lessThan(2)
            .and.when.valueInEncounter("Whether using any family planning method currently").is.yes
            .and.whenItem(applicableForFamilyPlanning(statusBuilder.context.programEncounter)).is.truthy;

    }

    @WithStatusBuilder

    ihmpFpCounsellingInformationRegardingSterilization([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Number of living children").is.greaterThanOrEqualTo(2)
            .and.whenItem(applicableForFamilyPlanning(statusBuilder.context.programEncounter)).is.truthy;
    }

    @WithStatusBuilder
    ihmpIpilCounselling([], statusBuilder) {
        statusBuilder.show().whenItem(applicableForFamilyPlanning(statusBuilder.context.programEncounter)).is.truthy;
    }



    @WithStatusBuilder
    durationOfSymptomsInDays([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Symptoms of RTI").is.defined
            .and.not.when.valueInEncounter("Symptoms of RTI").containsAnswerConceptName("None");
    }

    @WithStatusBuilder
    whetherTreatmentForRtiSymptomSTaken([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Symptoms of RTI").is.defined
            .and.not.when.valueInEncounter("Symptoms of RTI").containsAnswerConceptName("None");
    }

    @WithStatusBuilder
    whetherInfectionCured([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether treatment for RTI symptom(s) taken").is.yes;
    }

    @WithStatusBuilder
    ihmpRecommendationForRtiSymptoms([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Symptoms of RTI").is.defined
            .and.not.when.valueInEncounter("Symptoms of RTI").containsAnswerConceptName("None");
    }

    @WithStatusBuilder
    followUpVisitDateForFp([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("EC program follow up visit by ASHA post monthly assessment").containsAnswerConceptName("Family planning");
    }

    @WithStatusBuilder
    followUpVisitDateForRti([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("EC program follow up visit by ASHA post monthly assessment").containsAnswerConceptName("Reproductive tract infection (RTI)");
    }
}

const MonthlyNeedsAssessmentDecision = RuleFactory("8b5bf56e-346a-486e-b00e-9fa604fa0b54", "Decision");

@MonthlyNeedsAssessmentDecision("5abefe5a-eba8-4779-b403-0f62358cafb4", "IHMP EC Monthly needs assessment decisions", 100.0, {})
class ECMonthlyNeedsAssessmentDecisionIHMP {
    static exec(programEncounter, decisions, context, today) {
        const complicationsBuilder = new ComplicationsBuilder({
            programEncounter: programEncounter,
            complicationsConcept: 'Program enrolment advice'
        });
        complicationsBuilder.addComplication("Enrol in Mother program").when.valueInEncounter("Whether currently pregnant").is.yes
            .and.not.valueInLastEncounter("Whether currently pregnant").is.yes
            .and.whenItem(_.some(programEncounter.programEnrolment.individual.enrolments, ['program.name', 'Mother'])).is.falsy;

        decisions.encounterDecisions.push(complicationsBuilder.getComplications());
        return decisions;
    }
}

module.exports = {ECMonthlyNeedsAssessmentViewFilterHandlerIHMP, ECMonthlyNeedsAssessmentDecisionIHMP};
