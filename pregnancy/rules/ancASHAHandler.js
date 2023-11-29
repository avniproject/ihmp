import moment from 'moment';
import {
    lib,
    FormElementsStatusHelper,
    FormElementStatus,
    FormElementStatusBuilder,
    RuleCondition,
    RuleFactory,
    StatusBuilderAnnotationFactory,
    VisitScheduleBuilder
} from 'rules-config/rules';
import _ from "lodash";

const ANCASHAViewFilter = RuleFactory("4201c189-5a6c-40ca-8c33-c5b7d24a9604", "ViewFilter");
const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');

@ANCASHAViewFilter("593875ec-dd49-4de0-81f5-911fbd6dcf6b", "IHMP ANC ASHA View Filter", 100.0, {})
class PregnancyANCASHAViewFilterHandlerIHMP {
    static exec(programEncounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new PregnancyANCASHAViewFilterHandlerIHMP(), programEncounter, formElementGroup, today);
    }

    @WithStatusBuilder
    whetherRegisteredForAntenatalCare([], statusBuilder) {
        statusBuilder.show().when.latestValueInPreviousEncounters("Whether registered for antenatal care").is.notDefined
            .or.latestValueInPreviousEncounters("Whether registered for antenatal care").is.no;
    }

    @WithStatusBuilder
    dateOfRegistrationForAntenatalCare([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether registered for antenatal care").is.yes;
    }

    monthOfGestationWhenRegisteredForAntenatalCare(programEncounter, formElement) {
        let gestationalAgeInMonthsAsOfANCRegistrationDate = '';
        const whetherRegisteredForAntenatalCare = programEncounter.getObservationValue('Whether registered for antenatal care');

        const dateOfRegistrationForAntenatalCare = programEncounter.getObservationValue('Date of registration for antenatal care');
        if (!_.isNil(dateOfRegistrationForAntenatalCare)){
            const lmp = programEncounter.programEnrolment.getObservationValue('Last menstrual period');
            gestationalAgeInMonthsAsOfANCRegistrationDate = _.round(moment(dateOfRegistrationForAntenatalCare).diff(lmp, 'months', true), 1);
        }
        return new FormElementStatus(formElement.uuid, whetherRegisteredForAntenatalCare === 'Yes', gestationalAgeInMonthsAsOfANCRegistrationDate);
    }

    @WithStatusBuilder
    placeWhereRegisteredForAntenatalCare([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether registered for antenatal care").is.yes;
    }

    @WithStatusBuilder
    whetherTreatmentTakenForAntenatalComplications([], statusBuilder) {
        statusBuilder.show().when.not.valueInEncounter("Pregnancy complications").containsAnswerConceptName("No problem");
    }

    @WithStatusBuilder
    whetherTheAntenatalComplicationsIsAddressed([], statusBuilder) {
        statusBuilder.show().when.not.valueInEncounter("Pregnancy complications").containsAnswerConceptName("No problem");
    }

    @WithStatusBuilder
    placeWhereAntenatalExaminationDone([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether antenatal examination done").is.yes;
    }

    @WithStatusBuilder
    ihmpAshaCounsellingForPregnancyConfirmedAndNotRegisteredForAnc([], statusBuilder) {
        statusBuilder.show().when.latestValueInAllEncounters("Whether registered for antenatal care").is.no;
    }

    @WithStatusBuilder
    ihmpAshaCounsellingForMonthlyAntenatalCheckup([], statusBuilder) {
        statusBuilder.show().when.latestValueInAllEncounters("Whether registered for antenatal care").is.yes;
    }

    @WithStatusBuilder
    ihmpAshaCounsellingDuringEveryContactPost7thMonth([], statusBuilder) {
        statusBuilder.show().whenItem(moment(statusBuilder.context.programEncounter).diff(statusBuilder.context.programEncounter.programEnrolment.getObservationValue('Last menstrual period'), 'months', true)).is.greaterThan(7);
    }

    @WithStatusBuilder
    ihmpAshaCounsellingDuringEveryContactPostRegistration([], statusBuilder) {
        statusBuilder.show().when.latestValueInAllEncounters("Whether registered for antenatal care").is.yes;
    }

    @WithStatusBuilder
    ihmpAshaCounsellingDuringEveryContactPost8thMonth([], statusBuilder) {
        statusBuilder.show().whenItem(moment(statusBuilder.context.programEncounter).diff(statusBuilder.context.programEncounter.programEnrolment.getObservationValue('Last menstrual period'), 'months', true)).is.greaterThan(8);
    }

    @WithStatusBuilder
    tt1Date([], statusBuilder) {
        statusBuilder.show().when.valueInEntireEnrolment('TT1 Date').is.notDefined.and.When.valueInEntireEnrolment('TT Booster Date').is.notDefined;
    }
    @WithStatusBuilder
    tt2Date([], statusBuilder) {
        statusBuilder.show().when.valueInEntireEnrolment('TT2 Date').is.notDefined.and.When.valueInEntireEnrolment('TT Booster Date').is.notDefined;
    }

    @WithStatusBuilder
    ttBoosterDate([], statusBuilder) {
        statusBuilder.show().when.valueInEntireEnrolment('TT Booster Date').is.notDefined.and.when.valueInEntireEnrolment('TT1 Date').is.notDefined.and.when.valueInEntireEnrolment('TT2 Date').is.notDefined;
    }
    @WithStatusBuilder
    pregnancyComplications([programEncounter, fe, today], statusBuilder) {
        statusBuilder.skipAnswers('Morning Sickness', 'Excessive vomiting and inability to consume anything orally in last 24 hours', 'PV leaking');

        const currentTrimester = lib().calculations.currentTrimester(programEncounter.programEnrolment, today);
        if (currentTrimester !== 3) {
            statusBuilder.skipAnswers('Reduced fetal movement', 'Watery discharge before onset of labour');
        }
    }
}


module.exports = {PregnancyANCASHAViewFilterHandlerIHMP};
