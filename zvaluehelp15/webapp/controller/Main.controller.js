sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, Filter, FilterOperator) {
		"use strict";

		return Controller.extend("zvaluehelp15.controller.Main", {

			onInit: function () {
                this.oDynamicPage = this.byId("idHeaderLayout");
                this.oDynamicPage.setVisible(false);
            },

            onValueHelpRequest: function(oEvent){

                var sInputValue = oEvent.getSource().getValue();
                this._sInputId = oEvent.getSource().getId();

                if(!this._oValueHelpDialog){
                    this._oValueHelpDialog = sap.ui.xmlfragment(
                        "zvaluehelp15.fragment.CarrierSelectionDialog", this
                    );
                    this.getView().addDependent(this._oValueHelpDialog);
                }

                this._oValueHelpDialog.getBinding("items").filter([
                    new Filter("Carrid", FilterOperator.Contains, sInputValue)]);

                this._oValueHelpDialog.open(sInputValue);

            },

            onValueHelpSearch: function(oEvent){

                var sValue = oEvent.getParameter("value"),
                oFilter = new Filter("Carrid", FilterOperator.Contains, sValue),
                oFilter2 = new Filter("Carrname", FilterOperator.StartWith, sValue),
                oFilter3 = new Filter({
                    filters: [oFilter, oFilter2],
                    and: false
                });

                oEvent.getSource().getBinding("items").filter([oFilter3]);

            },

            onValueHelpClose: function(oEvent){

                var oSelectedItem = oEvent.getParameter("selectedItem");

                if (oSelectedItem)
                    this.byId(this._sInputId).setValue(oSelectedItem.getTitle());

                oEvent.getSource().getBinding("items").filter([]);

                this.oDynamicPage.setVisible(true);

                var oFlightsFragment = this._createFlightTable(),
                sPath = oSelectedItem.getBindingContext().getPath();
                oFlightsFragment.bindElement(sPath);
                this.oDynamicPage.bindElement(sPath);

            },

            _createFlightTable: function(){

                var oFragment = this._oFormFragment && this._oFormFragment["Flights"];

                if (oFragment) return oFragment;

                oFragment = sap.ui.xmlfragment(this.getView().getId(),
                "zvaluehelp15.fragment.Flights");

                var oDynPage = this.byId("idDynPage");
                oDynPage.destroyContent();
                oDynPage.setContent(oFragment);
                this._oFormFragment = [];
                this._oFormFragment["Flights"] = oFragment;

                return oFragment;

            }
            
		});
	});
