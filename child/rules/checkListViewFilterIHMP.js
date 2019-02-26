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
const WithStatusBuilder = StatusBuilderAnnotationFactory('checklistItem', 'formElement');

@ViewFilter("b730ce48-108a-4c16-8838-4a575e467a6f", "IHMP Check List View Filter", 100.0, {})
class CheckListViewFilterIHMP {
    static exec(checklistItem, formElementGroup, today) {
        return FormElementsStatusHelper
            .getFormElementsStatusesWithoutDefaults(new CheckListViewFilterIHMP(), checklistItem, formElementGroup, today);
    }

    @WithName("Administered By(Other)")
    @WithStatusBuilder
    other([checklistItem], statusBuilder) {
        statusBuilder.show().when.valueInChecklistItem("Administered by").containsAnswerConceptName("Other");
    }

}


module.exports = {CheckListViewFilterIHMP};

