sap.ui.define([
	"ux402masterdetail/controller/BaseController",
    "sap/ui/Device"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (BaseController, Device) {
		"use strict";

		return BaseController.extend("ux402masterdetail.controller.Detail", {

			onInit: function () {
                this.getRouter().getRoute("carrierdetails").attachPatternMatched(this._onObjectMatched, this);
            },
            
            _onObjectMatched: function(oEvent){
                var sObjectPath = "/CarrierCollection('"+
                oEvent.getParameter("arguments").objectId+"')";
                this._bindView(sObjectPath);
            },
            
            _bindView: function(sObjectPath){
                
                var oView = this.getView();

                oView.bindElement({
                    path: sObjectPath,
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

            },

            _onBindingChange: function(){

                var oView = this.getView();
                var oElementBinding = oView.getElementBinding();
                if (!oElementBinding.getBoundContext()) {
                    this.getRouter().getTargets().display("detailObjectNotFound");
                    this.getListSelector().clearMasterListSelector();
                    return;
                }
                
                var sPath = oElementBinding.getPath();
                this.getListSelector().selectAListItem(sPath);

            }

		});
	});
