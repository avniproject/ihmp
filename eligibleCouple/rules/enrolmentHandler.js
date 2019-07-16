import moment from "moment";
import {
    FormElementsStatusHelper,
    FormElementStatus,
    FormElementStatusBuilder,
    lib,
    ProgramRule,
    RuleFactory,
    StatusBuilderAnnotationFactory,
    VisitScheduleBuilder
} from 'rules-config/rules';

import _ from "lodash";

const EnrolmentViewFilter = RuleFactory("23d8763d-4759-4c7d-bb46-d57a1ee58673", "ViewFilter");
const ProgramExitViewFilter = RuleFactory("a4db9a29-aefc-4a05-bf6d-dabf7dab7dfe", "ViewFilter");
const WithStatusBuilder = StatusBuilderAnnotationFactory('programEnrolment', 'formElement');
const validation = RuleFactory('23d8763d-4759-4c7d-bb46-d57a1ee58673', 'Validation');

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
        statusBuilder.show().when.valueInEnrolment("Number of living children").is.greaterThanOrEqualTo(2);
    }

    @WithStatusBuilder
    lastDeliveryOutcome([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Gravida").is.greaterThanOrEqualTo(1)
        .and.when.valueInEnrolment("Parity").is.greaterThanOrEqualTo(1)
        .or.when.valueInEnrolment("Number of abortions").is.greaterThanOrEqualTo(1);
    }

    @WithStatusBuilder
    dateOfLastDeliveryOutcome([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Gravida").is.greaterThanOrEqualTo(1)
        .and.when.valueInEnrolment("Parity").is.greaterThanOrEqualTo(1)
        .or.when.valueInEnrolment("Number of abortions").is.greaterThanOrEqualTo(1);
    }

    @WithStatusBuilder
    ageOfYoungestChild([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Number of living children").is.greaterThanOrEqualTo(1);
    }

    @WithStatusBuilder
    monthAndYearOfSterilization([], statusBuilder) {
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

        const whetherSterilizedObservation = programEnrolment.findObservation('Whether sterilized');
        let sterilized = false;

        if(!_.isNil(whetherSterilizedObservation)) {
            sterilized = whetherSterilizedObservation.getReadableValue() === "Yes";
            summaries.push({name: 'Whether sterilized', value: whetherSterilizedObservation.getValue()});
        }

        if(!sterilized) {
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
            if (!_.isEmpty(fpStatus)) {
                summaries.push({name: 'Last 3 months FP status', value: _.join(fpStatus, ', ')});
            }
        }

        return summaries;
    }
}

@ProgramExitViewFilter("16943f77-ec5a-48ae-bc25-8bf056bfcf17", "EC Program exit filters", 1.0)
class ECProgramExitViewFilterHandler {
    static exec(programExit, formElementGroup) {
        return FormElementsStatusHelper.getFormElementsStatuses(new ECProgramExitViewFilterHandler(), programExit, formElementGroup);
    }

    dateOfDeath(programExit, formElement) {
        const statusBuilder = this._getStatusBuilder(programExit, formElement);
        statusBuilder.show().when.valueInExit("Reason for exit").containsAnswerConceptName("Death");
        return statusBuilder.build();
    }

    causeOfDeath(programExit, formElement) {
        const statusBuilder = this._getStatusBuilder(programExit, formElement);
        statusBuilder.show().when.valueInExit("Reason for exit").containsAnswerConceptName("Death");
        return statusBuilder.build();
    }

    placeOfDeath(programExit, formElement) {
        const statusBuilder = this._getStatusBuilder(programExit, formElement);
        statusBuilder.show().when.valueInExit("Reason for exit").containsAnswerConceptName("Death");
        return statusBuilder.build();
    }

    otherReasonPleaseSpecify(programExit, formElement) {
        const statusBuilder = this._getStatusBuilder(programExit, formElement);
        statusBuilder.show().when.valueInExit("Reason for exit").containsAnswerConceptName("Other");
        return statusBuilder.build();
    }


    _getStatusBuilder(programExit, formElement) {
        return new FormElementStatusBuilder({
            programEnrolment: programExit,
            formElement
        });
    }

}


@validation("61360a54-692b-4e14-ab33-679b36173618", "Male Enrolment To EC Not Allowed", 100.0)
class MaleEnrolmentFailureIHMP {
    validate(programEnrolment) {
        const validationResults = [];
        if (programEnrolment.individual.isMale()) {
            validationResults.push(lib().C.createValidationError('MaleEnrolmentToECNotAllowed'));
        }
        return validationResults;
    }

    static exec(programEncounter, validationErrors) {
        return new MaleEnrolmentFailureIHMP().validate(programEncounter);
    }
}

module.exports = {ECEnrolmentViewFilterHandlerIHMP, ECProgramRule, ECProgramExitViewFilterHandler, MaleEnrolmentFailureIHMP};
