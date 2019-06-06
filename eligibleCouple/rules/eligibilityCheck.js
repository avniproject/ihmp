import {EnrolmentEligibilityCheck} from 'rules-config/rules';


@EnrolmentEligibilityCheck({
    name: 'EligibleCoupleEnrolmentEligibility',
    uuid: '2294aafa-8fe1-488b-8d97-a5270c676bac',
    programUUID: 'fdf5c253-c49f-43e1-9591-4556a3ea36d4',
    executionOrder: 100.0,
    metadata: {}
})
class EligibleCoupleEnrolmentEligibility {
    static exec({individual}) {
        return individual.isFemale() && individual.getAgeInYears() > 5;
    }
}

export  {
    EligibleCoupleEnrolmentEligibility
};