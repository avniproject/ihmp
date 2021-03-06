const moment = require("moment");
const _ = require("lodash");
import {
    FormElementsStatusHelper,
    FormElementStatus,
    FormElementStatusBuilder,
    RuleFactory,
    StatusBuilderAnnotationFactory,
    VisitScheduleBuilder
} from 'rules-config/rules';

const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');
const CancelViewFilter = RuleFactory("88b10250-efa5-4cb7-bc99-bd91197f5a43", "ViewFilter");

@CancelViewFilter("4296f7d6-da8a-4e08-ba18-64e78a36ba59", "IHMP EC Encounter Cancellation View Filter", 100.0, {})
class CancellationViewFilterHandlerIHMP {

    static exec(programEncounter, formElementGroup, today) {
        return FormElementsStatusHelper.getFormElementsStatusesWithoutDefaults(new CancellationViewFilterHandlerIHMP(), programEncounter, formElementGroup, today);
    }

    otherReason(programEncounter, formElement) {
        const cancelReasonObs = programEncounter.findCancelEncounterObservation('Visit cancel reason');
        const answer = cancelReasonObs && cancelReasonObs.getReadableValue();
        return new FormElementStatus(formElement.uuid, answer === 'Other');
    }

    nextNeedsAssessmentDate(programEncounter, formElement) {
        const cancelReasonObs = programEncounter.findCancelEncounterObservation('Visit cancel reason');
        const answer = cancelReasonObs && cancelReasonObs.getReadableValue();
        return new FormElementStatus(formElement.uuid, (programEncounter.encounterType.name === 'Monthly needs assessment' && (answer !== 'Program exit')));
    }

    followUpVisitDateForFp(programEncounter, formElement) {
        const cancelReasonObs = programEncounter.findCancelEncounterObservation('Visit cancel reason');
        const answer = cancelReasonObs && cancelReasonObs.getReadableValue();
        return new FormElementStatus(formElement.uuid, (programEncounter.encounterType.name === 'FP services') && (answer !== 'Program exit'));
    }

    followUpVisitDateForRti(programEncounter, formElement) {
        const cancelReasonObs = programEncounter.findCancelEncounterObservation('Visit cancel reason');
        const answer = cancelReasonObs && cancelReasonObs.getReadableValue();

        return new FormElementStatus(formElement.uuid, (programEncounter.encounterType.name === 'RTI services') && (answer !== 'Program exit'));
    }

    nextVhndDate(programEncounter, formElement) {
        const {programEnrolment} = programEncounter;
        const cancelReasonObs = programEncounter.findCancelEncounterObservation('Visit cancel reason');
        const answer = cancelReasonObs && cancelReasonObs.getReadableValue();
        const showWhen = (programEncounter.encounterType.name === 'ANC VHND' || programEncounter.encounterType.name === 'ANC ASHA')
            && (answer !== 'Program exit')
            && !programEnrolment.hasCompletedEncounterOfType('Abortion')
            && !programEnrolment.hasCompletedEncounterOfType('Delivery');

        return new FormElementStatus(formElement.uuid, showWhen);
    }

    nextAncAshaDate(programEncounter, formElement) {
        const {programEnrolment} = programEncounter;
        const cancelReasonObs = programEncounter.findCancelEncounterObservation('Visit cancel reason');
        const answer = cancelReasonObs && cancelReasonObs.getReadableValue();
        const showWhen = !programEnrolment.hasCompletedEncounterOfType('Delivery')
            && !programEnrolment.hasCompletedEncounterOfType('Abortion')
            && (programEncounter.encounterType.name === 'ANC ASHA')
            && (answer !== 'Program exit');

        return new FormElementStatus(formElement.uuid, showWhen);
    }

}

export {
    CancellationViewFilterHandlerIHMP
}