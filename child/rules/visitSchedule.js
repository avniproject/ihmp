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
            // const protocolDaysForVisit = [3, 7, 14, 21, 28, 42];
            // const daysFromEventForNextEncounter = _.find(protocolDaysForVisit, (x) => daysFromBirth < x);
            // RuleHelper.blindAddSchedule(scheduleBuilder, 'HBNC 1', 'Neonatal',
            //     moment(dateOfBirth).startOf('day').add(daysFromEventForNextEncounter, 'days').toDate(), 0);

            scheduleChildHBNC(scheduleBuilder, 'Neonatal', programEnrolment.enrolmentDateTime, dateOfBirth, 0)
        }
        return scheduleBuilder.getAllUnique("encounterType");
    }
}


@ChildNeonatalBasedVisitsRule("0e9e55e5-388b-4a56-a977-61fc3b39bcb3", "Child Neonatal based visit rule", 100.0)
class ChildNeonatalBasedVisitsIHMP {

    static exec(programEncounter, visitSchedule = [], scheduleConfig) {
        let scheduleBuilder = RuleHelper.createProgramEncounterVisitScheduleBuilder(programEncounter, visitSchedule);
        const dateOfBirth = moment(programEncounter.programEnrolment.individual.dateOfBirth).startOf('day').toDate();
        let daysFromBirth = moment(programEncounter.encounterDateTime).diff(dateOfBirth, 'days');
        if(daysFromBirth < 42) {
            scheduleChildHBNC(scheduleBuilder, 'Neonatal', programEncounter.encounterDateTime, dateOfBirth, 0)
        }
        return scheduleBuilder.getAllUnique("encounterType");
    }
}


const scheduleChildHBNC = (scheduleBuilder, encounterType, encounterDate, eventDate, maxDay) => {
    const schedule = [
        {"Name": "HBNC 1", "days": 3},
        {"Name": "HBNC 2", "days": 7},
        {"Name": "HBNC 3", "days": 14},
        {"Name": "HBNC 4", "days": 21},
        {"Name": "HBNC 5", "days": 28},
        {"Name": "HBNC 6", "days": 42},
    ]
    const daysFromEvent = moment(encounterDate).startOf('day').diff(eventDate, 'days');
    const scheduleFromEventForNextEncounter = schedule.find(x => daysFromEvent < x.days)
    console.log('scheduleFromEventForNextEncounter------>',scheduleFromEventForNextEncounter);


    if(_.isNil(scheduleFromEventForNextEncounter)) return visitSchedule;
    return RuleHelper.blindAddSchedule(scheduleBuilder, scheduleFromEventForNextEncounter.Name, encounterType,
        moment(eventDate).add(scheduleFromEventForNextEncounter.days, 'days').toDate(), maxDay);
}

export {
    ChildEnrolmentBasedVisitsIHMP, ChildNeonatalBasedVisitsIHMP
};
