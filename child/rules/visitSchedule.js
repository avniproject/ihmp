import {RuleFactory, VisitScheduleBuilder} from 'rules-config/rules';

const moment = require("moment");
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
            RuleHelper.addSchedule(scheduleBuilder, 'Birth', 'Birth (ASHA)',
                programEnrolment.enrolmentDateTime, 0);
        }
        let dateOfBirth = moment(programEnrolment.individual.dateOfBirth);
        let daysFromBirth = moment(programEnrolment.enrolmentDateTime).diff(dateOfBirth, 'days');
        if(daysFromBirth <= 1){
            RuleHelper.addSchedule(scheduleBuilder, 'HBNC 1','Neonatal',
                programEnrolment.enrolmentDateTime, 1);
        } else if (daysFromBirth <= 3) {
            RuleHelper.addSchedule(scheduleBuilder, 'HBNC 2', 'Neonatal',
                dateOfBirth.add(3, 'days').toDate(), 0);
        } else if (dateOfBirth <= 7) {
            RuleHelper.addSchedule(scheduleBuilder, 'HBNC 3', 'Neonatal',
                dateOfBirth.add(7, 'days').toDate(), 0);

        } else if (dateOfBirth <= 42) {
            RuleHelper.addSchedule(scheduleBuilder, 'HBNC 4', 'Neonatal',
                dateOfBirth.add(42, 'days').toDate(), 0);

        }

        return scheduleBuilder.getAllUnique("encounterType");
    }
}


@ChildNeonatalBasedVisitsRule("0e9e55e5-388b-4a56-a977-61fc3b39bcb3", "Child Neonatal based visit rule", 100.0)
class ChildNeonatalBasedVisitsIHMP {

    static exec(programEncounter, visitSchedule = [], scheduleConfig) {
        let scheduleBuilder = RuleHelper.createProgramEncounterVisitScheduleBuilder(programEncounter, visitSchedule);
        let dateOfBirth = moment(programEncounter.programEnrolment.individual.dateOfBirth);
        if (programEncounter.name === 'HBNC 1') {
            return RuleHelper.scheduleOneVisit(scheduleBuilder, 'HBNC 2', 'Neonatal', dateOfBirth.add(3, 'days').toDate(), 0);
        } else if (programEncounter.name === 'HBNC 2') {
            return RuleHelper.scheduleOneVisit(scheduleBuilder, 'HBNC 3', 'Neonatal', dateOfBirth.add(7, 'days').toDate(), 0);
        } else if (programEncounter.name === 'HBNC 3') {
            return RuleHelper.scheduleOneVisit(scheduleBuilder, 'HBNC 4', 'Neonatal', dateOfBirth.add(42, 'days').toDate(), 0);
        }
        else {
            return visitSchedule;
        }
    }
}


export {
    ChildEnrolmentBasedVisitsIHMP, ChildNeonatalBasedVisitsIHMP
};
