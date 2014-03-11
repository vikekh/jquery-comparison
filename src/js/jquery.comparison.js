/**
 * jQuery Comparison
 * Copyright (C) 2014 vikekh
 * 
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 * 
 * You should have received a copy of the GNU General Public License along with
 * this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function ($, comparison) {

	var $wrapper,
		$before,
		$after;

	var settings,
		size;

	comparison.init = function (options) {
		$wrapper = $(this);
		$before = $wrapper.children('img.before');
		$after = $wrapper.children('img.after');

		settings = $.extend({}, $.fn.comparison.defaults, options,
			$wrapper.data());

		validate();

		size = {
			width: $before.width(),
			height: $before.height()
		};

		$wrapper.width(size.width).height(size.height)
			.addClass(settings.direction);

		// todo: apply static CSS
		bind();
		update($wrapper, $after, size, settings.direction, settings.start,
			settings.snap);
	};

	var bind = function () {
		var updateBound = (function ($wrapper, $target, size, direction, start,
				snap) {
			return function (event) {
				return update($wrapper, $target, size, direction, start, snap,
					event);
			};
		}($wrapper, $after, size, settings.direction, settings.start,
			settings.snap));

		$wrapper.on({
			click: function () {
				$(this).toggleClass('locked');
			},

			mousemove: function (event) {
				if (!$(this).hasClass('locked')) {
					updateBound(event);
				}
			}
		});
	};

	var css = function () {};

	var update = function ($wrapper, $target, size, direction, start, snap,
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

				$target.css('clip', 'rect(' + y + 'px, ' + size.width + 'px, '
					+ size.height + 'px, 0)');

				return y;
				break;

			default:
				return null;
				break;
		}
	};

	var validate = function () {
		if ($before.length === 0) {
			$.error('Could not find before image.');
		}

		if ($before.length > 1) {
			$.error('More than one before image.');
		}

		if ($after.length === 0) {
			$.error('Could not find after image.');
		}

		if ($after.length > 1) {
			$.error('More than one after image.');
		}

		if ($before.width() !== $after.width() || $before.height() !== 
				$after.height()) {
			$.error('Images should have the same dimensions.');
		}

		/*if ($before.next() !== $after) {
			$.error('After image should be the next sibling to the before ' +
				'image.');
		}*/

		if (typeof settings.css !== 'boolean') {
			$.error('Option "css" is not boolean.');
		}

		if ($.inArray(settings.direction, ['horizontal', 'vertical']) === -1) {
			$.error('Option "direction" is invalid ("' + settings.direction +
				'").');
		}

		// todo: validate option snap

		if (typeof settings.start !== 'number' || (settings.start < 0 &&
				settings.start > 1)) {
			$.error('Option "start" should be a float in interval [0, 1].');
		}
	};

})(jQuery, window.comparison = window.comparison || {});

(function ($, comparison) {

	$.fn.comparison = function (options) {
		return this.each(function () {
			comparison.init.call(this, options);
		});
	};

	$.fn.comparison.defaults = {
		css: false,
		direction: 'horizontal',
		snap: 20,
		start: 0.5
	};

})(jQuery, comparison);

jQuery(document).ready(function ($) {
	$(window).load(function () {
		$('.jquery-comparison').comparison();
	});
});