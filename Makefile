
-include ./node_modules/openchs-idi/Makefile

su:=$(shell id -un)
org_admin_name=ihmp-admin
server_url:=http://localhost:8021

install-deps:
	yarn install
	# The following is required to ensure that the latest of sdk is installed
	yarn add -D github:openchs/openchs-idi#master

define _curl_view_generation
	@echo '$(body)' | \
		curl -X POST '$(server_url)/query' -d @- \
		-H "Content-Type: application/json"  \
		-H "USER-NAME: $(org_admin_name)"
	@echo
	@echo
endef

program=
encounter=
spreadout=false
type=Registration
#or
type=ProgramEncounter

body:={ \
	"program": $(if $(program),"$(program)",null), \
	"encounterType": $(if $(encounter),"$(encounter)",null), \
	"spreadMultiSelectObs": $(spreadout), \
	"type": "$(type)" }

get_views:
	$(call _curl_view_generation)

store_views:
	@echo posting '$(body)'
	@echo storing views in /tmp/out.txt
	make get_views body='$(body)' > /tmp/out.txt
