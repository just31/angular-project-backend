// ������� ������� ������ ���������� angular. �������� ��� ��������� ������ ������������: ��� ���������� ��������, ��� ������ � �������� � �����, ��� ����������� ����������� ������ � ��������� �� ��������.
var crossApp = angular.module('crossApp', ['angularCharts', 'ngCookies', 'ngDragDrop']);

// ������� ���������� 'CrossCtrl', � ��������� ��� ���������� �������� � � �������� �������������� ������������.
crossApp.controller('CrossCtrl', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies)
{
    //  �������� �������� �������-id �� ����� login.js, � ������� ������ $cookies.get. ���������� ��� � ���������� sessionId. ���������� sessionId, ����� �� ����� ���������, ������� ��� ��������� � ������� ��������� ����� 'var'.
    var sessionId = $cookies.get('sessionId');
    // � ���������� $scope.userName, ���������� �������� 'userName', ��������� �������������. ������ ���������� ��������� ����� $scope, �.�. ��� � ������� ��������� ng-model, ������� ���� �������� �� �������� home.html.
    // �.�. �� ������ �������� ����� ���������� ��� ��������� ������������. ����� � ������� 'logout'.
    $scope.userName = $cookies.get('userName');

    // �������� ��������� ����������� �������� ��������. ��� ���� 4-� ����������.
    $scope.config =
    {
        title: '',
        tooltips: true,
        labels: true,
        legend: {
            display: true,
            position: 'left'
        }
    };

    // ������� ��������� ������� �������.
    $scope.updateChart1 = function()
    {
        // � ������� ������� $http ������������ ������ ��������� ����� ����������, �� ���������� url(http://localhost:8080/salesmandata?sessionid='+sessionId).
        $http(
        {
            method: 'GET',
            url: 'http://localhost:8080/salesmandata?sessionid='+sessionId
        }).then(function successCallback(response) 
        {
            // � ������ ��������� ������ �� �������:
            if (response.data.resultDescription == 'SUCCESS')
            {
                // � ���������� chartData, �������� ��������������� ������(����������� �� ������� java), �� ���������� �������, ��� ������� �������. ���������� ������, ���� ���������. ��������� �������� ��������.
                var chartData = response.data.data.map(function(item){return {x: item[0], y: [item[1]*1]} })
                // ����������-������ $scope.chart1Data, �������� ��� ����. ������: ��� ������ �������� � ���������. � ������ ������ ��� ���� �������� �������� 'Value', �� ���� ��������, �� ���������������� �������.
                // ������ �������� ��� ��������������� ������. ��� ���������� ������� � �������� ���, � ������� - data-ac-data="chart1Data", ����� ��� ������ ���������.
                $scope.chart1Data={
                    series: ['Value'],
                    data: chartData
                }

            }
            //� ������ �����-���� ������ � ������� (�� ���� ���������� �������� "SUCCESS" � ���� resultDescription ������), ����������� error callback, ��������� ��������� � ������� ��������� 'alert'.
            else
            {
                alert('failed');
            } // Error callback �������, ������� $http. � ������ ������ ������ ��������.
        }).catch( function errorCallback(response) 
        {
        });
    }

    // ������� ��������� ������� �������. ���������� ������, �� �������.
    $scope.updateChart2 = function()
    {
        $http(
        {
            method: 'GET',
            url: 'http://localhost:8080/lastyeardata?sessionid='+sessionId
        }).then(function successCallback(response) 
        {
            if (response.data.resultDescription == 'SUCCESS')
            {
                var chartData = response.data.data.map(function(item){return {x: item[0], y: [item[1]*1]} })
                $scope.chart2Data={
                    series: ['Value'],
                    data: chartData
                }

            } else
            {
                alert('failed');
            }
        }).catch( function errorCallback(response) 
        {
        });
    }

    // ������� ��������� �������� �������. ����� 5 ������ ������.
    $scope.updateChart3 = function()
    {
        $http(
        {
            method: 'GET',
            url: ' http://localhost:8080/topsalesorders?sessionid='+sessionId
        }).then(function successCallback(response) 
        {
            if (response.data.resultDescription == 'SUCCESS')
            {
                var chartData = response.data.data.map(function(item){return {x: item.orderNum, y: [item.value*1, item.qty*1]} })
                $scope.chart3Data={
                    series: ['Quantity', 'Value'],
                    data: chartData
                }

            } else
            {
                alert('failed');
            }
        }).catch( function errorCallback(response) 
        {
        });
    }

    // ������� ��������� ���������� �������. ����� 5 ������ ���������.
    $scope.updateChart4 = function()
    {
        $http(
        {
            method: 'GET',
            url: 'http://localhost:8080/topsalesmen?sessionid='+sessionId
        }).then(function successCallback(response) 
        {
            if (response.data.resultDescription == 'SUCCESS')
            {
                var chartData = response.data.data.map(function(item){return {x: item[0], y: [item[1]*1]} })
                $scope.chart4Data={
                    series: ['Value'],
                    data: chartData
                }

            } else
            {
                alert('failed');
            }
        }).catch( function errorCallback(response) 
        {
        });
    }

    // ������� �������������� ������������.
    $scope.logout = function()
    {
        // � ������� ������� $http ������������ ������ ��������� ����� ����������, �� ���������� url(http://localhost:8080/logout?sessionid='+sessionId).
        // � ������ ��������� 'SUCCESS'.
        $http(
        {
            method: 'GET',
            // ����� transformResponse, �������� ��� ������ � ������ �� �������, �������� ������ �����. � ������ ������ SUCCESS, ��� �������� ������ {}.
            transformResponse: [function(data){return data}],
            url: 'http://localhost:8080/logout?sessionid='+sessionId
        }).then(function successCallback(response) 
        {
            // ���� �������� 'SUCCESS', ������������� ������������. ���������� ���������� - 'userName', 'sessionId'. � ������� ������ $cookies.remove.
            // ������ ��������������� �� �������� � ������ ������/������.
            if (response.data == 'SUCCESS')
            {
                location.href = '/crossoverApp/';
                $cookies.remove('userName');
                $cookies.remove('sessionId');
            }
            // � ������ �� ��������� 'SUCCESS', ������� ��������� �� ������.
            else
            {
                alert('logout failed');
            } // ����� ������� ��������� �� ������, � ������� error callback, ������� $http.
        }).catch( function errorCallback(response) 
        {
                alert('logout failed');  
        });
    }

    // ��� ������ �������� �������� home.html, ������� ��������� ��������, ���������� ��������-������������� ����������� CrossCtrl, ��� ��������������� ����������� ��������.
    $scope.updateChart1();
    $scope.updateChart2();
    $scope.updateChart3();
    $scope.updateChart4();
}]);