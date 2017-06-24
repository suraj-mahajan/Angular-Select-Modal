var app = angular.module('plunker', ['ui.bootstrap']);

app.controller('MainCtrl', function($scope,$modal, $http) {
  
   $scope.open = function () {
        var modalInstance = $modal.open({
            templateUrl: 'contactsDetail.html',
            controller: 'ModalContactDetailController',
            resolve: {
                url: function () {
                    return "https://randomuser.me/api/?results=10"
                },
                pageSize: function () { return 10}
            }
        }).result.then(function (selectedLocale2) { 
            $scope.selectedLocale2 = selectedLocale2;
            console.log(selectedLocale2);
        });
        
	};
  
  
});




app.controller('ModalContactDetailController',function($scope,$http, $modalInstance,url,pageSize) {
   
    var _startIndex = 0;
    var _pageSize = pageSize;
    $scope.contact = null;

    $scope.Load = function () {
        console.log('sf');
        //$http.get(url + '?startIndex=' + _startIndex + '&pageSize=' + _pageSize).success(function (data) {
        //    console.log(data);
        //    if ($scope.contact == null) {
        //        $scope.contact = data;
        //    }
        //    else {
        //        for (var i = 0; i < data.length; i++) {
        //            $scope.contact.push(data[i]);
        //        }
        //    }
        //    _startIndex = _startIndex + pageSize;
        //});

        $http.get(url).success(function (data) {
            console.log(data);
            if ($scope.contact == null) {
                $scope.contact = data.results;
            }
            else {
                for (var i = 0; i < data.results.length; i++) {
                    $scope.contact.push(data.results[i]);
                }
            }
            _startIndex = _startIndex + pageSize;
        });
    }

    $scope.Load();

    $scope.LoadMore = function ()
    {
        $scope.Load();
    }
    $scope.selectLocale = function (item)
    {
        $modalInstance.close(item);
    }
    $scope.ok = function () {
        console.log($scope.contact);
        $modalInstance.close($scope.contact);
    };

});