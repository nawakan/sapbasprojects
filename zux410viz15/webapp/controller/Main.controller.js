sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/viz/ui5/controls/common/feeds/FeedItem",
    "sap/viz/ui5/data/DimensionDefinition",
    "sap/viz/ui5/data/MeasureDefinition",
    "sap/viz/ui5/data/FlattenedDataset"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller, FeedItem, 
        DimensionDefinition, MeasureDefinition, FlattenedDataset) {
		"use strict";

		return Controller.extend("zux410viz15.controller.Main", {
			onInit: function () {
                this.sCurrentVizFrame = "idLineChartVizFrame";
                this.sCurrentSelectedDimension = "0";
                this._createFeedMap();
                this._createDataSetMap();
                this._createLineDiagram();
                this._createColumnChart();
            },

            _createFeedMap: function(){
                this.feedMap = {};
                this.feedMap.salesAmount = new FeedItem({
                    uid:"valueAxis",
                    type:"Measure",
                    values:["SalesAmount"]
                });
                this.feedMap.products = new FeedItem({
                    uid:"categoryAxis",
                    type:"Dimension",
                    values:["Products"]
                });
                this.feedMap.subregion = new FeedItem({
                    uid:"categoryAxis",
                    type:"Dimension",
                    values:["Sub_Region_Name"]
                });
                this.feedMap.productsSubregion = new FeedItem({
                    uid:"categoryAxis",
                    type:"Dimension",
                    values:["Products", "Sub_Region_Name"]
                });
            },

            _createDataSetMap: function(){
                this.dataSetMap = {};
                this.dataSetMap.productDim = new DimensionDefinition({
                    name:"Products",
                    value:"{SalesModel>PRODUCT_NAME}"
                });
                this.dataSetMap.subregionDim = new DimensionDefinition({
                    name:"Sub_Region_Name",
                    value:"{SalesModel>SUB_REGION_NAME}"
                });
                this.dataSetMap.salesAmountMea = new MeasureDefinition({
                    name:"SalesAmount",
                    value:"{SalesModel>SALES_AMOUNT}"
                });
            },

            _createDataSet: function(){
                var oDataset = new FlattenedDataset({
                    data:{
                        path:"SalesModel>/"
                    }
                });
                return oDataset;
            },

            _handleSelection: function(selectedItem){
                var oVizFrame = this.byId(this.sCurrentVizFrame),
                oDataSet = oVizFrame.getDataset();
                oDataSet.removeAllDimensions();
                oDataSet.removeAllMeasures();
                oVizFrame.removeAllFeeds();
                switch(selectedItem){
                    case "0":{
                        oDataSet.addDimension(this.dataSetMap.productDim);
                        oDataSet.addMeasure(this.dataSetMap.salesAmountMea);
                        oVizFrame.addFeed(this.feedMap.products);
                        oVizFrame.addFeed(this.feedMap.salesAmount);
                        break;
                    }
                    case "1":{
                        oDataSet.addDimension(this.dataSetMap.subregionDim);
                        oDataSet.addMeasure(this.dataSetMap.salesAmountMea);
                        oVizFrame.addFeed(this.feedMap.subregion);
                        oVizFrame.addFeed(this.feedMap.salesAmount);
                        break;
                    }
                    case "2":{
                        oDataSet.addDimension(this.dataSetMap.productDim);
                        oDataSet.addDimension(this.dataSetMap.subregionDim);
                        oDataSet.addMeasure(this.dataSetMap.salesAmountMea);
                        oVizFrame.addFeed(this.feedMap.productsSubregion);
                        oVizFrame.addFeed(this.feedMap.salesAmount);
                        break;
                    }
                }
            },

            _createLineDiagram: function(){
                var oVizFrame = this.byId("idLineChartVizFrame"),
                oPop = this.byId("idLineChartPopover");
                oVizFrame.setDataset(this._createDataSet());
                this._handleSelection(this.sCurrentSelectedDimension);
                oVizFrame.setVizProperties({
                    plotArea:{
                        dataLabel:{
                            visible:true
                        }
                    },
                    title:{
                        visible:false
                    }
                });
                oVizFrame.setVizType("line");
                oPop.connect(oVizFrame.getVizUid());
            },

            _createColumnChart: function(){
                var oVizFrame = this.byId("idBarChartVizFrame");
                oVizFrame.setDataset(this._createDataSet());
                this._handleSelection(this.sCurrentSelectedDimension);
                oVizFrame.setVizProperties({
                    plotArea:{
                        dataLabel:{
                            visible:true
                        }
                    },
                    title:{
                        visible:false
                    }
                });
                oVizFrame.setVizType("column");
            },

            onContentChange: function(oEvent){
                var sSelectedVizFrame = oEvent.getParameter("selectedItemId");
                if(sSelectedVizFrame.indexOf("Table")===-1){
                    this.sCurrentVizFrame = sSelectedVizFrame.split("--")[2];
                    this._handleSelection(this.sCurrentSelectedDimension);
                }
            },

            onChange: function(oEvent){
                this.sCurrentSelectedDimension = oEvent.getParameter("selectedItem").getKey();
                this._handleSelection(this.sCurrentSelectedDimension);
            }

		});
	});
