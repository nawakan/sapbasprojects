sap.ui.define([
	"zdynamicpage15/controller/BaseController"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("zdynamicpage15.controller.Carrier", {

            metadata:{
                methods:{
                    onShowCarrierData:{
                        public: true,
                        final: false
                    }
                }
            },

            onShowCarrierData: function(){
                alert("You are currently view the data from carrier"+
                this.getView().getBindingContext().getProperty("Carrname"));
            },

			onInit: function () {
                this.getRouter().getRoute("Carrier")
                .attachPatternMatched(this._onPatternMatched, this);
            },

            _onPatternMatched: function(oEvent){

                this._sCarrierId = oEvent.getParameter("arguments").carrierId;

                var oView = this.getView();
                oView.bindElement({
                    path: "/UX_C_Carrier_TP('"+this._sCarrierId+"')",
                    events:{
                        change: this._onBindingChange.bind(this),
                        dataRequested: function(){
                            oView.setBusy(true);
                        },
                        dataReceived: function(){
                            oView.setBusy(false);
                        }
                    }
                });

                this.getOwnerComponent().oListSelector.selectAListItem("/UX_C_Carrier_TP('"+
                this._sCarrierId+"')");

                var oViewModel = this.getOwnerComponent().getModel("appView");
                oViewModel.setProperty("/layout", "TwoColumnsMidExpanded");
                //this.getOwnerComponent().setModel(oViewModel, "appView");

            },

            _onBindingChange: function(){
                var oElementBinding = this.getView().getElementBinding();
                if (oElementBinding && !oElementBinding.getBoundContext()) {
                    this.getOwnerComponent().oListSelector.clearMasterListSelection();
                    this.getRouter().getTargets().display("NotFound");
                    return;
                }
            },

            onCloseDetailPress: function(){
                this.getOwnerComponent().getModel("appView")
                .setProperty("/actionButtonsInfo/midColumn/fullScreen", false);
                this.getOwnerComponent().oListSelector.clearMasterListSelection();  
                this.getRouter().navTo("Overview");
            },

            onToggleFullScreen: function(){

                var bFullScreen = this.getOwnerComponent().getModel("appView")
                .getProperty("/actionButtonsInfo/midColumn/fullScreen");

                this.getOwnerComponent().getModel("appView")
                .setProperty("/actionButtonsInfo/midColumn/fullScreen", !bFullScreen);

                if (!bFullScreen) {

                    this.getOwnerComponent().getModel("appView")
                    .setProperty("/previousLayout", 
                        this.getOwnerComponent().getModel("appView")
                        .getProperty("/layout"));

                    this.getOwnerComponent().getModel("appView")
                    .setProperty("/layout", "MidColumnFullScreen");

                }
                else{

                    this.getOwnerComponent().getModel("appView")
                    .setProperty("/layout", 
                        this.getOwnerComponent().getModel("appView")
                        .getProperty("/previousLayout"));

                }

            }

		});
	});
