// angular-��������� 'footer', ��� ������ ������� ������
crossApp.directive('footer', function()
{
	return {
	    // ��������, ����������� �� ��, ��� ���������� � ������������� ������, �������� ���������.
	    restrict: 'E',
        // ���� � ����� � ��������, �� �������� ����� ������� ������� <footer></footer>, � html-�������������.
	    templateUrl: 'footer.html'
	}
})