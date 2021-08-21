sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("ux402masterdetail.controller.BaseController", {
            
            getListSelector: function(){
                return this.getOwnerComponent().oListSelector;
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
            },

            getResourceBundle(){
                return this.getOwnerComponent().getModel("i18n").getResourceBundle()
            }

		});
	});
