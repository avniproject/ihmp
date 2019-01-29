import {
    RuleFactory,
    VisitScheduleBuilder
} from 'rules-config/rules';

const moment = require("moment");
const RuleHelper = require('../../RuleHelper');

const PregnancyEnrolmentBasedVisitsRule = RuleFactory("026e2f5c-8670-4e4b-9a54-cb03bbf3093d", "VisitSchedule");
const ASHAANCVisitBasedVisitsRule = RuleFactory("4201c189-5a6c-40ca-8c33-c5b7d24a9604", "VisitSchedule");
const ANCVHNDVisitBasedVisitsRule = RuleFactory("e2cf41de-d962-4110-9d66-70877e2eb59d", "VisitSchedule");


@PregnancyEnrolmentBasedVisitsRule("ba997f28-9d07-40a2-9747-3f2ea1a22bdb", "Pregnancy Enrolment based visit rule", 100.0)
class PregnancyEnrolmentBasedVisitsIHMP {
    static exec(programEnrolment, visitSchedule = [], scheduleConfig) {
        let scheduleBuilder = RuleHelper.createProgramEncounterVisitScheduleBuilder(programEnrolment, visitSchedule);
        let nextVhndDate = programEnrolment.getObservationReadableValue('Next VHND date');
        if (!_.isNil(nextVhndDate)) {
            RuleHelper.addSchedule(scheduleBuilder, 'ANC VHND', 'ANC VHND', nextVhndDate, 1);
        }
        RuleHelper.addSchedule(scheduleBuilder, 'ANC ASHA', 'ANC ASHA', programEnrolment.enrolmentDateTime, 1);
        return scheduleBuilder.getAllUnique("encounterType");
    }
}

@ASHAANCVisitBasedVisitsRule("123b0d11-d5c2-4cb2-8358-5bae68101d09", "ASHA ANC based visit rule", 100.0)
class ASHAANCVisitBasedVisitsIHMP {
    static exec(programEncounter, visitSchedule = [], scheduleConfig) {
        let scheduleBuilder = RuleHelper.createProgramEncounterVisitScheduleBuilder(programEncounter, visitSchedule);
        let nextVHNDDate = programEncounter.getObservationReadableValue('Next VHND date');
        RuleHelper.addSchedule(scheduleBuilder, 'ANC VHND', 'ANC VHND', nextVHNDDate, 1);
        let nextASHAANCVisitDate = programEncounter.getObservationReadableValue('Next ASHA ANC visit date');
        RuleHelper.addSchedule(scheduleBuilder, 'ANC ASHA', 'ANC ASHA', nextASHAANCVisitDate, 1);
        return scheduleBuilder.getAllUnique("encounterType");
    }
}

@ANCVHNDVisitBasedVisitsRule("3c30118e-3889-4dea-94dd-e7d255fa9e3b", "ANC VHND based visit rule", 100.0)
class ANCVHNDVisitBasedVisitsIHMP {
    static exec(programEncounter, visitSchedule = [], scheduleConfig) {
        let scheduleBuilder = RuleHelper.createProgramEncounterVisitScheduleBuilder(programEncounter, visitSchedule);
        let followupDate = programEncounter.getObservationReadableValue('Follow up date');
        if (!_.isNil(followupDate)) {
            RuleHelper.addSchedule(scheduleBuilder, 'ANC VHND Follow up', 'ANC VHND Follow up', followupDate, 1);
        }
        return scheduleBuilder.getAllUnique("encounterType");
    }
}

module.exports = {PregnancyEnrolmentBasedVisitsIHMP, ASHAANCVisitBasedVisitsIHMP, ANCVHNDVisitBasedVisitsIHMP};
