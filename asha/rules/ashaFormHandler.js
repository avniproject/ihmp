import {
    FormElementRule,
    FormElementsStatusHelper,
    StatusBuilderAnnotationFactory
} from 'rules-config/rules';
import {WithName} from "rules-config";

const WithStatusBuilder = StatusBuilderAnnotationFactory('encounter', 'formElement');

@FormElementRule({
    name: 'ASHA Input form rules',
    uuid: 'c410c1af-552c-402f-83d0-97a055fbf6d8',
    formUUID: '3bee367f-6305-44ee-8fc3-5e8c93530a26',
    executionOrder: 100.0,
    metadata: {}
})

class AshaFormHandler {
    static exec(encounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new AshaFormHandler(), encounter, formElementGroup, today);
    }

    @WithName("Date of group meeting conducted for married adolescent girls?")
    @WithStatusBuilder
    showDateForGirls([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Group meeting for married adolescent girls conducted?").is.yes;
    }

    @WithName("Number of married adolescent girls attended group meeting")
    @WithStatusBuilder
    showMarriedNumberGirls([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Group meeting for married adolescent girls conducted?").is.yes;
    }

    @WithName("Topic covered in the group meeting for married adolescent girls?")
    @WithStatusBuilder
    showTopicCoveredForGirls([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Group meeting for married adolescent girls conducted?").is.yes;
    }

    //second page
    @WithName("Date of group meeting conducted forYoung married women?")
    @WithStatusBuilder
    showDateForWomen([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Group meeting for Young married women conducted?").is.yes;
    }

    @WithName("Number of Young married women attended group meeting")
    @WithStatusBuilder
    showMarriedNumberWomen([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Group meeting for Young married women conducted?").is.yes;
    }

    @WithName("Topic covered in the group meeting for Young married women?")
    @WithStatusBuilder
    showTopicCoveredForWomen([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Group meeting for Young married women conducted?").is.yes;
    }

    //third page
    @WithName("Date of group meeting conducted for husband?")
    @WithStatusBuilder
    showDateForHusband([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Group meeting for husbands conducted?").is.yes;
    }

    @WithName("Number of husband attended group meeting")
    @WithStatusBuilder
    showMarriedNumberHusband([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Group meeting for husbands conducted?").is.yes;
    }

    @WithName("Topic covered in the group meeting for husband?")
    @WithStatusBuilder
    showTopicCoveredForHusband([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Group meeting for husbands conducted?").is.yes;
    }

    //fourth page
    @WithName("Date of group meeting conducted for inlaws/decision makers?")
    @WithStatusBuilder
    showDateForInlaws([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Group meeting for inlaws/decision makers conducted?").is.yes;
    }

    @WithName("Number of inlaws/decision makers attended group meeting")
    @WithStatusBuilder
    showMarriedNumberInlaws([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Group meeting for inlaws/decision makers conducted?").is.yes;
    }

    @WithName("Topic covered in the group meeting for inlaws/decision makers?")
    @WithStatusBuilder
    showTopicCoveredForInlaws([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Group meeting for inlaws/decision makers conducted?").is.yes;
    }

    //fifth page
    @WithName("Date of group meeting conducted for parents of Unmarried adolescent girls?")
    @WithStatusBuilder
    showDateForParents([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Group meeting for parents of Unmarried adolescent girls conducted?").is.yes;
    }

    @WithName("Number of parents of Unmarried adolescent girls  attended group meeting")
    @WithStatusBuilder
    showMarriedNumberParents([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Group meeting for parents of Unmarried adolescent girls conducted?").is.yes;
    }

    @WithName("Topic covered in the group meeting for parents of Unmarried adolescent girls?")
    @WithStatusBuilder
    showTopicCoveredForParents([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Group meeting for parents of Unmarried adolescent girls conducted?").is.yes;
    }

    //sixth page
    @WithName("Date of VHSNC meeting?")
    @WithStatusBuilder
    showDateForVHSNC([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Is VHSNC meetings conducted?").is.yes;
    }

    @WithName("Number of VHSNC members attended meeting")
    @WithStatusBuilder
    showMarriedNumberVHSNC([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Is VHSNC meetings conducted?").is.yes;
    }

    @WithName("Topic covered in the VHSNC meeting?")
    @WithStatusBuilder
    showTopicCoveredForVHSNC([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Is VHSNC meetings conducted?").is.yes;
    }

    //seventh page
    @WithName("Date of superviory visit - first visit")
    @WithStatusBuilder
    showDateFirstVisit([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Number of superviory visits conducted for the month?").is.greaterThan(0);
    }

    @WithName("Date of superviory visit - second visit")
    @WithStatusBuilder
    showDateSecondVisit([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Number of superviory visits conducted for the month?").is.greaterThan(0);
    }

    @WithName("Date of superviory visit - third visit")
    @WithStatusBuilder
    showDateThirdVisit([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Number of superviory visits conducted for the month?").is.greaterThan(0);
    }

    @WithName("Date of superviory visit - fourth visit")
    @WithStatusBuilder
    showDateFourthVisit([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Number of superviory visits conducted for the month?").is.greaterThan(0);
    }

    @WithName("Skills/topics provided by the facilitator during superviory visit to ASHA?")
    @WithStatusBuilder
    showTopicsSkills([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Number of superviory visits conducted for the month?").is.greaterThan(0);
    }

    //eighth page
    @WithName("Number of women actually covered under Need based counseling on promotion of temporary contraceptives - covered")
    @WithStatusBuilder
    showTemporaryContraceptivesCovered([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Number of women to be covered for Need based counseling on promotion of temporary contraceptives - planned").is.greaterThan(0);
    }

    @WithName("Number of women actually covered under Need based counseling on promotion of Permenant FP methods - covered")
    @WithStatusBuilder
    showFPMethodCovered([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Number of women to be covered for Need based counseling on promotion of permenant FP methods - planned").is.greaterThan(0);
    }

    @WithName("Number of women with RTI symptoms actually covered under counseling on RTI treatment - covered")
    @WithStatusBuilder
    showRTITreatmentCovered([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Number of women with RTI symptoms to be covered for counseling on RTI treatment - planned").is.greaterThan(0);
    }

    @WithName("Number of pregnant mothers with danger signs actually covered under  counseling  - covered")
    @WithStatusBuilder
    showCounselingCovered([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter("Number of pregnant mothers with danger signs to be covered for counseling  - planned").is.greaterThan(0);
    }

}


module.exports = {AshaFormHandler};
