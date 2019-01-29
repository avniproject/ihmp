import {
    FormElementsStatusHelper,
    FormElementStatus,
    FormElementStatusBuilder,
    ProgramRule,
    RuleFactory,
    StatusBuilderAnnotationFactory,
    VisitScheduleBuilder
} from 'rules-config/rules';

const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');
const asViewFilter = RuleFactory('78b1400e-8100-4ba6-b78e-fef580f7fb77', "ViewFilter");
const ViewFiltersUuid = '1eb7cc4e-4586-4cf0-8949-0113e881b9dc';

@asViewFilter(ViewFiltersUuid, "IHMP Pregnancy PNC View Filter", 100.0, {}, ViewFiltersUuid)
class ViewFilters {
    static exec(programEnrolment, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new ViewFilters(), programEnrolment, formElementGroup, today);
    }

    /*Any breast problems*/
    @WithStatusBuilder
    anyBreastProblems([], statusBuilder) {
        statusBuilder.skipAnswers('Nipple hardness', 'Breast hardness', 'Agalactorrhea- no or insufficient lactation');
    }

    /*Any vaginal problems*/
    @WithStatusBuilder
    anyVaginalProblems([], statusBuilder) {
        statusBuilder.skipAnswers('Infected perineum suture');
    }

    /*How is the incision area*/
    @WithStatusBuilder
    howIsTheIncisionArea([], statusBuilder) {
        statusBuilder.skipAnswers('Indurated');
    }
}

module.exports = {[ViewFiltersUuid]: ViewFilters};
