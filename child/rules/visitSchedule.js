import {RuleFactory, VisitScheduleBuilder} from 'rules-config/rules';
import {VisitSchedule} from "../../shared/visitSchedule";

const moment = require("moment");
const _ = require("lodash");
const RuleHelper = require('../../RuleHelper');

const ChildEnrolmentBasedVisitsRule = RuleFactory("1608c2c0-0334-41a6-aab0-5c61ea1eb069", "VisitSchedule");
const ChildNeonatalBasedVisitsRule = RuleFactory("b77bc4a1-c7e6-4d46-a0d9-eb211f05440e", "VisitSchedule");

const visitSchedule = {
    "PNC 1": {earliest: 1, max: 1},
    "PNC 2": {earliest: 3, max: 3},
    "PNC 3": {earliest: 7, max: 7},
    "PNC 4": {earliest: 42, max: 42}
};


@ChildEnrolmentBasedVisitsRule("c70e2660-a10d-4765-8bf0-11685b5618f2", "Child Enrolment based visit rule", 100.0)
class ChildEnrolmentBasedVisitsIHMP {

    static exec(programEnrolment, visitSchedule = [], scheduleConfig) {
        let scheduleBuilder = RuleHelper.createProgramEncounterVisitScheduleBuilder(programEnrolment, visitSchedule);
        let registrationAtChildBirth = programEnrolment.getObservationReadableValue('Registration at child birth');
        if (registrationAtChildBirth === 'Yes') {
            RuleHelper.blindAddSchedule(scheduleBuilder, 'Birth', 'Birth (ASHA)',
                programEnrolment.enrolmentDateTime, 0);
        }

        let dateOfBirth = moment(programEnrolment.individual.dateOfBirth);
        let daysFromBirth = moment(programEnrolment.enrolmentDateTime).diff(dateOfBirth, 'days');
        if (daysFromBirth <= 42) {
            RuleHelper.blindAddSchedule(scheduleBuilder, 'HBNC 1', 'Neonatal',
                moment(dateOfBirth).startOf('day').add(3, 'days').toDate(), 0);
        }
        return scheduleBuilder.getAllUnique("encounterType");
    }
}



@ChildNeonatalBasedVisitsRule("0e9e55e5-388b-4a56-a977-61fc3b39bcb3", "Child Neonatal based visit rule", 100.0)
class ChildNeonatalBasedVisitsIHMP {

    static exec(programEncounter, visitSchedule = [], scheduleConfig) {
        const dateOfBirth = moment(programEncounter.programEnrolment.individual.dateOfBirth).startOf('day').toDate();
        return VisitSchedule.postPartumVisits(programEncounter, 'HBNC', dateOfBirth, visitSchedule);
    }
}


export {
    ChildEnrolmentBasedVisitsIHMP, ChildNeonatalBasedVisitsIHMP
};
