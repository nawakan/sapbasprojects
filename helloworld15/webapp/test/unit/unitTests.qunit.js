/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"student15sap.training./helloworld15/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
