import {lib} from "rules-config";

const moment = require("moment");
const _ = require("lodash");
import {
    FormElementsStatusHelper,
    FormElementStatus,
    FormElementStatusBuilder,
    ProgramRule,
    RuleFactory,
    StatusBuilderAnnotationFactory,
    VisitScheduleBuilder
} from 'rules-config/rules';

const EnrolmentViewFilter = RuleFactory("026e2f5c-8670-4e4b-9a54-cb03bbf3093d", "ViewFilter");
const WithStatusBuilder = StatusBuilderAnnotationFactory('programEnrolment', 'formElement');
const validation = RuleFactory('026e2f5c-8670-4e4b-9a54-cb03bbf3093d', 'Validation');

@EnrolmentViewFilter("63619362-70e0-4794-ab53-9c6635ce342b", "IHMP Pregnancy Enrolment View Filter", 100.0, {})
class PregnancyEnrolmentViewFilterHandlerIHMP {
    static exec(programEnrolment, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new PregnancyEnrolmentViewFilterHandlerIHMP(), programEnrolment, formElementGroup, today);
    }

    @WithStatusBuilder
    parity([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Gravida").is.greaterThan(1);
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
        statusBuilder.show().when.valueInEnrolment("Gravida").is.greaterThan(1);
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
        statusBuilder.show().when.valueInEnrolment("Number of child deaths").is.greaterThanOrEqualTo(1);
    }

    @WithStatusBuilder
    numberOfChildDeathsFemale([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Number of child deaths").is.greaterThanOrEqualTo(1);
    }

    @WithStatusBuilder
    ageOfYoungestChild([], statusBuilder) {
        statusBuilder.show().when.valueInEnrolment("Number of living children").is.greaterThanOrEqualTo(1);
    }
}

@ProgramRule({
    name: 'IHMP Pregnancy program summary',
    uuid: '5cc548fa-2469-4532-a488-e2248448af11',
    programUUID: '076ddb2d-a499-4314-af95-4178553d279b',
    executionOrder: 100.0,
    metadata: {}
})
class PregnancyProgramSummaryIHMP {
    static exec(programEnrolment, summaries, context, today) {
        const GAWeeks = _.find(summaries, summary => summary.name === "Current gestational age");
        if (GAWeeks) {
            GAWeeks.name = 'Gestational Age in months';
            GAWeeks.value = _.round(moment.duration(GAWeeks.value, 'weeks').asMonths(), 0);
        }
        return summaries;
    }
}

@validation("bc48beed-22a7-44b6-b532-9526fb5d441e", "Male Enrolment To Pregnancy Not Allowed", 100.0)
class MaleEnrolmentToPregnancyFailureIHMP {
    validate(programEnrolment) {
        const validationResults = [];
        if (programEnrolment.individual.isMale()) {
            validationResults.push(lib().C.createValidationError('MaleEnrolmentToPregnancyNotAllowed'));
        }
        return validationResults;
    }

    static exec(programEncounter, validationErrors) {
        return new MaleEnrolmentToPregnancyFailureIHMP().validate(programEncounter);
    }
}

export {
    PregnancyProgramSummaryIHMP, PregnancyEnrolmentViewFilterHandlerIHMP, MaleEnrolmentToPregnancyFailureIHMP
}
