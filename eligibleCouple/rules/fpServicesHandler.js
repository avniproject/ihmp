const moment = require("moment");
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

const FPServicesViewFilter = RuleFactory("981b3e41-7fae-4b0e-a0aa-e9a42076414e", "ViewFilter");
const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');

let applicableForFamilyPlanning = function (programEncounter) {
    return new RuleCondition({programEncounter: programEncounter}).valueInEnrolment("Whether sterilized").is.no
        .and.not.valueInEncounter("Whether currently pregnant").is.yes
        .matches();
};

@FPServicesViewFilter("6fcc12fc-f181-453e-b7ea-4d3351710e1d", "IHMP EC FP Services View Filter", 100.0, {})
class ECFPServicesViewFilterHandlerIHMP {
    static exec(programEncounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new ECFPServicesViewFilterHandlerIHMP(), programEncounter, formElementGroup, today);
    }

    @WithStatusBuilder
    otherTopicCoveredInFpCounselling([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("FP counselling topics covered").containsAnswerConceptName("Other");
    }

    @WithName("IHMP FP counselling to delay first conception")
    @WithStatusBuilder
    aa([programEncounter], statusBuilder) {
        statusBuilder.show().when.ageInYears.is.lessThanOrEqualTo(19)
            .and.valueInEnrolment("Gravida").is.equals(0)
            .and.whenItem(applicableForFamilyPlanning(programEncounter)).is.truthy;
    }

    @WithName("IHMP FP counselling for spacing to non user")
    @WithStatusBuilder
    ab([programEncounter], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Age of youngest child").asAge.is.lessThan(2)
            .and.when.valueInEncounter("Whether using any family planning method currently").is.no
            .and.valueInEnrolment("Number of living children").is.lessThan(2)
            .and.whenItem(applicableForFamilyPlanning(programEncounter)).is.truthy;
    }

    @WithName("IHMP FP counselling for spacing to user")
    @WithStatusBuilder
    ac([programEncounter], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Age of youngest child").asAge.is.lessThan(2)
            .and.when.valueInEncounter("Whether using any family planning method currently").is.yes
            .and.whenItem(applicableForFamilyPlanning(programEncounter)).is.truthy;

    }

    @WithName("IHMP FP counselling information regarding sterilization")
    @WithStatusBuilder
    ad([programEncounter], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Number of living children").is.greaterThanOrEqualTo(2)
            .and.whenItem(applicableForFamilyPlanning(programEncounter)).is.truthy;
    }

    @WithName("IHMP IPIL counselling")
    @WithStatusBuilder
    ae([programEncounter], statusBuilder) {
        statusBuilder.show().whenItem(applicableForFamilyPlanning(programEncounter)).is.truthy;
    }
}

module.exports = {ECFPServicesViewFilterHandlerIHMP};

