sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "testgooglemap/control/GoogleMapMarker",
    "testgooglemap/control/GoogleMapCircle"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, GoogleMapMarker, GoogleMapCircle) {
		"use strict";

		return Controller.extend("testgooglemap.controller.View1", {

			onInit: function () {

			},

            onAddCoordinate: function(){
                this.byId("mapId").addMarker(new GoogleMapMarker({ 
                    latlngStr: this.byId("gpsIp").getValue()
                }));
            },

            onAddArea: function(){
                this.byId("mapId").addCircle(new GoogleMapCircle({ 
                    latlngStr: this.byId("gpsIp").getValue(),
                    fillColor: this.byId("colorIp").getValue(),
                }));
            },

            onSearchPlaces: function(){
                this.byId("mapId").searchPlaces(this.byId("keywordIp").getValue());
            },

            onSelectBasedChange: function(oEvent){

                var odVbox = this.byId("dVboxId"),
                otVbox = this.byId("tVboxId"),
                bBasedDelay = oEvent.getParameter("selectedItem").getKey()=="D" ? true:false;

                odVbox.setVisible(bBasedDelay);
                otVbox.setVisible(!bBasedDelay);
                
            }

		});
	});
