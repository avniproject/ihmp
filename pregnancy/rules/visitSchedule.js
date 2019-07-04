import {RuleFactory, VisitScheduleBuilder} from 'rules-config/rules';

const moment = require("moment");
const _ = require("lodash");
const RuleHelper = require('../../RuleHelper');
import {VisitSchedule} from "../../shared/visitSchedule";

const PregnancyEnrolmentBasedVisitsRule = RuleFactory("026e2f5c-8670-4e4b-9a54-cb03bbf3093d", "VisitSchedule");
const ASHAANCVisitBasedVisitsRule = RuleFactory("4201c189-5a6c-40ca-8c33-c5b7d24a9604", "VisitSchedule");
const ANCVHNDVisitBasedVisitsRule = RuleFactory("e2cf41de-d962-4110-9d66-70877e2eb59d", "VisitSchedule");
const IHMPDeliveryVisitSchedulesRule = RuleFactory('cc6a3c6a-c3cc-488d-a46c-d9d538fcc9c2', 'VisitSchedule');
const IHMPPNCVisitSchedulesRule = RuleFactory('78b1400e-8100-4ba6-b78e-fef580f7fb77', 'VisitSchedule');
const IHMPPostAbortionVisitSchedulesRule = RuleFactory('32428a7e-d553-4172-b697-e8df3bbfb61d', 'VisitSchedule');
const IHMPPostAbortionFollowupVisitSchedulesRule = RuleFactory('b9a823eb-0251-4697-a34a-49f3f8ab0c04', 'VisitSchedule');


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
        let nextVhndDate = programEncounter.getObservationReadableValue('Next VHND date');
        if (!_.isNil(nextVhndDate)) {
            RuleHelper.addSchedule(scheduleBuilder, 'ANC VHND', 'ANC VHND', nextVhndDate, 1);
        }
        return scheduleBuilder.getAllUnique("encounterType");
    }
}

@IHMPDeliveryVisitSchedulesRule('83088688-140a-403b-8815-5122a01fe976', "Delivery based visit rules", 100.0)
class IHMPDeliveryVisitSchedules {
    static exec(programEncounter, visitSchedule = [], scheduleConfig) {
        let scheduleBuilder = RuleHelper.createProgramEncounterVisitScheduleBuilder(programEncounter, visitSchedule);
        const placeOfDelivery = programEncounter.getObservationReadableValue('Place of delivery');
        let earliestVisitDateTime = ["Home", "During Transportation like in Ambulance etc"].indexOf(placeOfDelivery) !== -1 ?
            moment(programEncounter.encounterDateTime).startOf('day').toDate() :
            moment(programEncounter.encounterDateTime).startOf('day').add(3, 'days').toDate();
        RuleHelper.blindAddSchedule(scheduleBuilder, 'PNC 1', 'PNC', earliestVisitDateTime, 0);
        return scheduleBuilder.getAll();
    }
}

@IHMPPNCVisitSchedulesRule('93b82e36-b140-4deb-8676-f3c855213430', "PNC based visit rules", 100.0)
class IHMPPNCVisitSchedules {
    static exec(programEncounter, visitSchedule = [], scheduleConfig) {
        let dateOfDelivery = programEncounter.programEnrolment.getObservationReadableValueInEntireEnrolment('Date of delivery', programEncounter);
        return VisitSchedule.postPartumVisits(programEncounter, 'PNC', dateOfDelivery, visitSchedule);
    }
}


@IHMPPostAbortionVisitSchedulesRule('5ea37a3f-cd49-42f1-919b-ba4ee3d098d1', "Abortion based visit rules", 100.0)
class PostAbortionVisitScheduleIHMP {
    static exec(programEncounter, visitSchedule = [], scheduleConfig) {
        let scheduleBuilder = RuleHelper.createProgramEncounterVisitScheduleBuilder(programEncounter, visitSchedule);
        return RuleHelper.scheduleOneVisit(scheduleBuilder, 'First post abortion home visit', 'Abortion followup', moment(programEncounter.encounterDateTime).add(7, 'days').toDate(), 8);
    }
}

@IHMPPostAbortionFollowupVisitSchedulesRule('15ef0432-1b60-407f-acb8-f3cf7975b908', "Abortion followup based visit rules", 100.0)
class PostAbortionFollowupVisitScheduleIHMP {
    static exec(programEncounter, visitSchedule = [], scheduleConfig) {
        let scheduleBuilder = RuleHelper.createProgramEncounterVisitScheduleBuilder(programEncounter, visitSchedule);
        return RuleHelper.scheduleOneVisit(scheduleBuilder, 'Second post abortion home visit', 'Abortion followup', moment(programEncounter.encounterDateTime).add(10, 'days').toDate(), 11);
    }
}


export {
    PregnancyEnrolmentBasedVisitsIHMP,
    ASHAANCVisitBasedVisitsIHMP,
    ANCVHNDVisitBasedVisitsIHMP,
    IHMPDeliveryVisitSchedules,
    IHMPPNCVisitSchedules,
    PostAbortionVisitScheduleIHMP,
    PostAbortionFollowupVisitScheduleIHMP
};
