sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("zdynamicpage15.controller.App", {

			onInit: function () {

                var oViewModel = new sap.ui.model.json.JSONModel({
                    busy: true,
                    delay: 0,
                    layout: "OneColumn",
                    previousLayout: "",
                    actionButtonsInfo: {
                        midColumn: {
                            fullScreen: false
                        }
                    }
                });

                this.getOwnerComponent().setModel(oViewModel, "appView");

            }
            
		});
	});
