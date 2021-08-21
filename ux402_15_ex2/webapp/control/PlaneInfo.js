sap.ui.define(["sap/ui/core/Control",
"ux40215ex2/control/PlaneInfoRenderer"],
function(Control, PlaneInfoRenderer){
	return Control.extend("ux40215ex2.control.PlaneInfo",{
		
		metadata:{
			properties:{
				"seatsMax":{type : "string"},
				"seatsOcc":{type : "string"},
				"planeType":{type : "string"}
			}
        },

        renderer: //PlaneInfoRenderer 
            function(oRm, oControl){    // or
                    debugger;
                    oRm.openStart("div", oControl);
                    oRm.openEnd("div", oControl);
                    oRm.openStart("table");
                    oRm.openEnd();
                    oRm.openStart("tr");
                    oRm.openEnd();
                    oRm.openStart("td");
                    oRm.openEnd();
                    oRm.icon("sap-icon://flight");
                    oRm.text(" "+oControl.getPlaneType());
                    oRm.close("td");
                    oRm.close("tr");
                    oRm.openStart("tr");
                    oRm.openEnd();
                    oRm.openStart("td");
                    oRm.openEnd();
                    oRm.icon("sap-icon://person-placeholder");
                    oRm.text(" "+oControl.getSeatsMax());
                    oRm.close("td");
                    oRm.close("tr");
                    oRm.openStart("tr");
                    oRm.openEnd();
                    oRm.openStart("td");
                    oRm.openEnd();
                    oRm.icon("sap-icon://suitcase");
                    oRm.text(" "+oControl.getSeatsOcc());
                    oRm.close("td");
                    oRm.close("tr");
                    oRm.close("table");
                    oRm.close("div");

                }

	});
});