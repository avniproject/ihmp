const moment = require("moment");
const _ = require("lodash");
import {
    FormElementsStatusHelper,
    FormElementStatus,
    FormElementStatusBuilder,
    RuleCondition,
    RuleFactory,
    StatusBuilderAnnotationFactory,
    VisitScheduleBuilder
} from 'rules-config/rules';

const DeliveryFilter = RuleFactory("cc6a3c6a-c3cc-488d-a46c-d9d538fcc9c2", 'ViewFilter');
const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');

@DeliveryFilter('84ea002e-32a2-448c-b540-18bd277ef656', 'IHMP Skip logic for delivery form', 100.0)
class DeliveryFilterHandler {
    static exec(programEncounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new DeliveryFilterHandler(), programEncounter, formElementGroup, today);
    }

    @WithStatusBuilder
    deliveredBy([programEncounter, formElement], statusBuilder) {
        const answersToSkip = ['Medical Officer/ Doctor'];
        const toBeSkipped = new RuleCondition({programEncounter}).valueInEncounter("Place of delivery")
            .containsAnyAnswerConceptName("Private hospital", 'Government Hospital', 'Primary Health Center', 'Regional Hospital')
            .matches();
        if(toBeSkipped) {
            answersToSkip.push("Relative", "TBA (Trained Birth Attendant)", "Non-Skilled Birth Attendant (NSBA)");
        }
        statusBuilder.skipAnswers(...answersToSkip);
    }


    @WithStatusBuilder
    whetherRecievedBenefitOfJsy([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether eligible for JSY").is.yes;
    }
    
    @WithStatusBuilder
    detailsOfJsyBenefitChequeNumberAndAmount([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether recieved benefit of JSY").is.yes;
    }
    
    @WithStatusBuilder
    benefitsRecievedUnderPmvyInRupees([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether received benefits of PMVY").is.yes;
    }

    @WithStatusBuilder
    typeOfDelivery([], statusBuilder) {
        statusBuilder.skipAnswers('Instrumental');
    }

    @WithStatusBuilder
    numberOfDaysStayedAtHospital([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter('Delivery outcome')
            .containsAnyAnswerConceptName("Live Birth", "Still Birth", "Live birth and Still birth")
            .and.when.valueInEncounter('Place of delivery')
            .containsAnyAnswerConceptName('Regional Hospital','NGO Hospital','Government Hospital' ,'Primary Health Center','Sub Center');
    }

    @WithStatusBuilder
    didMotherReceiveDischargeReportAfterDeliveryFromHospital([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter('Delivery outcome')
            .containsAnyAnswerConceptName("Live Birth", "Still Birth", "Live birth and Still birth")
            .and.when.valueInEncounter('Place of delivery')
            .containsAnyAnswerConceptName('Regional Hospital','NGO Hospital','Government Hospital' ,'Primary Health Center','Sub Center');
    }
}

module.exports = {DeliveryFilterHandler};