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
        const cancelReasonObs = programEncounter.findCancelEncounterObservation('Visit cancel reason');
        const answer = cancelReasonObs && cancelReasonObs.getReadableValue();

        return new FormElementStatus(formElement.uuid, (programEncounter.encounterType.name === 'ANC VHND' || programEncounter.encounterType.name === 'ANC ASHA') && (answer !== 'Program exit'));
    }

    nextAncAshaDate(programEncounter, formElement) {
        const cancelReasonObs = programEncounter.findCancelEncounterObservation('Visit cancel reason');
        const answer = cancelReasonObs && cancelReasonObs.getReadableValue();

        return new FormElementStatus(formElement.uuid, (programEncounter.encounterType.name === 'ANC ASHA') && (answer !== 'Program exit'));
    }



}
module.exports = {CancellationViewFilterHandlerIHMP};
