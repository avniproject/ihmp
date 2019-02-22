set role jscs;
-- ----------------------------------------------------

drop view if exists ihmp_rti_services_view;
create or replace view ihmp_rti_services_view as (SELECT
  individual.uuid "Ind.uuid",
  individual.first_name "Ind.first_name",
  individual.last_name "Ind.last_name",
  g.name "Ind.Gender",
  individual.date_of_birth "Ind.date_of_birth",
  individual.date_of_birth_verified "Ind.date_of_birth_verified",
  individual.registration_date "Ind.registration_date",
  individual.facility_id  "Ind.facility_id",
  a.title "Ind.Area",
  c2.name "Ind.Catchment",
  individual.is_voided "Ind.is_voided",
  op.name "Enl.Program Name",
  programEnrolment.uuid  "Enl.uuid",
  programEnrolment.is_voided "Enl.is_voided",
  oet.name "Enc.Type",
  programEncounter.earliest_visit_date_time "Enc.earliest_visit_date_time",
  programEncounter.encounter_date_time "Enc.encounter_date_time",
  programEncounter.program_enrolment_id "Enc.program_enrolment_id",
  programEncounter.uuid "Enc.uuid",
  programEncounter.name "Enc.name",
  programEncounter.max_visit_date_time "Enc.max_visit_date_time",
  programEncounter.is_voided "Enc.is_voided",
  individual.observations->>'d685d229-e06e-42f3-90c7-ca06d2fefe17'::TEXT as "Ind.Date of marriage",individual.observations->>'60c44aa2-3635-487d-8962-43000e77d382'::TEXT as "Ind.Caste (Free Text)",individual.observations->>'38eaf459-4316-4da3-acfd-3c9c71334041'::TEXT as "Ind.Standard upto which schooling completed",single_select_coded(individual.observations->>'1eb73895-ddba-4ddb-992c-03225f93775c')::TEXT as "Ind.Whether any disability",individual.observations->>'43c4860f-fccf-48c9-818a-191bc0f8d0cf'::TEXT as "Ind.Aadhaar ID",single_select_coded(individual.observations->>'c922c13c-1fa2-42dd-a7e8-d234b0324870')::TEXT as "Ind.Religion",single_select_coded(individual.observations->>'6617408e-b89e-4f2f-ab10-d818c5d7f1bd')::TEXT as "Ind.Status of the individual",individual.observations->>'f27e9504-81a3-48d9-b7cc-4bc90dbd4a30'::TEXT as "Ind.Disability",single_select_coded(individual.observations->>'1b6ae290-1823-4aab-91a5-b1d8a1b3b837')::TEXT as "Ind.Relation to head of the family",individual.observations->>'82fa0dbb-92f9-4ec2-9263-49054e64d909'::TEXT as "Ind.Contact Number",single_select_coded(individual.observations->>'61ab6413-5c6a-4512-ab6e-7d5cd1439569')::TEXT as "Ind.Caste Category",single_select_coded(individual.observations->>'92475d77-7cdd-4976-98f0-3847939a95d1')::TEXT as "Ind.Whether sterilized",single_select_coded(individual.observations->>'cd83afec-d147-42b2-bd50-0ca460dbd55f')::TEXT as "Ind.Occupation",single_select_coded(individual.observations->>'476a0b71-485b-4a0a-ba6f-4f3cf13568ca')::TEXT as "Ind.Ration Card",single_select_coded(individual.observations->>'aa6687c9-ba4d-49a3-9b3e-bba266eb6f32')::TEXT as "Ind.Marital status",individual.observations->>'24dabc3a-6562-4521-bd42-5fff11ea5c46'::TEXT as "Ind.Household number",individual.observations->>'25b73ca1-e268-452f-ba05-2595af28ac04'::TEXT as "Ind.Number of household members (eating together)",
  programEnrolment.observations->>'c6454406-04da-4670-9318-3b71a2d9b0cf'::TEXT as "Enl.Number of female child deaths",programEnrolment.observations->>'99c9d0a3-6ffc-41a7-8641-d79e2e83a4c6'::TEXT as "Enl.Number of miscarriages",programEnrolment.observations->>'38b9986b-76e8-4015-ae51-48152b1cd42c'::TEXT as "Enl.Number of abortions",programEnrolment.observations->>'d924596e-e08e-4829-b4c3-77a0411d18c7'::TEXT as "Enl.Number of female children",programEnrolment.observations->>'9a9000ad-31b7-4144-884a-16c1194df1be'::TEXT as "Enl.Date of last delivery outcome",programEnrolment.observations->>'eb07e1bd-0379-4ffd-9bc6-df4b34f7745e'::TEXT as "Enl.Number of male child deaths",programEnrolment.observations->>'dc2c23e9-19ad-471f-81d1-213069ccc975'::TEXT as "Enl.Gravida",programEnrolment.observations->>'d7ae1329-9e09-47f1-ad7d-3c73474d973f'::TEXT as "Enl.Number of child deaths",programEnrolment.observations->>'305f693c-c8b6-4e3e-9a82-a6e91a3e462f'::TEXT as "Enl.Age of youngest child",programEnrolment.observations->>'b3e9c088-90ed-45d9-8c99-102d1bda66e1'::TEXT as "Enl.Number of living children",programEnrolment.observations->>'2d679fd5-a75b-46bd-96c2-10c180187342'::TEXT as "Enl.Parity",programEnrolment.observations->>'92b08af5-84f7-4f8a-b8ac-90609fa58db7'::TEXT as "Enl.Age of oldest child",single_select_coded(programEnrolment.observations->>'5eabdcce-553b-488f-926c-49849f0c2e98')::TEXT as "Enl.Last delivery outcome",single_select_coded(programEnrolment.observations->>'92475d77-7cdd-4976-98f0-3847939a95d1')::TEXT as "Enl.Whether sterilized",programEnrolment.observations->>'1b749b48-bfae-470d-8219-a735dae99f7a'::TEXT as "Enl.Number of male children",programEnrolment.observations->>'6679b01b-3f50-4cd9-be85-3cae1a04dabd'::TEXT as "Enl.Month and year of sterilization",programEnrolment.observations->>'0b3eb875-b0f6-4420-be01-82bbd2812b21'::TEXT as "Enl.Number of induced abortions",programEnrolment.observations->>'74de4054-0e8b-4088-aae8-bd5f2933d300'::TEXT as "Enl.Number of stillbirths",
  single_select_coded(programEncounter.observations->>'3674585b-0ba3-4aeb-8e5a-901ab09ebf37')::TEXT as "Enc.Whether treatment for RTI symptom(s) taken",single_select_coded(programEncounter.observations->>'9947d31c-e70a-4cee-8a7e-63293ce3af9b')::TEXT as "Enc.Whether RTI cured",multi_select_coded(programEncounter.observations->'b9d037fb-50c1-497e-bf5c-4d8419909a31')::TEXT as "Enc.Symptoms of RTI",programEncounter.observations->>'403f346a-1ac0-4286-9097-6fc4cb42b093'::TEXT as "Enc.Follow up date",
  programEncounter.cancel_date_time "EncCancel.cancel_date_time",
  single_select_coded(programEncounter.cancel_observations->>'739f9a56-c02c-4f81-927b-69842d78c1e8')::TEXT as "EncCancel.Visit cancel reason",programEncounter.cancel_observations->>'6539ec90-14b9-4e5f-9305-4ca05f89db50'::TEXT as "EncCancel.Follow up visit date for RTI",programEncounter.cancel_observations->>'de3e8247-18e7-44aa-934e-6bd262251bd8'::TEXT as "EncCancel.Follow up visit date for FP",programEncounter.cancel_observations->>'f6594bb7-db18-49cf-9987-eacbceb8f479'::TEXT as "EncCancel.Next ASHA ANC visit date",programEncounter.cancel_observations->>'b09e425a-8f06-4cb4-9b71-5e26613ea22c'::TEXT as "EncCancel.Next needs assessment date",programEncounter.cancel_observations->>'f23251e2-68c6-447b-84c2-285d61e95f0f'::TEXT as "EncCancel.Other reason for cancelling",programEncounter.cancel_observations->>'4c234fbb-7592-4f9a-87aa-3d49a08a74da'::TEXT as "EncCancel.Next VHND date"
FROM program_encounter programEncounter
  LEFT OUTER JOIN operational_encounter_type oet on programEncounter.encounter_type_id = oet.encounter_type_id
  LEFT OUTER JOIN program_enrolment programEnrolment ON programEncounter.program_enrolment_id = programEnrolment.id
  LEFT OUTER JOIN operational_program op ON op.program_id = programEnrolment.program_id
  LEFT OUTER JOIN individual individual ON programEnrolment.individual_id = individual.id
  LEFT OUTER JOIN gender g ON g.id = individual.gender_id
  LEFT OUTER JOIN address_level a ON individual.address_id = a.id
  LEFT OUTER JOIN catchment_address_mapping m2 ON a.id = m2.addresslevel_id
  LEFT OUTER JOIN catchment c2 ON m2.catchment_id = c2.id
WHERE c2.name not ilike '%master%'
  AND op.uuid = 'aaf5a933-6e33-4af3-8a27-c4c3c64dfc4c'
  AND oet.uuid = '5612fc4c-8232-43d5-b6f6-8568a104fd79'
  AND programEncounter.encounter_date_time IS NOT NULL
  AND programEnrolment.enrolment_date_time IS NOT NULL
);


-- ----------------------------------------------------
set role none;

SELECT grant_all_on_all(a.rolname)
FROM pg_roles a
WHERE pg_has_role('openchs', a.oid, 'member')
  and a.rolsuper is false
  and a.rolname not like 'pg%'
  and a.rolname not like 'rds%'
order by a.rolname;
