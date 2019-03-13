import {
    FormElementRule, DecisionRule,
    FormElementsStatusHelper,
    StatusBuilderAnnotationFactory} from 'rules-config/rules';
import {WithName} from "rules-config";
const moment = require("moment");
const _ = require("lodash");
const WithStatusBuilder = StatusBuilderAnnotationFactory('encounter', 'formElement');

@FormElementRule({
    name: 'IHMP Death Register form rules',
    uuid: '8b857f3a-530b-483f-bab6-3a5966590390',
    formUUID: '2d8ca0a7-3f31-4de1-bd33-8312666f0d2b',
    executionOrder: 100.0,
    metadata: {}
})
class DeathRegisterFormHandler {
    static exec(encounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new DeathRegisterFormHandler(), encounter, formElementGroup, today);
    }

    @WithName("Date of Death")
    @WithStatusBuilder
    dateOfDeath([encounter], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Exact date of death is known").is.yes
            .or.when.valueInEncounter("Age at time of death").is.defined;
        let status = statusBuilder.build();
        status.value = getDoDFromAge(encounter);
        return status;
    }

    @WithName("Age at time of death")
    @WithStatusBuilder
    ageAtDeath([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Exact date of death is known").is.no;
    }
}

function getDoDFromAge(encounter) {
    let age = encounter.getObservationReadableValue('Age at time of death');
    if (age !== undefined) {
        let years = _.find(age.durations, duration => duration.durationUnit === 'years')._durationValue || 0;
        let months = _.find(age.durations, duration => duration.durationUnit === 'months')._durationValue || 0;
        let days = _.find(age.durations, duration => duration.durationUnit === 'days')._durationValue || 0;
        let ageDuration = moment.duration({ years, months, days });
        return moment(encounter.individual.dateOfBirth).add(ageDuration);
    }
    return null;
}

module.exports = { DeathRegisterFormHandler };
