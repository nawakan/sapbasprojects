sap.ui.define(
		["sap/ui/core/Control","sap/m/MessageBox"],
	function(Control,MessageBox) {
		"use strict";
		return Control.extend("testgooglemap.control.GoogleMap", {
			metadata: {
				properties: {
					//Externalize key in order to get it from parameters or OData or whatever 
					"key": "string", 
					"address": "string", 
					"defaultAdress": "string", 
					"title": { 
						"type": "string",
						"defaultValue": "Loading..."
					},
					"description": "string",
					/**
					 * Google Container
					 * width : Map width
					 * height : Map height
					 * **/
					"width": { 
						"type": "sap.ui.core.CSSSize",
						"defaultValue": "100%"
					},
					"height": { 
						"type": "sap.ui.core.CSSSize",
						"defaultValue": "450px"
					},
					"backgroundColor": { 
						"type": "sap.ui.core.CSSColor",
						"defaultValue": "#C6BEBE"
					},
					/**
					 * Google Variables
					 * @link(https://developers.google.com/maps/documentation/javascript/examples/map-simple)
					 * **/
					"mapType": { 
						"type": "string",
						"defaultValue": "roadmap"
					},

					"mapZoom": { 
						"type": "string",
						"defaultValue": "10"
                    }
				},
				aggregations: {
                    "markers" : {
                        "type" : "testgooglemap.control.GoogleMapMarker",
                        "multiple" : true,
                        "singularName" : "marker"
                    },
                    "circles" : {
                        "type" : "testgooglemap.control.GoogleMapCircle",
                        "multiple" : true,
                        "singularName" : "circle"
                    }
                }
			},
			init: function() {
                this._allMarkers = [];
            },
			renderer: function(oRm, oControl) {
				//Loading Style : we can externalise these Styles
				var sGlobalStyle = `width:${oControl.getWidth()};height:${oControl.getHeight()};background:${oControl.getBackgroundColor()}`; // Come on it's ES6 Mr SAP
				var sLoadingStyle = `color:#A09494;text-align:center;font-size:1rem;padding-top:2rem`;
				
				/**
				 * Target
				 * <div id='idoFThis' style='width:100%;height:400px;background:#C6BEBE'>
				 *	<h1>Loading ....</h1>
				 * </div>
				 * */
				oRm.write('<div');
				oRm.writeControlData(oControl);
				oRm.writeAttributeEscaped("style", sGlobalStyle);
				oRm.write('><h1');
				oRm.writeAttributeEscaped("style", sLoadingStyle);
				oRm.write(`>${oControl.getTitle()}</h1>`)
				oRm.write('</div>')
			},
			onAfterRendering: function() {
				// //No API Key : No Google Map
				if (!this.getKey()) {
					this._showError('No API Key');
					return;
                }
                
				var sBaseUrl = `https://maps.googleapis.com/maps/api/js?key=${this.getKey()}`, 
					fnInitialize = this.displayAdress.bind(this),
					fnOnError = this._showError.bind(this);
				 
				this._loadScript(sBaseUrl)
				.then(fnInitialize)
				.catch(fnOnError);
			},
			_loadScript: function(sUrl) {
				return new Promise(function(resolve, reject) {
					try {
						//Load only once
						if (google) {
							resolve();
						}
					} catch (e) {
						/**
						 * If Google library was not loaded we have something like 'ReferenceError'
						 * */
						if (e instanceof ReferenceError) {
							$.getScript(sUrl)
								.done(function(script, textStatus) {
									resolve();
								})
								.fail(function(jqxhr, settings, exception) {
									reject('Error while loading Google Maps');
								});
						}
					}
				})
			},
			_showError: function(sError){
				MessageBox.error( sError );
			},
			displayAdress: function() {
				var sAdress = this.getAddress();
				
				var fnResolver = this._showMap.bind(this),
					fnError = this._showError.bind(this);
				
				//Promise to Search Adress
				this._oSearchAdress = new Promise((resolve,reject)=>{
					var geocoder = new google.maps.Geocoder();
					geocoder.geocode({ address: sAdress }, 
					(results, status)=>{
						if (status == google.maps.GeocoderStatus.OK) {
							resolve(results);
							return;
						}
						reject(`"<u>${sAdress}</u>" : Not Found`);
					});
				});
				
				//Launch Searching
				this._oSearchAdress
				.then(fnResolver)
				.catch(fnError);
            },
            
			_showMap: function(aResults) {

				var oDocument = this.getDomRef(),
					sMapType = this.getMapType(),
					iZoom = parseInt(this.getMapZoom()),
					sAdress = this.getAddress(),
					oLocation = aResults[0].geometry.location; //Take the first Result for instance
				
				var mapOptions = {
					center: oLocation, 
					zoom: iZoom,
					mapTypeId: 'roadmap',
					fullscreenControl: false
                }
                
                var latlngStr, latlng = {};

                this._oMap = new google.maps.Map(oDocument, mapOptions)

                this.getMarkers().forEach( oMarker => {

                    latlngStr = oMarker.getLatlngStr().split(",", 2);
                    latlng = {
                        lat: parseFloat(latlngStr[0]),
                        lng: parseFloat(latlngStr[1]),
                    };

                    this._allMarkers.push({
                        type: "N",
                        marker: new google.maps.Marker({
                                    icon: { 
                                        url: oMarker.getUrlIcon(), 
                                        scaledSize: new google.maps.Size(
                                            oMarker.getResizeIconX(), 
                                            oMarker.getResizeIconY())
                                    },
                                    map: this._oMap,
                                    position: latlng,
                                    title: oMarker.getTitle(),
                                    animation: google.maps.Animation.DROP
                                })
                    });

                });

                this.getCircles().forEach( oCircle => {

                    latlngStr = oCircle.getLatlngStr().split(",", 2);
                    latlng = {
                        lat: parseFloat(latlngStr[0]),
                        lng: parseFloat(latlngStr[1]),
                    };
                       
                    new google.maps.Circle({

                        strokeColor: oCircle.getFillColor(),
                        strokeOpacity: 0.35,
                        strokeWeight: 0,
                        fillColor: oCircle.getFillColor(),
                        fillOpacity: 0.35,
                        map: this._oMap,
                        center: latlng,
                        radius: 3500, // m

                    });

                });

                this._oMap.setCenter(oLocation);
                
            },

            searchPlaces: function(oKeyword){
                if(!this._oSearchAdress) return;
                this._oKeyword = oKeyword;
                this._oSearchAdress.then(this._searchNearBy.bind(this));
            },

            _searchNearBy : function(aResults){

                var sLocation = aResults[0].geometry.location.toString();

                sLocation = sLocation.replace('(','');
                sLocation = sLocation.replace(')','');

                var urlParams = {
                    "location" : sLocation,
                    "keyword" : this._oKeyword,
                    "key" : this.getKey(),
                    "radius" : 37000
                };

                $.ajax({

                    // headers: {
                    //     "Origin" : "bridged.xyz"
                    // },
                    // url: "https://cors.bridged.cc/"+
                    // "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"+
                    // new URLSearchParams(urlParams).toString()

                    url: "/maps/api/place/nearbysearch/json?"+
                    new URLSearchParams(urlParams).toString()

                    // url: "/demoOdata/Northwind/Northwind.svc"

                }).then(this._showPlaces.bind(this), 
                function(data){debugger}.bind(this));

                // new sap.ui.model.odata.v2.ODataModel("/demoOdata/Northwind/Northwind.svc")
                // .read("/Orders",{
                //     success: function(data){debugger;},
                //     failed: function(data){debugger;}
                // });

            },

            _showPlaces: function(oData){
                debugger;
                if(!oData.results||oData.results.length<=0) return;

                for (let i = this._allMarkers.length-1;i>=0;i--) {

                    if(this._allMarkers[i].type!=="C") continue;

                    this._allMarkers[i].marker.setMap(null);
                    this._allMarkers.splice(i, 1);

                }

                oData.results.forEach(oResult => {

                    this._allMarkers.push({
                        type: "C",
                        marker: new google.maps.Marker({
                                    icon: { 
                                        url: "https://image.flaticon.com/icons/png/512/2778/2778455.png",
                                        //"https://image.flaticon.com/icons/png/512/1604/1604467.png", 
                                        scaledSize: new google.maps.Size(30,30)
                                    },
                                    map: this._oMap,
                                    position: oResult.geometry.location,
                                    title: oResult.name,
                                    animation: google.maps.Animation.DROP
                                })
                    });

                });

            }

		});
	}
);