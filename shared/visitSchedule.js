import moment from 'moment';
import _ from 'lodash';
import RuleHelper from '../RuleHelper';

class VisitSchedule {
    static postPartumVisits(programEncounter, encounterName, eventDate, visitSchedule){
        let scheduleBuilder = RuleHelper.createProgramEncounterVisitScheduleBuilder(programEncounter, visitSchedule);

        const daysFromEvent = moment(programEncounter.earliestVisitDateTime).startOf('day').diff(eventDate, 'days');
        const protocolDaysForVisit = [3, 7, 28, 42];
        const daysFromEventForNextEncounter = _.find(protocolDaysForVisit, (x) => daysFromEvent < x);
        if(_.isNil(daysFromEventForNextEncounter)) return visitSchedule;

        const numberOfCompletedEncounters = programEncounter.programEnrolment.numberOfEncountersOfType(programEncounter.encounterType.name);
        const nextEncounterName = encounterName+ ' '+ (numberOfCompletedEncounters+1);

        RuleHelper.blindAddSchedule(scheduleBuilder, nextEncounterName, programEncounter.encounterType.name,
            moment(eventDate).add(daysFromEventForNextEncounter, 'days').toDate(), 0);

        return scheduleBuilder.getAllUnique("encounterType");

    }
}

export {VisitSchedule}