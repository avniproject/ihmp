
insert into checklist_item(completion_date, checklist_id, uuid, version, organisation_id, audit_id, observations,
                           checklist_item_detail_id)
select NULL,
       4441,
       uuid_generate_v4(),
       0,
       38,
       create_audit((select id from users where username = 'admin@ihmp')),
       '{}'::jsonb,
       cid.id
from checklist_item_detail cid
where cid.uuid in ('a38cfcbc-061c-43cd-b353-4f82caf39e09', 'f5300b94-b03b-4334-bd17-c2abde53eb0f',
                   '625384c8-a6a1-42d7-a69e-004df7d3f259',
                   '9897e78a-3b70-4fdc-8610-b7c97a642229', 'b64b138c-ce88-4c1f-8791-fbcbf247f202'
    );