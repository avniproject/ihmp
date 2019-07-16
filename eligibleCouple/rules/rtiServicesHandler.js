import {
    FormElementsStatusHelper,
    FormElementStatus,
    FormElementStatusBuilder,
    RuleCondition,
    RuleFactory,
    StatusBuilderAnnotationFactory,
    VisitScheduleBuilder,
    WithName
} from 'rules-config/rules';

const ViewFilter = RuleFactory('90a9660b-9bc5-4b73-8e09-f83d029216fa', 'ViewFilter');
const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');

@ViewFilter('f3f0d9ad-fe10-49c7-ace7-7c127be14e18', "RTI Services ViewFilter IHMP", 100, {})
class RTIServicesViewFilterIHMP {

    @WithName('IHMP Recommendation for RTI symptoms')
    @WithStatusBuilder
    x([], statusBuilder) {
        statusBuilder.show()
            .when.valueInEncounter("Symptoms of RTI").is.defined
            .and.when.valueInEncounter("Symptoms of RTI").not.containsAnswerConceptName("None");
    }

    static exec(programEncounter, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new RTIServicesViewFilterIHMP(), programEncounter, formElementGroup, today);
    }

}

export {
    RTIServicesViewFilterIHMP
}
