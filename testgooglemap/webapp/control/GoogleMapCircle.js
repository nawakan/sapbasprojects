sap.ui.define(
		["sap/ui/core/Control","sap/m/MessageBox"],
	function(Control,MessageBox) {
		"use strict";
		return Control.extend("testgooglemap.control.GoogleMapCircle", {
			metadata: {
				properties: {
                    "latlngStr" : "string",
                    "fillColor" : {
                        "type" : "string",
                        "defaultValue" : "red"
                    }
				},
				aggregations: {
                }
			}
		});
	}
);