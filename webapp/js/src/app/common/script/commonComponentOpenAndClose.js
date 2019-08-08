/* 打开/关闭左侧菜单*/
let isOpenLeftMenu = true;
$('#showleftmenu').click(function () {
	if (!isOpenLeftMenu) {
		openLeftMenu();
	} else {
		closeLeftMenu();
	}
});
function openLeftMenu() {
	$('.left-menu').animate({
		left: '+=229px'
	});
	$('.BMap_stdMpCtrl').animate({
		left: '+=229px'
	});
	$('.BMap_scaleCtrl').animate({
		left: '+=229px'
	}); 
	$('.preview-map').animate({
		width: '-=229px'
	});
	$('.energy-scale').animate({
		left: '+=229px'
	});
	$('.reshow').animate({
		left: '+=229px'
	});
	$('.show-history-btn').animate({
		left: '+=229px'
	});
	$('.time-slider').animate({
		left: '+=229px',
	});
	$('.home-content').animate({
		left: '+=229px',
		width: '-=229px',
	});
	$('.guide-frame').animate({
		left: '+=229px',
		width: '-=229px',
	});
	$('.guide-title-line').animate({
		width: '-=229px',
	});
	$('.table-view-search-area').animate({
		width: '-=229px',
	});
	$('.table-view-container').animate({
		width: '-=229px',
	});
	$('.page-selector').animate({
		width: '-=229px',
	});
	$('.view-data-table').animate({
		marginLeft: '+=115px',
	});
	$('.page-selector').animate({
		marginLeft: '+=115px',
	});
	$('#slider-range').animate({
		width: '-=229px',
	});
	$('#showleftmenu').css('color', 'rgb(110, 192, 255)');
	$('.left-menu-open').css('display', 'none');
	isOpenLeftMenu = true;
}
function closeLeftMenu() {
	$('.left-menu').animate({
		left: '-=229px'
	});
	$('.BMap_stdMpCtrl').animate({
		left: '-=229px'
	});
	$('.BMap_scaleCtrl').animate({
		left: '-=229px'
	});
	$('.preview-map').animate({
		width: '+=229px'
	});
	$('.energy-scale').animate({
		left: '-=229px'
	});
	$('.reshow').animate({
		left: '-=229px'
	});
	$('.show-history-btn').animate({
		left: '-=229px'
	});
	$('.time-slider').animate({
		left: '-=229px',
	});
	$('.home-content').animate({
		left: '-=229px',
		width: '+=229px',
	});
	$('.guide-frame').animate({
		left: '-=229px',
		width: '+=229px',
	});
	$('.guide-title-line').animate({
		width: '+=229px',
	});
	$('.table-view-search-area').animate({
		width: '+=229px',
	});
	$('.table-view-container').animate({
		width: '+=229px',
	});
	$('.page-selector').animate({
		width: '+=229px',
	});
	$('.view-data-table').animate({
		marginLeft: '-=115px',
	});
	$('.page-selector').animate({
		marginLeft: '-=115px',
	});
	$('#slider-range').animate({
		width: '+=229px',
	});
	$('#showleftmenu').css('color', '#ffffff');
	$('.left-menu-open').css('display', 'block');
	isOpenLeftMenu = false;
}
/* -END- 打开/关闭左侧菜单 */

/* 打开/关闭工具栏锁定 */
let isToolLock = true;
$('#lockTools').click(function () {
	if (!isToolLock) {
		lockTool();
	} else {
		unlockTool();
	}
});
function lockTool() {
	$('.top-menu-container').off('mouseover', toolPanelMouseOver);
	$('.top-menu-container').off('mouseout', toolPanelMouseOut);
	$('#lockTools').css('color', 'rgb(110, 192, 255)');
	isToolLock = true;
}

function unlockTool() {
	$('.top-menu-container').on('mouseover', toolPanelMouseOver);
	$('.top-menu-container').on('mouseout', toolPanelMouseOut);
	$('#lockTools').css('color', '#ffffff');
	isToolLock = false;
}
function toolPanelMouseOver() {
	$('.top-menu-container').css('top', '0');
}
function toolPanelMouseOut() {
	$('.top-menu-container').css('top', '-45px');
}
/* -END- 打开/关闭工具栏锁定 */

/* 打开/关闭右上角搜索框 */
var isOpenSearch = false;
$('#showsearch').click(function () {
	if (!isOpenSearch) {
		openSearch();
	} else {
		closeSearch();
	}
});
function openSearch() {
	$(".search-area").animate({
		right: '+=420px'
	});
	$('#showsearch').css('color', 'rgb(110, 192, 255)');
	isOpenSearch = true;
}
function closeSearch() {
	$(".search-area").animate({
		right: '-=420px'
	});
	$('#showsearch').css('color', '#ffffff');
	isOpenSearch = false;
}
/* -END- 打开/关闭右上角搜索框 */

/* 打开/关闭组队信息 */
var isGroupOpen = true;
$('#groupinfo').click(function () {
	if (isGroupOpen) {
		closeGroupPanel();
	} else {
		openGroupPanel();
	}
});
function closeGroupPanel() {
	$('.group-info-panel').css('display', 'none');
	$('#groupinfo').css('color', '#ffffff');
	this.isGroupOpen = false;
}
function openGroupPanel() {
	$('.group-info-panel').css('display', 'block');
	$('.group-info-panel').css('position', 'absolute');
	$('.group-info-panel').css('top', '190px');
	$('.group-info-panel').css('right', '20px');
	$('#groupinfo').css('color', 'rgb(110, 192, 255)');
	this.isGroupOpen = true;
}
/* -END- 打开/关闭组队信息 */

/* 显示选择的右上角搜索框的搜索条件 */
let search_li = document.getElementsByClassName('search-dropdown');
for (let i = 0; i < search_li.length; i++) {
	search_li[i].addEventListener("click", function () {
		$('.search-condition-correct').html(`<a id="global-search-type">${search_li[i].innerText}</a>&nbsp;<span class="caret"></span>`);
	});
}
/* -END- 显示选择的右上角搜索框的搜索条件 */

/* 如上，作用于前置搜索 */
let searchType = 10;
var center_search_li = document
	.getElementsByClassName('center-search-dropdown');
for (let i = 0; i < center_search_li.length; i++) {
	center_search_li[i].addEventListener("click", () => {
		searchType = i;
		$('.center-search-condition-correct').html(
			center_search_li[i].innerHTML
			+ '&nbsp;<span class="caret"></span>');
	});
}
/* -END- 如上，作用于前置搜索 */