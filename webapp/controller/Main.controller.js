sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast',
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, Filter, FilterOperator, JSONModel) {
        "use strict";

        return Controller.extend("gruppe3.controller.Main", {
            onInit: function () {
            /*   var oModel.read("/V2/(S(oapt5dw0x0cksdamotodqh2m))/OData/OData.svc/", {
                    success: function(oRetrievedResult) { alert("YES") },
                    error: function(oError) {alert("NO")}
                  }); */

                  var oModel = this.getOwnerComponent().getModel();
                  this.getView().setModel(oModel);
              
                  var sEntitySet = "/Products"; // これはあなたが$expandしたいエンティティセットの名前に基づいて変更する必要があります
                  var sExpandParameters = "Category,Supplier"; // これは展開したい関連エンティティの名前に基づいて変更する必要があります
              
                  // モデルのreadメソッドを使用してデータを取得
                  oModel.read(sEntitySet, {
                      urlParameters: {
                          "$expand": sExpandParameters
                      },
                      success: function(oData, response) {
                          // ここで成功時の処理を行います。
                          // 必要に応じてデータをビューモデルやJSONモデルにセットします。
                      },
                      error: function(oError) {
                          // ここでエラー時の処理を行います。
                          console.log(oError);
                      }
                  });
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
    
            // onSelectionChange: function (oEvent) {
            //     var oList = oEvent.getSource();
            //     var oLabel = this.byId("idFilterLabel");
            //     var oInfoToolbar = this.byId("idInfoToolbar");
    
            //     // With the 'getSelectedContexts' function you can access the context paths
            //     // of all list items that have been selected, regardless of any current
            //     // filter on the aggregation binding.
            //     var aContexts = oList.getSelectedContexts(true);
    
            //     // update UI
            //     var bSelected = (aContexts && aContexts.length > 0);
            //     var sText = (bSelected) ? aContexts.length + " selected" : null;
            //     oInfoToolbar.setVisible(bSelected);
            //     oLabel.setText(sText);
            // },

            calcPrice: function(oEvent){
               var value = 
                alert(oEvent.mParameters.newValue);
                this.getView().byId("_IDGenInput1").setValue();

            },

           

            onCategorySelectionChange: function(oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                if(oSelectedItem) {
                    var sCategoryName = oSelectedItem.getText();
                    this._applyFilter(sCategoryName ? new Filter("Category/Name", FilterOperator.Contains, sCategoryName) : null);
                } else {
                    this._clearFilter();
                }
            },
            
            onSupplierSelectionChange: function(oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                if(oSelectedItem) {
                    var sSupplierName = oSelectedItem.getText();
                    this._applyFilter(sSupplierName ? new Filter("Supplier/Name", FilterOperator.Contains, sSupplierName) : null);
                } else {
                    this._clearFilter();
                }
            },
            
            _applyFilter: function(oFilter) {
                var oList = this.getView().byId("idList");
                var oBinding = oList.getBinding("items");
                if(oFilter) {
                    oBinding.filter([oFilter]);
                } else {
                    this._clearFilter();
                }
            },
            
            _clearFilter: function() {
                var oList = this.getView().byId("idList");
                var oBinding = oList.getBinding("items");
                oBinding.filter([]);
            },

            openSortDialog: function() {
                if (!this._oSortDialog) {
                    this._oSortDialog = sap.ui.xmlfragment("gruppe3.view.SortDialog", this);
                    this.getView().addDependent(this._oSortDialog);
                }
                this._oSortDialog.open();
            },
            
            onSortSelect: function(oEvent) {
                var sSelectedItem = oEvent.getParameter("listItem").getTitle();
            
                this._sSortKey = {
                    "Name": "Name",
                    "Price": "Price",
                    // "Id": "ProductId" // 
                }[sSelectedItem];
            
                this._bDescendingSort = !this._bDescendingSort; 
            },
            
            onSortDialogConfirm: function() {
                var oList = this.getView().byId("idList");
                var oBinding = oList.getBinding("items");
            
                var oSorter = new sap.ui.model.Sorter(this._sSortKey, this._bDescendingSort);
            
                oBinding.sort(oSorter);
            
                this._oSortDialog.close();
                this._oSortDialog.destroy();
                this._oSortDialog = null;
            },
            
            onSortDialogClose: function() {
                this._oSortDialog.close();
                this._oSortDialog.destroy();
                this._oSortDialog = null;
            },

            openDetailDialog: function(oEvent) {
                if (!this._oDetailDialog) {
                    this._oDetailDialog = sap.ui.xmlfragment("gruppe3.view.DetailDialog", this);
                    this.getView().addDependent(this._oDetailDialog);
                }
                
                var oListItem = oEvent.getSource();
                var oBindingContext = oListItem.getBindingContext();
            
                this._oDetailDialog.setBindingContext(oBindingContext);
                this._oDetailDialog.open();
            },
            
            closeDetailDialog: function() {
                this._oDetailDialog.close();
                this._oDetailDialog.destroy();
                this._oDetailDialog = null;
            },

            onSupplierProductPress: function(oEvent) {
                // クリックされたリストアイテムのバインディングコンテキストを取得
                var oListItem = oEvent.getSource();
                var oBindingContext = oListItem.getBindingContext();
            
                // 詳細ダイアログにバインディングコンテキストを再設定
                this._oDetailDialog.setBindingContext(oBindingContext);
            
                // 詳細ダイアログの内容が自動的に更新されます
            }
            
            
            
            
        });
    });
