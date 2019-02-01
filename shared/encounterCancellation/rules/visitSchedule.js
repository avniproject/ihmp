import {RuleFactory, VisitScheduleBuilder} from 'rules-config/rules';
import RuleHelper from '../../../RuleHelper';
import {IHMPPNCVisitSchedules} from '../../../pregnancy/rules/visitSchedule';

const CancelVisitRule = RuleFactory("88b10250-efa5-4cb7-bc99-bd91197f5a43", "VisitSchedule");

const postVisitMap = {
    'PNC': IHMPPNCVisitSchedules
};

@CancelVisitRule("104301d5-b012-4afc-848e-9e12ecdf6045", "EC cancel visit next visit rule", 100.0)
class CancelVisitsIHMP {
    static exec(programEncounter, visitSchedule = [], scheduleConfig) {
        let visitCancelReason = programEncounter.findCancelEncounterObservationReadableValue('Visit cancel reason');
        if (visitCancelReason === 'Program exit') {
            return visitSchedule;
        }
        let postVisit = postVisitMap[programEncounter.encounterType.name];
        if (!_.isNil(postVisit)) {
            const vals = postVisit.exec(programEncounter, visitSchedule);
            return vals;
        }

        let scheduleBuilder = RuleHelper.createProgramEncounterVisitScheduleBuilder(programEncounter, visitSchedule);
        let followupDate = programEncounter.findCancelEncounterObservationReadableValue('Next needs assessment date');
        if (!_.isNil(followupDate)) {
            RuleHelper.addSchedule(scheduleBuilder, 'Monthly needs assessment', 'Monthly needs assessment', followupDate, 3);
        }
        let rtiFollowupDate = programEncounter.findCancelEncounterObservationReadableValue('Follow up visit date for RTI');
        if (!_.isNil(rtiFollowupDate)) {
            RuleHelper.addSchedule(scheduleBuilder, 'RTI services', 'RTI services', rtiFollowupDate, 3);
        }
        let fpFollowupDate = programEncounter.findCancelEncounterObservationReadableValue('Follow up visit date for FP');
        if (!_.isNil(fpFollowupDate)) {
            RuleHelper.addSchedule(scheduleBuilder, 'FP services', 'FP services', fpFollowupDate, 3);
        }
        let nextVHNDDate = programEncounter.findCancelEncounterObservationReadableValue('Next VHND date');
        if (!_.isNil(nextVHNDDate)) {
            RuleHelper.addSchedule(scheduleBuilder, 'ANC VHND', 'ANC VHND', nextVHNDDate, 1);
        }
        let nextANCASHADate = programEncounter.findCancelEncounterObservationReadableValue('Next ASHA ANC visit date');
        if (!_.isNil(nextANCASHADate)) {
            RuleHelper.addSchedule(scheduleBuilder, 'ANC ASHA', 'ANC ASHA', nextANCASHADate, 1);
        }


        return scheduleBuilder.getAllUnique("encounterType");
    }
}
module.exports = {CancelVisitsIHMP};