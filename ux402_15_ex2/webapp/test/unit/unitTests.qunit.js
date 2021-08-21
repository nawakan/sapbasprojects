/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ux402_15_ex2/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
