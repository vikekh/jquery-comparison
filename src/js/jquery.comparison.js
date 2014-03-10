(function ($) {

	var jQueryComparison = jQueryComparison || {};

	(function (cmp) {

		cmp.applyCss = function ($elements, data, settings, update) {
			/*if (!update) {
				$elements.wrapper.css('position', 'absolute');
				$elements.before.css('position', 'relative');
				$elements.after.css('position', 'relative');
			} else if (update) {
				$elements.wrapper.is('.horizontal').cursor('cursor',
					'w-resize');
				$elements.wrapper.is('.vertical').cursor('cursor', 'n-resize');
				$elements.wrapper.is('.locked').cursor('cursor',
					'not-allowed');
			}*/
		};

		cmp.bind = function ($elements, data, settings) {
			var update = (function ($elements, data, settings) {
				return function (event) {
					cmp.update($elements, data, settings, event);
				};
			}($elements, data, settings));

			$elements.wrapper.on({
				click: function () {
					$elements.wrapper.toggleClass('locked');
				},
				mousemove: function (event) {
					if (!$elements.wrapper.hasClass('locked')) {
						update(event);
					}
				}
			});
		};

		cmp.init = function (options) {
			var $this = $(this),
				$elements = {
					wrapper: $this,
					before: $this.children('img.before'),
					after: $this.children('img.after')
				},
				data = {
					width: $elements.before.width(),
					height: $elements.before.height()
				},
				settings = $.extend({}, $.fn.comparison.defaults, options, $(this)
					.data());

			$elements.wrapper
				.width(data.width).height(data.height)
				.addClass(settings.direction);

			// todo: validate
			cmp.update($elements, data, settings);
			//cmp.applyCss($elements, data, settings);
			cmp.bind($elements, data, settings);
		};

		cmp.update = function ($elements, data, settings, event) {
			switch (settings.direction) {
				case 'horizontal':
					var x = typeof event !== 'undefined'
						? event.pageX - $elements.wrapper.offset().left
						: Math.ceil(data.width/2);

					if (x <= settings.snapThreshold) {
						x = 0;
					} else if (x >= data.width - settings.snapThreshold) {
						x = data.width;
					}

					$elements.after.css('clip', 'rect(0, ' + data.width +
						'px, '+ data.height + 'px, ' + x + 'px)');
					break;

				case 'vertical':
					var y = typeof event !== 'undefined'
						? event.pageY - $elements.wrapper.offset().top
						: Math.ceil(data.height/2);

					if (y <= settings.snapThreshold) {
						y = 0;
					} else if (y >= data.height - settings.snapThreshold) {
						y = data.height;
					}

					$elements.after.css('clip', 'rect(' + y + 'px, ' + data.
						width + 'px, ' + data.height + 'px, 0)');
					break;
			}
		};

	})(jQueryComparison);

	$.fn.comparison = function (options) {
		return this.each(function () {
			jQueryComparison.init.call(this, options);
		});
	};

	$.fn.comparison.defaults = {
		direction: 'horizontal',
		noCss: false,
		snapThreshold: 10
	};

})(jQuery);

jQuery(document).ready(function ($) {
	$(window).load(function () {
		$('.jquery-comparison').comparison();
	});
});