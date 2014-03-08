(function ($, compare) {

	var settings,
		height,
		width,
		pos;

	var $wrapper,
		$before,
		$after;

	compare.init = function (defaults, options) {
		$wrapper = $(this);
		$before = $wrapper.children('img.before'),
		$after = $wrapper.children('img.after');

		settings = $.extend({}, defaults, options, $wrapper.data());

		validate();

		$wrapper.width(width).height(height);

		if (settings.noCss) {
			applyStaticCss();
		}

		update();
		bind();
	}

	var applyStaticCss = function () {
		$wrapper.css('position', 'relative');
		$before.add($after).css('position', 'absolute');
	};

	var bind = function () {
		$wrapper.on('mouseenter', function () {
			$(this).on('mousemove', function (event) {
				update.call(this, event);
			});
		});
	};

	var update = function (event) {
		var $after = $(this).children('img.after');

		switch (settings.direction) {
			case 'vertical':
				if (typeof pos === 'undefined') {
					pos = Math.ceil(height/2);
				} else if (typeof event !== 'undefined') {
					pos = event.pageY - $('body').offset().top;
				}

				$after.css('clip', 'rect(' + pos + 'px, ' + width + 'px, ' + height + 'px, 0)');
				break;

			case 'horizontal':
			default:
				if (typeof pos === 'undefined') {
					pos = Math.ceil(width/2);
				} else if (typeof event !== 'undefined') {
					pos = event.pageX - $('body').offset().left;
				}

				$after.css('clip', 'rect(0, ' + width + 'px, ' + height + 'px, ' + pos + 'px)');
				break;
		}
	};

	var validate = function () {
		if ($before.length === 0) {
			$.error('Could not find a before image.')
		}

		if ($after.length === 0) {
			$.error('Could not find an after image.')
		}

		if ($before.length > 1) {
			$.error('Too many before images.')
			//$before = $before.first().nextAll().remove();
		}

		if ($after.length > 1) {
			$.error('Too many after images.')
			//$after = $after.first().nextAll().remove();
		}

		if ($before.next() !== $after) {
			//$.error('Before and after images should be placed after each other in the DOM tree.');
		}

		if ($before.width() !== $after.width() || $before.height() !== $after.height()) {
			$.error('Before and after images should have the same dimensions.');
		} else {
			width = $before.width();
			height = $before.height();
		}
	};

})(jQuery, window.compare = window.compare || {});

(function ($, compare) {

	$.fn.compare = function (options) {
		return this.each(function () {
			compare.init.call(this, $.fn.compare.defaults, options);
		});
	};

	$.fn.compare.defaults = {
		direction: 'horizontal',
		noCss: false
	};

})(jQuery, compare);

jQuery(document).ready(function ($) {
	$(window).load(function () {
		$('.jquery-compare').compare();
	});
});