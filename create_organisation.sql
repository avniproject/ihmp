select create_db_user('ihmp', 'password');

INSERT into organisation(name, db_user, uuid, parent_organisation_id)
SELECT 'IHMP', 'ihmp', '11845014-41e6-42fa-bbc8-57b1bfcd6f57', id
FROM organisation
WHERE name = 'OpenCHS' and not exists (select 1 from organisation where name = 'IHMP');
