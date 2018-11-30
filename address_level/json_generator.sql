DROP TABLE IF EXISTS raw_village;
DROP TABLE IF EXISTS village;
DROP TABLE IF EXISTS subcenter;
DROP TABLE IF EXISTS phc;


CREATE TABLE raw_village (
  id       VARCHAR,
  phc      VARCHAR,
  subcenter    VARCHAR,
  village       VARCHAR
);

CREATE TABLE phc (
  id   SERIAL PRIMARY KEY,
  name VARCHAR,
  uuid VARCHAR DEFAULT uuid_generate_v4()
);

CREATE TABLE subcenter (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR,
  uuid        VARCHAR DEFAULT uuid_generate_v4(),
  phc_id INT REFERENCES phc (id)
);

CREATE TABLE village (
  id       SERIAL PRIMARY KEY,
  name     VARCHAR,
  uuid     VARCHAR DEFAULT uuid_generate_v4(),
  subcenter_id INT REFERENCES subcenter (id)
);

COPY raw_village (id, phc, subcenter, village) FROM '/Users/garima/Google Drive/ID_docs/OpenCHS/openchs/ihmp/address_level/intervention-area list.csv' WITH CSV header DELIMITER ',';

INSERT INTO phc (name) SELECT DISTINCT initcap(lower(trim(phc)))
FROM raw_village;

INSERT INTO subcenter (phc_id, name)
SELECT DISTINCT
p.id,
initcap(lower(trim(rv.subcenter)))
FROM raw_village rv
INNER JOIN phc p ON initcap(lower(trim(rv.phc))) = p.name
WHERE rv.subcenter IS NOT NULL;

INSERT INTO village (subcenter_id, name)
SELECT DISTINCT
s.id,
initcap(lower(trim(rv.village)))
FROM raw_village rv
INNER JOIN subcenter s ON initcap(lower(trim(rv.subcenter))) = s.name
WHERE rv.village IS NOT NULL;