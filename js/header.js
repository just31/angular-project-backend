// angular-��������� 'header', ��� ������ ������� ������
crossApp.directive('header', function()
{
	return {
	    // ��������, ����������� �� ��, ��� ���������� � ������������� ������, �������� ���������.
	    restrict: 'E',
        // ���� � ����� � ��������, �� �������� ����� ������� ������� <header></header>, � html-�������������.
	    templateUrl: 'header.html'
	}
})