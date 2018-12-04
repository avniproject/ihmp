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

const EnrolmentViewFilter = RuleFactory("23d8763d-4759-4c7d-bb46-d57a1ee58673", "ViewFilter");
const WithStatusBuilder = StatusBuilderAnnotationFactory('programEnrolment', 'formElement');

@EnrolmentViewFilter("bad682db-5dab-4a3b-af0c-2f0f870a1ab5", "IHMP EC Enrolment View Filter", 100.0, {})
class ECEnrolmentViewFilterHandlerIHMP {
    static exec(programEnrolment, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new ECEnrolmentViewFilterHandlerIHMP(), programEnrolment, formElementGroup, today);
    }
    
    @WithStatusBuilder
    parity([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Gravida").is.greaterThanOrEqualTo(1);
    }
    
    @WithStatusBuilder
    numberOfLivingChildren([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Parity").is.greaterThanOrEqualTo(1);
    }

    @WithStatusBuilder
    numberOfLivingChildrenFemale([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Number of living children").is.greaterThanOrEqualTo(1);
    }

    @WithStatusBuilder
    numberOfLivingChildrenMale([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Number of living children").is.greaterThanOrEqualTo(1);
    }

    @WithStatusBuilder
    numberOfAbortions([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Gravida").is.greaterThanOrEqualTo(1);
    }

    @WithStatusBuilder
    numberOfSpontaneousAbortionsMiscarriages([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Number of abortions").is.greaterThanOrEqualTo(1);
    }

    @WithStatusBuilder
    numberOfInducedAbortions([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Number of abortions").is.greaterThanOrEqualTo(1);
    }

    @WithStatusBuilder
    numberOfStillbirths([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Parity").is.greaterThanOrEqualTo(1);
    }

    @WithStatusBuilder
    numberOfChildDeaths([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Parity").is.greaterThanOrEqualTo(1);
    }

    @WithStatusBuilder
    numberOfChildDeathsMale([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Parity").is.greaterThanOrEqualTo(1);
    }

    @WithStatusBuilder
    numberOfChildDeathsFemale([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Parity").is.greaterThanOrEqualTo(1);
    }

    @WithStatusBuilder
    ageOfOldestChild([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Number of living children").is.greaterThanOrEqualTo(1);
    }

    @WithStatusBuilder
    lastPregnancyOutcome([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Gravida").is.greaterThanOrEqualTo(1);
    }

    @WithStatusBuilder
    dateOfLastPregnancyOutcome([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Gravida").is.greaterThanOrEqualTo(1);
    }

    @WithStatusBuilder
    ageOfYoungestChild([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Number of living children").is.greaterThanOrEqualTo(1);
    }

    @WithStatusBuilder
    monthAndYearOfSterlization([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Whether sterilized").is.yes;
    }
}

module.exports = {ECEnrolmentViewFilterHandlerIHMP}
