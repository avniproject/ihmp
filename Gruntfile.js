const rulesConfigInfra = require('rules-config/infra');
const IDI = require('openchs-idi');
const secrets = require('../secrets.json');

module.exports = IDI.configure({
    "name": "ihmp",
    "chs-admin": "admin",
    "org-name": "IHMP",
    "org-admin": "ihmp-admin",
    "secrets": secrets,
    "files": {
        "adminUsers": {
            // "prod": ["admin-user.json"],
            "dev": ["users/dev-admin-user.json"],
        },
        "forms": [
            "census/censusForm.json",
            "child/birthForm.json",
            "child/checklistForm.json",
            "child/nutritionalStatusForm.json",
            "child/neonatalForm.json",
            "deathRegister/deathRegisterForm.json",
            "asha/ashaInputsForm.json",
            "eligibleCouple/ecProgramExitForm.json",
            "eligibleCouple/eligibleCoupleEnrolmentForm.json",
            "eligibleCouple/fpServicesForm.json",
            "eligibleCouple/monthlyNeedsAssessmentForm.json",
            "eligibleCouple/rtiServicesForm.json",
            "marriageRegister/marriageRegisterForm.json",
            "pregnancy/ancashaForm.json",
            "pregnancy/ancvhndfollowupForm.json",
            "pregnancy/ancvhndForm.json",
            "pregnancy/postAbortionForm.json",
            "registration/registrationForm.json",
            "shared/encounterCancellation/encounterCancellationForm.json",
        ],
        "formMappings": [
            "formMappings.json",
        ],
        "formDeletions": [
            "pregnancy/deliveryDeletions.json",
            "pregnancy/enrolmentDeletions.json",
            "pregnancy/pncDeletions.json",
        ],
        "formAdditions": [
            "pregnancy/abortionAdditions.json",
            "pregnancy/deliveryAdditions.json",
            "pregnancy/enrolmentAdditions.json",
            "pregnancy/pncAdditions.json",
        ],
        "catchments": [
            "catchments.json",
        ],
        "checklistDetails": [
            "child/checklist.json",
        ],
        "concepts": [
            "child/checklistConcepts.json",
            "child/childConcepts.json",
            "deathRegister/deathRegisterConcepts.json",
            "asha/ashaInputConcepts.json",
            "eligibleCouple/eligibleCoupleConcepts.json",
            "marriageRegister/marriageRegisterConcepts.json",
            "pregnancy/pncConcepts.json",
            "pregnancy/pregnancyConcepts.json",
            "registration/registrationConcepts.json",
        ],
        "locations": [
            "address_level/phc.json",
            "address_level/slum.json",
            "address_level/subcenter.json",
            "address_level/village.json",
        ],
        "programs": ["programs.json"],
        "encounterTypes": ["encounterTypes.json"],
        "operationalEncounterTypes": ["operationalModules/operationalEncounterTypes.json"],
        "operationalPrograms": ["operationalModules/operationalPrograms.json"],
        "operationalSubjectTypes": ["operationalModules/operationalSubjectTypes.json"],
        "users": {
            "dev": ["users/dev-users.json"]
        },
        "rules": [
            "./rules.js"
        ],
        "organisationSql": [
            /* "create_organisation.sql"*/
        ]
    }
}, rulesConfigInfra);
