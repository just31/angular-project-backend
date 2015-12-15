// angular-директива 'header', для вывода шаблона хедера
crossApp.directive('header', function()
{
	return {
	    // Свойство, указывающее на то, что заменяемый в представлении шаблон, является элементом.
	    restrict: 'E',
        // Путь к файлу с шаблоном, на котороый будет заменен элемент <header></header>, в html-представлении.
	    templateUrl: 'header.html'
	}
})