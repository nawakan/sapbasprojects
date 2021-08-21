sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, History) {
		"use strict";

		return Controller.extend("ux40215ex2.controller.NotFound", {

			onInit: function () {

			},

            getRouter: function(){
                return this.getOwnerComponent().getRouter();
            },

            onNavBack: function(){
                var oHistory, sPreviousHash;
                oHistory = History.getInstance();
                sPreviousHash = oHistory.getPreviousHash();
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    this.getRouter().navTo("overview", {}, true /*no history*/);
                }
            }

		});
	});
