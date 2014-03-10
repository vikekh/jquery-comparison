(function ($) {

	var jQueryCompare = jQueryCompare || {};

	(function (cmp) {

		cmp.bind = function ($elements, data, settings) {
			var update = (function ($elements, data, settings) {
				return function (event) {
					cmp.update($elements, data, settings, event);
				};
			}($elements, data, settings));

			$elements.wrapper.on({
				mousemove: function (event) {
					update(event);
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
				settings = $.extend({}, $.fn.compare.defaults, options, $(this)
					.data());

			$elements.wrapper.width(data.width).height(data.height);

			cmp.update($elements, data, settings);
			cmp.bind($elements, data, settings);
		};

		cmp.update = function ($elements, data, settings, event) {
			switch (settings.direction) {
				case 'horizontal':
					var x = typeof event !== 'undefined'
						? event.pageX - $elements.wrapper.offset().left
						: Math.ceil(data.width/2);
					$elements.after.css('clip', 'rect(0, ' + data.width +
						'px, '+ data.height + 'px, ' + x + 'px)');
					break;

				case 'vertical':
					var y = typeof event !== 'undefined'
						? event.pageY - $elements.wrapper.offset().top
						: Math.ceil(data.height/2);
					$elements.after.css('clip', 'rect(' + y + 'px, ' + data.
						width + 'px, ' + data.height + 'px, 0)');
					break;
			}
		};

	})(jQueryCompare);

	$.fn.compare = function (options) {
		return this.each(function () {
			jQueryCompare.init.call(this, options);
		});
	};

	$.fn.compare.defaults = {
		direction: 'horizontal',
		noCss: false
	};

})(jQuery);

jQuery(document).ready(function ($) {
	$(window).load(function () {
		$('.jquery-compare').compare();
	});
});