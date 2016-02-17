﻿(function() {
    angular
        .module('app.Users')
        .service('UsersService', UsersService);

    UsersService.$inject = ['$http'];
    function UsersService($http) {
        this.getUsers = getUsers;
        this.getBaseData = getBaseData;
        this.paginationOpts = {};

        function getUsers(onSuccess, onError) {
            var url = window.frsApiUrl + '/api/Users';

            onError = onError || function () { alert('Failure loading Data'); };
            //onSuccess = onSuccess || function () { alert('Loading Complete'); };


            $http
              .get(url, this.paginationOpts)
              .success(onSuccess)
              .error(onError);
        }

        function getBaseData(onSuccess, onError) {
            var url = window.frsApiUrl + '/api/UserBaseData';
            onError = onError || function () { alert('Failure loading Data'); };

            $http
                .get(url)
                .success(onSuccess)
                .error(onError);
        }
    }

})();