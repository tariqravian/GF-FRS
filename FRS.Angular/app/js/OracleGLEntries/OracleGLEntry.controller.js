﻿/**=========================================================
 * Module: load meta data
 * Load Meta Data view Controller
 =========================================================*/

(function () {
    'use strict';

    var core = angular.module('app.core');
    // ReSharper disable FunctionsUsedBeforeDeclared
    core.lazy.controller('OracleGlEntryController', OracleGlEntryController);

    OracleGlEntryController.$inject = ['$rootScope', '$scope', '$state', 'uiGridConstants', 'OracleGlEntryService'];

// ReSharper disable once InconsistentNaming
    function OracleGlEntryController($rootScope, $scope, $state, uiGridConstants, OracleGlEntryService) {
        //window.OracleEntry = undefined;
        $rootScope.app.OracleEntry = undefined;
        var vm = this;

        //datepicker
        vm.today = function () {
            vm.dt = new Date();
        };
        vm.today();

        vm.clear = function () {
            vm.dt = null;
        };

        // Disable weekend selection
        vm.disabled = function (date, mode) {
            return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
        };
        vm.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened = true;
        };

        vm.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        vm.initDate = new Date();
        vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        vm.format = vm.formats[0];


        //ui-select
        vm.disabled = undefined;
        vm.Status = {};
        vm.Statuses = [
          { Id: '1', Name: 'Inactive'},
          { Id: '2', Name: 'Active'},
          { Id: '5', Name: 'Pending'}
        ];


        //ui-grid
        var paginationOptions = {
            'params': {
                SortBy: 0,
                SearchString: '',
                IsAsc: true,
                PageNo: 1,
                PageSize: 10,
                sort: null,
            },

        };
        vm.gridOptions = {
            paginationPageSizes: [10, 25, 50, 100, 500],
            paginationPageSize: 10,
            enableSorting: true,
            //suppressRemoveSort: true,
            multiSelect: false,
            modifierKeysToMultiSelect: false,
            noUnselect: true,
            useExternalPagination: true,
            useExternalSorting: true,
            //enableFiltering: true,
            flatEntityAccess: true,
            //fastWatch: true,
            enableGridMenu: true,
            enableColumnMenus: false,

            //useExternalFiltering: true,
            columnDefs: [
                // name is for display on the table header, field is for mapping as in 
                //sortId is kept locally it is not the property of ui.grid
              {
                  displayName: 'ID',
                  field: 'OracleGLEntryId', sortId: 0, enableSorting: true
              },
                {
                    displayName: 'Account Load Id',
                    field: 'OracleGLLoadId', sortId: 1, enableSorting: true,
                    cellTemplate: '<div class="ui-grid-cell-contents">' +
                    '<a ui-sref="app.OracleGlLoadDetail({Id : row.entity.OracleGLLoadId})">{{row.entity.OracleGLLoadId}}</a>' +
                    '</div>'
                },
              { name: 'Unique Ref. Key', field: 'UniqueReferenceKey', sortId: 2, enableSorting: true },
              { name: 'A/C#', field: 'AccountNumber', sortId: 3, enableSorting: true },
              { name: 'Period', field: 'Period', sortId: null, enableSorting: false },
              { name: 'Year', field: 'Year', sortId: null, headerCellClass: 'grid-align-right', enableSorting: false },
              { name: 'Currency', field: 'Currency', sortId: null, enableSorting: false },
              { name: 'Amount', field: 'Amount', sortId: null, enableSorting: false, headerCellClass: 'grid-align-right', cellFilter: 'number : 2' },
              { displayName: 'JE Created', field: 'JECreationDate', sortId: null, enableSorting: false },
              { displayName: 'JE Updated', field: 'JELastUpdateDate', sortId: null, enableSorting: false },
              {
                  name: 'Type', field: 'Type', sortId: 4, headerCellClass: 'grid-align-right',
                  cellTemplate: "<div class='ui-grid-cell-contents text-right'><label class='label' ng-class=" + '"' + "{'bg-green-light':row.entity.Type == 'Credit', 'bg-primary-light' : row.entity.Type == 'Debit'}" + '"' + ">{{row.entity.Type}}</label></div>"
              },
              {
                  name: 'Actions', enableSorting: false, cellTemplate: '<div class="ui-grid-cell-contents text-center"><div class="btn btn-xs">' +
                    '<a ui-sref="app.OracleGlEntryDetail({Id : row.entity.OracleGLEntryId})" class="btn btn-xs btn-info"><i class="fa fa-search"></i></a>' +
                    '</div></div>',
                  headerCellClass: 'text-center'
              }
            ],
            onRegisterApi: function (gridApi) {
                vm.gridApi = gridApi;
                vm.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    if (sortColumns.length == 0) {
                        paginationOptions.params.sort = null;
                        paginationOptions.params.SortBy = 0;
                    } else {
                        paginationOptions.params.sort = sortColumns[0].sort.direction;
                        var temp = -1;
                        angular.forEach(vm.gridOptions.columnDefs, function (value, key) {
                            if (temp == -1)
                                if (value.field == sortColumns[0].field) {
                                    paginationOptions.params.SortBy = value.sortId;
                                    temp = 0;
                                }
                        });

                    }
                    getPage();
                });
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    paginationOptions.params.PageNo = newPage;
                    paginationOptions.params.PageSize = pageSize;
                    getPage();
                });
            }
        };
        var getPage = function () {
            switch (paginationOptions.params.sort) {
                case uiGridConstants.ASC:
                    paginationOptions.params.IsAsc = true;
                    break;
                case uiGridConstants.DESC:
                    paginationOptions.params.IsAsc = false;
                    break;
                default:
                    //url = '/data/100.json';
                    break;
            }

            OracleGlEntryService.getGridData(function (data) {
                    vm.gridOptions.totalItems = data.TotalCount;
                    vm.gridOptions.data = data.OracleGlEntries;
            }, null, paginationOptions);

            
        };

        $scope.resetFilter = function () {
            vm.dt = null;
            //vm.name = '';
            vm.Status.selected = null;

            paginationOptions.params.IsAsc = true;
            paginationOptions.params.PageNo = 1;
            paginationOptions.params.sort = null;
            paginationOptions.params.SortBy = 0;
            getPage();
        }

        $scope.fiterData = function () {
            //paginationOptions.params.Name = vm.name;
            //paginationOptions.params.CreatedDate = vm.dt;
            paginationOptions.params.StatusId = vm.Statuses.selected == null ? 0 : vm.Status.selected.Id;
            getPage();
        }

        $scope.resetFilter();


    }
})();