sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
    "zdynamicpage15/model/models",
    "zdynamicpage15/controller/ListSelector"
], function (UIComponent, Device, models, ListSelector) {
	"use strict";

	return UIComponent.extend("zdynamicpage15.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {

            this.oListSelector = new ListSelector();

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
            this.setModel(models.createDeviceModel(), "device");
            
		}
	});
});
