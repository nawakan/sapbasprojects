sap.ui.define(
		["sap/ui/core/Control","sap/m/MessageBox"],
	function(Control,MessageBox) {
		"use strict";
		return Control.extend("testgooglemap.control.GoogleMapMarker", {
			metadata: {
				properties: {
                    "latlngStr" : "string",
                    "urlIcon" : {
                        "type" : "string",
                        "defaultValue" :  "https://image.flaticon.com/icons/png/512/198/198479.png"
                    },
                    "resizeIconX" : {
                        "type" : "string",
                        "defaultValue" : "30"
                    },
                    "resizeIconY" : {
                        "type" : "string",
                        "defaultValue" : "30"
                    },
                    "title" : "string"
				},
				aggregations: {
                }
			}
		});
	}
);