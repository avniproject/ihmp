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

const MonthlyAssessmentViewFilter = RuleFactory("8b5bf56e-346a-486e-b00e-9fa604fa0b54", "ViewFilter");
const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');

@MonthlyAssessmentViewFilter("f9d1d4b2-437c-4040-8ecc-34e928466efb", "IHMP EC Monthly needs assessment View Filter", 100.0, {})
class ECMonthlyNeedsAssessmentViewFilterHandlerIHMP {
    static exec(programEncounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new ECMonthlyNeedsAssessmentViewFilterHandlerIHMP(), programEncounter, formElementGroup, today);
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
        statusBuilder.show().when.valueInEncounter("Whether currently pregnant").is.no
            .and.when.valueInEncounter("Whether got monthly periods").is.yes;
    }

    @WithStatusBuilder
    whetherUsingAnyFamilyPlanningMethodCurrently([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether currently pregnant").is.no
            .and.when.valueInEnrolment("Whether sterilized").is.no;
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
            .and.when.valueInEncounter("Whether currently pregnant").is.no;
    }

    @WithStatusBuilder
    fpMethodPreferenceForFutureUse([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether desire to use any FP methods in future").is.yes;
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
    followUpVisitDateForFp([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("EC program follow up visit by ASHA post monthly assessment").containsAnswerConceptName("Family planning");
    }

    @WithStatusBuilder
    followUpVisitDateForRti([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("EC program follow up visit by ASHA post monthly assessment").containsAnswerConceptName("Reproductive tract infection (RTI)");
    }
}


module.exports = {ECMonthlyNeedsAssessmentViewFilterHandlerIHMP};
