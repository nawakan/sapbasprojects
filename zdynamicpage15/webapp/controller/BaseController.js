sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, History) {
		"use strict";

		return Controller.extend("zdynamicpage15.controller.BaseController", {

            getRouter: function(){
                return sap.ui.core.UIComponent.getRouterFor(this);
            },

            onNavBack: function(){
                var oHistory, sPreviousHash;
                oHistory = History.getInstance();
                sPreviousHash = oHistory.getPreviousHash();
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    this.getRouter().navTo("Overview", {}, true /*no history*/);
                }
            }

        });
        
	});
