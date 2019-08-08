function tableViewAutoSize() {
	$('.guide-frame').css('width', $(window).width());
	$('.guide-title-line').css('width', $(window).width() - 70);
	/*delete by guoshuai start 2018-9-29
	$('.table-view-container').css('width', $(window).width() - 70);
	$('.guide-frame').css('height', $(window).height() - 50);
	if ($(window).height() - $('.table-view-search-area').height() - 250 > 170) {
		$('.table-view-data-area').css(
				'min-height',
				$(window).height() - $('.table-view-search-area').height()
						- 250);
	}delete by guoshuai end 2018-9-29*/
	/*add by guoshuai start 2018-9-29*/
	$('.guide-frame').css('height', $(window).height() - 13);
	if ($(window).height() - $('.table-view-search-area').height() - 250 > 170) {
		$('.table-view-data-area').css(
				'min-height',
				$(window).height() - 474);
	}
	/*add by guoshuai end 2018-9-29*/
	/*delete by guoshuai start 2018-9-29
	$('.view-data-table')
			.css('margin-left', -$('.view-data-table').width() / 2);
	$('.page-selector').css('margin-left', -$('.page-selector').width() / 2);
	delete by guoshuai end 2018-9-29*/
}

tableViewAutoSize();

window.addEventListener('resize', function() {
	tableViewAutoSize()
}, false);