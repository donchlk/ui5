sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("gruppe3.controller.Main", {
            onInit: function () {

            //    var oModel = new sap.ui.model.json.JSONModel();
            //    oModel.loadData("data/artists2.json", {}, false);
            //    this.getView().setModel(oModel, "artMod");
            //    var oModel2 = new sap.ui.model.json.JSONModel();
            //    oModel2.setData({
            //        "movie": {},
            //        "artist": {}
            //    });
            //    this.getView().setModel(oModel2, "movSng");
            },
    
            onExpandFirstLevel: function() {
                var oTreeTable = this.byId("ttab1");
                oTreeTable.expandToLevel(1);
            },
    
            onCollapseAll: function() {
                var oTreeTable = this.byId("ttab1");
                oTreeTable.collapseAll();
            },
    
            onExpandSelection: function() {
                var oTreeTable = this.byId("ttab1");
                oTreeTable.expand(oTreeTable.getSelectedIndices());
            },

            onListItemPress: function (oEvent) {
                MessageToast.show("Artikel : " + oEvent.getSource().getTitle() + " wurde bestellt");
            }
            
            
        });
    });
