sap.ui.define("sap.fe.demo.bookinganalysis.AnalyticalListPageExt", [], function() {
    return {
        onBeforeRebindTableExtension: function(oEvent){
            console.log('onBeforeRebindTableExtension called!');
        },
        onAction01: function(){

            if(!this._oMap){
                this._oMap = sap.ui.xmlfragment( "mapfrag",
                    "sap.fe.demo.bookinganalysis.fragment.MapShow", this
                );
                this.getView().addDependent(this._oMap);
            }

            this._oMap.open();

        },

        onClose: function(){
            if(!this._oMap) return;
            this._oMap.close();
        }

    }
})