
include ./node_modules/openchs-idi/Makefile

su:=$(shell id -un)
org_admin_name=ihmp-admin
server_url:=http://localhost:8021

install-deps:
	yarn install

define _curl_for_form_query_export
	@curl -X GET '$(server_url)/query/program/$(1)/encounter/$(2)'  \
		-H "Content-Type: application/json"  \
		-H "USER-NAME: $(org_admin_name)"  \
		$(if $(token),-H "AUTH-TOKEN: $(token)",)
	@echo
	@echo
endef

define _curl_for_all_forms_query_export
	@curl -X GET '$(server_url)/query/program/$(1)'  \
		-H "Content-Type: application/json"  \
		-H "USER-NAME: $(org_admin_name)"  \
		$(if $(token),-H "AUTH-TOKEN: $(token)",)
	@echo
	@echo
endef

program=
encounter-type=
get_forms:
	$(call _curl_for_form_query_export,$(program),$(encounter-type))

get_all_forms:
	$(call _curl_for_all_forms_query_export,$(program))
