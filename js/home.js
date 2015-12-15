// Создаем главный модуль приложения angular. Передаем ему несколько нужных зависимостей: для построения диаграмм, для работы с сессиями и кукис, для возможности перемещения блоков с графиками по странице.
var crossApp = angular.module('crossApp', ['angularCharts', 'ngCookies', 'ngDragDrop']);

// Создаем контроллер 'CrossCtrl', с функциями для построения графиков и с функцией разлогинивания пользователя.
crossApp.controller('CrossCtrl', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies)
{
    //  Получаем значение сессион-id из файла login.js, с помощью метода $cookies.get. Записываем его в переменную sessionId. Переменная sessionId, нигде не будет выводится, поэтому она создается с помощью ключевого слова 'var'.
    var sessionId = $cookies.get('sessionId');
    // В переменную $scope.userName, записываем значение 'userName', введенное пользователем. Данная переменная создается через $scope, т.к. она с помощью директивы ng-model, выводит свое значение на странице home.html.
    // Т.е. на данной странице будет отображено имя вошедшего пользователя. Рядом с кнопкой 'logout'.
    $scope.userName = $cookies.get('userName');

    // Основные настройки отображения графиков диаграмм. Для всех 4-х идентичные.
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

    // Функция рисования первого графика.
    $scope.updateChart1 = function()
    {
        // С помощью сервиса $http отправляется запрос серверной части приложения, по указанному url(http://localhost:8080/salesmandata?sessionid='+sessionId).
        $http(
        {
            method: 'GET',
            url: 'http://localhost:8080/salesmandata?sessionid='+sessionId
        }).then(function successCallback(response) 
        {
            // В случае успешного ответа от сервера:
            if (response.data.resultDescription == 'SUCCESS')
            {
                // В переменную chartData, собираем отсортированный массив(находящийся на сервере java), по указанному условию, для первого графика. Количество продаж, всех продавцов. Выявление наиболее успешных.
                var chartData = response.data.data.map(function(item){return {x: item[0], y: [item[1]*1]} })
                // Переменная-объект $scope.chart1Data, содержит два поля. Первое: для вывода значений в диаграмме. В данном случае это поле содержит значения 'Value', по всем продажам, из отсортированного массива.
                // Второе содержит сам отсортированный массив. Для построения графика и передачи его, в атрибут - data-ac-data="chart1Data", блока для вывода диаграммы.
                $scope.chart1Data={
                    series: ['Value'],
                    data: chartData
                }

            }
            //В случае каких-либо ошибок с сервера (не было возвращено значение "SUCCESS" в поле resultDescription ответа), срабатывает error callback, выводящий сообщение с помощью оператора 'alert'.
            else
            {
                alert('failed');
            } // Error callback функция, сервиса $http. В случае ошибки отдачи страницы.
        }).catch( function errorCallback(response) 
        {
        });
    }

    // Функция рисования второго графика. Количество продаж, по месяцам.
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

    // Функция рисования третьего графика. Вывод 5 лучших продаж.
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

    // Функция рисования четвертого графика. Вывод 5 лучших продавцов.
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

    // Функция разлогинивания пользователя.
    $scope.logout = function()
    {
        // С помощью сервиса $http отправляется запрос серверной части приложения, по указанному url(http://localhost:8080/logout?sessionid='+sessionId).
        // В ответе ожидается 'SUCCESS'.
        $http(
        {
            method: 'GET',
            // Медод transformResponse, обрезает все данные в ответе от сервера, оставляя только текст. В данном случае SUCCESS, без фигурных скобок {}.
            transformResponse: [function(data){return data}],
            url: 'http://localhost:8080/logout?sessionid='+sessionId
        }).then(function successCallback(response) 
        {
            // Если получаем 'SUCCESS', разлогиниваем пользователя. Уничтожаем переменные - 'userName', 'sessionId'. С помощью метода $cookies.remove.
            // Делаем перенаправление на страницу с вводом логина/пароля.
            if (response.data == 'SUCCESS')
            {
                location.href = '/crossoverApp/';
                $cookies.remove('userName');
                $cookies.remove('sessionId');
            }
            // В случае не получения 'SUCCESS', выводим сообщение об ошибке.
            else
            {
                alert('logout failed');
            } // Также выводим сообщение об ошибке, в функции error callback, сервиса $http.
        }).catch( function errorCallback(response) 
        {
                alert('logout failed');  
        });
    }

    // При первом открытии страницы home.html, функции рисования графиков, вызываются функцией-конструктором контроллера CrossCtrl, для первоначального отображения графиков.
    $scope.updateChart1();
    $scope.updateChart2();
    $scope.updateChart3();
    $scope.updateChart4();
}]);