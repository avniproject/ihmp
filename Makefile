deps:; npm i -g grunt; npm install
-include ./node_modules/openchs-idi/Makefile

#######################################

su:=$(shell id -un)
org_admin_name=ihmp-admin
server_url:=http://localhost:8021

define _curl_view_generation
	@echo '$(body)' | \
		curl -X POST '$(server_url)/query' -d @- \
		-H "Content-Type: application/json"  \
		-H "USER-NAME: $(org_admin_name)" > /tmp/out.json
	@echo
	@echo
endef

program=
encounter=
spreadout=false
type=Registration
#or
type=ProgramEncounter
printsql=

body:={ \
	"program": $(if $(program),"$(program)",null), \
	"encounterType": $(if $(encounter),"$(encounter)",null), \
	"spreadMultiSelectObs": $(spreadout), \
	"type": "$(type)" }

_get_views:
	$(call _curl_view_generation)

get_views:
	-rm /tmp/out.json
	@echo storing views in /tmp/out.json
	@echo
	make _get_views body='$(body)'

print_views:
	make get_views
	node ./printGeneratedSql.js

# make get_views spreadout=false program=Pregnancy
# make get_views spreadout=true program=Pregnancy
# make print_views spreadout=true program=Pregnancy
