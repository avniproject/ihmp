SELECT json_agg(json_build_object('uuid', uuid, 'name', name, 'level', level, 'type', type, 'parents', parents))
FROM (
       SELECT
         uuid,
         name,
         2.6           AS "level",
         'PHC Area'   AS "type",
         '[]' :: JSON AS "parents"
       FROM phc) AS p;
