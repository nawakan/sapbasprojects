sap.ui.define([
	"sap/ui/base/Object"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (BaseObject) {
		"use strict";

		return BaseObject.extend("ux402masterdetail.controller.ListSelector", {
            
            constructor: function(){

                this._oWhenListHasBeenSet = new Promise(function(fnResolve){
                    this._fnResolveListHasBeenSet = fnResolve;  
                    // ยังไม่ resolved จนกว่าจะ call this._fnResolveListHasBeenSet 
                }.bind(this));

                this.oWhenListLoadingIsDone = new Promise(function(fnResolve, fnReject){
                    this._oWhenListHasBeenSet.then(function(oList){

                        var oFirstListItem = oList.getItems()[0];
                        if (oFirstListItem) {
                            fnResolve({
                                list: oList,
                                firstListItem: oFirstListItem
                            });
                        }
                        else{
                            fnReject({
                                list: oList,
                                error: true
                            });
                        }

                        // oList.getBinding("items").attachEventOnce("dataReceived",
                        //     function(oData){
                        //         if (!oData.getParameter("data")) {
                        //             fnReject({
                        //                 list: oList,
                        //                 error: true
                        //             });
                        //         }

                        //         var oFirstListItem = oList.getItems()[0];
                        //         if (oFirstListItem) {
                        //             fnResolve({
                        //                 list: oList,
                        //                 firstListItem: oFirstListItem
                        //             });
                        //         }
                        //         else{
                        //             fnReject({
                        //                 list: oList,
                        //                 error: true
                        //             });
                        //         }

                        //     }
                        // );
                        //
                    })
                }.bind(this));

            },

            setBoundMasterList: function(oList){
                this._oList = oList;
                this._fnResolveListHasBeenSet(oList);   // execute resolve ถือว่า promise เสร็จ
            },

            clearMasterListSelector: function(){
                this._oWhenListHasBeenSet.then(function(oList){
                    oList.removeSelections(true);
                }.bind(this));
            },

            selectAListItem: function(sBindingPath){
                this._oWhenListHasBeenSet.then(
                    function(oList){
                        if(oList.getMode()==='None'){
                            return;
                        }

                        var oSelectItem = oList.getSelectedItem();

                        if (oSelectItem && 
                            oSelectItem.getBindingContext().getPath()===sBindingPath) {
                            return;
                        }

                        oList.getItems().some(function(oItem){
                            if (oItem.getBindingContext() 
                            && oItem.getBindingContext().getPath()===sBindingPath) {
                                oList.setSelectedItem(oItem);
                                return true;
                            }
                        });

                    }.bind(this)
                );
            }

		});
	});
