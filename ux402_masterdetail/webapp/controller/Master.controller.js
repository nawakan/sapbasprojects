sap.ui.define([
    "ux402masterdetail/controller/BaseController",
    "sap/ui/Device"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (BaseController, Device) {
		"use strict";

		return BaseController.extend("ux402masterdetail.controller.Master", {

			onInit: function () {
                var oList = this.byId("list");
                this._oList = oList;

                this.getOwnerComponent().getModel().attachRequestCompleted(function(){
                    this.getListSelector().setBoundMasterList(oList);
                }.bind(this));
                
                this.getRouter().getRoute("master").attachPatternMatched(this._onMasterMatched, this);
                this.getRouter().attachBypassed(this.onBypassed, this);
            },

            _onMasterMatched: function(){
                debugger;	
                this.getListSelector().oWhenListLoadingIsDone.then(
                    function(mParams){
                        debugger;
                        if (mParams.list.getMode()==="None") {
                            return;
                        }
                        var sObjectId = mParams.firstListItem.getBindingContext()
                        .getProperty("AirLineID");
                        this._navToCarrierDetails(sObjectId, true);
                    }.bind(this)
                );
            },

            _navToCarrierDetails: function(sCarrierId, bReplace){
                this.getRouter().navTo("carrierdetails", {
                    objectId: sCarrierId
                }, bReplace);
            },

            onBypassed: function(){
                this._oList.removeSelections(true);
            },

            _showDetail: function(oItem){
                var bReplace = !Device.system.phone;
                var sCarrierId = oItem.getBindingContext().getProperty("AirLineID");
                this._navToCarrierDetails(sCarrierId, bReplace);
            },

            onSelect: function(oEvent){
                this._showDetail(oEvent.getParameter("listItem")||oEvent.getSource());
            }
            
		});
	});
