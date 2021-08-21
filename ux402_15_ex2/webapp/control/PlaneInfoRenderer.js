sap.ui.define(["sap/ui/core/Renderer"],
function(Renderer){

    var oPlaneInfoRenderer = Renderer.extend("ux40215ex2.control.PlaneInfoRenderer");

    oPlaneInfoRenderer.apiVersion = 2;

    oPlaneInfoRenderer.render = function(oRm, oControl){

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

    };

    return oPlaneInfoRenderer;

});