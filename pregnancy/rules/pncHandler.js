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

const isDefined = (pe, fe) => (concept) => {
    return new FormElementStatusBuilder({programEncounter: pe, formElement: fe})
        .show().when.valueInEncounter(concept).is.defined.matches();
};

const contains = (pe, fe) => (concept, ...answers) => {
    return new FormElementStatusBuilder({programEncounter: pe, formElement: fe})
        .show().when.valueInEncounter(concept).containsAnswerConceptName(...answers).matches();
};

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

    /*Taken treatment for postnatal complication*/
    takenTreatmentForPostnatalComplication(pe, fe) {
        const _defined = isDefined(pe, fe);
        const _contains = contains(pe, fe);
        return new FormElementStatus(fe.uuid,
            (_defined('Symptoms around head and face') && !_contains('Symptoms around head and face', 'No problem'))
            || (_defined('Problems with chest area') && !_contains('Problems with chest area', 'No problem'))
            || (_defined('Any abdominal problems') && !_contains('Any abdominal problems', 'No problem'))
            || (_defined('Any vaginal problems') && !_contains('Any vaginal problems', 'No problem'))
            || (_defined('Any difficulties with urinating') && !_contains('Any difficulties with urinating', 'No difficulties'))
            || (_defined('Any breast problems') && !_contains('Any breast problems', 'No problem'))
            || (_defined('How is the incision area') && !_contains('How is the incision area', 'Normal'))
            || (_defined('Any problems with legs') && !_contains('Any problems with legs', 'No difficulties'))
            || (_defined('Fever/Chills') && !_contains('Fever/Chills', 'No'))
            || (_defined('Convulsions') && !_contains('Convulsions', 'Absent'))
            || (_defined('Post-Partum Depression Symptoms') && !_contains('Post-Partum Depression Symptoms', 'No problem'))
        );
    }

    /*Place of treatment for postnatal complication?*/
    @WithStatusBuilder
    placeOfTreatmentForPostnatalComplication([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter('Taken treatment for postnatal complication').is.defined;
    }

    /*Has the complication been addressed?*/
    @WithStatusBuilder
    hasTheComplicationBeenAddressed([], statusBuilder) {
        statusBuilder.show().when.valueInEncounter('Taken treatment for postnatal complication').is.defined;
    }

    /*Diet and Rest*/
    dietAndRest(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map((fe)=> new FormElementStatus(fe.uuid, false));
    }

    /*Breast Feeding*/
    breastFeeding(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map((fe)=> new FormElementStatus(fe.uuid, false));
    }

    /*Hygiene*/
    hygiene(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map((fe)=> new FormElementStatus(fe.uuid, false));
    }

    /*Immunization and Family planning*/
    immunizationAndFamilyPlanning(programEncounter, formElementGroup) {
        return formElementGroup.formElements.map((fe)=> new FormElementStatus(fe.uuid, false));
    }

}

exports[ViewFiltersUuid] = ViewFilters;
