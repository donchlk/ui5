sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast',
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("gruppe3.controller.Main", {
            onInit: function () {

            },
    
            onSearch: function (oEvent) {
                // add filter for search
                var aFilters = [];
                var sQuery = oEvent.getSource().getValue();
                if (sQuery && sQuery.length > 0) {
                    var filter = new Filter("Name", FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }
    
                // update list binding
                var oList = this.byId("idList");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilters, "Application");
            },
    
            onSelectionChange: function (oEvent) {
                var oList = oEvent.getSource();
                var oLabel = this.byId("idFilterLabel");
                var oInfoToolbar = this.byId("idInfoToolbar");
    
                // With the 'getSelectedContexts' function you can access the context paths
                // of all list items that have been selected, regardless of any current
                // filter on the aggregation binding.
                var aContexts = oList.getSelectedContexts(true);
    
                // update UI
                var bSelected = (aContexts && aContexts.length > 0);
                var sText = (bSelected) ? aContexts.length + " selected" : null;
                oInfoToolbar.setVisible(bSelected);
                oLabel.setText(sText);
            },

            onSelectionChange: function(){
                var list,
                binding,
                filter;
                list = this.getView().byId("idList");
                filter = new sap.ui.model.Filter("lastName",sap.ui.model.FilterOperator.Contains , "D");
                binding = list.getBinding("items");
                binding.filter(filter,"Application");
                binding.refresh(true);
            }
            
            
        });
    });
