
    {
      "type": "submit",
      "style": "btn-info",
      "title": "OK"
    }
  ];

  $scope.data = {};

  $scope.setModel = function () {
    var method = 'GET';
    var url = 'configData';
    $http({
      method: method,
      url: url,
    }).success(function (data, status) {
      $scope.model = data;
    }).error(function (data, status) {
      $scope.model = {};
    });
  };

  $scope.setModel();

  $scope.onSubmit = function(form, model) {
    // First we broadcast an event so all fields validate themselves
    $scope.$broadcast('schemaFormValidate');

    // Then we check if the form is valid
    if (form.$valid) {
      $scope.method = 'POST';
      $scope.url = 'Submit';

      $scope.code = null;
      $scope.response = null;

      $http({
        method: $scope.method,
        url: $scope.url,
        cache: $templateCache,
        data: $scope.model
      }).
      success(function(data, status) {
        $scope.status = status;
        $scope.data = data;
        alert("You did it! Your applications should be updated within a minute or so.");
      }).
      error(function(data, status) {
        $scope.data = data || "Request failed";
        $scope.status = status;
        if ($scope.status == "300") {
          alert($scope.data);
          $scope.setModel();
        }
      });
    }
  };
});
