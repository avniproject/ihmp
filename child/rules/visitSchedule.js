import {RuleFactory, VisitScheduleBuilder} from 'rules-config/rules';

const moment = require("moment");
const RuleHelper = require('../../RuleHelper');

const ChildEnrolmentBasedVisitsRule = RuleFactory("1608c2c0-0334-41a6-aab0-5c61ea1eb069", "VisitSchedule");

@ChildEnrolmentBasedVisitsRule("c70e2660-a10d-4765-8bf0-11685b5618f2", "Child Enrolment based visit rule", 100.0)
class ChildEnrolmentBasedVisitsIHMP {
    static exec(programEnrolment, visitSchedule = [], scheduleConfig) {
        let scheduleBuilder = RuleHelper.createProgramEncounterVisitScheduleBuilder(programEnrolment, visitSchedule);
        let registrationAtChildBirth = programEnrolment.getObservationReadableValue('Registration at child birth');
        if (registrationAtChildBirth === 'Yes') {
            RuleHelper.addSchedule(scheduleBuilder, 'Birth', 'Birth (ASHA)',
                programEnrolment.enrolmentDateTime, 0);
        }
        return scheduleBuilder.getAllUnique("encounterType");
    }
}

export {
    ChildEnrolmentBasedVisitsIHMP
};
