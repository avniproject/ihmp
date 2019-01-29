import {RuleFactory} from 'rules-config/rules';

const asDecisions = RuleFactory('78b1400e-8100-4ba6-b78e-fef580f7fb77', 'Decision');
const DecisionsUuid = '5bfab5e5-4d22-4814-a40f-2aae5b52574e';

@asDecisions(DecisionsUuid, "IHMP Pregnancy PNC Decisions", 100.0, {}, DecisionsUuid)
class Decisions {
    static exec(encounter, decisions) {
        decisions.encounterDecisions = [];
        decisions.enrolmentDecisions = [];
        return decisions;
    }
}

exports[DecisionsUuid] = Decisions;
