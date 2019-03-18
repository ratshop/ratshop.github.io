const DESKTOP_WIDTH = 1280;
const ESC_KEY_CODE = 27;


/* modal */
/* !!!!!!!!!! ще не тестував !!!!!!!!!!!!! */
(function ($){
	/*
		showModal(selector);
		hideModal(all = false);
		*[data-modal="id"] - autodetectable buttons
	*/
	window.scrollbarWidth = getScrollbarWidth();
	window.modalArray = [];
	window.showModal = function (selector){
		let $modal = $(selector);
		if ($modal.length !== 0) return console.warn('Modal ' + selector + ' not found.');
		modalArray.append(selector);
		$('body').addClass('modal-mode').css('padding-right', window.scrollbarWidth + 'px');
		$modal.css('z-index', 1000 + modalArray.length).fadeIn();
	};
	window.hideModal = function (all = false){
		if (all) {
			while (modalArray.length) hideModal();
			return;
		}
		let selector = modalArray.pop();
		$(selector).hide();
		if (modalArray.length === 0) $('body').removeClass('modal-mode').css('padding-right', '');
	};
	$('.modal-wrap').each(function(){
		this.addEventListener('click', function(e){
			if ($(e.target).is('.modal-wrap')) hideModal();
		});
	});
	document.body.addEventListener('keyup', function(e){
		if (e.keyCode === ESC_KEY_CODE) hideModal();
	});
	function getScrollbarWidth(){
		let div = document.createElement('div');
		div.setAttribute('style', 'position:fixed;top:-100px;width:50px;height:50px;overflow-y:scroll;');
		document.body.appendChild(div);
		let res = div.offsetWidth - div.clientWidth;
		document.body.removeChild(div);
		return res;
	}
})(jQuery);



/* scroll to top */
(function ($){
	let $window = $(window);
	let $toTopBox = $('#to_top_box');
	$window.on('scroll', function(){
		if ($window.width() < DESKTOP_WIDTH) return;
		let top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
		$toTopBox['fade' + (top > 300 ? 'In' : 'Out')]();
	}).trigger('scroll');
	$('.to-top-button').on('click', function(){
		$('html, body').animate({ scrollTop: 0 }, 600);
	});
})(jQuery);




/* collection-filter */
(function ($){
	/* filtered tags */
	$('.collection-filtered-item .remove-button').on('click', function(){
		/* TODO: apply new filter */
		$(this).parents('.collection-filtered-item').remove();
	});
})(jQuery);