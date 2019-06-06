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
        const programEncounter = context.entity;
        const currentWorkList = workLists.currentWorkList;
        const splicePosition = _.findIndex(currentWorkList.workItems,
            (workItem) => workItem.type === WorkItem.type.REGISTRATION && workItem.parameters.encounterType === 'PNC');

        currentWorkList.workItems.splice(
            splicePosition,
            1000,
            new WorkItem('27b873ad-063e-4f18-a534-f8367de917b5', WorkItem.type.REGISTRATION, {subjectTypeName: 'Individual'}),
            new WorkItem('cbe9dd3b-8f10-487a-bc30-39a18f6fc5bd', WorkItem.type.PROGRAM_ENROLMENT, {
                programName: 'Child',
            }),
            new WorkItem('352f2887-45b8-47fc-9e1d-729982623c39', WorkItem.type.PROGRAM_ENCOUNTER, {
                subjectUUID: programEncounter.programEnrolment.individual.uuid,
                programEnrolmentUUID: programEncounter.programEnrolment.uuid,
                encounterType: 'PNC'
            })
        );
        return workLists;
    }


    //By now, child enrolment would have completed. Go ahead and create a child pnc.
    static pnc(workLists, context) {
        const WorkItem = lib().models.WorkItem;
        const currentWorkList = workLists.currentWorkList;
        const currentWorkItem = workLists.getCurrentWorkItem();
        const splicePosition = _.findIndex(currentWorkList.workItems,
            (workItem) => workItem.id === '352f2887-45b8-47fc-9e1d-729982623c39') + 1;

        if (currentWorkItem.id === '352f2887-45b8-47fc-9e1d-729982623c39') {
            const childEnrolmentWorkItem = currentWorkList.findWorkItem('cbe9dd3b-8f10-487a-bc30-39a18f6fc5bd');
            if (childEnrolmentWorkItem) {
                currentWorkList.workItems.splice(splicePosition, 0, new WorkItem('edeeebd6-997e-478a-8713-73df02f666de',
                    WorkItem.type.PROGRAM_ENCOUNTER,
                    {
                        subjectUUID: childEnrolmentWorkItem.parameters.subjectUUID,
                        programEnrolmentUUID: childEnrolmentWorkItem.parameters.programEnrolmentUUID,
                        encounterType: 'Neonatal',
                    }
                    )
                )
            }
        }
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
            case 'PNC': {
                return IHMPWorkListUpdationRules.pnc(workLists, context);
            }
            default: {
                return workLists;
            }
        }
    }


    static exec(workLists, context) {
        const WorkItem = lib().models.WorkItem;
        const currentWorkItem = workLists.getCurrentWorkItem();
        if (currentWorkItem.type === WorkItem.type.PROGRAM_ENCOUNTER) {
            IHMPWorkListUpdationRules.programEncounter(workLists, context)
        }
        return workLists;
    }
}

module.exports = {IHMPWorkListUpdationRules};
