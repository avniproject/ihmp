CREATE ROLE ihmp NOINHERIT PASSWORD 'password';

GRANT ihmp TO openchs;

GRANT ALL ON ALL TABLES IN SCHEMA public TO ihmp;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO ihmp;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO ihmp;

INSERT into organisation(name, db_user, uuid, parent_organisation_id)
    SELECT 'IHMP', 'ihmp', '11845014-41e6-42fa-bbc8-57b1bfcd6f57', id FROM organisation WHERE name = 'OpenCHS';
