SELECT json_agg(json_build_object('uuid', uuid, 'name', name, 'level', level, 'type', type, 'parents', parents))
FROM
  (
    SELECT
      s.uuid,
      s.name,
      0.9                     AS "level",
      'Slum'               AS "type",
      json_build_array(json_build_object('uuid',p.uuid)) AS "parents"
    FROM slum s
      INNER JOIN phc p ON p.id = s.phc_id) AS s;
