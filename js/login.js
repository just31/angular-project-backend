// ������� ���������� 'LoginCtrl', ���������� �� ����������� ����������������� �������������.
// � ������ ������������ ������� �����������, ����������� 2 ���. ����������� �� �������� angular - $http, $cookies.
// $http, ����� ��� ������� � ��������, ��������� ajax-��������. �.�. �� ��������� ������ ������ �� ���������� url. � �������� �������� ������ �� �������.
// $cookies, ���� ������ ����� ��� ������ � �������� � �����. ����� ������������ ������ �����, � ����� home.html ������������ �������������� ���������� angular - angular-cookies.min.js.
crossApp.controller('LoginCtrl', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {
    // ������� ���������� ��� ������ ��������� - ����� � ������ ������������.
    $scope.userName = null,
    $scope.pass = null,

    // ������� �����������
    $scope.login = function()
    {
        // ������ $http ���������� ������ � backend'�, �� ���������� url(http://localhost:8080/login?username='+$scope.userName+'&password='+$scope.pass)
        // � �������� (� ������ �������� �������������� ��������) ������������� ������ ������������.
        $http(
        {
            method: 'GET',
            url: 'http://localhost:8080/login?username='+$scope.userName+'&password='+$scope.pass
        }).then(function successCallback(response) 
        {
            if (response.data.loginSucceeded)
            {
                // ������������� ������ ����������� ����� ������ $cookies � ��������.
                $cookies.put('sessionId', response.data.sessionId);
                // � 'userName', ����������� ��, ��� ���� ������������.
                $cookies.put('userName', $scope.userName);
                // � ������ �������� ��������������, ���������� ������� �� �������� � ��������� home.html.
                location.href = '/crossoverApp/home.html'
            } else
            {
                 // � ������ �� �������� ��������������, �������� ��������� �� ������.
                 alert('login failed');
            }

        }, function errorCallback(response)
        {
            // ����� � ������ �� �������� ��������������, �������� ��������� �� ������. � errorCallback �������, ������� $http.
            alert('login failed');
        });
    }

}]);