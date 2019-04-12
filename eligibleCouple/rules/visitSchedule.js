import {
    RuleFactory,
    VisitScheduleBuilder
} from 'rules-config/rules';

const moment = require("moment");
const RuleHelper = require('../../RuleHelper');

const ECEnrolmentBasedVisitRule = RuleFactory("23d8763d-4759-4c7d-bb46-d57a1ee58673", "VisitSchedule");
const MonthlyAssessmentBasedVisitRule = RuleFactory("8b5bf56e-346a-486e-b00e-9fa604fa0b54", "VisitSchedule");
const RTIServicesVisitRule = RuleFactory("90a9660b-9bc5-4b73-8e09-f83d029216fa", "VisitSchedule");
const FPServicesVisitRule = RuleFactory("981b3e41-7fae-4b0e-a0aa-e9a42076414e", "VisitSchedule");


@ECEnrolmentBasedVisitRule("afba8682-c2fd-4562-ae64-778aeb8b054c", "EC Enrolment based visit rule", 100.0)
class ECEnrolmentBasedVisitsIHMP {

    static exec(programEnrolment, visitSchedule = [], scheduleConfig) {
        let scheduleBuilder = RuleHelper.createProgramEncounterVisitScheduleBuilder(programEnrolment, visitSchedule);
        RuleHelper.blindAddSchedule(scheduleBuilder, 'Monthly needs assessment', 'Monthly needs assessment',
            programEnrolment.enrolmentDateTime, 3);
        return scheduleBuilder.getAllUnique("encounterType");
    }
}


@MonthlyAssessmentBasedVisitRule("191d4a2e-63a2-4594-8a54-cfc7fd2d78f4", "Monthly assessment based visit rule", 100.0)
class MonthlyAssessmentBasedVisitsIHMP {
    static exec(programEncounter, visitSchedule = [], scheduleConfig) {
        let scheduleBuilder = RuleHelper.createProgramEncounterVisitScheduleBuilder(programEncounter, visitSchedule);
        let followupDate = programEncounter.getObservationReadableValue('Next needs assessment date');
        if (!_.isNil(followupDate)) {
            RuleHelper.addSchedule(scheduleBuilder, 'Monthly needs assessment', 'Monthly needs assessment', followupDate, 3);
        }
        let rtiFollowupDate = programEncounter.getObservationReadableValue('Follow up visit date for RTI');
        if (!_.isNil(rtiFollowupDate)) {
            RuleHelper.addSchedule(scheduleBuilder, 'RTI services', 'RTI services', rtiFollowupDate, 3);
        }
        let fpFollowupDate = programEncounter.getObservationReadableValue('Follow up visit date for FP');
        if (!_.isNil(fpFollowupDate)) {
            RuleHelper.addSchedule(scheduleBuilder, 'FP services', 'FP services', fpFollowupDate, 3);
        }
        return scheduleBuilder.getAllUnique("encounterType");
    }
}

@RTIServicesVisitRule("09d51691-e033-45e3-a4e1-4dc6330d251f", "RTI services visit rule", 100.0)
class RTIServicesVisitsIHMP {
    static exec(programEncounter, visitSchedule = [], scheduleConfig) {
        let scheduleBuilder = RuleHelper.createProgramEncounterVisitScheduleBuilder(programEncounter, visitSchedule);
        let followupDate = programEncounter.getObservationReadableValue('Follow up date');
        if (!_.isNil(followupDate)) {
            RuleHelper.addSchedule(scheduleBuilder, 'RTI services', 'RTI services', followupDate, 3);
        }
        return scheduleBuilder.getAllUnique("encounterType");
    }
}

@FPServicesVisitRule("e0721abf-79b7-468f-98b8-7ce8d81c9bca", "FP services visit rule", 100.0)
class FPServicesVisitsIHMP {
    static exec(programEncounter, visitSchedule = [], scheduleConfig) {
        let scheduleBuilder = RuleHelper.createProgramEncounterVisitScheduleBuilder(programEncounter, visitSchedule);
        let followupDate = programEncounter.getObservationReadableValue('Follow up date');
        if (!_.isNil(followupDate)) {
            RuleHelper.addSchedule(scheduleBuilder, 'FP services', 'FP services', followupDate, 3);
        }
        return scheduleBuilder.getAllUnique("encounterType");
    }
}


module.exports = {MonthlyAssessmentBasedVisitsIHMP, RTIServicesVisitsIHMP, FPServicesVisitsIHMP, ECEnrolmentBasedVisitsIHMP};
