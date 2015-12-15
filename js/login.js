// Создаем контроллер 'LoginCtrl', отвечающий за авторизацию привилигированных пользователей.
// В списке зависимостей данного контроллера, указываются 2 доп. зависимости от сервисов angular - $http, $cookies.
// $http, нужен для общения с сервером, наподобие ajax-запросов. Т.е. он позволяет делать запрос по указанному url. И получать обратные данные от сервера.
// $cookies, этот сервис нужен для работы с сессиями и кукис. Чтобы использовать данный метод, в файле home.html подключается дополнительная библиотека angular - angular-cookies.min.js.
crossApp.controller('LoginCtrl', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {
    // Создаем переменные для записи введенных - имени и пароля пользователя.
    $scope.userName = null,
    $scope.pass = null,

    // Функция авторизации
    $scope.login = function()
    {
        // Сервис $http отправляет запрос к backend'у, по указанному url(http://localhost:8080/login?username='+$scope.userName+'&password='+$scope.pass)
        // и получает (в случае успешной аутентификации сервером) идентификатор сессии пользователя.
        $http(
        {
            method: 'GET',
            url: 'http://localhost:8080/login?username='+$scope.userName+'&password='+$scope.pass
        }).then(function successCallback(response) 
        {
            if (response.data.loginSucceeded)
            {
                // Идентификатор сессии сохраняется через сервис $cookies в браузере.
                $cookies.put('sessionId', response.data.sessionId);
                // В 'userName', сохраняется то, что ввел пользователь.
                $cookies.put('userName', $scope.userName);
                // В случае успешной аутентификации, происходит переход на страницу с графиками home.html.
                location.href = '/crossoverApp/home.html'
            } else
            {
                 // В случае не успешной аутентификации, выдается сообщение об ошибке.
                 alert('login failed');
            }

        }, function errorCallback(response)
        {
            // Также в случае не успешной аутентификации, выдается сообщение об ошибке. В errorCallback функции, сервиса $http.
            alert('login failed');
        });
    }

}]);