const _ = require("lodash");
import {
    FormElementsStatusHelper,
    FormElementStatus,
    FormElementStatusBuilder,
    RuleFactory,
    StatusBuilderAnnotationFactory,
    WithName,
    complicationsBuilder as ComplicationsBuilder
} from 'rules-config/rules';

const FPServicesViewFilter = RuleFactory("38a778be-991f-40f0-9837-7244836ecdfc", "ViewFilter");
const decisions = RuleFactory("38a778be-991f-40f0-9837-7244836ecdfc", "Decision");
const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');

@FPServicesViewFilter("0485b65e-772b-4d1f-8906-c7203510639b", "IHMP Nutritional Status View Filter", 100.0, {})
class NutritionalStatusViewFilterHandlerIHMP {
    static exec(programEncounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new NutritionalStatusViewFilterHandlerIHMP(), programEncounter, formElementGroup, today);
    }

    @WithName("Since how many days is child suffering from diarrohea?")
    @WithStatusBuilder
    sufferingFromDiarrohea([programEncounter], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Baby has got diarrohea").is.yes;
    }

    @WithName("Since how many days is child suffering from cough and cold?")
    @WithStatusBuilder
    sufferingFromCoughAndCold([programEncounter], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Whether having cough and cold").is.yes;
    }

    @WithName("Since how many days is child suffering from fever?")
    @WithStatusBuilder
    sufferingFromFever([programEncounter], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Child has fever").is.yes;
    }

    @WithName("IHMP Diarrohea Counselling")
    @WithStatusBuilder
    ihmpDiarroheaCounselling([programEncounter], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Baby has got diarrohea").is.yes;
    }
}


@decisions("ae43b059-2cf4-4572-86c0-22a35d0ef5cd", "Child Nutritional Status Decisions [IHMP]", 100.0, {})
class NutritionalStatusDecisions {
    static immediateReferral(programEncounter) {
        const complicationsBuilder = new ComplicationsBuilder({
            programEncounter: programEncounter,
            complicationsConcept: 'Refer to the hospital immediately for'
        });

        complicationsBuilder.addComplication("Baby has got diarrohea")
            .when.valueInEncounter("Baby has got diarrohea").is.yes
            .and.when.valueInEncounter("Days since child is suffering from diarrohea").is.greaterThan(1);

        complicationsBuilder.addComplication("Child has fever")
            .when.valueInEncounter("Child has fever").is.yes;

        complicationsBuilder.addComplication("Baby has got cough and cold")
            .when.valueInEncounter("Whether having cough and cold").is.yes;

        return complicationsBuilder.getComplications();
    }

    static exec(programEncounter, decisions, context, today) {
        decisions.encounterDecisions.push(NutritionalStatusDecisions.immediateReferral(programEncounter));
        return decisions;
    }
}

module.exports = {NutritionalStatusViewFilterHandlerIHMP, NutritionalStatusDecisions};

