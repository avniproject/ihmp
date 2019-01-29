const moment = require("moment");
const _ = require("lodash");
import {
    RuleFactory,
    FormElementsStatusHelper,
    FormElementStatusBuilder,
    StatusBuilderAnnotationFactory,
    FormElementStatus,
    VisitScheduleBuilder,
    complicationsBuilder as ComplicationsBuilder,
    RuleCondition
} from 'rules-config/rules';

const ANCASHAViewFilter = RuleFactory("4201c189-5a6c-40ca-8c33-c5b7d24a9604", "ViewFilter");
const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');

@ANCASHAViewFilter("593875ec-dd49-4de0-81f5-911fbd6dcf6b", "IHMP ANC ASHA View Filter", 100.0, {})
class PregnancyANCASHAViewFilterHandlerIHMP {
    static exec(programEncounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new PregnancyANCASHAViewFilterHandlerIHMP(), programEncounter, formElementGroup, today);
    }
    
    @WithStatusBuilder
    ihmpAshaCounsellingForPregnancyConfirmedAndNotRegisteredForAnc([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter()
    }

    @WithStatusBuilder
    ihmpAshaCounsellingForMonthlyAntenatalCheckup([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter()
    }

    @WithStatusBuilder
    ihmpAshaCounsellingDuringEveryContact([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter()
    }

    @WithStatusBuilder
    ihmpAshaCounsellingDuringEveryContactPost7thMonth([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter()
    }

    @WithStatusBuilder
    ihmpAshaCounsellingDuringEveryContactPostRegistration([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter()
    }

    @WithStatusBuilder
    ihmpAshaCounsellingDuringEveryContactPost8thMonth([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter()
    }
}


module.exports = {PregnancyANCASHAViewFilterHandlerIHMP};
