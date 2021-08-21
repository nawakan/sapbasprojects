// We cannot provide stable mock data out of the template.
// If you introduce mock data, by adding .json files in your webapp/localService/mockdata folder you have to provide the following minimum data:
// * At least 3 CarrierCollection in the list
// * All 3 CarrierCollection have at least one CarrierFlights

sap.ui.define([
	"sap/ui/test/Opa5",
	"./arrangements/Startup",
	"./MasterJourney",
	"./NavigationJourney",
	"./NotFoundJourney",
	"./BusyJourney"
], function (Opa5, Startup) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Startup(),
		viewNamespace: "student15.com.sap.training.ux402.templateusage.ux402usingtemplate.view.",
		autoWait: true
	});
});
