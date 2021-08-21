sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("zendnavi.controller.Main", {
			onInit: function () {
                var oComponentData = this.getOwnerComponent().getComponentData();
                if (oComponentData && oComponentData.startupParameters && oComponentData.startupParameters.helloText) {
                    var sHelloText = oComponentData.startupParameters.helloText[0];
                    this.byId("idinfo").setText(sHelloText);
                }
			}
		});
	});
