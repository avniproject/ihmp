const moment = require("moment");
const _ = require("lodash");
import {
    RuleFactory,
    FormElementsStatusHelper,
    FormElementStatusBuilder,
    StatusBuilderAnnotationFactory,
    FormElementStatus,
    VisitScheduleBuilder,
    ProgramRule
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

@ProgramRule({
    name: "EC Program Summary",
    uuid: "310a9bc4-71c9-4c9a-ada7-eb1f3f5a8abb",
    programUUID: "fdf5c253-c49f-43e1-9591-4556a3ea36d4",
    executionOrder: 100.0,
    metadata: {}
})
class ECProgramRule {
    static exec(programEnrolment, summaries, context, today) {
        const currentlyPregnant = programEnrolment.findObservationInEntireEnrolment('Whether currently pregnant');
        if (!_.isNil(currentlyPregnant)) {
            summaries.push({name: 'Whether currently pregnant', value: currentlyPregnant.getValue()});
        }

        const numberOfLivingChildren = programEnrolment.findObservation('Number of living children');
        if (!_.isNil(numberOfLivingChildren)) {
            summaries.push({name: 'Number of living children', value: numberOfLivingChildren.getValue()});
        }

        const ageOfYoungestChild = programEnrolment.findObservation('Age of youngest child');
        if (!_.isNil(ageOfYoungestChild)) {
            summaries.push({name: 'Age of youngest child', value: ageOfYoungestChild.getValue()});
        }

        const encountersInLastThreeMonths = _.chain(programEnrolment.getEncounters(true))
            .filter((e) => moment().diff(moment(e.encounterDateTime), "months", true) <= 3)
            .sortBy((e) => e.encounterDateTime)
            .value();
        const fpStatus = [];
        encountersInLastThreeMonths.forEach((e) => {
            const usingAnyFpMethodCurrently = e.getObservationReadableValue('Whether using any family planning method currently');
            if (usingAnyFpMethodCurrently) {
                if (usingAnyFpMethodCurrently === "Yes") {
                    fpStatus.push("User");
                } else {
                    const anyDesireToUseFpMethods = e.getObservationReadableValue("Whether desire to use any FP methods in future");
                    fpStatus.push(anyDesireToUseFpMethods === "Yes" ? "Desire to use" : "Non user");
                }
            }
        }, []);
        if(!_.isEmpty(fpStatus)) {
            summaries.push({name: 'Last 3 months FP status', value: _.join(fpStatus, ', ')});
        }

        return summaries;
    }
}

module.exports = {ECEnrolmentViewFilterHandlerIHMP, ECProgramRule}
