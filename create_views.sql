set role ihmp;
-- ----------------------------------------------------

drop view if exists ihmp_rti_services_view;
create or replace view ihmp_rti_services_view as
  (SELECT individual.uuid                                                                        "Ind.uuid",
          individual.first_name                                                                  "Ind.first_name",
          individual.last_name                                                                   "Ind.last_name",
          g.name                                                                                 "Ind.Gender",
          individual.date_of_birth                                                               "Ind.date_of_birth",
          individual.date_of_birth_verified                                                      "Ind.date_of_birth_verified",
          individual.registration_date                                                           "Ind.registration_date",
          individual.facility_id                                                                 "Ind.facility_id",
          a.title                                                                                "Ind.Area",
          c2.name                                                                                "Ind.Catchment",
          individual.is_voided                                                                   "Ind.is_voided",
          op.name                                                                                "Enl.Program Name",
          programEnrolment.uuid                                                                  "Enl.uuid",
          programEnrolment.is_voided                                                             "Enl.is_voided",
          oet.name                                                                               "Enc.Type",
          programEncounter.earliest_visit_date_time                                              "Enc.earliest_visit_date_time",
          programEncounter.encounter_date_time                                                   "Enc.encounter_date_time",
          programEncounter.program_enrolment_id                                                  "Enc.program_enrolment_id",
          programEncounter.uuid                                                                  "Enc.uuid",
          programEncounter.name                                                                  "Enc.name",
          programEncounter.max_visit_date_time                                                   "Enc.max_visit_date_time",
          programEncounter.is_voided                                                             "Enc.is_voided",
          programEnrolment.program_exit_date_time                                                "Enc.program_exit_date_time",
          individual.observations ->>
          'd685d229-e06e-42f3-90c7-ca06d2fefe17'::TEXT                                        as "Ind.Date of marriage",
          individual.observations ->>
          '60c44aa2-3635-487d-8962-43000e77d382'::TEXT                                        as "Ind.Caste (Free Text)",
          individual.observations ->>
          '38eaf459-4316-4da3-acfd-3c9c71334041'::TEXT                                        as "Ind.Standard upto which schooling completed",
          single_select_coded(
              individual.observations ->> '1eb73895-ddba-4ddb-992c-03225f93775c')::TEXT       as "Ind.Whether any disability",
          individual.observations ->>
          '43c4860f-fccf-48c9-818a-191bc0f8d0cf'::TEXT                                        as "Ind.Aadhaar ID",
          single_select_coded(
              individual.observations ->> 'c922c13c-1fa2-42dd-a7e8-d234b0324870')::TEXT       as "Ind.Religion",
          single_select_coded(
              individual.observations ->> '6617408e-b89e-4f2f-ab10-d818c5d7f1bd')::TEXT       as "Ind.Status of the individual",
          individual.observations ->>
          'f27e9504-81a3-48d9-b7cc-4bc90dbd4a30'::TEXT                                        as "Ind.Disability",
          single_select_coded(
              individual.observations ->> '1b6ae290-1823-4aab-91a5-b1d8a1b3b837')::TEXT       as "Ind.Relation to head of the family",
          individual.observations ->>
          '82fa0dbb-92f9-4ec2-9263-49054e64d909'::TEXT                                        as "Ind.Contact Number",
          single_select_coded(
              individual.observations ->> '61ab6413-5c6a-4512-ab6e-7d5cd1439569')::TEXT       as "Ind.Caste Category",
          single_select_coded(
              individual.observations ->> '92475d77-7cdd-4976-98f0-3847939a95d1')::TEXT       as "Ind.Whether sterilized",
          single_select_coded(
              individual.observations ->> 'cd83afec-d147-42b2-bd50-0ca460dbd55f')::TEXT       as "Ind.Occupation",
          single_select_coded(
              individual.observations ->> '476a0b71-485b-4a0a-ba6f-4f3cf13568ca')::TEXT       as "Ind.Ration Card",
          single_select_coded(
              individual.observations ->> 'aa6687c9-ba4d-49a3-9b3e-bba266eb6f32')::TEXT       as "Ind.Marital status",
          individual.observations ->>
          '24dabc3a-6562-4521-bd42-5fff11ea5c46'::TEXT                                        as "Ind.Household number",
          individual.observations ->>
          '25b73ca1-e268-452f-ba05-2595af28ac04'::TEXT                                        as "Ind.Number of household members (eating together)",
          programEnrolment.observations ->>
          'c6454406-04da-4670-9318-3b71a2d9b0cf'::TEXT                                        as "Enl.Number of female child deaths",
          programEnrolment.observations ->>
          '99c9d0a3-6ffc-41a7-8641-d79e2e83a4c6'::TEXT                                        as "Enl.Number of miscarriages",
          programEnrolment.observations ->>
          '38b9986b-76e8-4015-ae51-48152b1cd42c'::TEXT                                        as "Enl.Number of abortions",
          programEnrolment.observations ->>
          'd924596e-e08e-4829-b4c3-77a0411d18c7'::TEXT                                        as "Enl.Number of female children",
          programEnrolment.observations ->>
          '9a9000ad-31b7-4144-884a-16c1194df1be'::TEXT                                        as "Enl.Date of last delivery outcome",
          programEnrolment.observations ->>
          'eb07e1bd-0379-4ffd-9bc6-df4b34f7745e'::TEXT                                        as "Enl.Number of male child deaths",
          programEnrolment.observations ->>
          'dc2c23e9-19ad-471f-81d1-213069ccc975'::TEXT                                        as "Enl.Gravida",
          programEnrolment.observations ->>
          'd7ae1329-9e09-47f1-ad7d-3c73474d973f'::TEXT                                        as "Enl.Number of child deaths",
          programEnrolment.observations ->>
          '305f693c-c8b6-4e3e-9a82-a6e91a3e462f'::TEXT                                        as "Enl.Age of youngest child",
          programEnrolment.observations ->>
          'b3e9c088-90ed-45d9-8c99-102d1bda66e1'::TEXT                                        as "Enl.Number of living children",
          programEnrolment.observations ->>
          '2d679fd5-a75b-46bd-96c2-10c180187342'::TEXT                                        as "Enl.Parity",
          programEnrolment.observations ->>
          '92b08af5-84f7-4f8a-b8ac-90609fa58db7'::TEXT                                        as "Enl.Age of oldest child",
          single_select_coded(
              programEnrolment.observations ->> '5eabdcce-553b-488f-926c-49849f0c2e98')::TEXT as "Enl.Last delivery outcome",
          single_select_coded(
              programEnrolment.observations ->> '92475d77-7cdd-4976-98f0-3847939a95d1')::TEXT as "Enl.Whether sterilized",
          programEnrolment.observations ->>
          '1b749b48-bfae-470d-8219-a735dae99f7a'::TEXT                                        as "Enl.Number of male children",
          programEnrolment.observations ->>
          '6679b01b-3f50-4cd9-be85-3cae1a04dabd'::TEXT                                        as "Enl.Month and year of sterilization",
          programEnrolment.observations ->>
          '0b3eb875-b0f6-4420-be01-82bbd2812b21'::TEXT                                        as "Enl.Number of induced abortions",
          programEnrolment.observations ->>
          '74de4054-0e8b-4088-aae8-bd5f2933d300'::TEXT                                        as "Enl.Number of stillbirths",
          single_select_coded(
              programEncounter.observations ->> '3674585b-0ba3-4aeb-8e5a-901ab09ebf37')::TEXT as "Enc.Whether treatment for RTI symptom(s) taken",
          single_select_coded(
              programEncounter.observations ->> '9947d31c-e70a-4cee-8a7e-63293ce3af9b')::TEXT as "Enc.Whether RTI cured",
          multi_select_coded(
              programEncounter.observations -> 'b9d037fb-50c1-497e-bf5c-4d8419909a31')::TEXT  as "Enc.Symptoms of RTI",
          programEncounter.observations ->>
          '403f346a-1ac0-4286-9097-6fc4cb42b093'::TEXT                                        as "Enc.Follow up date",
          programEncounter.cancel_date_time                                                      "EncCancel.cancel_date_time",
          single_select_coded(programEncounter.cancel_observations ->>
                              '739f9a56-c02c-4f81-927b-69842d78c1e8')::TEXT                   as "EncCancel.Visit cancel reason",
          programEncounter.cancel_observations ->>
          '6539ec90-14b9-4e5f-9305-4ca05f89db50'::TEXT                                        as "EncCancel.Follow up visit date for RTI",
          programEncounter.cancel_observations ->>
          'de3e8247-18e7-44aa-934e-6bd262251bd8'::TEXT                                        as "EncCancel.Follow up visit date for FP",
          programEncounter.cancel_observations ->>
          'f6594bb7-db18-49cf-9987-eacbceb8f479'::TEXT                                        as "EncCancel.Next ASHA ANC visit date",
          programEncounter.cancel_observations ->>
          'b09e425a-8f06-4cb4-9b71-5e26613ea22c'::TEXT                                        as "EncCancel.Next needs assessment date",
          programEncounter.cancel_observations ->>
          'f23251e2-68c6-447b-84c2-285d61e95f0f'::TEXT                                        as "EncCancel.Other reason for cancelling",
          programEncounter.cancel_observations ->>
          '4c234fbb-7592-4f9a-87aa-3d49a08a74da'::TEXT                                        as "EncCancel.Next VHND date"
   FROM program_encounter programEncounter
          LEFT OUTER JOIN operational_encounter_type oet
                          on programEncounter.encounter_type_id = oet.encounter_type_id
          LEFT OUTER JOIN program_enrolment programEnrolment
                          ON programEncounter.program_enrolment_id = programEnrolment.id
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


drop view if exists ihmp_registration_view;
create or replace view ihmp_registration_view as
  (SELECT individual.uuid                                                                  "Ind.uuid",
          individual.id                                                                     "Ind.Id",
          individual.first_name                                                            "Ind.first_name",
          individual.last_name                                                             "Ind.last_name",
          individual.organisation_id                                                       "Ind.organisation_id",
          g.name                                                                           "Ind.Gender",
          individual.audit_id                                                              "Ind.audit_id",
          individual.address_id                                                            "Ind.address_id",
          individual.date_of_birth                                                         "Ind.date_of_birth",
          audit.created_by_id                                                              "User.id",
          (extract(years from age(individual.date_of_birth)) * 365 +
           extract(months from age(individual.date_of_birth)) * 30 +
           extract(days from age(individual.date_of_birth))) /
          365                                                                              "Ind.age",
          individual.date_of_birth_verified                                                "Ind.date_of_birth_verified",
          individual.registration_date                                                     "Ind.registration_date",
          individual.facility_id                                                           "Ind.facility_id",
          individual.is_voided                                                             "Ind.is_voided",
          individual.observations ->>
          'd685d229-e06e-42f3-90c7-ca06d2fefe17'::TEXT                                  as "Ind.Date of marriage",
          individual.observations ->>
          '60c44aa2-3635-487d-8962-43000e77d382'::TEXT                                  as "Ind.Caste (Free Text)",
          individual.observations ->>
          '38eaf459-4316-4da3-acfd-3c9c71334041'::TEXT                                  as "Ind.Standard upto which schooling completed",
          single_select_coded(
              individual.observations ->> '1eb73895-ddba-4ddb-992c-03225f93775c')::TEXT as "Ind.Whether any disability",
          individual.observations ->>
          '43c4860f-fccf-48c9-818a-191bc0f8d0cf'::TEXT                                  as "Ind.Aadhaar ID",
          single_select_coded(
              individual.observations ->> 'c922c13c-1fa2-42dd-a7e8-d234b0324870')::TEXT as "Ind.Religion",
          single_select_coded(
              individual.observations ->> '6617408e-b89e-4f2f-ab10-d818c5d7f1bd')::TEXT as "Ind.Status of the individual",
          single_select_coded(
                individual.observations ->> '6617408e-b89e-4f2f-ab10-d818c5d7f1bd')::TEXT as individual_status,
          individual.observations ->>
          'f27e9504-81a3-48d9-b7cc-4bc90dbd4a30'::TEXT                                  as "Ind.Disability",
          single_select_coded(
              individual.observations ->> '1b6ae290-1823-4aab-91a5-b1d8a1b3b837')::TEXT as "Ind.Relation to head of the family",
          individual.observations ->>
          '82fa0dbb-92f9-4ec2-9263-49054e64d909'::TEXT                                  as "Ind.Contact Number",
          single_select_coded(
              individual.observations ->> '61ab6413-5c6a-4512-ab6e-7d5cd1439569')::TEXT as "Ind.Caste Category",
          single_select_coded(
              individual.observations ->> '92475d77-7cdd-4976-98f0-3847939a95d1')::TEXT as "Ind.Whether sterilized",
          single_select_coded(
              individual.observations ->> 'cd83afec-d147-42b2-bd50-0ca460dbd55f')::TEXT as "Ind.Occupation",
          single_select_coded(
              individual.observations ->> '476a0b71-485b-4a0a-ba6f-4f3cf13568ca')::TEXT as "Ind.Ration Card",
          single_select_coded(
              individual.observations ->> 'aa6687c9-ba4d-49a3-9b3e-bba266eb6f32')::TEXT as "Ind.Marital status",
          individual.observations ->>
          '24dabc3a-6562-4521-bd42-5fff11ea5c46'::TEXT                                  as "Ind.Household number",
          individual.observations ->>
          '25b73ca1-e268-452f-ba05-2595af28ac04'::TEXT                                  as "Ind.Number of household members (eating together)"
   FROM individual individual
          join audit audit on individual.audit_id = audit.id
          LEFT OUTER JOIN gender g ON g.id = individual.gender_id
  );


drop view if exists ihmp_needs_assessment_view;
create or replace view ihmp_needs_assessment_view as
  (SELECT individual.uuid                                                                        "Ind.uuid",
          individual.id                                                                          "Ind.id",
          individual.first_name                                                                  "Ind.first_name",
          individual.last_name                                                                   "Ind.last_name",
          individual.address_id                                                                  "Ind.address_id",
          g.name                                                                                 "Ind.Gender",
          individual.audit_id                                                                    "Ind.audit_id",
          individual.date_of_birth                                                               "Ind.date_of_birth",
          individual.date_of_birth_verified                                                      "Ind.date_of_birth_verified",
          individual.registration_date                                                           "Ind.registration_date",
          individual.facility_id                                                                 "Ind.facility_id",
          a.title                                                                                "Ind.Area",
          c2.name                                                                                "Ind.Catchment",
          individual.is_voided                                                                   "Ind.is_voided",
          op.name                                                                                "Enl.Program Name",
          programEnrolment.uuid                                                                  "Enl.uuid",
          programEnrolment.is_voided                                                             "Enl.is_voided",
          oet.name                                                                               "Enc.Type",
          programEncounter.earliest_visit_date_time                                              "Enc.earliest_visit_date_time",
          programEncounter.encounter_date_time                                                   "Enc.encounter_date_time",
          programEncounter.program_enrolment_id                                                  "Enc.program_enrolment_id",
          programEncounter.uuid                                                                  "Enc.uuid",
          programEncounter.name                                                                  "Enc.name",
          programEncounter.max_visit_date_time                                                   "Enc.max_visit_date_time",
          programEncounter.is_voided                                                             "Enc.is_voided",
          programEnrolment.program_exit_date_time                                                "Enc.program_exit_date_time",
          individual.observations ->>
          'd685d229-e06e-42f3-90c7-ca06d2fefe17'::TEXT                                        as "Ind.Date of marriage",
          individual.observations ->>
          '60c44aa2-3635-487d-8962-43000e77d382'::TEXT                                        as "Ind.Caste (Free Text)",
          individual.observations ->>
          '38eaf459-4316-4da3-acfd-3c9c71334041'::TEXT                                        as "Ind.Standard upto which schooling completed",
          single_select_coded(
              individual.observations ->> '1eb73895-ddba-4ddb-992c-03225f93775c')::TEXT       as "Ind.Whether any disability",
          individual.observations ->>
          '43c4860f-fccf-48c9-818a-191bc0f8d0cf'::TEXT                                        as "Ind.Aadhaar ID",
          single_select_coded(
              individual.observations ->> 'c922c13c-1fa2-42dd-a7e8-d234b0324870')::TEXT       as "Ind.Religion",
          single_select_coded(
              individual.observations ->> '6617408e-b89e-4f2f-ab10-d818c5d7f1bd')::TEXT       as "Ind.Status of the individual",
          individual.observations ->>
          'f27e9504-81a3-48d9-b7cc-4bc90dbd4a30'::TEXT                                        as "Ind.Disability",
          single_select_coded(
              individual.observations ->> '1b6ae290-1823-4aab-91a5-b1d8a1b3b837')::TEXT       as "Ind.Relation to head of the family",
          individual.observations ->>
          '82fa0dbb-92f9-4ec2-9263-49054e64d909'::TEXT                                        as "Ind.Contact Number",
          single_select_coded(
              individual.observations ->> '61ab6413-5c6a-4512-ab6e-7d5cd1439569')::TEXT       as "Ind.Caste Category",
          single_select_coded(
              individual.observations ->> '92475d77-7cdd-4976-98f0-3847939a95d1')::TEXT       as "Ind.Whether sterilized",
          single_select_coded(
              individual.observations ->> 'cd83afec-d147-42b2-bd50-0ca460dbd55f')::TEXT       as "Ind.Occupation",
          single_select_coded(
              individual.observations ->> '476a0b71-485b-4a0a-ba6f-4f3cf13568ca')::TEXT       as "Ind.Ration Card",
          single_select_coded(
              individual.observations ->> 'aa6687c9-ba4d-49a3-9b3e-bba266eb6f32')::TEXT       as "Ind.Marital status",
          individual.observations ->>
          '24dabc3a-6562-4521-bd42-5fff11ea5c46'::TEXT                                        as "Ind.Household number",
          individual.observations ->>
          '25b73ca1-e268-452f-ba05-2595af28ac04'::TEXT                                        as "Ind.Number of household members (eating together)",
          programEnrolment.observations ->>
          'c6454406-04da-4670-9318-3b71a2d9b0cf'::TEXT                                        as "Enl.Number of female child deaths",
          programEnrolment.observations ->>
          '99c9d0a3-6ffc-41a7-8641-d79e2e83a4c6'::TEXT                                        as "Enl.Number of miscarriages",
          programEnrolment.observations ->>
          '38b9986b-76e8-4015-ae51-48152b1cd42c'::TEXT                                        as "Enl.Number of abortions",
          programEnrolment.observations ->>
          'd924596e-e08e-4829-b4c3-77a0411d18c7'::TEXT                                        as "Enl.Number of female children",
          programEnrolment.observations ->>
          '9a9000ad-31b7-4144-884a-16c1194df1be'::TEXT                                        as "Enl.Date of last delivery outcome",
          programEnrolment.observations ->>
          'eb07e1bd-0379-4ffd-9bc6-df4b34f7745e'::TEXT                                        as "Enl.Number of male child deaths",
          programEnrolment.observations ->>
          'dc2c23e9-19ad-471f-81d1-213069ccc975'::TEXT                                        as "Enl.Gravida",
          programEnrolment.observations ->>
          'd7ae1329-9e09-47f1-ad7d-3c73474d973f'::TEXT                                        as "Enl.Number of child deaths",
          programEnrolment.observations ->>
          '305f693c-c8b6-4e3e-9a82-a6e91a3e462f'::TEXT                                        as "Enl.Age of youngest child",
          programEnrolment.observations ->>
          'b3e9c088-90ed-45d9-8c99-102d1bda66e1'::TEXT                                        as "Enl.Number of living children",
          programEnrolment.observations ->>
          '2d679fd5-a75b-46bd-96c2-10c180187342'::TEXT                                        as "Enl.Parity",
          programEnrolment.observations ->>
          '92b08af5-84f7-4f8a-b8ac-90609fa58db7'::TEXT                                        as "Enl.Age of oldest child",
          single_select_coded(
              programEnrolment.observations ->> '5eabdcce-553b-488f-926c-49849f0c2e98')::TEXT as "Enl.Last delivery outcome",
          single_select_coded(
              programEnrolment.observations ->> '92475d77-7cdd-4976-98f0-3847939a95d1')::TEXT as "Enl.Whether sterilized",
          programEnrolment.observations ->>
          '1b749b48-bfae-470d-8219-a735dae99f7a'::TEXT                                        as "Enl.Number of male children",
          programEnrolment.observations ->>
          '6679b01b-3f50-4cd9-be85-3cae1a04dabd'::TEXT                                        as "Enl.Month and year of sterilization",
          programEnrolment.observations ->>
          '0b3eb875-b0f6-4420-be01-82bbd2812b21'::TEXT                                        as "Enl.Number of induced abortions",
          programEnrolment.observations ->>
          '74de4054-0e8b-4088-aae8-bd5f2933d300'::TEXT                                        as "Enl.Number of stillbirths",
          programEncounter.observations ->>
          'de3e8247-18e7-44aa-934e-6bd262251bd8'::TEXT                                        as "Enc.Follow up visit date for FP",
          programEncounter.observations ->>
          '6539ec90-14b9-4e5f-9305-4ca05f89db50'::TEXT                                        as "Enc.Follow up visit date for RTI",
          programEncounter.observations ->>
          'b09e425a-8f06-4cb4-9b71-5e26613ea22c'::TEXT                                        as "Enc.Next needs assessment date",
          multi_select_coded(
              programEncounter.observations -> '2e6b1614-7d6c-4caa-bfbe-e0455c8b2309')::TEXT  as "Enc.EC program follow up visit by ASHA post monthly assessment",
          single_select_coded(
              programEncounter.observations ->> '8e8ad333-4639-45c8-be0a-7bac13d87b98')::TEXT as "Enc.Whether lactating mother or irregular periods",
          single_select_coded(
              programEncounter.observations ->> '056030f2-944a-4758-ac7c-e62e39935fc5')::TEXT as "Enc.Whether missed monthly periods",
          single_select_coded(
              programEncounter.observations ->> '6174bf54-6ed6-449e-8263-eb6a46dceb4a')::TEXT as "Enc.Whether got monthly periods",
          single_select_coded(
              programEncounter.observations ->> '05902834-70dc-4f05-8700-41ac7c7e28c4')::TEXT as "Enc.Whether undergone pregnancy test if missed monthly periods",
          single_select_coded(
              programEncounter.observations ->> 'ae076480-008d-47ca-9fab-a5300a626e42')::TEXT as "Enc.Urine pregnancy test",
          single_select_coded(
              programEncounter.observations ->> '6ac76c57-66e4-40e7-b9bb-983f276f986a')::TEXT as "Enc.Whether currently pregnant",
          single_select_coded(
              programEncounter.observations ->> '66239280-5bb9-437c-86ff-ce9c59f2ea9f')::TEXT as "Enc.Whether desire to use any FP methods in future",
          single_select_coded(
              programEncounter.observations ->> '0d748e89-f0ce-4891-9f41-a5c3f3c4ba2c')::TEXT as "Enc.Whether using any family planning method currently",
          multi_select_coded(
              programEncounter.observations -> '518cdd47-a634-4554-ae2d-fcc8e1d8ad14')::TEXT  as "Enc.Family planning method used currently",
          multi_select_coded(
              programEncounter.observations -> '2ccecc3f-7b63-4679-86de-5d7f1c150917')::TEXT  as "Enc.FP method preference for future use",
          (((programEncounter.observations ->> '4f8fe008-5a57-4906-8f18-55c0c83bc312')::JSONB #>>
            '{durations,0,_durationValue}') || ' ' ||
           ((programEncounter.observations ->> '4f8fe008-5a57-4906-8f18-55c0c83bc312')::JSONB #>>
            '{durations,0,durationUnit}'))::TEXT                                              as "Enc.Since last how many month is she using the FP method?",
          multi_select_coded(programEncounter.observations ->
                             'b9d037fb-50c1-497e-bf5c-4d8419909a31')::TEXT                    as
                                                                                                 "Enc.Symptoms of RTI",
          (((programEncounter.observations ->> '3f680272-dcfa-4db2-bc02-d4605b5454a2')::JSONB #>>
            '{durations,0,_durationValue}') || ' ' ||
           ((programEncounter.observations ->> '3f680272-dcfa-4db2-bc02-d4605b5454a2')::JSONB #>>
            '{durations,0,durationUnit}'))::TEXT                                              as "Enc.Duration of RTI symptom(s) in days",
          single_select_coded(programEncounter.observations ->>
                              '9947d31c-e70a-4cee-8a7e-63293ce3af9b')::TEXT                   as
                                                                                                 "Enc.Whether RTI cured",
          single_select_coded(programEncounter.observations ->>
                              '3674585b-0ba3-4aeb-8e5a-901ab09ebf37')::TEXT                   as
                                                                                                 "Enc.Whether treatment for RTI symptom(s) taken",
          programEncounter.cancel_date_time
                                                                                                 "EncCancel.cancel_date_time",
          single_select_coded(programEncounter.cancel_observations ->>
                              '739f9a56-c02c-4f81-927b-69842d78c1e8')::TEXT                   as
                                                                                                 "EncCancel.Visit cancel reason",
          programEncounter.cancel_observations ->>
          '6539ec90-14b9-4e5f-9305-4ca05f89db50'::TEXT                                        as
                                                                                                 "EncCancel.Follow up visit date for RTI",
          programEncounter.cancel_observations ->>
          'de3e8247-18e7-44aa-934e-6bd262251bd8'::TEXT                                        as
                                                                                                 "EncCancel.Follow up visit date for FP",
          programEncounter.cancel_observations ->>
          'f6594bb7-db18-49cf-9987-eacbceb8f479'::TEXT                                        as
                                                                                                 "EncCancel.Next ASHA ANC visit date",
          programEncounter.cancel_observations ->>
          'b09e425a-8f06-4cb4-9b71-5e26613ea22c'::TEXT                                        as
                                                                                                 "EncCancel.Next needs assessment date",
          programEncounter.cancel_observations ->>
          'f23251e2-68c6-447b-84c2-285d61e95f0f'::TEXT                                        as
                                                                                                 "EncCancel.Other reason for cancelling",
          programEncounter.cancel_observations ->>
          '4c234fbb-7592-4f9a-87aa-3d49a08a74da'::TEXT                                        as
                                                                                                 "EncCancel.Next VHND date"
   FROM program_encounter programEncounter
          LEFT OUTER JOIN operational_encounter_type oet on programEncounter.encounter_type_id = oet.encounter_type_id
          LEFT OUTER JOIN program_enrolment programEnrolment
                          ON programEncounter.program_enrolment_id = programEnrolment.id
          LEFT OUTER JOIN operational_program op ON op.program_id = programEnrolment.program_id
          LEFT OUTER JOIN individual individual ON programEnrolment.individual_id = individual.id
          LEFT OUTER JOIN gender g ON g.id = individual.gender_id
          LEFT OUTER JOIN address_level a ON individual.address_id = a.id
          LEFT OUTER JOIN catchment_address_mapping m2 ON a.id = m2.addresslevel_id
          LEFT OUTER JOIN catchment c2 ON m2.catchment_id = c2.id
   WHERE c2.name not ilike '%master%'
     AND op.uuid = 'aaf5a933-6e33-4af3-8a27-c4c3c64dfc4c'
     AND oet.uuid = 'bde6d205-4ed6-4a7a-8780-217216ce8a3b'
     AND programEncounter.encounter_date_time IS NOT NULL
     AND programEnrolment.enrolment_date_time IS NOT NULL
  );

drop view if exists ihmp_user_view;
create or replace view ihmp_user_view as (
  SELECT u.username as name,
         a.id
  FROM individual i
         join audit a on i.audit_id = a.id
         join users u on a.created_by_id = u.id
);

drop view if exists ihmp_location_view;
create or replace view ihmp_location_view as (
  with rural_mapping as (select villages.title  village,
                                subcenter.title subcenter,
                                phc.title       phc,
                                phc.level,
                                villages.id     village_id,
                                phc.id          phc_id
                         from address_level villages
                                join location_location_mapping m2 on villages.id = m2.location_id
                                join address_level subcenter on subcenter.id = m2.parent_location_id
                                join location_location_mapping m3 on subcenter.id = m3.location_id
                                join address_level phc on phc.id = m3.parent_location_id
                         where subcenter.level = 2.3
                           and villages.level = 1
                           and phc.level = 2.6),

    urban_mapping as (select slum.title slum,
                             slum.id    slum_id,
                             phc.level,
                             phc.title  phc,
                             phc.id     phc_id
                      from address_level slum
                             join location_location_mapping m2 on slum.id = m2.location_id
                             join address_level phc on phc.id = m2.parent_location_id
                      where slum.level = 0.9
                        and phc.level = 2.6)
    select r.phc, r.subcenter, r.village, null as slum, r.village_id as lowest_id
    from rural_mapping r
    union all
    select u.phc, null, null, u.slum, u.slum_id
    from urban_mapping u
    order by 1, 2, 3, 4
);



drop view if exists ihmp_pnc_view;
create or replace view ihmp_pnc_view as (
  SELECT individual.uuid                                                                        "Ind.uuid",
         individual.id                                                                          "Ind.id",
         individual.first_name                                                                  "Ind.first_name",
         individual.last_name                                                                   "Ind.last_name",
         g.name                                                                                 "Ind.Gender",
         individual.address_id                                                                  "Ind.address_id",
         individual.audit_id                                                                    "Ind.audit_id",
         individual.date_of_birth                                                               "Ind.date_of_birth",
         individual.date_of_birth_verified                                                      "Ind.date_of_birth_verified",
         individual.registration_date                                                           "Ind.registration_date",
         individual.facility_id                                                                 "Ind.facility_id",
         a.title                                                                                "Ind.Area",
         c2.name                                                                                "Ind.Catchment",
         individual.is_voided                                                                   "Ind.is_voided",
         op.name                                                                                "Enl.Program Name",
         programEnrolment.uuid                                                                  "Enl.uuid",
         programEnrolment.is_voided                                                             "Enl.is_voided",
         oet.name                                                                               "Enc.Type",
         programEncounter.id                                                                    "Enc.Id",
         programEnrolment.id                                                                    "Enl.Id",
         programEncounter.earliest_visit_date_time                                              "Enc.earliest_visit_date_time",
         programEncounter.encounter_date_time                                                   "Enc.encounter_date_time",
         programEncounter.program_enrolment_id                                                  "Enc.program_enrolment_id",
         programEncounter.uuid                                                                  "Enc.uuid",
         programEncounter.name                                                                  "Enc.name",
         programEncounter.max_visit_date_time                                                   "Enc.max_visit_date_time",
         programEncounter.is_voided                                                             "Enc.is_voided",
         programEnrolment.program_exit_date_time                                                "Enc.program_exit_date_time",
         individual.observations ->>
         'd685d229-e06e-42f3-90c7-ca06d2fefe17'::TEXT                                        as "Ind.Date of marriage",
         individual.observations ->>
         '60c44aa2-3635-487d-8962-43000e77d382'::TEXT                                        as "Ind.Caste (Free Text)",
         individual.observations ->>
         '38eaf459-4316-4da3-acfd-3c9c71334041'::TEXT                                        as "Ind.Standard upto which schooling completed",
         single_select_coded(
             individual.observations ->> '1eb73895-ddba-4ddb-992c-03225f93775c')::TEXT       as "Ind.Whether any disability",
         individual.observations ->>
         '43c4860f-fccf-48c9-818a-191bc0f8d0cf'::TEXT                                        as "Ind.Aadhaar ID",
         single_select_coded(
             individual.observations ->> 'c922c13c-1fa2-42dd-a7e8-d234b0324870')::TEXT       as "Ind.Religion",
         single_select_coded(
             individual.observations ->> '6617408e-b89e-4f2f-ab10-d818c5d7f1bd')::TEXT       as "Ind.Status of the individual",
         individual.observations ->>
         'f27e9504-81a3-48d9-b7cc-4bc90dbd4a30'::TEXT                                        as "Ind.Disability",
         single_select_coded(
             individual.observations ->> '1b6ae290-1823-4aab-91a5-b1d8a1b3b837')::TEXT       as "Ind.Relation to head of the family",
         individual.observations ->>
         '82fa0dbb-92f9-4ec2-9263-49054e64d909'::TEXT                                        as "Ind.Contact Number",
         single_select_coded(
             individual.observations ->> '61ab6413-5c6a-4512-ab6e-7d5cd1439569')::TEXT       as "Ind.Caste Category",
         single_select_coded(
             individual.observations ->> '92475d77-7cdd-4976-98f0-3847939a95d1')::TEXT       as "Ind.Whether sterilized",
         single_select_coded(
             individual.observations ->> 'cd83afec-d147-42b2-bd50-0ca460dbd55f')::TEXT       as "Ind.Occupation",
         single_select_coded(
             individual.observations ->> '476a0b71-485b-4a0a-ba6f-4f3cf13568ca')::TEXT       as "Ind.Ration Card",
         single_select_coded(
             individual.observations ->> 'aa6687c9-ba4d-49a3-9b3e-bba266eb6f32')::TEXT       as "Ind.Marital status",
         individual.observations ->>
         '24dabc3a-6562-4521-bd42-5fff11ea5c46'::TEXT                                        as "Ind.Household number",
         individual.observations ->>
         '25b73ca1-e268-452f-ba05-2595af28ac04'::TEXT                                        as "Ind.Number of household members (eating together)",
         single_select_coded(
             programEnrolment.observations ->> 'b47dca1d-3f42-4280-9b3e-3d68cce88bed')::TEXT as "Enl.Is she on TB medication?",
         single_select_coded(
             programEnrolment.observations ->> '4a20f69f-12c4-4472-ac82-ece0ab102e4b')::TEXT as "Enl.Did she complete her TB treatment?",
         single_select_coded(
             programEnrolment.observations ->> '2a8a5306-c0a9-4ca6-8bd7-b394069aa6f2')::TEXT as "Enl.Has she been taking her TB medication regularly?",
         programEnrolment.observations ->>
         'd883d5fe-e17d-4136-b989-089fa0295e34'::TEXT                                        as "Enl.Height",
         programEnrolment.observations ->>
         '1cc6fd5d-1359-483e-a971-4bf36e34a72d'::TEXT                                        as "Enl.Last menstrual period",
         programEnrolment.observations ->>
         'dde911fa-15eb-4564-8deb-bba46e9d3744'::TEXT                                        as "Enl.Estimated Date of Delivery",
         programEnrolment.observations ->>
         'fef5be79-24c0-415d-9494-64b2faf17aeb'::TEXT                                        as "Enl.R15 number",
         programEnrolment.observations ->>
         '191f8a30-d543-4b98-9464-2f5838d1d9a6'::TEXT                                        as "Enl.MCTS Number",
         single_select_coded(
             programEnrolment.observations ->> 'ae076480-008d-47ca-9fab-a5300a626e42')::TEXT as "Enl.Urine pregnancy test",
         programEnrolment.observations ->>
         '7d34125a-1b0b-4755-acc8-aeda71af8bd3'::TEXT                                        as "Enl.Other obstetrics history",
         programEnrolment.observations ->>
         '99c9d0a3-6ffc-41a7-8641-d79e2e83a4c6'::TEXT                                        as "Enl.Number of miscarriages",
         programEnrolment.observations ->>
         '74de4054-0e8b-4088-aae8-bd5f2933d300'::TEXT                                        as "Enl.Number of stillbirths",
         programEnrolment.observations ->>
         'd7ae1329-9e09-47f1-ad7d-3c73474d973f'::TEXT                                        as "Enl.Number of child deaths",
         programEnrolment.observations ->>
         'b3e9c088-90ed-45d9-8c99-102d1bda66e1'::TEXT                                        as "Enl.Number of living children",
         programEnrolment.observations ->>
         '38b9986b-76e8-4015-ae51-48152b1cd42c'::TEXT                                        as "Enl.Number of abortions",
         programEnrolment.observations ->>
         'eb07e1bd-0379-4ffd-9bc6-df4b34f7745e'::TEXT                                        as "Enl.Number of male child deaths",
         programEnrolment.observations ->>
         '305f693c-c8b6-4e3e-9a82-a6e91a3e462f'::TEXT                                        as "Enl.Age of youngest child",
         programEnrolment.observations ->>
         'c6454406-04da-4670-9318-3b71a2d9b0cf'::TEXT                                        as "Enl.Number of female child deaths",
         programEnrolment.observations ->>
         'dc2c23e9-19ad-471f-81d1-213069ccc975'::TEXT                                        as "Enl.Gravida",
         programEnrolment.observations ->>
         '2d679fd5-a75b-46bd-96c2-10c180187342'::TEXT                                        as "Enl.Parity",
         programEnrolment.observations ->>
         'd924596e-e08e-4829-b4c3-77a0411d18c7'::TEXT                                        as "Enl.Number of female children",
         programEnrolment.observations ->>
         '1b749b48-bfae-470d-8219-a735dae99f7a'::TEXT                                        as "Enl.Number of male children",
         programEnrolment.observations ->>
         '0b3eb875-b0f6-4420-be01-82bbd2812b21'::TEXT                                        as "Enl.Number of induced abortions",
         single_select_coded(
             programEncounter.observations ->> 'ab9596e4-04b6-48f2-9f4d-1c7a2c82dbf8')::TEXT as "Enc.Convulsions",
         multi_select_coded(
             programEncounter.observations -> 'a4b8583b-80af-4a9f-b506-037a7abb1f43')::TEXT  as "Enc.Any vaginal problems",
         multi_select_coded(
             programEncounter.observations -> 'a70eb606-3155-49f1-b2b4-6bc858ea6d31')::TEXT  as "Enc.How is the incision area",
         multi_select_coded(
             programEncounter.observations -> '0776992a-78de-4bd1-bfcb-f63ff1f7630e')::TEXT  as "Enc.Post-Partum Depression Symptoms",
         single_select_coded(
             programEncounter.observations ->> '2441879f-4f53-4755-9474-3168c68095a5')::TEXT as "Enc.Fever/Chills",
         multi_select_coded(
             programEncounter.observations -> '92ec474e-c1e8-4178-8b87-84ef04a4d4f9')::TEXT  as "Enc.Problems with chest area",
         multi_select_coded(
             programEncounter.observations -> '0f01b6f6-b7e3-41ea-8d49-9df23196125b')::TEXT  as "Enc.Any difficulties with urinating",
         multi_select_coded(
             programEncounter.observations -> '88fe8286-316d-4ee8-be86-2d8c3840881c')::TEXT  as "Enc.Any breast problems",
         multi_select_coded(
             programEncounter.observations -> '2de99de4-558c-44b0-9882-abe7d892fe6c')::TEXT  as "Enc.Any abdominal problems",
         multi_select_coded(
             programEncounter.observations -> 'b3a53a37-1885-4852-b99b-d84454e4a3ba')::TEXT  as "Enc.Any problems with legs",
         programEncounter.observations ->>
         '8cbd5ba9-c6ee-4d27-94ed-280bd88ae990'::TEXT                                        as "Enc.Other breast problems",
         multi_select_coded(
             programEncounter.observations -> '5156aaed-abda-4ed8-9bef-0cadb226c0a7')::TEXT  as "Enc.Symptoms around head and face",
         programEncounter.observations ->>
         '0620abab-4449-4182-96f9-8daa5f855c80'::TEXT                                        as "Enc.Number of IFA tablets consumed",
         programEncounter.observations ->>
         '0ae7f621-9293-4638-8acf-9318d69cd709'::TEXT                                        as "Enc.Number of home visits conducted by ANM within 42 days after delivery",
         single_select_coded(
             programEncounter.observations ->> 'b2b9cd50-d0a5-4bd7-8f61-6738a7c24c04')::TEXT as "Enc.Place visited for postnatal care",
         single_select_coded(
             programEncounter.observations ->> 'ca067ae5-19f3-4a75-9299-9e2af7a4e808')::TEXT as "Enc.The complication has been addressed",
         multi_select_coded(
             programEncounter.observations -> 'cf7ecb02-05ca-4a40-9550-e0b90537abe2')::TEXT  as "Enc.Place of treatment for postnatal complication",
         single_select_coded(
             programEncounter.observations ->> '51288406-dadf-454a-9630-35a207be56df')::TEXT as "Enc.Taken treatment for postnatal complication",
         programEncounter.cancel_date_time                                                      "EncCancel.cancel_date_time",
         programEncounter.cancel_observations ->>
         '6539ec90-14b9-4e5f-9305-4ca05f89db50'::TEXT                                        as "EncCancel.Follow up visit date for RTI",
         single_select_coded(programEncounter.cancel_observations ->>
                             '739f9a56-c02c-4f81-927b-69842d78c1e8')::TEXT                   as "EncCancel.Visit cancel reason",
         programEncounter.cancel_observations ->>
         'de3e8247-18e7-44aa-934e-6bd262251bd8'::TEXT                                        as "EncCancel.Follow up visit date for FP",
         programEncounter.cancel_observations ->>
         'f6594bb7-db18-49cf-9987-eacbceb8f479'::TEXT                                        as "EncCancel.Next ASHA ANC visit date",
         programEncounter.cancel_observations ->>
         'b09e425a-8f06-4cb4-9b71-5e26613ea22c'::TEXT                                        as "EncCancel.Next needs assessment date",
         programEncounter.cancel_observations ->>
         'f23251e2-68c6-447b-84c2-285d61e95f0f'::TEXT                                        as "EncCancel.Other reason for cancelling",
         programEncounter.cancel_observations ->>
         '4c234fbb-7592-4f9a-87aa-3d49a08a74da'::TEXT                                        as "EncCancel.Next VHND date"
  FROM program_encounter programEncounter
         LEFT OUTER JOIN operational_encounter_type oet on programEncounter.encounter_type_id = oet.encounter_type_id
         LEFT OUTER JOIN program_enrolment programEnrolment
                         ON programEncounter.program_enrolment_id = programEnrolment.id
         LEFT OUTER JOIN operational_program op ON op.program_id = programEnrolment.program_id
         LEFT OUTER JOIN individual individual ON programEnrolment.individual_id = individual.id
         LEFT OUTER JOIN gender g ON g.id = individual.gender_id
         LEFT OUTER JOIN address_level a ON individual.address_id = a.id
         LEFT OUTER JOIN catchment_address_mapping m2 ON a.id = m2.addresslevel_id
         LEFT OUTER JOIN catchment c2 ON m2.catchment_id = c2.id

  WHERE c2.name not ilike '%master%'
    AND op.uuid = '3e42f1f5-53ec-4e72-bb9f-d10d53fc8de5'
    AND oet.uuid = 'd3ee3abc-7005-4025-8351-f4dca3d5471a'
    AND programEncounter.encounter_date_time IS NOT NULL
    AND programEnrolment.enrolment_date_time IS NOT NULL
);



drop view if exists ihmp_delivery_view;
create or replace view ihmp_delivery_view as (
  SELECT individual.uuid                                                                        "Ind.uuid",
         individual.id                                                                          "Ind.id",
         individual.first_name                                                                  "Ind.first_name",
         individual.last_name                                                                   "Ind.last_name",
         g.name                                                                                 "Ind.Gender",
         individual.date_of_birth                                                               "Ind.date_of_birth",
         individual.date_of_birth_verified                                                      "Ind.date_of_birth_verified",
         individual.registration_date                                                           "Ind.registration_date",
         individual.facility_id                                                                 "Ind.facility_id",
         a.title                                                                                "Ind.Area",
         individual.address_id                                                                  "Ind.address_id",
         individual.audit_id                                                                    "Ind.audit_id",
         c2.name                                                                                "Ind.Catchment",
         individual.is_voided                                                                   "Ind.is_voided",
         op.name                                                                                "Enl.Program Name",
         programEnrolment.uuid                                                                  "Enl.uuid",
         programEnrolment.is_voided                                                             "Enl.is_voided",
         oet.name                                                                               "Enc.Type",
         programEncounter.id                                                                    "Enc.Id",
         programEnrolment.id                                                                    "Enl.Id",
         programEncounter.earliest_visit_date_time                                              "Enc.earliest_visit_date_time",
         programEncounter.encounter_date_time                                                   "Enc.encounter_date_time",
         programEncounter.program_enrolment_id                                                  "Enc.program_enrolment_id",
         programEncounter.uuid                                                                  "Enc.uuid",
         programEncounter.name                                                                  "Enc.name",
         programEncounter.max_visit_date_time                                                   "Enc.max_visit_date_time",
         programEncounter.is_voided                                                             "Enc.is_voided",
         programEnrolment.program_exit_date_time                                                "Enc.program_exit_date_time",
         individual.observations ->>
         'd685d229-e06e-42f3-90c7-ca06d2fefe17'::TEXT                                        as "Ind.Date of marriage",
         individual.observations ->>
         '60c44aa2-3635-487d-8962-43000e77d382'::TEXT                                        as "Ind.Caste (Free Text)",
         individual.observations ->>
         '38eaf459-4316-4da3-acfd-3c9c71334041'::TEXT                                        as "Ind.Standard upto which schooling completed",
         single_select_coded(
             individual.observations ->> '1eb73895-ddba-4ddb-992c-03225f93775c')::TEXT       as "Ind.Whether any disability",
         individual.observations ->>
         '43c4860f-fccf-48c9-818a-191bc0f8d0cf'::TEXT                                        as "Ind.Aadhaar ID",
         single_select_coded(
             individual.observations ->> 'c922c13c-1fa2-42dd-a7e8-d234b0324870')::TEXT       as "Ind.Religion",
         single_select_coded(
             individual.observations ->> '6617408e-b89e-4f2f-ab10-d818c5d7f1bd')::TEXT       as "Ind.Status of the individual",
         individual.observations ->>
         'f27e9504-81a3-48d9-b7cc-4bc90dbd4a30'::TEXT                                        as "Ind.Disability",
         single_select_coded(
             individual.observations ->> '1b6ae290-1823-4aab-91a5-b1d8a1b3b837')::TEXT       as "Ind.Relation to head of the family",
         individual.observations ->>
         '82fa0dbb-92f9-4ec2-9263-49054e64d909'::TEXT                                        as "Ind.Contact Number",
         single_select_coded(
             individual.observations ->> '61ab6413-5c6a-4512-ab6e-7d5cd1439569')::TEXT       as "Ind.Caste Category",
         single_select_coded(
             individual.observations ->> '92475d77-7cdd-4976-98f0-3847939a95d1')::TEXT       as "Ind.Whether sterilized",
         single_select_coded(
             individual.observations ->> 'cd83afec-d147-42b2-bd50-0ca460dbd55f')::TEXT       as "Ind.Occupation",
         single_select_coded(
             individual.observations ->> '476a0b71-485b-4a0a-ba6f-4f3cf13568ca')::TEXT       as "Ind.Ration Card",
         single_select_coded(
             individual.observations ->> 'aa6687c9-ba4d-49a3-9b3e-bba266eb6f32')::TEXT       as "Ind.Marital status",
         individual.observations ->>
         '24dabc3a-6562-4521-bd42-5fff11ea5c46'::TEXT                                        as "Ind.Household number",
         individual.observations ->>
         '25b73ca1-e268-452f-ba05-2595af28ac04'::TEXT                                        as "Ind.Number of household members (eating together)",
         single_select_coded(
             programEnrolment.observations ->> 'b47dca1d-3f42-4280-9b3e-3d68cce88bed')::TEXT as "Enl.Is she on TB medication?",
         single_select_coded(
             programEnrolment.observations ->> '4a20f69f-12c4-4472-ac82-ece0ab102e4b')::TEXT as "Enl.Did she complete her TB treatment?",
         single_select_coded(
             programEnrolment.observations ->> '2a8a5306-c0a9-4ca6-8bd7-b394069aa6f2')::TEXT as "Enl.Has she been taking her TB medication regularly?",
         programEnrolment.observations ->>
         'd883d5fe-e17d-4136-b989-089fa0295e34'::TEXT                                        as "Enl.Height",
         programEnrolment.observations ->>
         '1cc6fd5d-1359-483e-a971-4bf36e34a72d'::TEXT                                        as "Enl.Last menstrual period",
         programEnrolment.observations ->>
         'dde911fa-15eb-4564-8deb-bba46e9d3744'::TEXT                                        as "Enl.Estimated Date of Delivery",
         programEnrolment.observations ->>
         'fef5be79-24c0-415d-9494-64b2faf17aeb'::TEXT                                        as "Enl.R15 number",
         programEnrolment.observations ->>
         '191f8a30-d543-4b98-9464-2f5838d1d9a6'::TEXT                                        as "Enl.MCTS Number",
         single_select_coded(
             programEnrolment.observations ->> 'ae076480-008d-47ca-9fab-a5300a626e42')::TEXT as "Enl.Urine pregnancy test",
         programEnrolment.observations ->>
         '7d34125a-1b0b-4755-acc8-aeda71af8bd3'::TEXT                                        as "Enl.Other obstetrics history",
         programEnrolment.observations ->>
         '99c9d0a3-6ffc-41a7-8641-d79e2e83a4c6'::TEXT                                        as "Enl.Number of miscarriages",
         programEnrolment.observations ->>
         '74de4054-0e8b-4088-aae8-bd5f2933d300'::TEXT                                        as "Enl.Number of stillbirths",
         programEnrolment.observations ->>
         'd7ae1329-9e09-47f1-ad7d-3c73474d973f'::TEXT                                        as "Enl.Number of child deaths",
         programEnrolment.observations ->>
         'b3e9c088-90ed-45d9-8c99-102d1bda66e1'::TEXT                                        as "Enl.Number of living children",
         programEnrolment.observations ->>
         '38b9986b-76e8-4015-ae51-48152b1cd42c'::TEXT                                        as "Enl.Number of abortions",
         programEnrolment.observations ->>
         'eb07e1bd-0379-4ffd-9bc6-df4b34f7745e'::TEXT                                        as "Enl.Number of male child deaths",
         programEnrolment.observations ->>
         '305f693c-c8b6-4e3e-9a82-a6e91a3e462f'::TEXT                                        as "Enl.Age of youngest child",
         programEnrolment.observations ->>
         'c6454406-04da-4670-9318-3b71a2d9b0cf'::TEXT                                        as "Enl.Number of female child deaths",
         programEnrolment.observations ->>
         'dc2c23e9-19ad-471f-81d1-213069ccc975'::TEXT                                        as "Enl.Gravida",
         programEnrolment.observations ->>
         '2d679fd5-a75b-46bd-96c2-10c180187342'::TEXT                                        as "Enl.Parity",
         programEnrolment.observations ->>
         'd924596e-e08e-4829-b4c3-77a0411d18c7'::TEXT                                        as "Enl.Number of female children",
         programEnrolment.observations ->>
         '1b749b48-bfae-470d-8219-a735dae99f7a'::TEXT                                        as "Enl.Number of male children",
         programEnrolment.observations ->>
         '0b3eb875-b0f6-4420-be01-82bbd2812b21'::TEXT                                        as "Enl.Number of induced abortions",
         programEncounter.observations ->>
         '884cd2fb-1e50-4a2e-a9ae-2b90d4a78ede'::TEXT                                        as "Enc.Number of babies",
         multi_select_coded(
             programEncounter.observations -> '42fcfd17-4e35-4981-96b3-1d028915d808')::TEXT  as "Enc.Delivery Complications",
         single_select_coded(
             programEncounter.observations ->> '69d0acf1-c32b-4694-9bc2-874b5e7a44c8')::TEXT as "Enc.Type of delivery",
         programEncounter.observations ->>
         '0f4dfab3-4c4a-48a7-a0ba-510d00124c01'::TEXT                                        as "Enc.Number of days stayed at hospital",
         single_select_coded(
             programEncounter.observations ->> 'f34b101e-5d85-4e26-a162-49ed7d7415be')::TEXT as "Enc.Received discharge report after delivery from hospital",
         single_select_coded(
             programEncounter.observations ->> '36b7b1a8-d191-4bbe-ad3c-0e25a48334e0')::TEXT as "Enc.Delivery outcome",
         single_select_coded(
             programEncounter.observations ->> 'c6362992-94ff-4dc5-9b3b-e7f076532f6f')::TEXT as "Enc.Whether received benefits of PMVY",
         single_select_coded(
             programEncounter.observations ->> 'd6fb3f4a-5f56-49fe-b9b3-7b31563a2aad')::TEXT as "Enc.Whether recieved benefit of JSY",
         single_select_coded(
             programEncounter.observations ->> '710a414b-b33d-4d25-9914-8dfbabc571e0')::TEXT as "Enc.Whether eligible for JSY",
         programEncounter.observations ->>
         'c7ef7cd1-ca78-43a3-907f-201e9b0a79e2'::TEXT                                        as "Enc.Details of JSY benefit - cheque number and amount",
         programEncounter.observations ->>
         'b67c6309-bd75-4a3e-8a94-8c1d52a62f5c'::TEXT                                        as "Enc.Benefits recieved under PMVY in rupees",
         programEncounter.observations ->>
         'bd1eb295-238f-485b-9b9a-4dde399deda8'::TEXT                                        as "Enc.Weight of stillborn1",
         programEncounter.observations ->>
         '1d4ed4f9-2e91-4539-8cf2-9c61f455f3c9'::TEXT                                        as "Enc.Weight of stillborn2",
         programEncounter.observations ->>
         '482a696a-4834-4cbe-b529-95b9699e9884'::TEXT                                        as "Enc.Number of still born babies",
         single_select_coded(
             programEncounter.observations ->> '6ad7e09b-526f-4a9d-994f-0b878af3968f')::TEXT as "Enc.Gender of stillborn2",
         single_select_coded(
             programEncounter.observations ->> 'a091cf0f-ba83-468a-a91e-86807afdbd36')::TEXT as "Enc.Gender of stillborn3",
         programEncounter.observations ->>
         '80a00613-202a-4b47-b6ce-2fa8e186f839'::TEXT                                        as "Enc.Weight of stillborn3",
         single_select_coded(
             programEncounter.observations ->> 'd1842738-a4a9-4122-9194-c0eb84e055dd')::TEXT as "Enc.Gender of stillborn1",
         single_select_coded(
             programEncounter.observations ->> '58b6367a-825f-43e2-b6b7-b35a5cbc3a09')::TEXT as "Enc.Delivered by",
         single_select_coded(
             programEncounter.observations ->> 'a0405799-1e3c-40ef-90ba-84c9c0931660')::TEXT as "Enc.Place of delivery",
         programEncounter.observations ->>
         'b4d6b6b6-fff0-4dda-8f60-aa273ff20250'::TEXT                                        as "Enc.Date of discharge",
         programEncounter.observations ->>
         'f66b51a3-c0ad-4e40-a5ee-eca2481bd83c'::TEXT                                        as "Enc.Date of delivery",
         programEncounter.cancel_date_time                                                      "EncCancel.cancel_date_time"
  FROM program_encounter programEncounter
         LEFT OUTER JOIN operational_encounter_type oet on programEncounter.encounter_type_id = oet.encounter_type_id
         LEFT OUTER JOIN program_enrolment programEnrolment
                         ON programEncounter.program_enrolment_id = programEnrolment.id
         LEFT OUTER JOIN operational_program op ON op.program_id = programEnrolment.program_id
         LEFT OUTER JOIN individual individual ON programEnrolment.individual_id = individual.id
         LEFT OUTER JOIN gender g ON g.id = individual.gender_id
         LEFT OUTER JOIN address_level a ON individual.address_id = a.id
         LEFT OUTER JOIN catchment_address_mapping m2 ON a.id = m2.addresslevel_id
         LEFT OUTER JOIN catchment c2 ON m2.catchment_id = c2.id
  WHERE c2.name not ilike '%master%'
    AND op.uuid = '3e42f1f5-53ec-4e72-bb9f-d10d53fc8de5'
    AND oet.uuid = '43e7ecb9-2293-46f8-8070-b4e621eab8f7'
    AND programEncounter.encounter_date_time IS NOT NULL
    AND programEnrolment.enrolment_date_time IS NOT NULL
);

drop view if exists ihmp_anc_asha_view;
create or replace view ihmp_anc_asha_view as (
  SELECT individual.uuid                                                                        "Ind.uuid",
         individual.id                                                                          "Ind.id",
         individual.first_name                                                                  "Ind.first_name",
         individual.last_name                                                                   "Ind.last_name",
         g.name                                                                                 "Ind.Gender",
         individual.date_of_birth                                                               "Ind.date_of_birth",
         individual.date_of_birth_verified                                                      "Ind.date_of_birth_verified",
         individual.registration_date                                                           "Ind.registration_date",
         individual.facility_id                                                                 "Ind.facility_id",
         a.title                                                                                "Ind.Area",
         individual.audit_id                                                                    "Ind.audit_id",
         individual.address_id                                                                  "Ind.address_id",
         c2.name                                                                                "Ind.Catchment",
         individual.is_voided                                                                   "Ind.is_voided",
         op.name                                                                                "Enl.Program Name",
         programEnrolment.uuid                                                                  "Enl.uuid",
         programEnrolment.is_voided                                                             "Enl.is_voided",
         oet.name                                                                               "Enc.Type",
         programEncounter.earliest_visit_date_time                                              "Enc.earliest_visit_date_time",
         programEncounter.encounter_date_time                                                   "Enc.encounter_date_time",
         programEncounter.program_enrolment_id                                                  "Enc.program_enrolment_id",
         programEncounter.uuid                                                                  "Enc.uuid",
         programEncounter.name                                                                  "Enc.name",
         programEncounter.max_visit_date_time                                                   "Enc.max_visit_date_time",
         programEncounter.is_voided                                                             "Enc.is_voided",
         programEnrolment.program_exit_date_time                                                "Enc.program_exit_date_time",
         individual.observations ->>
         'd685d229-e06e-42f3-90c7-ca06d2fefe17'::TEXT                                        as "Ind.Date of marriage",
         individual.observations ->>
         '60c44aa2-3635-487d-8962-43000e77d382'::TEXT                                        as "Ind.Caste (Free Text)",
         individual.observations ->>
         '38eaf459-4316-4da3-acfd-3c9c71334041'::TEXT                                        as "Ind.Standard upto which schooling completed",
         single_select_coded(
             individual.observations ->> '1eb73895-ddba-4ddb-992c-03225f93775c')::TEXT       as "Ind.Whether any disability",
         individual.observations ->>
         '43c4860f-fccf-48c9-818a-191bc0f8d0cf'::TEXT                                        as "Ind.Aadhaar ID",
         single_select_coded(
             individual.observations ->> 'c922c13c-1fa2-42dd-a7e8-d234b0324870')::TEXT       as "Ind.Religion",
         single_select_coded(
             individual.observations ->> '6617408e-b89e-4f2f-ab10-d818c5d7f1bd')::TEXT       as "Ind.Status of the individual",
         individual.observations ->>
         'f27e9504-81a3-48d9-b7cc-4bc90dbd4a30'::TEXT                                        as "Ind.Disability",
         single_select_coded(
             individual.observations ->> '1b6ae290-1823-4aab-91a5-b1d8a1b3b837')::TEXT       as "Ind.Relation to head of the family",
         individual.observations ->>
         '82fa0dbb-92f9-4ec2-9263-49054e64d909'::TEXT                                        as "Ind.Contact Number",
         single_select_coded(
             individual.observations ->> '61ab6413-5c6a-4512-ab6e-7d5cd1439569')::TEXT       as "Ind.Caste Category",
         single_select_coded(
             individual.observations ->> '92475d77-7cdd-4976-98f0-3847939a95d1')::TEXT       as "Ind.Whether sterilized",
         single_select_coded(
             individual.observations ->> 'cd83afec-d147-42b2-bd50-0ca460dbd55f')::TEXT       as "Ind.Occupation",
         single_select_coded(
             individual.observations ->> '476a0b71-485b-4a0a-ba6f-4f3cf13568ca')::TEXT       as "Ind.Ration Card",
         single_select_coded(
             individual.observations ->> 'aa6687c9-ba4d-49a3-9b3e-bba266eb6f32')::TEXT       as "Ind.Marital status",
         individual.observations ->>
         '24dabc3a-6562-4521-bd42-5fff11ea5c46'::TEXT                                        as "Ind.Household number",
         individual.observations ->>
         '25b73ca1-e268-452f-ba05-2595af28ac04'::TEXT                                        as "Ind.Number of household members (eating together)",
         single_select_coded(
             programEnrolment.observations ->> 'b47dca1d-3f42-4280-9b3e-3d68cce88bed')::TEXT as "Enl.Is she on TB medication?",
         single_select_coded(
             programEnrolment.observations ->> '4a20f69f-12c4-4472-ac82-ece0ab102e4b')::TEXT as "Enl.Did she complete her TB treatment?",
         single_select_coded(
             programEnrolment.observations ->> '2a8a5306-c0a9-4ca6-8bd7-b394069aa6f2')::TEXT as "Enl.Has she been taking her TB medication regularly?",
         programEnrolment.observations ->>
         'd883d5fe-e17d-4136-b989-089fa0295e34'::TEXT                                        as "Enl.Height",
         programEnrolment.observations ->>
         '1cc6fd5d-1359-483e-a971-4bf36e34a72d'::TEXT                                        as "Enl.Last menstrual period",
         programEnrolment.observations ->>
         'dde911fa-15eb-4564-8deb-bba46e9d3744'::TEXT                                        as "Enl.Estimated Date of Delivery",
         programEnrolment.observations ->>
         'fef5be79-24c0-415d-9494-64b2faf17aeb'::TEXT                                        as "Enl.R15 number",
         programEnrolment.observations ->>
         '191f8a30-d543-4b98-9464-2f5838d1d9a6'::TEXT                                        as "Enl.MCTS Number",
         single_select_coded(
             programEnrolment.observations ->> 'ae076480-008d-47ca-9fab-a5300a626e42')::TEXT as "Enl.Urine pregnancy test",
         programEnrolment.observations ->>
         '7d34125a-1b0b-4755-acc8-aeda71af8bd3'::TEXT                                        as "Enl.Other obstetrics history",
         programEnrolment.observations ->>
         '99c9d0a3-6ffc-41a7-8641-d79e2e83a4c6'::TEXT                                        as "Enl.Number of miscarriages",
         programEnrolment.observations ->>
         '74de4054-0e8b-4088-aae8-bd5f2933d300'::TEXT                                        as "Enl.Number of stillbirths",
         programEnrolment.observations ->>
         'd7ae1329-9e09-47f1-ad7d-3c73474d973f'::TEXT                                        as "Enl.Number of child deaths",
         programEnrolment.observations ->>
         'b3e9c088-90ed-45d9-8c99-102d1bda66e1'::TEXT                                        as "Enl.Number of living children",
         programEnrolment.observations ->>
         '38b9986b-76e8-4015-ae51-48152b1cd42c'::TEXT                                        as "Enl.Number of abortions",
         programEnrolment.observations ->>
         'eb07e1bd-0379-4ffd-9bc6-df4b34f7745e'::TEXT                                        as "Enl.Number of male child deaths",
         programEnrolment.observations ->>
         '305f693c-c8b6-4e3e-9a82-a6e91a3e462f'::TEXT                                        as "Enl.Age of youngest child",
         programEnrolment.observations ->>
         'c6454406-04da-4670-9318-3b71a2d9b0cf'::TEXT                                        as "Enl.Number of female child deaths",
         programEnrolment.observations ->>
         'dc2c23e9-19ad-471f-81d1-213069ccc975'::TEXT                                        as "Enl.Gravida",
         programEnrolment.observations ->>
         '2d679fd5-a75b-46bd-96c2-10c180187342'::TEXT                                        as "Enl.Parity",
         programEnrolment.observations ->>
         'd924596e-e08e-4829-b4c3-77a0411d18c7'::TEXT                                        as "Enl.Number of female children",
         programEnrolment.observations ->>
         '1b749b48-bfae-470d-8219-a735dae99f7a'::TEXT                                        as "Enl.Number of male children",
         programEnrolment.observations ->>
         '0b3eb875-b0f6-4420-be01-82bbd2812b21'::TEXT                                        as "Enl.Number of induced abortions",
         programEncounter.observations ->>
         'f91604a8-89ac-4a99-a3cb-9edd764c8b0e'::TEXT                                        as "Enc.TT1 Date",
         programEncounter.observations ->>
         'e1b7ce95-8c73-46fa-8354-19a14f5ca17f'::TEXT                                        as "Enc.TT Booster Date",
         programEncounter.observations ->>
         '57f66ff5-e050-4a72-ad03-94d99dad4630'::TEXT                                        as "Enc.TT2 Date",
         single_select_coded(
             programEncounter.observations ->> 'b441c480-1a19-4ad0-9d0a-196485aacf12')::TEXT as "Enc.Pedal Edema",
         single_select_coded(
             programEncounter.observations ->> 'ed087798-7116-4817-ba84-caa02a23e1b7')::TEXT as "Enc.Breast Examination - Nipple",
         single_select_coded(
             programEncounter.observations ->> '226f8715-563b-4a8b-8afa-f75cce2767af')::TEXT as "Enc.Pallor",
         single_select_coded(
             programEncounter.observations ->> 'a916a62d-5010-44af-8887-e7e7c4e89ed9')::TEXT as "Enc.Whether treatment taken for antenatal complications",
         single_select_coded(
             programEncounter.observations ->> '93464328-5978-499b-98b1-b299b067cbb1')::TEXT as "Enc.Whether the antenatal complications is addressed",
         multi_select_coded(
             programEncounter.observations -> '0adc4170-9ebb-4feb-8b81-450fbf9a04dc')::TEXT  as "Enc.Pregnancy complications",
         single_select_coded(
             programEncounter.observations ->> 'ede1aad7-ee90-4c66-ab95-56e353ec5194')::TEXT as "Enc.Whether antenatal examination done",
         single_select_coded(
             programEncounter.observations ->> 'ec9e602c-885d-4f3c-8224-46ca9e9aeae4')::TEXT as "Enc.Place where antenatal examination done",
         programEncounter.observations ->>
         '0620abab-4449-4182-96f9-8daa5f855c80'::TEXT                                        as "Enc.Number of IFA tablets consumed",
         programEncounter.observations ->>
         'f6594bb7-db18-49cf-9987-eacbceb8f479'::TEXT                                        as "Enc.Next ASHA ANC visit date",
         programEncounter.observations ->>
         '4c234fbb-7592-4f9a-87aa-3d49a08a74da'::TEXT                                        as "Enc.Next VHND date",
         multi_select_coded(
             programEncounter.observations -> '708aab8c-0ad1-406f-a417-aae0502137ea')::TEXT  as "Enc.ANC counselling provided by ASHA",
         multi_select_coded(
             programEncounter.observations -> '50782e71-4e37-42d0-8006-f373e09cce65')::TEXT  as "Enc.Whether enrolled in any government scheme related to pregnancy",
         programEncounter.observations ->>
         '61108679-7242-479c-a6ba-380f4c9b9c3b'::TEXT                                        as "Enc.Week of gestation when registered for antenatal care",
         single_select_coded(
             programEncounter.observations ->> '5932a6af-3316-4e90-9b77-579382ff9c9e')::TEXT as "Enc.Place where registered for antenatal care",
         programEncounter.observations ->>
         'b3f5af5e-6a0f-4af0-839a-72a7e9b67331'::TEXT                                        as "Enc.Date of registration for antenatal care",
         single_select_coded(
             programEncounter.observations ->> 'b0f42202-1c89-4c12-994a-381a7c79a264')::TEXT as "Enc.Whether registered for antenatal care",
         programEncounter.cancel_date_time                                                      "EncCancel.cancel_date_time",
         programEncounter.cancel_observations ->>
         'f6594bb7-db18-49cf-9987-eacbceb8f479'::TEXT                                        as "EncCancel.Next ASHA ANC visit date",
         programEncounter.cancel_observations ->>
         'b09e425a-8f06-4cb4-9b71-5e26613ea22c'::TEXT                                        as "EncCancel.Next needs assessment date",
         programEncounter.cancel_observations ->>
         'f23251e2-68c6-447b-84c2-285d61e95f0f'::TEXT                                        as "EncCancel.Other reason for cancelling",
         programEncounter.cancel_observations ->>
         '4c234fbb-7592-4f9a-87aa-3d49a08a74da'::TEXT                                        as "EncCancel.Next VHND date",
         single_select_coded(programEncounter.cancel_observations ->>
                             '739f9a56-c02c-4f81-927b-69842d78c1e8')::TEXT                   as "EncCancel.Visit cancel reason",
         programEncounter.cancel_observations ->>
         '6539ec90-14b9-4e5f-9305-4ca05f89db50'::TEXT                                        as "EncCancel.Follow up visit date for RTI",
         programEncounter.cancel_observations ->>
         'de3e8247-18e7-44aa-934e-6bd262251bd8'::TEXT                                        as "EncCancel.Follow up visit date for FP"
  FROM program_encounter programEncounter
         LEFT OUTER JOIN operational_encounter_type oet on programEncounter.encounter_type_id = oet.encounter_type_id
         LEFT OUTER JOIN program_enrolment programEnrolment
                         ON programEncounter.program_enrolment_id = programEnrolment.id
         LEFT OUTER JOIN operational_program op ON op.program_id = programEnrolment.program_id
         LEFT OUTER JOIN individual individual ON programEnrolment.individual_id = individual.id
         LEFT OUTER JOIN gender g ON g.id = individual.gender_id
         LEFT OUTER JOIN address_level a ON individual.address_id = a.id
         LEFT OUTER JOIN catchment_address_mapping m2 ON a.id = m2.addresslevel_id
         LEFT OUTER JOIN catchment c2 ON m2.catchment_id = c2.id
  WHERE c2.name not ilike '%master%'
    AND op.uuid = '3e42f1f5-53ec-4e72-bb9f-d10d53fc8de5'
    AND oet.uuid = '6cfda1d9-61cd-41dc-bf6a-3cf0b2c44788'
    AND programEncounter.encounter_date_time IS NOT NULL
    AND programEnrolment.enrolment_date_time IS NOT NULL
);

drop view if exists ihmp_neonatal_view;
create or replace view ihmp_neonatal_view as (
  SELECT individual.id                                                                          "Ind.Id",
         individual.address_id                                                                  "Ind.address_id",
         individual.uuid                                                                        "Ind.uuid",
         individual.first_name                                                                  "Ind.first_name",
         individual.last_name                                                                   "Ind.last_name",
         g.name                                                                                 "Ind.Gender",
         individual.audit_id                                                                    "Ind.audit_id",
         individual.date_of_birth                                                               "Ind.date_of_birth",
         individual.date_of_birth_verified                                                      "Ind.date_of_birth_verified",
         individual.registration_date                                                           "Ind.registration_date",
         individual.facility_id                                                                 "Ind.facility_id",
         a.title                                                                                "Ind.Area",
         c2.name                                                                                "Ind.Catchment",
         individual.is_voided                                                                   "Ind.is_voided",
         op.name                                                                                "Enl.Program Name",
         programEnrolment.id                                                                    "Enl.Id",
         programEnrolment.uuid                                                                  "Enl.uuid",
         programEnrolment.is_voided                                                             "Enl.is_voided",
         oet.name                                                                               "Enc.Type",
         programEncounter.id                                                                    "Enc.Id",
         programEncounter.earliest_visit_date_time                                              "Enc.earliest_visit_date_time",
         programEncounter.encounter_date_time                                                   "Enc.encounter_date_time",
         programEncounter.program_enrolment_id                                                  "Enc.program_enrolment_id",
         programEncounter.uuid                                                                  "Enc.uuid",
         programEncounter.name                                                                  "Enc.name",
         programEncounter.max_visit_date_time                                                   "Enc.max_visit_date_time",
         programEncounter.is_voided                                                             "Enc.is_voided",
         programEnrolment.program_exit_date_time                                                "Enc.program_exit_date_time",
         (individual.observations ->> '24dabc3a-6562-4521-bd42-5fff11ea5c46')::TEXT          as "Ind.Household number",
         (individual.observations ->> '25b73ca1-e268-452f-ba05-2595af28ac04')::TEXT          as "Ind.Number of household members (eating together)",
         single_select_coded(
             individual.observations ->> '1b6ae290-1823-4aab-91a5-b1d8a1b3b837')::TEXT       as "Ind.Relation to head of the family",
         single_select_coded(
             individual.observations ->> 'c922c13c-1fa2-42dd-a7e8-d234b0324870')::TEXT       as "Ind.Religion",
         (individual.observations ->> '60c44aa2-3635-487d-8962-43000e77d382')::TEXT          as "Ind.Caste (Free Text)",
         single_select_coded(
             individual.observations ->> '61ab6413-5c6a-4512-ab6e-7d5cd1439569')::TEXT       as "Ind.Caste Category",
         single_select_coded(
             individual.observations ->> '476a0b71-485b-4a0a-ba6f-4f3cf13568ca')::TEXT       as "Ind.Ration Card",
         (individual.observations ->> '38eaf459-4316-4da3-acfd-3c9c71334041')::TEXT          as "Ind.Standard upto which schooling completed",
         single_select_coded(
             individual.observations ->> 'cd83afec-d147-42b2-bd50-0ca460dbd55f')::TEXT       as "Ind.Occupation",
         single_select_coded(
             individual.observations ->> 'aa6687c9-ba4d-49a3-9b3e-bba266eb6f32')::TEXT       as "Ind.Marital status",
         (individual.observations ->> 'd685d229-e06e-42f3-90c7-ca06d2fefe17')::TEXT          as "Ind.Date of marriage",
         single_select_coded(
             individual.observations ->> '92475d77-7cdd-4976-98f0-3847939a95d1')::TEXT       as "Ind.Whether sterilized",
         single_select_coded(
             individual.observations ->> '1eb73895-ddba-4ddb-992c-03225f93775c')::TEXT       as "Ind.Whether any disability",
         (individual.observations ->> 'f27e9504-81a3-48d9-b7cc-4bc90dbd4a30')::TEXT          as "Ind.Disability",
         single_select_coded(
             individual.observations ->> '6617408e-b89e-4f2f-ab10-d818c5d7f1bd')::TEXT       as "Ind.Status of the individual",
         (individual.observations ->> '43c4860f-fccf-48c9-818a-191bc0f8d0cf')::TEXT          as "Ind.Aadhaar ID",
         (individual.observations ->> '82fa0dbb-92f9-4ec2-9263-49054e64d909')::TEXT          as "Ind.Contact Number",
         single_select_coded(
             programEnrolment.observations ->> '1ae1338b-fa7f-40c0-b11a-232531eb5919')::TEXT as "Enl.Registration at child birth",
         (programEnrolment.observations ->> '75b1656e-2777-4753-9612-ce03a766a5e1')::TEXT    as "Enl.Weight",
         (programEnrolment.observations ->> '7ff327c5-8678-41e3-af39-c86f214c6f14')::TEXT    as "Enl.Birth Weight",
         single_select_coded(
             programEncounter.observations ->> '317ba6a6-d989-45df-82c7-44fc87c0cc32')::TEXT as "Enc.Child passed urine since birth",
         single_select_coded(
             programEncounter.observations ->> 'b58f5ae0-36f8-4ab9-8331-5597c71a4efb')::TEXT as "Enc.Child passed meconium since birth",
         single_select_coded(
             programEncounter.observations ->> '83d232af-0b2e-472c-b216-fd13dc9e9b1e')::TEXT as "Enc.Whether limp/blue/Pale at the time of birth",
         single_select_coded(
             programEncounter.observations ->> 'd6a0c77e-840d-40a2-9282-d22db7ede007')::TEXT as "Enc.Child PNC cry related complaints",
         single_select_coded(
             programEncounter.observations ->> '17d5ed6e-b571-4e02-bebe-0c9db2c8f5ca')::TEXT as "Enc.Child PNC breathing problems",
         single_select_coded(
             programEncounter.observations ->> 'cecd7bdb-1f34-4b89-a26d-1599222a2361')::TEXT as "Enc.Whether any congenital malformation",
         single_select_coded(
             programEncounter.observations ->> '2fb86ae4-2cdf-4f12-ba18-32b8d512a3cc')::TEXT as "Enc.Whether feeling cold",
         multi_select_coded(
             programEncounter.observations -> 'bc7b0015-ee9a-4089-b0a3-76862a30aa1c')::TEXT  as "Enc.Child PNC feeding related complaints",
         multi_select_coded(
             programEncounter.observations -> '43a78b5a-f4da-440d-9614-80af65090e1f')::TEXT  as "Enc.Child PNC urination related complaints",
         multi_select_coded(
             programEncounter.observations -> 'bcd4495f-41fa-494b-a5d9-a766c87f37f9')::TEXT  as "Enc.Child PNC stool related complaints",
         multi_select_coded(
             programEncounter.observations -> 'ad5d7bf8-932a-4eb2-8e8a-7c38dc4bbe2b')::TEXT  as "Enc.Child PNC activity related complaints",
         multi_select_coded(
             programEncounter.observations -> 'cd409e43-6d89-4a98-8d75-6097c505366a')::TEXT  as "Enc.Umbilical related problems",
         multi_select_coded(
             programEncounter.observations -> '2010e1e0-468d-424c-85ef-290612f3eae8')::TEXT  as "Enc.Child PNC eye problems",
         single_select_coded(
             programEncounter.observations ->> '5a3b65c1-1647-47d0-ad66-d8b22722c472')::TEXT as "Enc.Is baby exclusively breastfeeding",
         single_select_coded(
             programEncounter.observations ->> 'dfeb2d8f-3d49-45ec-9d5c-0b4ff6251b9e')::TEXT as "Enc.Whether feeling hot",
         single_select_coded(
             programEncounter.observations ->> 'f9d7b5b2-31cd-409a-94ca-40554e65f1b7')::TEXT as "Enc.Whether having diarrhoea",
         single_select_coded(
             programEncounter.observations ->> 'e6bd3ca9-caed-462a-bf7a-1614269ebeaa')::TEXT as "Enc.Whether having cough and cold",
         multi_select_coded(
             programEncounter.observations -> '36460b33-a6c2-478f-894c-491128aa4ca5')::TEXT  as "Enc.Child PNC skin problems",
         single_select_coded(
             programEncounter.observations ->> 'b3b609a8-1a95-4915-92be-89155731587b')::TEXT as "Enc.Whether taken treatment for neonatal complications",
         single_select_coded(
             programEncounter.observations ->> '66b3ad26-f501-499d-8be5-94997326f5c0')::TEXT as "Enc.Whether neonatal complication addressed",
         (programEncounter.observations ->> 'd883d5fe-e17d-4136-b989-089fa0295e34')::TEXT    as "Enc.Height",
         (programEncounter.observations ->> '75b1656e-2777-4753-9612-ce03a766a5e1')::TEXT    as "Enc.Weight",
         (programEncounter.observations ->> '76b08303-f7ff-490c-b656-5dfb5954dbe1')::TEXT    as "Enc.Date of first home visit by ANM to the neonate",
         (programEncounter.observations ->> 'e8d8700e-af3c-44fd-bdfe-f9b3b2e6df75')::TEXT    as "Enc.Date of second home visit by ANM to the neonate",
         single_select_coded(
             programEncounter.observations ->> '955f881b-7d3a-45c0-9d53-0ede9ba39c59')::TEXT as "Enc.Thermal care for baby in first 7 days",
         programEncounter.cancel_date_time                                                      "EncCancel.cancel_date_time",
         single_select_coded(
             programEncounter.observations ->> '739f9a56-c02c-4f81-927b-69842d78c1e8')::TEXT as "EncCancel.Visit cancel reason",
         (programEncounter.observations ->> 'f23251e2-68c6-447b-84c2-285d61e95f0f')::TEXT    as "EncCancel.Other reason for cancelling",
         (programEncounter.observations ->> 'b09e425a-8f06-4cb4-9b71-5e26613ea22c')::TEXT    as "EncCancel.Next needs assessment date",
         (programEncounter.observations ->> 'de3e8247-18e7-44aa-934e-6bd262251bd8')::TEXT    as "EncCancel.Follow up visit date for FP",
         (programEncounter.observations ->> '6539ec90-14b9-4e5f-9305-4ca05f89db50')::TEXT    as "EncCancel.Follow up visit date for RTI",
         (programEncounter.observations ->> '4c234fbb-7592-4f9a-87aa-3d49a08a74da')::TEXT    as "EncCancel.Next VHND date",
         (programEncounter.observations ->> 'f6594bb7-db18-49cf-9987-eacbceb8f479')::TEXT    as "EncCancel.Next ASHA ANC visit date"
  FROM program_encounter programEncounter
         LEFT OUTER JOIN operational_encounter_type oet on programEncounter.encounter_type_id = oet.encounter_type_id
         LEFT OUTER JOIN program_enrolment programEnrolment
                         ON programEncounter.program_enrolment_id = programEnrolment.id
         LEFT OUTER JOIN operational_program op ON op.program_id = programEnrolment.program_id
         LEFT OUTER JOIN individual individual ON programEnrolment.individual_id = individual.id
         LEFT OUTER JOIN gender g ON g.id = individual.gender_id
         LEFT OUTER JOIN address_level a ON individual.address_id = a.id
         LEFT OUTER JOIN virtual_catchment_address_mapping_table m2 ON a.id = m2.addresslevel_id
         LEFT OUTER JOIN catchment c2 ON m2.catchment_id = c2.id
  WHERE c2.name not ilike '%master%'
    AND op.uuid = '1527fade-3e35-4f1a-8fca-693d5c648a89'
    AND oet.uuid = '5f9c7399-08e0-4996-9307-0bb10a0e5255'
    AND programEncounter.encounter_date_time IS NOT NULL
    AND programEnrolment.enrolment_date_time IS NOT NULL);

drop view if exists ihmp_birth_form_view;
create view ihmp_birth_form_view as (
  SELECT individual.id                                                                          "Ind.Id",
         individual.address_id                                                                  "Ind.address_id",
         individual.uuid                                                                        "Ind.uuid",
         individual.first_name                                                                  "Ind.first_name",
         individual.last_name                                                                   "Ind.last_name",
         g.name                                                                                 "Ind.Gender",
         individual.date_of_birth                                                               "Ind.date_of_birth",
         individual.date_of_birth_verified                                                      "Ind.date_of_birth_verified",
         individual.registration_date                                                           "Ind.registration_date",
         individual.facility_id                                                                 "Ind.facility_id",
         a.title                                                                                "Ind.Area",
         c2.name                                                                                "Ind.Catchment",
         individual.is_voided                                                                   "Ind.is_voided",
         op.name                                                                                "Enl.Program Name",
         programEnrolment.id                                                                    "Enl.Id",
         programEnrolment.uuid                                                                  "Enl.uuid",
         programEnrolment.is_voided                                                             "Enl.is_voided",
         oet.name                                                                               "Enc.Type",
         programEncounter.id                                                                    "Enc.Id",
         programEncounter.earliest_visit_date_time                                              "Enc.earliest_visit_date_time",
         programEncounter.encounter_date_time                                                   "Enc.encounter_date_time",
         programEncounter.program_enrolment_id                                                  "Enc.program_enrolment_id",
         programEncounter.uuid                                                                  "Enc.uuid",
         programEncounter.name                                                                  "Enc.name",
         programEncounter.max_visit_date_time                                                   "Enc.max_visit_date_time",
         programEncounter.is_voided                                                             "Enc.is_voided",
         (individual.observations ->> '24dabc3a-6562-4521-bd42-5fff11ea5c46')::TEXT          as "Ind.Household number",
         (individual.observations ->> '25b73ca1-e268-452f-ba05-2595af28ac04')::TEXT          as "Ind.Number of household members (eating together)",
         single_select_coded(
             individual.observations ->> '1b6ae290-1823-4aab-91a5-b1d8a1b3b837')::TEXT       as "Ind.Relation to head of the family",
         single_select_coded(
             individual.observations ->> 'c922c13c-1fa2-42dd-a7e8-d234b0324870')::TEXT       as "Ind.Religion",
         (individual.observations ->> '60c44aa2-3635-487d-8962-43000e77d382')::TEXT          as "Ind.Caste (Free Text)",
         single_select_coded(
             individual.observations ->> '61ab6413-5c6a-4512-ab6e-7d5cd1439569')::TEXT       as "Ind.Caste Category",
         single_select_coded(
             individual.observations ->> '476a0b71-485b-4a0a-ba6f-4f3cf13568ca')::TEXT       as "Ind.Ration Card",
         (individual.observations ->> '38eaf459-4316-4da3-acfd-3c9c71334041')::TEXT          as "Ind.Standard upto which schooling completed",
         single_select_coded(
             individual.observations ->> 'cd83afec-d147-42b2-bd50-0ca460dbd55f')::TEXT       as "Ind.Occupation",
         single_select_coded(
             individual.observations ->> 'aa6687c9-ba4d-49a3-9b3e-bba266eb6f32')::TEXT       as "Ind.Marital status",
         (individual.observations ->> 'd685d229-e06e-42f3-90c7-ca06d2fefe17')::TEXT          as "Ind.Date of marriage",
         single_select_coded(
             individual.observations ->> '92475d77-7cdd-4976-98f0-3847939a95d1')::TEXT       as "Ind.Whether sterilized",
         single_select_coded(
             individual.observations ->> '1eb73895-ddba-4ddb-992c-03225f93775c')::TEXT       as "Ind.Whether any disability",
         (individual.observations ->> 'f27e9504-81a3-48d9-b7cc-4bc90dbd4a30')::TEXT          as "Ind.Disability",
         single_select_coded(
             individual.observations ->> '6617408e-b89e-4f2f-ab10-d818c5d7f1bd')::TEXT       as "Ind.Status of the individual",
         (individual.observations ->> '43c4860f-fccf-48c9-818a-191bc0f8d0cf')::TEXT          as "Ind.Aadhaar ID",
         (individual.observations ->> '82fa0dbb-92f9-4ec2-9263-49054e64d909')::TEXT          as "Ind.Contact Number",
         single_select_coded(
             programEnrolment.observations ->> '1ae1338b-fa7f-40c0-b11a-232531eb5919')::TEXT as "Enl.Registration at child birth",
         (programEnrolment.observations ->> '75b1656e-2777-4753-9612-ce03a766a5e1')::TEXT    as "Enl.Weight",
         (programEnrolment.observations ->> '7ff327c5-8678-41e3-af39-c86f214c6f14')::TEXT    as "Enl.Birth Weight",
         single_select_coded(
             programEncounter.observations ->> 'fc3f9353-3cf3-426c-91fa-96e5900fd8af')::TEXT as "Enc.Place of birth",
         (programEncounter.observations ->> 'c269ed4a-1855-4516-8fa3-362a3ef28dea')::TEXT    as "Enc.Date of first weight taken of the child",
         (programEncounter.observations ->> '7ff327c5-8678-41e3-af39-c86f214c6f14')::TEXT    as "Enc.Birth Weight",
         single_select_coded(
             programEncounter.observations ->> '24c71448-1068-4dc2-aa2f-8bbb66a5123f')::TEXT as "Enc.Gestational age category at birth",
         single_select_coded(
             programEncounter.observations ->> 'b99caee7-a97a-4ce4-970b-ee567dfea070')::TEXT as "Enc.Time when breast feeding initiated to the newborn",
         single_select_coded(
             programEncounter.observations ->> '44772c48-4182-4803-b34a-8a516f4fe7d5')::TEXT as "Enc.First feed given to the newborn",
         (programEncounter.observations ->> '2eed955a-5a27-491f-b8c2-a4d6b46ea7cd')::TEXT    as "Enc.Other details - First feed given to the newborn",
         programEncounter.cancel_date_time                                                      "EncCancel.cancel_date_time"
  FROM program_encounter programEncounter
         LEFT OUTER JOIN operational_encounter_type oet on programEncounter.encounter_type_id = oet.encounter_type_id
         LEFT OUTER JOIN program_enrolment programEnrolment
                         ON programEncounter.program_enrolment_id = programEnrolment.id
         LEFT OUTER JOIN operational_program op ON op.program_id = programEnrolment.program_id
         LEFT OUTER JOIN individual individual ON programEnrolment.individual_id = individual.id
         LEFT OUTER JOIN gender g ON g.id = individual.gender_id
         LEFT OUTER JOIN address_level a ON individual.address_id = a.id
         LEFT OUTER JOIN virtual_catchment_address_mapping_table m2 ON a.id = m2.addresslevel_id
         LEFT OUTER JOIN catchment c2 ON m2.catchment_id = c2.id
  WHERE c2.name not ilike '%master%'
    AND op.uuid = '1527fade-3e35-4f1a-8fca-693d5c648a89'
    AND oet.uuid = '5a98a1d1-5f60-4b55-aeee-9965ec5674c0'
    AND programEncounter.encounter_date_time IS NOT NULL
    AND programEnrolment.enrolment_date_time IS NOT NULL
);

drop view if exists ihmp_abortion_view;
create view ihmp_abortion_view as (
  SELECT individual.id                                                                          "Ind.Id",
         individual.address_id                                                                  "Ind.address_id",
         individual.uuid                                                                        "Ind.uuid",
         individual.first_name                                                                  "Ind.first_name",
         individual.last_name                                                                   "Ind.last_name",
         g.name                                                                                 "Ind.Gender",
         individual.date_of_birth                                                               "Ind.date_of_birth",
         individual.date_of_birth_verified                                                      "Ind.date_of_birth_verified",
         individual.registration_date                                                           "Ind.registration_date",
         individual.facility_id                                                                 "Ind.facility_id",
         a.title                                                                                "Ind.Area",
         c2.name                                                                                "Ind.Catchment",
         individual.is_voided                                                                   "Ind.is_voided",
         op.name                                                                                "Enl.Program Name",
         programEnrolment.id                                                                    "Enl.Id",
         programEnrolment.uuid                                                                  "Enl.uuid",
         programEnrolment.is_voided                                                             "Enl.is_voided",
         oet.name                                                                               "Enc.Type",
         programEncounter.id                                                                    "Enc.Id",
         programEncounter.earliest_visit_date_time                                              "Enc.earliest_visit_date_time",
         programEncounter.encounter_date_time                                                   "Enc.encounter_date_time",
         programEncounter.program_enrolment_id                                                  "Enc.program_enrolment_id",
         programEncounter.uuid                                                                  "Enc.uuid",
         programEncounter.name                                                                  "Enc.name",
         programEncounter.max_visit_date_time                                                   "Enc.max_visit_date_time",
         programEncounter.is_voided                                                             "Enc.is_voided",
         (individual.observations ->> '24dabc3a-6562-4521-bd42-5fff11ea5c46')::TEXT          as "Ind.Household number",
         (individual.observations ->> '25b73ca1-e268-452f-ba05-2595af28ac04')::TEXT          as "Ind.Number of household members (eating together)",
         single_select_coded(
             individual.observations ->> '1b6ae290-1823-4aab-91a5-b1d8a1b3b837')::TEXT       as "Ind.Relation to head of the family",
         single_select_coded(
             individual.observations ->> 'c922c13c-1fa2-42dd-a7e8-d234b0324870')::TEXT       as "Ind.Religion",
         (individual.observations ->> '60c44aa2-3635-487d-8962-43000e77d382')::TEXT          as "Ind.Caste (Free Text)",
         single_select_coded(
             individual.observations ->> '61ab6413-5c6a-4512-ab6e-7d5cd1439569')::TEXT       as "Ind.Caste Category",
         single_select_coded(
             individual.observations ->> '476a0b71-485b-4a0a-ba6f-4f3cf13568ca')::TEXT       as "Ind.Ration Card",
         (individual.observations ->> '38eaf459-4316-4da3-acfd-3c9c71334041')::TEXT          as "Ind.Standard upto which schooling completed",
         single_select_coded(
             individual.observations ->> 'cd83afec-d147-42b2-bd50-0ca460dbd55f')::TEXT       as "Ind.Occupation",
         single_select_coded(
             individual.observations ->> 'aa6687c9-ba4d-49a3-9b3e-bba266eb6f32')::TEXT       as "Ind.Marital status",
         (individual.observations ->> 'd685d229-e06e-42f3-90c7-ca06d2fefe17')::TEXT          as "Ind.Date of marriage",
         single_select_coded(
             individual.observations ->> '92475d77-7cdd-4976-98f0-3847939a95d1')::TEXT       as "Ind.Whether sterilized",
         single_select_coded(
             individual.observations ->> '1eb73895-ddba-4ddb-992c-03225f93775c')::TEXT       as "Ind.Whether any disability",
         (individual.observations ->> 'f27e9504-81a3-48d9-b7cc-4bc90dbd4a30')::TEXT          as "Ind.Disability",
         single_select_coded(
             individual.observations ->> '6617408e-b89e-4f2f-ab10-d818c5d7f1bd')::TEXT       as "Ind.Status of the individual",
         (individual.observations ->> '43c4860f-fccf-48c9-818a-191bc0f8d0cf')::TEXT          as "Ind.Aadhaar ID",
         (individual.observations ->> '82fa0dbb-92f9-4ec2-9263-49054e64d909')::TEXT          as "Ind.Contact Number",
         (programEnrolment.observations ->> '191f8a30-d543-4b98-9464-2f5838d1d9a6')::TEXT    as "Enl.MCTS Number",
         (programEnrolment.observations ->> 'fef5be79-24c0-415d-9494-64b2faf17aeb')::TEXT    as "Enl.R15 number",
         (programEnrolment.observations ->> '1cc6fd5d-1359-483e-a971-4bf36e34a72d')::TEXT    as "Enl.Last menstrual period",
         (programEnrolment.observations ->> 'dde911fa-15eb-4564-8deb-bba46e9d3744')::TEXT    as "Enl.Estimated Date of Delivery",
         (programEnrolment.observations ->> 'd883d5fe-e17d-4136-b989-089fa0295e34')::TEXT    as "Enl.Height",
         single_select_coded(
             programEnrolment.observations ->> 'ae076480-008d-47ca-9fab-a5300a626e42')::TEXT as "Enl.Urine pregnancy test",
         (programEnrolment.observations ->> 'dc2c23e9-19ad-471f-81d1-213069ccc975')::TEXT    as "Enl.Gravida",
         (programEnrolment.observations ->> '2d679fd5-a75b-46bd-96c2-10c180187342')::TEXT    as "Enl.Parity",
         (programEnrolment.observations ->> 'b3e9c088-90ed-45d9-8c99-102d1bda66e1')::TEXT    as "Enl.Number of living children",
         (programEnrolment.observations ->> 'd924596e-e08e-4829-b4c3-77a0411d18c7')::TEXT    as "Enl.Number of female children",
         (programEnrolment.observations ->> '1b749b48-bfae-470d-8219-a735dae99f7a')::TEXT    as "Enl.Number of male children",
         (programEnrolment.observations ->> '38b9986b-76e8-4015-ae51-48152b1cd42c')::TEXT    as "Enl.Number of abortions",
         (programEnrolment.observations ->> '99c9d0a3-6ffc-41a7-8641-d79e2e83a4c6')::TEXT    as "Enl.Number of miscarriages",
         (programEnrolment.observations ->> '0b3eb875-b0f6-4420-be01-82bbd2812b21')::TEXT    as "Enl.Number of induced abortions",
         (programEnrolment.observations ->> '74de4054-0e8b-4088-aae8-bd5f2933d300')::TEXT    as "Enl.Number of stillbirths",
         (programEnrolment.observations ->> 'd7ae1329-9e09-47f1-ad7d-3c73474d973f')::TEXT    as "Enl.Number of child deaths",
         (programEnrolment.observations ->> 'eb07e1bd-0379-4ffd-9bc6-df4b34f7745e')::TEXT    as "Enl.Number of male child deaths",
         (programEnrolment.observations ->> 'c6454406-04da-4670-9318-3b71a2d9b0cf')::TEXT    as "Enl.Number of female child deaths",
         (programEnrolment.observations ->> '305f693c-c8b6-4e3e-9a82-a6e91a3e462f')::TEXT    as "Enl.Age of youngest child",
         (programEnrolment.observations ->> '7d34125a-1b0b-4755-acc8-aeda71af8bd3')::TEXT    as "Enl.Other obstetrics history",
         single_select_coded(
             programEnrolment.observations ->> 'b47dca1d-3f42-4280-9b3e-3d68cce88bed')::TEXT as "Enl.Is she on TB medication?",
         single_select_coded(
             programEnrolment.observations ->> '2a8a5306-c0a9-4ca6-8bd7-b394069aa6f2')::TEXT as "Enl.Has she been taking her TB medication regularly?",
         single_select_coded(
             programEnrolment.observations ->> '4a20f69f-12c4-4472-ac82-ece0ab102e4b')::TEXT as "Enl.Did she complete her TB treatment?",
         (programEncounter.observations ->> 'c82404a6-78f6-4e55-93b8-51acc5d8aa68')::TEXT    as "Enc.Date of abortion",
         single_select_coded(
             programEncounter.observations ->> '94e3ad45-ae52-41dc-a26a-27b4973cbd04')::TEXT as "Enc.Type of Abortion",
         (programEncounter.observations ->> '6912e863-ba7c-438e-83d9-b73fc4878b92')::TEXT    as "Enc.Period of gestation in weeks at the time of abortion",
         single_select_coded(
             programEncounter.observations ->> 'b8893e96-89fd-4965-93ea-b9307dd69be0')::TEXT as "Enc.Place of abortion",
         (programEncounter.observations ->> 'b4d6b6b6-fff0-4dda-8f60-aa273ff20250')::TEXT    as "Enc.Date of discharge",
         single_select_coded(
             programEncounter.observations ->> 'efc9a994-80fd-48a2-b089-bff9e0585a61')::TEXT as "Enc.Whether treatment taken after spontaneous abortion",
         (programEncounter.observations ->> 'bd5b5ffc-93d6-4a80-aa91-a5e5c9fc6a40')::TEXT    as "Enc.Date of treatment taken after spontaneous abortion",
         multi_select_coded(
             programEncounter.observations -> 'fc1346b0-57fe-4a84-8d95-f4461d60176f')::TEXT  as "Enc.Post abortion complaints",
         (programEncounter.observations ->> 'a7d52633-56ff-486d-b451-b119d74a7760')::TEXT    as "Enc.Other abortion complaints",
         single_select_coded(
             programEncounter.observations ->> '42be7266-50e7-4f0b-88a5-b6e1f1cf0535')::TEXT as "Enc.Whether taken treatment for post abortion complication",
         programEncounter.cancel_date_time                                                      "EncCancel.cancel_date_time"
  FROM program_encounter programEncounter
         LEFT OUTER JOIN operational_encounter_type oet on programEncounter.encounter_type_id = oet.encounter_type_id
         LEFT OUTER JOIN program_enrolment programEnrolment
                         ON programEncounter.program_enrolment_id = programEnrolment.id
         LEFT OUTER JOIN operational_program op ON op.program_id = programEnrolment.program_id
         LEFT OUTER JOIN individual individual ON programEnrolment.individual_id = individual.id
         LEFT OUTER JOIN gender g ON g.id = individual.gender_id
         LEFT OUTER JOIN address_level a ON individual.address_id = a.id
         LEFT OUTER JOIN virtual_catchment_address_mapping_table m2 ON a.id = m2.addresslevel_id
         LEFT OUTER JOIN catchment c2 ON m2.catchment_id = c2.id
  WHERE c2.name not ilike '%master%'
    AND op.uuid = '3e42f1f5-53ec-4e72-bb9f-d10d53fc8de5'
    AND oet.uuid = 'b7dcbb07-4f0e-4e65-8955-ef02a76c60e4'
    AND programEncounter.encounter_date_time IS NOT NULL
    AND programEnrolment.enrolment_date_time IS NOT NULL
);
-- ----------------------------------------------------
set role none;
