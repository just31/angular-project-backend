// angular-директива 'footer', для вывода шаблона футера
crossApp.directive('footer', function()
{
	return {
	    // Свойство, указывающее на то, что заменяемый в представлении шаблон, является элементом.
	    restrict: 'E',
        // Путь к файлу с шаблоном, на котороый будет заменен элемент <footer></footer>, в html-представлении.
	    templateUrl: 'footer.html'
	}
})