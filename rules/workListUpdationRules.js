import {lib, RuleCondition, WorkListUpdationRule} from "rules-config";

@WorkListUpdationRule({
    name: 'IHMPWorkListUpdationRule',
    uuid: '495e255c-335c-4ee5-ae53-6d3487ae2209',
    executionOrder: 100.0,
    metadata: {}
})
class IHMPWorkListUpdationRules {
    static needsAssessment(workLists, context) {
        const WorkItem = lib().models.WorkItem;
        const enrolToMotherProgram = () => workLists.addItemsToCurrentWorkList(
            new WorkItem('31af5921-368f-4cbd-a830-40f38d1c73c3',
                WorkItem.type.PROGRAM_ENROLMENT,
                {
                    programName: 'Mother',
                    subjectUUID: _.get(context, 'entity.programEnrolment.individual.uuid')
                }));

        const programEncounter = context.entity;
        const ruleCondition = new RuleCondition({programEncounter})
            .when
            .valueInEncounter("Whether currently pregnant").is.yes
            .and.whenItem(!_.some(programEncounter.programEnrolment.individual.enrolments,
                enrolment => !enrolment.voided && enrolment.program.name === 'Mother')).is.truthy;

        if (ruleCondition.matches()) {
            enrolToMotherProgram();
        }
    }

    //Move mother PNC encounter to the end, and insert registration and enrolment of child.
    static delivery(workLists, context) {
        const WorkItem = lib().models.WorkItem;
        const currentWorkList = workLists.currentWorkList;

        //Remove ANC scheduled visits if any
        const positionOfANC = _.findIndex(currentWorkList.workItems,
            (workItem) => workItem.type === WorkItem.type.PROGRAM_ENCOUNTER && workItem.parameters.encounterType === 'ANC ASHA');
        if (positionOfANC !== -1) {
            currentWorkList.workItems.splice(positionOfANC, 1);
        }

        let splicePosition = currentWorkList.findWorkItemIndex(currentWorkList.currentWorkItem.id) + 1;
        currentWorkList.workItems.splice(
            splicePosition,
            0,
            new WorkItem('27b873ad-063e-4f18-a534-f8367de917b5', WorkItem.type.REGISTRATION, {subjectTypeName: 'Individual',
                saveAndProceedLabel: 'registerAChild'}),
            new WorkItem('cbe9dd3b-8f10-487a-bc30-39a18f6fc5bd', WorkItem.type.PROGRAM_ENROLMENT, {
                programName: 'Child',
            })
        );

        return workLists;
    }

    static pnc(workLists, context) {
        const workItems = workLists.currentWorkList.workItems;
        const pncWorkItemIndex = workItems.findIndex(workItem => workItem.parameters.encounterType === 'PNC' );
        let neonatalWorkItemIndex = workItems.findIndex(workItem => workItem.parameters.encounterType === 'Neonatal');
        if (pncWorkItemIndex !== -1 && neonatalWorkItemIndex !== -1) {
            const [pncWorkItem] = workItems.splice(pncWorkItemIndex, 1);
            //Recalculate since this would have changed since last splice
            neonatalWorkItemIndex = workItems.findIndex(workItem => workItem.parameters.encounterType === 'Neonatal');
            workItems.splice(neonatalWorkItemIndex, 0, pncWorkItem);
        }
        return workLists;
    }

    static programEnrolment(workLists, context) {
        const currentWorkItem = workLists.getCurrentWorkItem();
        if (currentWorkItem.parameters.programName === 'Child') {
            return IHMPWorkListUpdationRules.pnc(workLists, context);
        }
        return workLists;
    }

    static programEncounter(workLists, context) {
        const currentWorkItem = workLists.getCurrentWorkItem();
        switch (currentWorkItem.parameters.encounterType) {
            case 'Monthly needs assessment': {
                return IHMPWorkListUpdationRules.needsAssessment(workLists, context);
            }
            case 'Delivery': {
                return IHMPWorkListUpdationRules.delivery(workLists, context);
            }
            default: {
                return workLists;
            }
        }
    }


    static exec(workLists, context) {
        const WorkItem = lib().models.WorkItem;
        const currentWorkItem = workLists.getCurrentWorkItem();
        if (currentWorkItem.type === WorkItem.type.PROGRAM_ENROLMENT) {
            IHMPWorkListUpdationRules.programEnrolment(workLists, context)
        }
        if (currentWorkItem.type === WorkItem.type.PROGRAM_ENCOUNTER) {
            IHMPWorkListUpdationRules.programEncounter(workLists, context)
        }
        return workLists;
    }
}

module.exports = {IHMPWorkListUpdationRules};
