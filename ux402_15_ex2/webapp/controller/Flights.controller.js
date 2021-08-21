sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "ux40215ex2/control/HoverButton",
    "sap/m/MessageToast",
    "ux40215ex2/control/PlaneInfo"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, History, HoverButton, MessageToast, PlaneInfo) {
		"use strict";

		return Controller.extend("ux40215ex2.controller.Flights", {

			onInit: function () {
                this.getRouter().getRoute("flights").attachPatternMatched(this._onObjectMatched, this);
			},

            getRouter: function(){
                return this.getOwnerComponent().getRouter();
            },

            _onObjectMatched: function(oEvent){	
                var vCarrierId = oEvent.getParameter("arguments").carrierId;
                this.getView().getModel().metadataLoaded().then( function(){
                    debugger; 
                    var oView = this.getView();
                    oView.bindElement({
                        path:"/CarrierCollection('"+vCarrierId+"')",
                        events:{
                            change: this._onBindingChange.bind(this),
                            dataRequested: function(){
                                oView.setBusy(true);
                            },
                            dataReceived: function(){
                                oView.setBusy(false);
                            }
                        }
                    })
                }.bind(this) );
            },

            _onBindingChange: function(){
                var oElementBinding = this.getView().getElementBinding();
                if (oElementBinding && !oElementBinding.getBoundContext()) {
                    this.getRouter().getTargets().display("notFound");
                }
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

            onHover: function(oEvent){
                var sText = this.getOwnerComponent().getModel("i18n").getProperty("msgSeatsAv");
                MessageToast.show(oEvent.getSource().getHoverText()+" "+sText, {duration:1000});
            }

		});
	});
