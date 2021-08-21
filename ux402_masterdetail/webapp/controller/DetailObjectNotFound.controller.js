sap.ui.define([
	"ux402masterdetail/controller/BaseController"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (BaseController) {
		"use strict";

		return BaseController.extend("ux402masterdetail.controller.DetailObjectNotFound", {
            
			onInit: function () {

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
