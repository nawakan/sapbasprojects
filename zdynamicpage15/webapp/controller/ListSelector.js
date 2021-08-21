sap.ui.define([
	"sap/ui/base/Object"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Object) {
		"use strict";

		return Object.extend("zdynamicpage15.controller.ListSelector", {

            constructor: function(){

                this._oWhenListHasBeenSet = new Promise(function(fnResolve){
                    this._fnResolveListHasBeenSet = fnResolve;
                }.bind(this));

                this._WhenListLoadingIsDone = new Promise(function(fnResolve, fnReject){

                    this._oWhenListHasBeenSet.then(function(oList){
                        oList.getBinding("items").attachEventOnce("dataReceived",
                            function(){
                                if (this._oList.getItems().length) fnResolve({list: oList});
                                else fnReject({list: oList});
                            }.bind(this));
                    }.bind(this))

                }.bind(this));

            },

            setBoundMasterList: function(oList){
                this._oList = oList;
                this._fnResolveListHasBeenSet(oList);
            },

            selectAListItem: function(sBindingPath){

                this._WhenListLoadingIsDone.then(
                    function(){

                        var oList = this._oList, oSelectedItem;
                        if (oList.getMode() === "None") return;

                        oSelectedItem = oList.getSelectedItem();
                        if (oSelectedItem && oSelectedItem.getBindingContext().getPath() === sBindingPath)
                            return;

                        oList.getItems().some(function(oItem){
                            if (oItem.getBindingContext() && oItem.getBindingContext().getPath() === sBindingPath) {
                                oList.setSelectedItem(oItem);
                                return true;
                            }
                        }.bind(this),
                        
                        function(){
                            console.log("Not found item with the path");
                        });

                    }.bind(this)
                );

            },

            clearMasterListSelection: function(){
                this._oWhenListHasBeenSet.then(function(){
                    this._oList.removeSelection(true);
                }.bind(this));
            }

        });
        
	});
