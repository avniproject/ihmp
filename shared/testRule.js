import {EncounterEligibilityCheck} from 'rules-config/rules';

@EncounterEligibilityCheck({
    name: 'Test1',
    uuid: '9ab9cc94-5323-41bc-aec1-2bf2722a014f',
    encounterTypeUUID: '08250f58-6c95-49ca-ba42-57e49005ead6',
    // abortion followup
    executionOrder: 100.0,
    metadata: {}
})
class Test1 {
    static exec({individual}) {
        return false;
    }
}

@EncounterEligibilityCheck({
    name: 'Test2',
    uuid: '522778a5-7036-401c-8e40-555e6db0e5c4',
    encounterTypeUUID: '76244d2f-d23e-469b-a185-efa51d9ce536',
    // census
    executionOrder: 100.0,
    metadata: {}
})
class Test2 {
    static exec({individual}) {
        return false;
    }
}

export {
    Test1,
    Test2
};
