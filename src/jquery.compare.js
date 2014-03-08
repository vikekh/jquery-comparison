(function ($) {

	$.fn.compare = function (options) {
		return this.each(function () {
			compare.init.apply(this, options);
		});
	};

	$.fn.compare.defaults = {
		direction: 'horizontal'
	};

	var compare = (function () {
		var settings,
			width,
			height,
			x,
			$before,
			$after;

		var init = function (options) {
			settings = $.extend({}, $.fn.compare.defaults, options);
			$before = $(this).children('img.before'),
			$after = $(this).children('img.after');

			validate();

			width = $before.width();
			height = $before.height();
			$(this).width(width).height(height).css('position', 'relative');

			fold();
		}

		var fold = function () {
			switch (settings.direction) {
				case 'vertical':
					break;

				case 'horizontal':
				default:
					x = Math.ceil(width/2);
					$before.width(x).css({
						'position': 'absolute',
						'top': '0',
						'left': '0',
						'clip': 'rect(0, ' + x + 'px, ' + height + 'px, 0)'
					});
					$after.width(width - x).css({
						'position': 'absolute',
						'top': '0',
						'left': x + 'px',
						'clip': 'rect(0, ' + width + 'px, ' + height + 'px, ' + x + 'px)'
					});
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

		return {
			init: init
		};
	})();

})(jQuery);

$('.jquery-compare').compare();