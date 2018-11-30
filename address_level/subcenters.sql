SELECT json_agg(json_build_object('uuid', uuid, 'name', name, 'level', level, 'type', type, 'parents', parents))
FROM (
       SELECT
         s.uuid,
         s.name,
          2.3                         AS "level",
         'Subcenter'                  AS "type",
         json_build_array(json_build_object('uuid',p.uuid)) AS "parents"
       FROM subcenter s
         INNER JOIN phc p ON s.phc_id = p.id) AS s;

