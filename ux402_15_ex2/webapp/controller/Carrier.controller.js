sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("ux40215ex2.controller.Carrier", {

			onInit: function () {

            },

            getRouter: function(){
                return this.getOwnerComponent().getRouter();
            },

            onPress: function(oEvent){
                this.getRouter().navTo("flights", { 
                    carrierId: oEvent.getSource().getBindingContext().getProperty("AirLineID") 
                }, true);
            }

		});
	});
