const _ = require("lodash");
import {
    FormElementsStatusHelper,
    FormElementStatus,
    FormElementStatusBuilder,
    RuleFactory,
    StatusBuilderAnnotationFactory,
    WithName
} from 'rules-config/rules';

const ViewFilter = RuleFactory("161cecc6-9a8a-4bc8-b577-f1ea8c6c5702", "ViewFilter");
const WithStatusBuilder = StatusBuilderAnnotationFactory('programEncounter', 'formElement');

@ViewFilter("b730ce48-108a-4c16-8838-4a575e467a6f", "IHMP Check List View Filter", 100.0, {})
class CheckListViewFilterIHMP {
    static exec(programEncounter, formElementGroup, today) {
        console.log("came to CheckListViewFilterIHMP");
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new CheckListViewFilterIHMP(), programEncounter, formElementGroup, today);
    }

    @WithName("Administered By(Other)")
    @WithStatusBuilder
    other(programEncounter, statusBuilder) {
        console.log(statusBuilder.context.programEncounter);
        statusBuilder.show().when.valueInEncounter("Administered by").containsAnswerConceptName("Other");
    }

}


module.exports = {CheckListViewFilterIHMP};

