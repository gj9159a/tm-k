// ==UserScript==
// @name         add_df_EGISZ
// @namespace    http://tampermonkey.net/
// @version      1.1.2
// @description  добавляет динполя ЕГИСЗ в указанные протоколы, в карточку клиента и сотрудника. Также позволяет добавить документ "Протокол консультации (CDA) Редакция 4".
// @author       gj9159a
// @match        https://klientiks.ru/clientix/admin/dynamicfields
// @match        https://klientiks.ru/clientix/admin/dynamicFields
// @match        https://klientiks.ru/clientix/admin/DynamicFields
// @icon         https://www.google.com/s2/favicons?sz=64&domain=klientiks.ru
// @grant        none
// @updateURL    https://raw.githubusercontent.com/gj9159a/tm-k/main/add_df_EGISZ.js
// @downloadURL  https://raw.githubusercontent.com/gj9159a/tm-k/main/add_df_EGISZ.js
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function() {
        const moduleButton = document.createElement('button');
        moduleButton.textContent = 'Модуль ЕГИСЗ';
        moduleButton.style.position = 'absolute';
        moduleButton.style.right = '5%';
        moduleButton.style.top = '10%';
        document.querySelector("#DynamicFields > div.element-cr._label-left._inline").appendChild(moduleButton);

        const addButton = document.createElement('button');
        addButton.textContent = 'Добавить динполя ЕГИСЗ';
        addButton.style.position = 'absolute';
        addButton.style.right = '5%';
        addButton.style.top = '14%';
        addButton.style.display = 'none';
        document.querySelector("#DynamicFields > div.element-cr._label-left._inline").appendChild(addButton);

        const addDocsButton = document.createElement('button');
        addDocsButton.textContent = 'Добавить документы СЭМД';
        addDocsButton.style.position = 'absolute';
        addDocsButton.style.right = '5%';
        addDocsButton.style.top = '18%';
        addDocsButton.style.display = 'none';
        document.querySelector("#DynamicFields > div.element-cr._label-left._inline").appendChild(addDocsButton);

        const addDoc1Button = document.createElement('button');
        addDoc1Button.textContent = 'Протокол консультации (CDA) Редакция 4';
        addDoc1Button.style.position = 'absolute';
        addDoc1Button.style.right = '5%';
        addDoc1Button.style.top = '14%';
        addDoc1Button.style.display = 'none';
        document.querySelector("#DynamicFields > div.element-cr._label-left._inline").appendChild(addDoc1Button);

        const remdOidInput = createInputField('Введите значение для {{account.remd_oid}}', '25%', '20%');
        const medicalLicenseInput = createInputField('Введите значение для {{account.medical_license}}', '25%', '30%');
        const medicalLicenseAuthorInput = createInputField('Введите значение для {{account.medical_license_author}}', '25%', '40%');
        const addressCodeValueInput = createInputField('Введите значение для {{account.address_code_value}}', '25%', '50%');
        const addressCodeKeyInput = createInputField('Введите значение для {{account.address_code_key}}', '25%', '60%');

        function createInputField(placeholder, right, top) {
            const input = document.createElement('textarea');
            input.rows = 4;
            input.cols = 90;
            input.placeholder = placeholder;
            input.style.position = 'absolute';
            input.style.right = right;
            input.style.top = top;
            input.style.display = 'none';
            input.style.whiteSpace = 'nowrap';
            document.querySelector("#DynamicFields > div.element-cr._label-left._inline").appendChild(input);
            return input;
        }

        //const addDoc2Button = document.createElement('button');
        //addDoc2Button.textContent = 'Добавить документ 2';
        //addDoc2Button.style.position = 'absolute';
        //addDoc2Button.style.right = '5%';
        //addDoc2Button.style.top = '18%';
        //addDoc2Button.style.display = 'none';
        //document.querySelector("#DynamicFields > div.element-cr._label-left._inline").appendChild(addDoc2Button);

        const scenarioInput = document.createElement('textarea');
        scenarioInput.rows = 10;
        scenarioInput.cols = 50;
        scenarioInput.placeholder = 'Введите сценарии, каждый с новой строки';
        scenarioInput.style.position = 'absolute';
        scenarioInput.style.right = '25%';
        scenarioInput.style.top = '10%';
        scenarioInput.style.display = 'none';
        scenarioInput.style.whiteSpace = 'nowrap';
        document.querySelector("#DynamicFields > div.element-cr._label-left._inline").appendChild(scenarioInput);

        const createButton = document.createElement('button');
        createButton.textContent = 'Поехали!';
        createButton.style.position = 'absolute';
        createButton.style.right = '5%';
        createButton.style.top = '14%';
        createButton.style.display = 'none';
        document.querySelector("#DynamicFields > div.element-cr._label-left._inline").appendChild(createButton);

        function reset() {
            addButton.style.display = 'none';
            addDocsButton.style.display = 'none';
            addDoc1Button.style.display = 'none';
            //addDoc2Button.style.display = 'none';
            scenarioInput.style.display = 'none';
            createButton.style.display = 'none';
            moduleButton.textContent = 'Модуль ЕГИСЗ';
            createButton.textContent = 'Поехали!';
            createButton.style.backgroundColor = '';
            createButton.style.color = '';
            remdOidInput.style.display = 'none';
            medicalLicenseInput.style.display = 'none';
            medicalLicenseAuthorInput.style.display = 'none';
            addressCodeValueInput.style.display = 'none';
            addressCodeKeyInput.style.display = 'none';
        }

        moduleButton.addEventListener('click', function(event) {
            event.preventDefault();
            if (moduleButton.textContent === 'Модуль ЕГИСЗ') {
                addButton.style.display = 'block';
                addDocsButton.style.display = 'block';
                moduleButton.textContent = 'На сегодня хватит';
            } else {
                reset();
            }
        });

        addButton.addEventListener('click', function(event) {
            event.preventDefault();
            scenarioInput.style.display = 'block';
            createButton.style.display = 'block';
            addButton.style.display = 'none';
            addDocsButton.style.display = 'none';
        });

        addDocsButton.addEventListener('click', function(event) {
            event.preventDefault();
            addDoc1Button.style.display = 'block';
            //addDoc2Button.style.display = 'block';
            addButton.style.display = 'none';
            addDocsButton.style.display = 'none';
        });

        addDoc1Button.addEventListener('click', function(event) {
            event.preventDefault();
            remdOidInput.style.display = 'block';
            medicalLicenseInput.style.display = 'block';
            medicalLicenseAuthorInput.style.display = 'block';
            addressCodeValueInput.style.display = 'block';
            addressCodeKeyInput.style.display = 'block';
            createButton.style.display = 'block';
            addDoc1Button.style.display = 'none';
        });

        let items = [
            {
                name: 'Протокол консультации (CDA) Редакция 4',
                shown_at: 'Динамические сущности',
                document_name_template: 'Протокол консультации (CDA) Редакция 4',
                document_body_template: `xmldocgen<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="Obs.xsl"?>
<ClinicalDocument xmlns="urn:hl7-org:v3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:identity="urn:hl7-ru:identity" xmlns:address="urn:hl7-ru:address" xmlns:medService="urn:hl7-ru:medService" xmlns:fias="urn:hl7-ru:fias">
	<realmCode code="RU"/>
	<typeId root="2.16.840.1.113883.1.3" extension="POCD_MT000040"/>
	<templateId root="1.2.643.5.1.13.2.7.5.1.5.9.4"/>
	<id root="{{account.remd_oid}}.100.1.1.51" extension="{{egis_prep_data.caseDto.HistoryNumber}}"/>
	<code code="5" codeSystem="1.2.643.5.1.13.13.11.1522" codeSystemVersion="4.45" codeSystemName="Виды медицинской документации" displayName="Протокол консультации"/>
	<title>{{dynamic_object.remd_document_title}}</title>
	<effectiveTime value="{{egisz_created}}"/>
	<confidentialityCode code="N" codeSystem="1.2.643.5.1.13.13.99.2.285" codeSystemVersion="1.1" codeSystemName="Уровень конфиденциальности медицинского документа" displayName="Обычный"/>
	<languageCode code="ru-RU"/>
	<setId root="{{account.remd_oid}}.100.1.1.50" extension="{{egis_prep_data.caseDto.HistoryNumber}}"/>
	<versionNumber value="1"/>
	<recordTarget>
		<patientRole>
			<id root="{{account.remd_oid}}.100.1.1.10" extension="{{egis_prep_data.caseDto.IdPatientMis}}"/>
			<id root="1.2.643.100.3" extension="{{client.snils}}"/>
			<identity:IdentityDoc>
				<identity:IdentityCardType xsi:type="CD" code="1" codeSystem="1.2.643.5.1.13.13.99.2.48" codeSystemVersion="4.2" codeSystemName="Документы, удостоверяющие личность" displayName="Паспорт гражданина РФ"/> <!--будем передавать только паспорт-->
				<identity:Series xsi:type="ST">{{client.passport_serial}}</identity:Series>
				<identity:Number xsi:type="ST">{{client.passport_number}}</identity:Number>
				<identity:IssueOrgName xsi:type="ST">{{client.passport_author}}</identity:IssueOrgName>
				<identity:IssueOrgCode {{#client}}{{^passport_code}} nullFlavor="NI"/>{{/passport_code}}{{#passport_code}}xsi:type="ST">{{passport_code}}</identity:IssueOrgCode>{{/passport_code}}{{/client}}
				<identity:IssueDate xsi:type="TS" value="{{client.passport_created_YYYYMMDD}}"/>
			</identity:IdentityDoc>
			<identity:InsurancePolicy{{#client}}{{^oms_polis_number_nu}} nullFlavor="NI"/>{{/oms_polis_number_nu}}{{#oms_polis_number_nu}}>
				<identity:InsurancePolicyType xsi:type="CD" code="{{egis_prep_data.patientDataAdditional.patient.remd_oms_type}}" codeSystem="1.2.643.5.1.13.13.11.1035" codeSystemVersion="1.3" codeSystemName="Виды полиса обязательного медицинского страхования" displayName="{{client.remd_oms_type}}"/>{{#oms_polis_serial_nu}}
				<identity:Series xsi:type="ST">{{oms_polis_serial_nu}}</identity:Series>{{/oms_polis_serial_nu}}
				<identity:Number xsi:type="ST">{{oms_polis_number_nu}}</identity:Number>
			</identity:InsurancePolicy>{{/oms_polis_number_nu}}{{/client}}
			<addr>
				<address:Type xsi:type="CD" code="3" codeSystem="1.2.643.5.1.13.13.11.1504" codeSystemVersion="1.3" codeSystemName="Тип адреса пациента" displayName="Адрес фактического проживания (пребывания)"/>
				<streetAddressLine>{{client.living_address}}</streetAddressLine>
				<address:stateCode xsi:type="CD" code="{{egis_prep_data.patientDataAdditional.patient.remd_adress_code}}" codeSystem="1.2.643.5.1.13.13.99.2.206" codeSystemVersion="6.3" codeSystemName="Субъекты Российской Федерации" displayName="{{client.remd_adress_code}}"/>
				<postalCode nullFlavor="NI"/>
				<fias:Address nullFlavor="NI"/>
			</addr>
			<telecom value="tel:+{{client._phone}}" use="WP"/>
			<patient>
				<name>
					<family>{{client.second_name}}</family>
					<given>{{client.first_name}}</given>
				</name>
				<administrativeGenderCode code="{{client.sex_bool}}" codeSystem="1.2.643.5.1.13.13.11.1040" codeSystemVersion="2.1" codeSystemName="Пол пациента" displayName="{{client.sex}}"/>
				<birthTime value="{{client.birth_date_YYYYMMDD}}"/>
			</patient>
			<providerOrganization>
				<id root="{{account.remd_oid}}" {{#account}}{{#remd_filial_oid_nu}}extension="{{remd_filial_oid_nu}}"{{/remd_filial_oid_nu}}{{/account}}/>
				<id root="1.2.643.5.1.13.2.1.1.1504.101" extension="{{account.medical_license}}" assigningAuthorityName="{{account.medical_license_author}}"/>
				<identity:Props>
					<identity:Ogrn xsi:type="ST">{{account.legal_ogrn}}</identity:Ogrn>
				</identity:Props>
				<name>{{account.legal_name}}</name>
				<telecom value="tel:{{account.legal_phone}}" use="WP"/>
				<addr>
					<streetAddressLine>{{account.legal_address}}</streetAddressLine>
					<address:stateCode xsi:type="CD" code="{{account.address_code_value}}" codeSystem="1.2.643.5.1.13.13.99.2.206" codeSystemVersion="6.3" codeSystemName="Субъекты Российской Федерации" displayName="{{account.address_code_key}}"/>
					<postalCode>{{account.legal_index}}</postalCode>
					<fias:Address nullFlavor="NI"/>
				</addr>
			</providerOrganization>
		</patientRole>
	</recordTarget>
	<author>
		<time nullFlavor="NI"/>
		<assignedAuthor>
			<id root="{{account.remd_oid}}.100.1.1.70" extension="{{egis_prep_data.caseDto.Author.Doctor.Person.IdPersonMis}}"/>
			<id root="1.2.643.100.3" extension="{{egis_prep_data.caseDto.Author.Doctor.Person.snils}}"/>
			<code code="{{egis_prep_data.caseDto.Author.Doctor.IdPosition}}" codeSystem="1.2.643.5.1.13.13.11.1002" codeSystemVersion="7.5" codeSystemName="Должности медицинских и фармацевтических работников" displayName="{{document_author.id_position}}"/>
			<telecom value="tel:{{account.legal_phone}}" use="WP"/>
			<assignedPerson>
				<name>
					<family>{{egis_prep_data.caseDto.Author.Doctor.Person.HumanName.FamilyName}}</family>
					<given>{{egis_prep_data.caseDto.Author.Doctor.Person.HumanName.GivenName}}</given>
					{{#egis_prep_data.caseDto.Author.Doctor.Person.HumanName}}
						{{#MiddleName}}<identity:Patronymic xsi:type="ST">{{MiddleName}}</identity:Patronymic>{{/MiddleName}}
					{{/egis_prep_data.caseDto.Author.Doctor.Person.HumanName}}
				</name>
			</assignedPerson>
			<representedOrganization classCode="ORG">
				<id root="{{account.remd_oid}}" {{#account}}{{#remd_filial_oid_nu}}extension="{{remd_filial_oid_nu}}"{{/remd_filial_oid_nu}}{{/account}}/>
				<name>{{account.legal_name}}</name>
				<telecom value="tel:{{account.legal_phone}}" use="WP"/>
				<addr>
					<streetAddressLine>{{account.legal_address}}</streetAddressLine>
					<address:stateCode xsi:type="CD" code="{{account.address_code_value}}" codeSystem="1.2.643.5.1.13.13.99.2.206" codeSystemVersion="6.3" codeSystemName="Субъекты Российской Федерации" displayName="{{account.address_code_key}}"/>
					<postalCode>{{account.legal_index}}</postalCode>
					<fias:Address nullFlavor="NI"/>
				</addr>
			</representedOrganization>
		</assignedAuthor>
	</author>
	<custodian>
		<assignedCustodian>
			<representedCustodianOrganization classCode="ORG">
				<id root="{{account.remd_oid}}" {{#account}}{{#remd_filial_oid_nu}}extension="{{remd_filial_oid_nu}}"{{/remd_filial_oid_nu}}{{/account}}/>
				<name>{{account.legal_name}}</name>
				<telecom value="tel:{{account.legal_phone}}" use="WP"/>
				<addr>
					<streetAddressLine>{{account.legal_address}}</streetAddressLine>
					<address:stateCode xsi:type="CD" code="{{account.address_code_value}}" codeSystem="1.2.643.5.1.13.13.99.2.206" codeSystemVersion="6.3" codeSystemName="Субъекты Российской Федерации" displayName="{{account.address_code_key}}"/>
					<postalCode>{{account.legal_index}}</postalCode>
					<fias:Address nullFlavor="NI"/>
				</addr>
			</representedCustodianOrganization>
		</assignedCustodian>
	</custodian>
	<informationRecipient>
		<intendedRecipient>
			<receivedOrganization>
				<id root="1.2.643.5.1.13"/>
				<name>Министерство здравоохранения Российской Федерации</name>
			</receivedOrganization>
		</intendedRecipient>
	</informationRecipient>
	<legalAuthenticator>
		<time nullFlavor="NI"/>
		<signatureCode nullFlavor="NI"/>
		<assignedEntity>
			<id root="{{account.remd_oid}}.100.1.1.70" extension="{{egis_prep_data.caseDto.Author.Doctor.Person.IdPersonMis}}"/>
			<id root="1.2.643.100.3" extension="{{egis_prep_data.caseDto.Author.Doctor.Person.snils}}"/>
			<code code="{{egis_prep_data.caseDto.Author.Doctor.IdPosition}}" codeSystem="1.2.643.5.1.13.13.11.1002" codeSystemVersion="7.5" codeSystemName="Должности медицинских и фармацевтических работников" displayName="{{document_author.id_position}}"/>
			<telecom value="tel:{{account.legal_phone}}" use="WP"/>
			<assignedPerson>
				<name>
					<family>{{egis_prep_data.caseDto.Author.Doctor.Person.HumanName.FamilyName}}</family>
					<given>{{egis_prep_data.caseDto.Author.Doctor.Person.HumanName.GivenName}}</given>
					{{#egis_prep_data.caseDto.Author.Doctor.Person.HumanName}}
						{{#MiddleName}}<identity:Patronymic xsi:type="ST">{{MiddleName}}</identity:Patronymic>{{/MiddleName}}
					{{/egis_prep_data.caseDto.Author.Doctor.Person.HumanName}}
				</name>
			</assignedPerson>
			<representedOrganization classCode="ORG">
				<id root="{{account.remd_oid}}" {{#account}}{{#remd_filial_oid_nu}}extension="{{remd_filial_oid_nu}}"{{/remd_filial_oid_nu}}{{/account}}/>
				<name>{{account.legal_name}}</name>
				<telecom value="tel:{{account.legal_phone}}" use="WP"/>
				<addr>
					<streetAddressLine>{{account.legal_address}}</streetAddressLine>
					<address:stateCode xsi:type="CD" code="{{account.address_code_value}}" codeSystem="1.2.643.5.1.13.13.99.2.206" codeSystemVersion="6.3" codeSystemName="Субъекты Российской Федерации" displayName="{{account.address_code_key}}"/>
					<postalCode>{{account.legal_index}}</postalCode>
					<fias:Address nullFlavor="NI"/>
				</addr>
			</representedOrganization>
		</assignedEntity>
	</legalAuthenticator>
	<participant typeCode="IND">
		<associatedEntity classCode="GUAR">
			<code code="{{egis_prep_data.modifiedDynCardData.remd_payment_type}}" codeSystem="1.2.643.5.1.13.13.11.1039" codeSystemVersion="4.3" codeSystemName="Источники оплаты медицинской помощи" displayName="{{dynamic_object.remd_payment_type}}"/>
			<identity:DocInfo{{#egis_prep_data.modifiedDynCardData}}{{#no_doc}} nullFlavor="NAV"/>{{/no_doc}}{{^no_doc}}>
				<identity:IdentityDocType xsi:type="CD" code="{{egis_prep_data.modifiedDynCardData.remd_payment_doc_type}}" codeSystem="1.2.643.5.1.13.13.99.2.724" codeSystemVersion="1.1" codeSystemName="Типы документов оснований" displayName="{{dynamic_object.remd_payment_doc_type}}"/>
				<identity:InsurancePolicyType {{#is_oms}}xsi:type="CD" code="{{egis_prep_data.patientDataAdditional.patient.remd_oms_type}}" codeSystem="1.2.643.5.1.13.13.11.1035" codeSystemVersion="1.3" codeSystemName="Виды полиса обязательного медицинского страхования" displayName="{{client.remd_oms_type}}"{{/is_oms}}{{^is_oms}} nullFlavor="NA"{{/is_oms}}/>
				<identity:Series {{#is_oms}}{{#client}}{{#oms_polis_serial_nu}}xsi:type="ST">{{oms_polis_serial_nu}}</identity:Series{{/oms_polis_serial_nu}}{{^oms_polis_serial_nu}} nullFlavor="NA"/{{/oms_polis_serial_nu}}{{/client}}{{/is_oms}}{{#is_dms}}{{#dynamic_object}}{{#dms_serial_nu}}xsi:type="ST">{{dms_serial_nu}}</identity:Series{{/dms_serial_nu}}{{^dms_serial_nu}} nullFlavor="NA"/{{/dms_serial_nu}}{{/dynamic_object}}{{/is_dms}}{{^is_oms}}{{^is_dms}}nullFlavor="NA"/{{/is_dms}}{{/is_oms}}>
				<identity:Number xsi:type="ST">{{#is_oms}}{{client.oms_polis_number_nu}}{{/is_oms}}{{#is_dms}}{{dynamic_object.dms_number_nu}}{{/is_dms}}{{^is_oms}}{{^is_dms}}{{client.doc_number_nu}}{{/is_dms}}{{/is_oms}}
				</identity:Number>
				<identity:INN{{#is_dms}} nullFlavor="NI"/{{/is_dms}}{{#is_oms}} nullFlavor="NI"/{{/is_oms}}{{^is_oms}}{{^is_dms}} xsi:type="ST">{{client.inn}}</identity:INN{{/is_dms}}{{/is_oms}}>
				<identity:effectiveTime>
					<identity:low xsi:type="TS" value="{{#is_oms}}{{client.oms_start_datetime_YYYYMMDD}}{{/is_oms}}{{#is_dms}}{{dynamic_object.dms_start_datetime_YYYYMMDD}}{{/is_dms}}{{^is_oms}}{{^is_dms}}{{client.date_doc_nu_YYYYMMDD}}{{/is_dms}}{{/is_oms}}"/>
					<identity:high {{#is_oms}}{{#client}}{{#oms_finish_datetime_nu}}xsi:type="TS" value="{{oms_finish_datetime_nu_YYYYMMDD}}"{{/oms_finish_datetime_nu}}{{^oms_finish_datetime_nu}}nullFlavor="NAV"{{/oms_finish_datetime_nu}}{{/client}}{{/is_oms}}{{#is_dms}}{{#dynamic_object}}{{#dms_finish_datetime_nu}}xsi:type="TS" value="{{dms_finish_datetime_nu_YYYYMMDD}}"{{/dms_finish_datetime_nu}}{{^dms_finish_datetime_nu}}nullFlavor="NA"{{/dms_finish_datetime_nu}}{{/dynamic_object}}{{/is_dms}}{{^is_oms}}{{^is_dms}}nullFlavor="NA"{{/is_dms}}{{/is_oms}}/>
				</identity:effectiveTime>
			</identity:DocInfo>
			<scopingOrganization nullFlavor="NI"/>{{/no_doc}}{{/egis_prep_data.modifiedDynCardData}}
		</associatedEntity>
	</participant>
	<documentationOf>
		<serviceEvent>
			<code code="{{egis_prep_data.modifiedDynCardData.remd_service_event_type}}" codeSystem="1.2.643.5.1.13.13.99.2.726" codeSystemVersion="1.1" codeSystemName="Типы документированных событий" displayName="{{dynamic_object.remd_service_event_type}}"/>
			<effectiveTime>
				<low value="{{dynamic_object.start_datetime_YYYYMMDDHHIIGMT}}"/>
				<high value="{{dynamic_object.finish_datetime_YYYYMMDDHHIIGMT}}"/>
			</effectiveTime>
			<performer typeCode="PPRF">
				<assignedEntity>
					<id root="{{account.remd_oid}}.100.1.1.70" extension="{{egis_prep_data.caseDto.Author.Doctor.Person.IdPersonMis}}"/>
					<id root="1.2.643.100.3" extension="{{egis_prep_data.caseDto.Author.Doctor.Person.snils}}"/>
					<code code="{{egis_prep_data.caseDto.Author.Doctor.IdPosition}}" codeSystem="1.2.643.5.1.13.13.11.1002" codeSystemVersion="7.5" codeSystemName="Должности медицинских и фармацевтических работников" displayName="{{document_author.id_position}}"/>
					<telecom value="tel:{{account.legal_phone}}" use="WP"/>
					<assignedPerson>
						<name>
							<family>{{egis_prep_data.caseDto.Author.Doctor.Person.HumanName.FamilyName}}</family>
							<given>{{egis_prep_data.caseDto.Author.Doctor.Person.HumanName.GivenName}}</given>
							{{#egis_prep_data.caseDto.Author.Doctor.Person.HumanName}}
								{{#MiddleName}}<identity:Patronymic xsi:type="ST">{{MiddleName}}</identity:Patronymic>{{/MiddleName}}
							{{/egis_prep_data.caseDto.Author.Doctor.Person.HumanName}}
						</name>
					</assignedPerson>
				</assignedEntity>
			</performer>
		</serviceEvent>
	</documentationOf>
	<componentOf>
		<encompassingEncounter>
			<id root="{{account.remd_oid}}.100.1.1.15" extension="{{egis_prep_data.caseDto.HistoryNumber}}"/>
			<id nullFlavor="NI"/>
			<code nullFlavor="NI"/>
			<medService:DocType nullFlavor="NI"/>
			<effectiveTime>
				<low value="{{dynamic_object.start_datetime_YYYYMMDDHHIIGMT}}"/>
			</effectiveTime>
		</encompassingEncounter>
	</componentOf>
	<component>
		<structuredBody>
			<component>
				<section>
					<code code="DOCINFO" codeSystem="1.2.643.5.1.13.13.99.2.197" codeSystemVersion="1.19" codeSystemName="Секции электронных медицинских документов" displayName="Сведения о документе"/>
					<title>Общие сведения</title>
					<text>
						<table>
							<tbody>
								<tr>
									<td>
										<content>Шифр по МКБ-10</content>
									</td>
									<td>
										<content>{{dynamic_object.word}}</content>
									</td>
								</tr>
								<tr>
									<td>
										<content>Обращение</content>
									</td>
									<td>
										<content>{{dynamic_object.case_visit_type}}</content>
									</td>
								</tr>
							</tbody>
						</table>
					</text>
					<entry>
						<observation classCode="OBS" moodCode="EVN">
							<code code="809" codeSystem="1.2.643.5.1.13.13.99.2.166" codeSystemVersion="1.34" codeSystemName="Кодируемые поля CDA документов" displayName="Шифр по МКБ-10">
							</code>
							<value xsi:type="CD" code="{{egis_prep_data.MedRecord.DiagnosisInfo.MkbCode}}" codeSystem="1.2.643.5.1.13.13.11.1005" codeSystemVersion="2.19" codeSystemName="Международная статистическая классификация болезней и проблем, связанных со здоровьем (10-й пересмотр)" displayName="{{dynamic_object.word}}"/>
						</observation>
					</entry>
					<entry>
						<observation classCode="OBS" moodCode="EVN">
							<code code="800" codeSystem="1.2.643.5.1.13.13.99.2.166" codeSystemVersion="1.34" codeSystemName="Кодируемые поля CDA документов" displayName="Обращение">
							</code>
							<value xsi:type="CD" code="{{egis_prep_data.caseDto.IdCaseType}}" codeSystem="1.2.643.5.1.13.13.11.1007" codeSystemVersion="1.34" codeSystemName="Вид случая госпитализации или обращения (первичный, повторный)" displayName="{{dynamic_object.case_visit_type}}"/>
						</observation>
					</entry>
					<entry>
						<observation classCode="OBS" moodCode="EVN">
							<code code="801" codeSystem="1.2.643.5.1.13.13.99.2.166" codeSystemVersion="1.34" codeSystemName="Кодируемые поля CDA документов" displayName="Место проведения"/>
							<value xsi:type="CD" code="{{egis_prep_data.modifiedDynCardData.remd_execution_place}}" codeSystem="1.2.643.5.1.13.13.11.1008" codeSystemVersion="4.3" codeSystemName="Место оказания медицинской помощи" displayName="{{dynamic_object.remd_execution_place}}"/>
						</observation>
					</entry>
				</section>
			</component>
			<component>
				<section>
					<code code="ANAM" codeSystem="1.2.643.5.1.13.13.99.2.197" codeSystemVersion="1.19" codeSystemName="Секции электронных медицинских документов" displayName="Анамнез заболевания"/>
					<title>Анамнез заболевания</title>
					<text>
						<table>
							<tbody>
								<tr>
									<td>
										<content>Описание</content>
									</td>
									<td>
										<content>{{egis_prep_data.modifiedDynCardData.remdAnamnesis}}</content>
									</td>
								</tr>
							</tbody>
						</table>
					</text>
					<entry>
						<observation classCode="OBS" moodCode="EVN">
							<code code="7006" codeSystem="1.2.643.5.1.13.13.99.2.166" codeSystemVersion="1.34" codeSystemName="Кодируемые поля CDA документов" displayName="Текстовое описание"/>
							<value xsi:type="ST">{{egis_prep_data.modifiedDynCardData.remdAnamnesis}}</value>
						</observation>
					</entry>
				</section>
			</component>
			<component>
				<section>
					<code code="LANAM" codeSystem="1.2.643.5.1.13.13.99.2.197" codeSystemVersion="1.19" codeSystemName="Секции электронных медицинских документов" displayName="Анамнез жизни"/>
					<title>Анамнез жизни</title>
					<text>
						<table>
							<tbody>
								<tr>
									<td>
										<content>Описание</content>
									</td>
									<td>
										<content>{{egis_prep_data.modifiedDynCardData.remdLifeAnamnesis}}</content>
									</td>
								</tr>
							</tbody>
						</table>
					</text>
					<entry>
						<observation classCode="OBS" moodCode="EVN">
							<code code="7006" codeSystem="1.2.643.5.1.13.13.99.2.166" codeSystemVersion="1.34" codeSystemName="Кодируемые поля CDA документов" displayName="Текстовое описание"/>
							<value xsi:type="ST">{{egis_prep_data.modifiedDynCardData.remdLifeAnamnesis}}</value>
						</observation>
					</entry>
				</section>
			</component>
			<component>
				<section>
					<code code="RESCONS" codeSystem="1.2.643.5.1.13.13.99.2.197" codeSystemVersion="1.19" codeSystemName="Секции электронных медицинских документов" displayName="Консультации врачей специалистов"/>
					<title>Консультация врача специалиста</title>
					<text>
						<table>
							<tbody>
								<tr>
									<td>
										<content>Состояние</content>
									</td>
									<td>
										<content>{{dynamic_object.admission_condition}}</content>
									</td>
								</tr>
								<tr>
									<td>
										<content>Объективно</content>
									</td>
									<td>
										<content>{{egis_prep_data.modifiedDynCardData.remdObjectiveStatus}}</content>
									</td>
								</tr>
								<tr>
									<td>
										<content>Заключение</content>
									</td>
									<td>
										<content>{{egis_prep_data.modifiedDynCardData.remdConclusion}}</content>
									</td>
								</tr>
							</tbody>
						</table>
					</text>
					<entry>
						<observation classCode="OBS" moodCode="EVN">
							<code code="804" codeSystem="1.2.643.5.1.13.13.99.2.166" codeSystemVersion="1.34" codeSystemName="Кодируемые поля CDA документов" displayName="Состояние пациента"/>
							<value xsi:type="CD" code="{{egis_prep_data.modifiedDynCardData.admission_condition}}" codeSystem="1.2.643.5.1.13.13.11.1006" codeSystemVersion="2.1" codeSystemName="Степень тяжести состояния пациента" displayName="{{dynamic_object.admission_condition}}"/>
						</observation>
					</entry>
					<entry>
						<observation classCode="OBS" moodCode="EVN">
							<code code="805" codeSystem="1.2.643.5.1.13.13.99.2.166" codeSystemVersion="1.34" codeSystemName="Кодируемые поля CDA документов" displayName="Протокол консультации"/>
							<value xsi:type="ST">{{egis_prep_data.modifiedDynCardData.remdObjectiveStatus}}</value>
						</observation>
					</entry>
					<entry>
						<observation classCode="OBS" moodCode="EVN">
							<code code="806" codeSystem="1.2.643.5.1.13.13.99.2.166" codeSystemVersion="1.34" codeSystemName="Кодируемые поля CDA документов" displayName="Заключение консультации"/>
							<value xsi:type="ST">{{egis_prep_data.modifiedDynCardData.remdConclusion}}</value>
						</observation>
					</entry>
					<component>
						<section>
							<code code="DGN" codeSystem="1.2.643.5.1.13.13.99.2.197" codeSystemVersion="1.19" codeSystemName="Секции электронных медицинских документов" displayName="Диагнозы"/>
							<title>Диагнозы</title>
							<text>
								<table>
									<tbody>
										<tr>
											<td>
												<content>Диагноз</content>
											</td>
											<td>
												<content>{{egis_prep_data.modifiedDynCardData.remdDiagnosis}}</content>
											</td>
										</tr>
									</tbody>
								</table>
							</text>
							<entry>
								<observation classCode="OBS" moodCode="EVN">
									<code code="806" codeSystem="1.2.643.5.1.13.13.99.2.166" codeSystemVersion="1.34" codeSystemName="Кодируемые поля CDA документов" displayName="Заключение консультации"/>
									<value xsi:type="ST">{{egis_prep_data.modifiedDynCardData.remdDiagnosis}}</value>
								</observation>
							</entry>
						</section>
					</component>
				</section>
			</component>
		</structuredBody>
	</component>
</ClinicalDocument>`,
            },
        ];
        async function itemProcessing(items) {
            let requestCount = 0;
            for (let i = 0; i < items.length; i++) {
                let currentItem = items[i];
                let documentBodyTemplate = currentItem.document_body_template
                    .replace(/{{account.remd_oid}}/g, remdOidInput.value)
                    .replace(/{{account.medical_license}}/g, medicalLicenseInput.value)
                    .replace(/{{account.medical_license_author}}/g, medicalLicenseAuthorInput.value)
                    .replace(/{{account.address_code_value}}/g, addressCodeValueInput.value)
                    .replace(/{{account.address_code_key}}/g, addressCodeKeyInput.value);
                let data = {
                    wid: 'templateAdd',
                    mode: 'submit',
                    data: {
                        ...currentItem,
                        document_body_template: documentBodyTemplate,
                    }
                };
                try {
                    let response = await fetch('https://klientiks.ru/clientix/settings/features', {
                        method: 'POST',
                        headers: {
                            'accept': '*/*',
                            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                            'x-requested-with': 'XMLHttpRequest'
                        },
                        body: 'data=' + encodeURIComponent(JSON.stringify([data])),
                        credentials: 'include'
                    });
                    let result = await response.json();
                    console.table(result);
                    requestCount++;
                } catch (error) {
                    console.info('Error:', error);
                }
            }
        }

        createButton.addEventListener('click', async function(event) {
            event.preventDefault();

            if (createButton.textContent === 'Поехали!' && remdOidInput.style.display === 'block') {
                createButton.textContent = 'Добавляю документ...';
                createButton.style.backgroundColor = 'yellow';
                await itemProcessing(items);

                createButton.textContent = 'Документ добавлен';
                createButton.style.backgroundColor = 'green';
                createButton.style.color = 'white';

                setTimeout(function() {
                    createButton.textContent = 'Поехали!';
                    createButton.style.backgroundColor = '';
                    createButton.style.color = '';
                }, 5000);
            } else if (createButton.textContent === 'Поехали!' && scenarioInput.style.display === 'block') {
                createButton.textContent = 'Добавляю поля...';
                createButton.style.backgroundColor = 'yellow';

                let scenarios = scenarioInput.value.split('\n');

                let fields = [
                    {name: 'egisz_id', label: 'номер клиента в ЕГИСЗ', model: 'Clients', scenarios: 'add,edit', type: 'textoutput', config: '{"position":"0.1","elementOrder":1,}', position: '0.1'},
                    {name: 'status_egisz', label: 'история статусов', model: 'Clients', scenarios: 'add,edit', type: 'textoutput', config: '{"position":"0.11","elementOrder":1}', position: '0.11'},
                    {name: 'family_name', label: 'фамилия', model: 'Users', scenarios: 'edit,editEmployee,editOwner', type: 'text', config: '{"position":"0.1","elementOrder":1}', position: '0.1'},
                    {name: 'given_name', label: 'имя', model: 'Users', scenarios: 'edit,editEmployee,editOwner', type: 'text', config: '{"position":"0.11","elementOrder":1}', position: '0.11'},
                    {name: 'middle_name', label: 'отчество', model: 'Users', scenarios: 'edit,editEmployee,editOwner', type: 'text', config: '{"position":"0.12","elementOrder":1}', position: '0.12'},
                    {name: 'snils', label: 'снилс', model: 'Users', scenarios: 'edit,editEmployee,editOwner', type: 'text', config: '{"position":"0.13","elementOrder":1}', position: '0.13'},
                    {name: 'id_speciality', label: 'специальность', model: 'Users', scenarios: 'edit,editEmployee,editOwner', type: 'ac', config: '{"position":"0.14","elementOrder":1,"readonly":true}', position: '0.14'},
                    {name: 'id_position', label: 'должность', model: 'Users', scenarios: 'edit,editEmployee,editOwner', type: 'ac', config: '{"position":"0.15","elementOrder":1,"readonly":true}', position: '0.15'},
                    {name: 'snils', label: 'СНИЛС', model: 'Clients', scenarios: 'add,edit', type: 'text', config: '{"position":"0.12","elementOrder":1}', position: '0.12'},
                    {name: 'inn', label: 'ИНН', model: 'Clients', scenarios: 'add,edit', type: 'text', config: '{"position":"0.13","elementOrder":1}', position: '0.13'},
                    {name: 'remd_adress_code', label: 'Субъект федерации', model: 'Clients', scenarios: 'add,edit', type: 'ac', config: '{"position":"0.14","elementOrder":1,"paramDirectorySaveDisabled":true,"readonly":true}', position: '0.14'},
                    {name: 'doc_number_nu', label: 'Номер договора', model: 'Clients', scenarios: 'add,edit', type: 'text', config: '{"position":"0.15","elementOrder":1,"customModelDefaultValue":{"model":"Clients","value":"number"}}', position: '0.15'},
                    {name: 'date_doc_nu', label: 'Дата договора', model: 'Clients', scenarios: 'add,edit', type: 'calendar', config: '{"position":"0.16","elementOrder":1,"customModelDefaultValue":{"model":"Clients","value":"last_appointment_date_human_readable_dmy"}}', position: '0.16'},
                    {name: 'date_doc_nu_YYYYMMDD', label: '', model: 'Clients', scenarios: 'add,edit', type: 'hidden', config: '{"position":"0.17","elementOrder":1}', position: '0.17'}
                ];

                for (let field of fields) {
                    let data = {
                        wid: 'addDynamicField',
                        mode: 'submit',
                        data: {
                            ...field,
                        }
                    };

                    try {
                        let response = await fetch('https://klientiks.ru/clientix/admin/dynamicfields', {
                            method: 'POST',
                            headers: {
                                'accept': '*/*',
                                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                                'x-requested-with': 'XMLHttpRequest'
                            },
                            body: 'data=' + encodeURIComponent(JSON.stringify([data])),
                            credentials: 'include'
                        });

                        let result = await response.json();
                        console.table(result);
                    } catch (error) {
                        console.info('Error:', error);
                    }
                }

                for (let scenario of scenarios) {
                    let fieldsTemplate = [
                        {name: 'egisz_fields', label: 'Поля ЕГИСЗ', model: 'DynamicObjects', scenarios: scenario, type: 'collapsible', config: '{"position":"0.1","elementOrder":1,"items":["status_egisz","last_status_egisz","send_egisz","id_visit_purpose","case_visit_type","admission_condition","id_case_result","word8","doctor_comment","id_payment_type","remd_execution_place","remd_service_event_type","id_document_type","remd_document_title","start_datetime","finish_datetime","remdLifeAnamnesis","remdAnamnesis","remdObjectiveStatus","remdConclusion","word9","remd_payment_type","remd_payment_doc_type","signature","signature_info"]}', position: '0.1'},
                        {name: 'case_egisz', label: 'Тип осмотра', model: 'DynamicObjects', scenarios: 'scenario', type: 'hidden', config: '{"position":"0.11","elementOrder":1,"defaultValue":"CaseAmb"}', position: '0.11'},
                        {name: 'status_egisz', label: 'статус отправки данных', model: 'DynamicObjects', scenarios: 'scenario', type: 'textoutput', config: '{"position":"0.12","elementOrder":1}', position: '0.12'},
                        {name: 'last_status_egisz', label: 'последний статус отправки данных', model: 'DynamicObjects', scenarios: 'scenario', type: 'textoutput', config: '{"position":"0.13","elementOrder":1}', position: '0.13'},
                        {name: 'send_egisz', label: 'чекбокс отправки данных', model: 'DynamicObjects', scenarios: 'scenario', type: 'checkbox', config: '{"position":"0.14","elementOrder":1,"elementClass":"_block"}', position: '0.14'},
                        {name: 'id_case_result', label: 'Результат осмотра', model: 'DynamicObjects', scenarios: 'scenario', type: 'ac', config: '{"position":"0.15","elementOrder":1,"defaultValue":"Без изменения","readonly":true}', position: '0.15'},
                        {name: 'id_visit_purpose', label: 'Цель визита', model: 'DynamicObjects', scenarios: 'scenario', type: 'ac', config: '{"position":"0.16","elementOrder":1,"defaultValue":"Лечебно-диагностическая","readonly":true}', position: '0.16'},
                        {name: 'case_visit_type', label: 'Первичность', model: 'DynamicObjects', scenarios: 'scenario', type: 'ac', config: '{"position":"0.17","elementOrder":1,"defaultValue":"Первичный","readonly":true}', position: '0.17'},
                        {name: 'admission_condition', label: 'Состояние пациента', model: 'DynamicObjects', scenarios: 'scenario', type: 'ac', config: '{"position":"0.18","elementOrder":1,"defaultValue":"Удовлетворительное","readonly":true}', position: '0.18'},
                        {name: 'id_payment_type', label: 'Способ оплаты', model: 'DynamicObjects', scenarios: 'scenario', type: 'ac', config: '{"position":"0.19","elementOrder":1,"defaultValue":"платные услуги","readonly":true}', position: '0.19'},
                        {name: 'word8', label: 'Диагноз ЕГИСЗ', model: 'DynamicObjects', scenarios: 'scenario', type: 'ac', config: '{"position":"0.2","elementOrder":1,"egisz_name":["DynamicObjects","MkbCode"],"additionalACValue":[{"key_index":"dictionary_param1","value":"dictionary_param1","element":"word9"}],"paramDirectorySaveDisabled":true}', position: '0.2'},
                        {name: 'doctor_comment', label: 'Комментарий врача', model: 'DynamicObjects', scenarios: 'scenario', type: 'textarea', config: '{"position":"0.21","elementOrder":1,"egisz_name":["DynamicObjects","doctor_comment"]}', position: '0.21'},
                        {name: 'remd_service_event_type', label: 'Тип документированного события', model: 'DynamicObjects', scenarios: 'scenario', type: 'ac', config: '{"position":"0.22","elementOrder":1,"paramDirectorySaveDisabled":true,"defaultValue":"Консультация","readonly":true}', position: '0.22'},
                        {name: 'remd_payment_type', label: 'Источник оплаты', model: 'DynamicObjects', scenarios: 'scenario', type: 'ac', config: '{"position":"0.23","elementOrder":1,"paramDirectorySaveDisabled":true,"defaultValue":"Средства пациента","readonly":true}', position: '0.23'},
                        {name: 'remd_payment_doc_type', label: 'Документ-основание оплаты', model: 'DynamicObjects', scenarios: 'scenario', type: 'ac', config: '{"position":"0.24","elementOrder":1,"paramDirectorySaveDisabled":true,"defaultValue":"Договор на оказание платных медицинских услуг","readonly":true}', position: '0.24'},
                        {name: 'id_document_type', label: 'Тип Мед Документа', model: 'DynamicObjects', scenarios: 'scenario', type: 'ac', config: '{"position":"0.25","elementOrder":1,"paramDirectorySaveDisabled":true,"defaultValue":"Протокол консультации (CDA) Редакция 4","readonly":true}', position: '0.25'},
                        {name: 'start_datetime', label: 'Время начала осмотра', model: 'DynamicObjects', scenarios: 'scenario', type: 'text', config: '{"position":"0.26","elementOrder":1,"customModelDefaultValue":{"datetime":true,"format":"d.m.Y H:i"}}', position: '0.26'},
                        {name: 'finish_datetime', label: 'Время окончания осмотра', model: 'DynamicObjects', scenarios: 'scenario', type: 'text', config: '{"position":"0.27","elementOrder":1,"customModelDefaultValue":{"datetime":true,"format":"d.m.Y H:i"}}', position: '0.27'},
                        {name: 'start_datetime_YYYYMMDDHHIIGMT', label: '', model: 'DynamicObjects', scenarios: 'scenario', type: 'hidden', config: '{"position":"0.28","elementOrder":1}', position: '0.28'},
                        {name: 'finish_datetime_YYYYMMDDHHIIGMT', label: '', model: 'DynamicObjects', scenarios: 'scenario', type: 'hidden', config: '{"position":"0.29","elementOrder":1}', position: '0.29'},
                        {name: 'signature', label: 'Подпись ЕГИСЗ', model: 'DynamicObjects', scenarios: 'scenario', type: 'signature', config: '{"position":"0.9","elementOrder":1}', position: '0.9'},
                        {name: 'signature_info', label: 'Информация о подписи', model: 'DynamicObjects', scenarios: 'scenario', type: 'textoutput', config: '{"position":"0.91","elementOrder":1}', position: '0.91'},
                        {name: 'remd_document_title', label: 'Заголовок документа РЭМД', model: 'DynamicObjects', scenarios: 'scenario', type: 'text', config: '{"position":"0.291","elementOrder":1,"defaultValue":"Протокол консультации врача <Специальность>"}', position: '0.291'},
                        {name: 'remd_execution_place', label: 'Место оказания услуги', model: 'DynamicObjects', scenarios: 'scenario', type: 'ac', config: '{"position":"0.292","elementOrder":1,"paramDirectorySaveDisabled":true,"defaultValue":"Амбулаторно-поликлиническое учреждение","readonly":true}', position: '0.292'},
                        {name: 'remdAnamnesis', label: 'Анамнез заболевания', model: 'DynamicObjects', scenarios: 'scenario', type: 'textarea', config: '{"position":"0.293","elementOrder":1,"egisz_name":["DynamicObjects","remdAnamnesis"]}', position: '0.293'},
                        {name: 'remdLifeAnamnesis', label: 'Анамнез жизни', model: 'DynamicObjects', scenarios: 'scenario', type: 'textarea', config: '{"position":"0.294","elementOrder":1,"egisz_name":["DynamicObjects","remdLifeAnamnesis"]}', position: '0.294'},
                        {name: 'remdObjectiveStatus', label: 'Объективный статус', model: 'DynamicObjects', scenarios: 'scenario', type: 'textarea', config: '{"position":"0.295","elementOrder":1,"egisz_name":["DynamicObjects","remdObjectiveStatus"]}', position: '0.295'},
                        {name: 'remdConclusion', label: 'Заключение', model: 'DynamicObjects', scenarios: 'scenario', type: 'textarea', config: '{"position":"0.296","elementOrder":1,"egisz_name":["DynamicObjects","remdConclusion"]}', position: '0.296'},
                        {name: 'word9', label: 'Диагноз РЭМД', model: 'DynamicObjects', scenarios: 'scenario', type: 'ac', config: '{"position":"0.297","elementOrder":1,"egisz_name":["DynamicObjects","remdDiagnosis"],"readonly":true}', position: '0.297'}
                    ];

                    let fields = fieldsTemplate.map((field) => {
                        return {...field, scenarios: scenario};
                    });

                    for (let field of fields) {
                        let data = {
                            wid: 'addDynamicField',
                            mode: 'submit',
                            data: {
                                ...field,
                            }
                        };

                        try {
                            let response = await fetch('https://klientiks.ru/clientix/admin/dynamicfields', {
                                method: 'POST',
                                headers: {
                                    'accept': '*/*',
                                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                                    'x-requested-with': 'XMLHttpRequest'
                                },
                                body: 'data=' + encodeURIComponent(JSON.stringify([data])),
                                credentials: 'include'
                            });

                            let result = await response.json();
                            console.table(result);
                        } catch (error) {
                            console.info('Error:', error);
                        }
                    }
                }

                createButton.textContent = 'Поля ЕГИСЗ добавлены!';
                createButton.style.backgroundColor = 'green';
                createButton.style.color = 'white';
            }
        });
    }, 3000);
})();
