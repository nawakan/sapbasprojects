sap.ui.define([
	"zdynamicpage15/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, Filter, FilterOperator, Sorter) {
		"use strict";

		return Controller.extend("zdynamicpage15.controller.Overview", {
            
            onInit: function(){

                this._oList = this.byId("idCarrierList");
                this.getView().addEventDelegate({
                    onBeforeFirstShow: function(){
                        this.getOwnerComponent().oListSelector.setBoundMasterList(this._oList);
                    }.bind(this)
                });

                this.getRouter().getRoute("Overview").attachPatternMatched(this._onPatternMatched, this);
                this.getRouter().attachBypassed(this.onBypassed, this);

                this.aKeys = ["Carrid", "Carrname"];
                this.oFilterBar = this.byId("idFilterBar");
                this.oCarIdIf = this.byId("idFilterCarrid");
                this.oCarNameIf = this.byId("idFilterCarrname");
                this.oFilterBar.registerGetFiltersWithValues(this.fGetFiltersWithValues);

            },

            _onPatternMatched: function(){
                this.getOwnerComponent().getModel("appView").setProperty("/layout", "OneColumn");
            },

            onBypassed: function(){
                this._oList.removeSelections(true);
            },

            onPress: function(oEvent){
                this._showCarrierDetails(oEvent.getSource().getBindingContext().getProperty("Carrid"));
            },

            onSelectionChange: function(oEvent){
                this._showCarrierDetails(oEvent.getParameter("listItem").getBindingContext().getProperty("Carrid"));
            },

            _showCarrierDetails: function(sCarrid){
                this.getRouter().navTo("Carrier", {
                    carrierId: sCarrid
                }, false);
            },

            getTable: function(){
                return this.byId("idCarrierList");
            },

            getTableItems: function(){
                return this.getTable().getBinding("items");
            },

            getFilters: function(aCurrentFilterValues, bAnd){
                this.aFilters = [];
                this.aFilters = this.aKeys.map(function(sCriteria, i){
                    return new Filter(sCriteria, FilterOperator.Contains, aCurrentFilterValues[i]);
                });
                return new Filter({
                    filters: this.aFilters,
                    and: bAnd
                })
            },

            filterTable: function(aCurrentFilterValues, bAnd){
                this.getTableItems().filter(this.getFilters(aCurrentFilterValues, bAnd));
            },

            onSearch: function(oEvent){

                var aCurrentFilterValues = [];
                this.aKeys = [];

                if(oEvent.getParameter("query")) {
                    var sQuery = oEvent.getParameter("query");
                    this.aKeys = ["Carrid", "Carrname"];
                    aCurrentFilterValues.push(sQuery);
                    aCurrentFilterValues.push(sQuery);
                    this.filterTable(aCurrentFilterValues, false);
                }else if(oEvent.getParameter("selectionSet")){
                    if (this.oCarIdIf.getValue()!=="") {
                        this.aKeys.push("Carrid");
                        aCurrentFilterValues.push(this.oCarIdIf.getValue());
                    }
                    if (this.oCarNameIf.getValue()!=="") {
                        this.aKeys.push("Carrname");
                        aCurrentFilterValues.push(this.oCarNameIf.getValue());
                    }
                    this.filterTable(aCurrentFilterValues, true);
                }

            },

            onClear: function(){

                var oItems = this.oFilterBar.getAllFilterItems(true);

                for(var i=0;i<oItems.length;i++){
                    var oControl = this.oFilterBar.determinControlByFilterItem(oItems[i]);
                    if(oControl) oControl.setView("");
                }

            },

            onFilterChange: function(oEvent){
                this.oFilterBar.fireFilterChange(oEvent);
            },

            onReset: function(){
                this.getTableItems().filter([]);
            },

            fGetFiltersWithValues: function(){
                var aFilters = this.getFilterGroupItems(),
                aFilterWithValues = [];
                for(var i=0;i<aFilters.length;i++){
                    var oControl = this.determinControlByFilterItem(aFilters[i]);
                    if(oControl && oControl.getValue && aFilters.getValue()) 
                        aFilterWithValues.push(aFilters[i]);
                }
                return aFilterWithValues;
            },

            onUpdateFinished: function(oEvent){
                if (this.getTableItems().isLengthFinal())
                    this.getOwnerComponent().getModel("appView")
                    .setProperty("/count", oEvent.getParameter("total"));
            },

            onOpenViewSettings: function(oEvent){

                if (!this._oViewSettingsDialog) {
                    this._oViewSettingsDialog = sap.ui.xmlfragment(
                        "zdynamicpage15.fragment.ViewSettingsDialog", this
                    );
                    this.getView().addDependent(this._oViewSettingsDialog);
                    jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oViewSettingsDialog);
                }

                var sDialogTab = "sort";
                if(oEvent.getSource() instanceof sap.m.Button){
                    var sButtonId = oEvent.getSource().getId();
                    if (sButtonId.match("group")) {
                        sDialogTab = "group";
                    }
                }

                this._oViewSettingsDialog.open(sDialogTab);

            },

            onConfirmViewSettingsDialog: function(oEvent){

                var mParams = oEvent.getParameters(),
                sPath, bDesc,
                aSorters = [];

                if (mParams.groupItem) {
                    sPath = mParams.groupItem.getKey();
                    bDesc = mParams.groupDescending;
                    aSorters.push(new Sorter(sPath, bDesc, true));
                }

                if (mParams.sortItem) {
                    sPath = mParams.sortItem.getKey();
                    bDesc = mParams.sortDescending;
                    aSorters.push(new Sorter(sPath, bDesc, true));
                }

                this.getTableItems().sort(aSorters);

            }

		});
	});
