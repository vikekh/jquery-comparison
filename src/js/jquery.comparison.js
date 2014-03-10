;(function ($) {

	var comparison = comparison || {};

	(function (cmp) {

		var $wrapper,
			$before,
			$after;

		var settings,
			size;

		cmp.applyCss = function () {};

		cmp.bind = function () {
			var update = (function ($wrapper, $target, size, direction, start,
					snap) {
				return function (event) {
					if ($wrapper.hasClass('locked')) {
						return null;
					}

					return cmp.update($wrapper, $target, size, direction,
						start, snap, event);
				};
			}($wrapper, $after, size, settings.direction, settings.start,
				settings.snap));

			$wrapper.on({
				click: function () {
					$(this).toggleClass('locked');
				},
				mousemove: function (event) {
					if (!$(this).hasClass('locked')) {
						update(event);
					}
				}
			});
		};

		cmp.init = function (options) {
			$wrapper = $(this);
			$before = $wrapper.children('img.before');
			$after = $wrapper.children('img.after');

			settings = $.extend({}, $.fn.comparison.defaults, options,
				$wrapper.data());
			size = {
				width: $before.width(),
				height: $before.height()
			};

			$wrapper
				.width(size.width).height(size.height)
				.addClass(settings.direction);

			// todo: validate
			// todo: apply static CSS
			cmp.bind();
			cmp.update($wrapper, $after, size, settings.direction,
				settings.start, settings.snap);
		};

		cmp.update = function ($wrapper, $target, size, direction, start, snap,
				event) {
			switch (direction) {
				case 'horizontal':
					var x;

					if (typeof event !== 'undefined') {
						x = event.pageX - $wrapper.offset().left;
					} else {
						x = Math.round(start*size.width);
					}

					if (x <= snap) {
						x = 0;
					} else if (x >= size.width - snap) {
						x = size.width;
					}

					$target.css('clip', 'rect(0, ' + size.width + 'px, ' +
						size.height + 'px, ' + x + 'px)');

					return x;
					break;

				case 'vertical':
					var y;

					if (typeof event !== 'undefined') {
						y = event.pageY - $wrapper.offset().top;
					} else {
						y = Math.round(start*size.height);
					}

					if (y <= snap) {
						y = 0;
					} else if (y >= size.height - snap) {
						y = size.height;
					}

					$target.css('clip', 'rect(' + y + 'px, ' + size.width +
						'px, ' + size.height + 'px, 0)');

					return y;
					break;

				default:
					return null;
					break;
			}
		};

	})(comparison);

	$.fn.comparison = function (options) {
		return this.each(function () {
			comparison.init.call(this, options);
		});
	};

	$.fn.comparison.defaults = {
		direction: 'horizontal',
		css: false,
		snap: 20,
		start: 0.5
	};

})(jQuery);

jQuery(document).ready(function ($) {
	$(window).load(function () {
		$('.jquery-comparison').comparison();
	});
});