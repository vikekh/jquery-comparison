(function ($, compare) {
	var height,
		settings,
		width,
		x,
		$before,
		$container,
		$after;

	compare.init = function (defaults, options) {
		$container = $(this);
		$before = $container.children('img.before'),
		$after = $container.children('img.after');
		settings = $.extend({}, defaults, options);

		$before.on('load', function () {
			//validate();
			width = $before.width();
			height = $before.height();
			$container.width(width).height(height);
			fold();
		});
	}

	var applyCss = function () {};

	var fold = function () {
		switch (settings.direction) {
			case 'vertical':
				break;

			case 'horizontal':
			default:
				x = Math.ceil(width/2);
				$after.css('left', x + 'px');
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
			$.error('Too many before images, using first.')
			$before = $before.first().nextAll().remove();
		}

		if ($after.length > 1) {
			$.error('Too many after images, using first.')
			$after = $after.first().nextAll().remove();
		}

		if ($before.next() !== $after) {
			//$.error('Before and after images should be placed after each other in the DOM tree.');
		}

		if ($before.width() !== $after.width() || $before.height() !== $after.height()) {
			$.error('Before and after images should have the same dimensions.');
		}
	};

})(jQuery, window.compare = window.compare || {});

(function ($, compare) {

	$.fn.compare = function (options) {
		return this.each(function () {
			compare.init.apply(this, $.fn.compare.defaults, options);
		});
	};

	$.fn.compare.defaults = {
		direction: 'horizontal'
	};

})(jQuery, compare);

jQuery(document).ready(function ($) {
	$('.jquery-compare').compare();
});