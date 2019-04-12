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

const NeonatalViewFilter = RuleFactory("b77bc4a1-c7e6-4d46-a0d9-eb211f05440e", "ViewFilter");
const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');


@NeonatalViewFilter("83af0723-9111-431c-bb14-3f0d15cc727f", "IHMP Neonatal View Filter", 100.0, {})
class ChildNeonatalViewFilterHandlerIHMP {
    static exec(programEncounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new ChildNeonatalViewFilterHandlerIHMP(), programEncounter, formElementGroup, today);
    }


    @WithStatusBuilder
    hasTheChildPassedUrineSinceBirth([], statusBuilder) {
        statusBuilder.show()
            .when.valueInEntireEnrolment("Child passed urine since birth").is.notDefined
            .or.when.valueInLastEncounter("Child passed urine since birth", ["Child PNC"]).is.no
            .or.when.valueInEncounter("Child passed urine since birth").is.defined;
    }

    @WithStatusBuilder
    hasTheChildPassedMeconiumSinceBirth([], statusBuilder) {
        statusBuilder.show()
            .when.valueInEntireEnrolment("Child passed meconium since birth").is.notDefined
            .or.when.valueInLastEncounter("Child passed meconium since birth", ["Child PNC"]).is.no
            .or.when.valueInEncounter("Child passed meconium since birth").is.defined;
    }
    
    @WithStatusBuilder
    whetherLimpBluePaleAtTheTimeOfBirth([], statusBuilder) {
        statusBuilder.show().when.latestValueInPreviousEncounters("Whether limp/blue/Pale at the time of birth").is.notDefined;
    }

    @WithStatusBuilder
    whetherAnyCongenitalMalformation([], statusBuilder) {
        statusBuilder.show().when.latestValueInPreviousEncounters("Whether any congenital malformation").is.notDefined;
    }

    @WithStatusBuilder
    whetherHavingAnySkinProblems([], statusBuilder) {
        statusBuilder.skipAnswers("Umbilical cord is infected", "Blue/pale", "Umbilical redness and or discharge", "Umbilical Abscess", "Wrinkled Skin", "Sunken fontanelle");
    }
    
    
    @WithStatusBuilder
    dateOfFirstHomeVisitByAnmToTheNeonate([], statusBuilder) {
        statusBuilder.show().when.latestValueInPreviousEncounters("Date of first home visit by ANM to the neonate").is.notDefined;
    }

    @WithStatusBuilder
    dateOfSecondHomeVisitByAnmToTheNeonate([], statusBuilder) {
        statusBuilder.show().when.latestValueInPreviousEncounters("Date of second home visit by ANM to the neonate").is.notDefined;
    }


    @WithStatusBuilder
    whetherTakenTreatmentForNeonatalComplications([], statusBuilder) {
        statusBuilder.show().when
            .valueInEncounter("Child PNC cry related complaints").containsAnswerConceptNameOtherThan("None")
            .or.valueInEncounter("Child PNC breathing problems").containsAnswerConceptNameOtherThan("No problem")
            .or.valueInEncounter("Whether feeling cold").containsAnswerConceptNameOtherThan("No")
            .or.valueInEncounter("Child PNC feeding related complaints").containsAnswerConceptNameOtherThan("Sucking well")
            .or.valueInEncounter("Child PNC urination related complaints").containsAnswerConceptNameOtherThan("Proper urination")
            .or.valueInEncounter("Child PNC stool related complaints").containsAnswerConceptNameOtherThan("None")
            .or.valueInEncounter("Child PNC activity related complaints").containsAnswerConceptNameOtherThan("None")
            .or.valueInEncounter("Umbilical related problems").containsAnswerConceptNameOtherThan("None")
            .or.valueInEncounter("PNC Eye Examination").containsAnswerConceptNameOtherThan("None")
            .or.valueInEncounter("Whether feeling hot").containsAnswerConceptNameOtherThan("No")
            .or.valueInEncounter("Whether having diarrhoea").containsAnswerConceptNameOtherThan("No")
            .or.valueInEncounter("Whether baby having cough & cold").containsAnswerConceptNameOtherThan("No")
            .or.valueInEncounter("Child PNC skin problems").containsAnswerConceptNameOtherThan("No problem");

    }
    
    @WithStatusBuilder
    whetherNeonatalComplicationAddressed([], statusBuilder) {
        statusBuilder.show().when
            .valueInEncounter("Child PNC cry related complaints").containsAnswerConceptNameOtherThan("None")
            .or.valueInEncounter("Child PNC breathing problems").containsAnswerConceptNameOtherThan("No problem")
            .or.valueInEncounter("Whether feeling cold").containsAnswerConceptNameOtherThan("No")
            .or.valueInEncounter("Child PNC feeding related complaints").containsAnswerConceptNameOtherThan("Sucking well")
            .or.valueInEncounter("Child PNC urination related complaints").containsAnswerConceptNameOtherThan("Proper urination")
            .or.valueInEncounter("Child PNC stool related complaints").containsAnswerConceptNameOtherThan("None")
            .or.valueInEncounter("Child PNC activity related complaints").containsAnswerConceptNameOtherThan("None")
            .or.valueInEncounter("Umbilical related problems").containsAnswerConceptNameOtherThan("None")
            .or.valueInEncounter("PNC Eye Examination").containsAnswerConceptNameOtherThan("None")
            .or.valueInEncounter("Whether feeling hot").containsAnswerConceptNameOtherThan("No")
            .or.valueInEncounter("Whether having diarrhoea").containsAnswerConceptNameOtherThan("No")
            .or.valueInEncounter("Whether baby having cough & cold").containsAnswerConceptNameOtherThan("No")
            .or.valueInEncounter("Child PNC skin problems").containsAnswerConceptNameOtherThan("No problem");

    }

    

    @WithStatusBuilder
    ihmpNncLowWeightCounselling([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Weight").lessThanOrEqualTo(2.5);
    }
    
    @WithStatusBuilder
    ihmpNncComplicationCounselling([], statusBuilder) {
        statusBuilder.show().when
            .valueInEncounter("Child PNC cry related complaints").containsAnswerConceptNameOtherThan("None")
            .or.valueInEncounter("Child PNC breathing problems").containsAnswerConceptNameOtherThan("No problem")
            .or.valueInEncounter("Whether feeling cold").containsAnswerConceptNameOtherThan("No")
            .or.valueInEncounter("Child PNC feeding related complaints").containsAnswerConceptNameOtherThan("Sucking well")
            .or.valueInEncounter("Child PNC urination related complaints").containsAnswerConceptNameOtherThan("Proper urination")
            .or.valueInEncounter("Child PNC stool related complaints").containsAnswerConceptNameOtherThan("None")
            .or.valueInEncounter("Child PNC activity related complaints").containsAnswerConceptNameOtherThan("None")
            .or.valueInEncounter("Umbilical related problems").containsAnswerConceptNameOtherThan("None")
            .or.valueInEncounter("PNC Eye Examination").containsAnswerConceptNameOtherThan("None")
            .or.valueInEncounter("Whether feeling hot").containsAnswerConceptNameOtherThan("No")
            .or.valueInEncounter("Whether having diarrhoea").containsAnswerConceptNameOtherThan("No")
            .or.valueInEncounter("Whether baby having cough & cold").containsAnswerConceptNameOtherThan("No")
            .or.valueInEncounter("Child PNC skin problems").containsAnswerConceptNameOtherThan("No problem");
    }

    @WithStatusBuilder
    thermalCareForBabyInFirst7Days([], statusBuilder) {
        statusBuilder.show().when.valueInEntireEnrolment("Thermal care for baby in first 7 days").is.notDefined
            .or.valueInEncounter("Thermal care for baby in first 7 days").is.defined;
    }






}


module.exports = {ChildNeonatalViewFilterHandlerIHMP};