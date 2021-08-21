sap.ui.define(["sap/m/Button"],
function(Button){
	return Button.extend("ux40215ex2.control.HoverButton",{
		
		metadata:{
			properties:{
				"allowHover":{type : "boolean", defaultValue : false},
				"hoverText":{type : "string"}
			},
			events:{"hover":{}}
        },
        
        onmouseover: function(oEvent){
            if(this.getAllowHover()){
                this.fireHover();
            }
        },

        renderer: {} // required
		
	});
});