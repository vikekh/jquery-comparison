var compare = (function ($) {

	var compare = function (that, defaults, options) {
		this.$wrapper = $(that);
		this.$before = this.$wrapper.children('img.before'),
		this.$after = this.$wrapper.children('img.after');

		this.settings = $.extend({}, defaults, options, this.$wrapper.data());

		this.validate();

		this.$wrapper.width(this.width).height(this.height);

		if (this.settings.noCss) {
			this.applyStaticCss();
		}

		this.update();
		this.bind();
	};

	compare.prototype.applyStaticCss = function () {
		this.$wrapper.css('position', 'relative');
		this.$before.add(this.$after).css('position', 'absolute');
	};

	compare.prototype.bind = function () {
		var that = this;
		
		this.$wrapper.on('mouseenter', function () {
			$(this).on('mousemove', function (event) {
				that.update(event);
			});
		});
	};

	compare.prototype.update = function (event) {
		switch (this.settings.direction) {
			case 'vertical':
				if (typeof this.pos === 'undefined') {
					this.pos = Math.ceil(this.height/2);
				} else if (typeof event !== 'undefined') {
					this.pos = event.pageY - this.$wrapper.offset().top;
				}

				this.$after.css('clip', 'rect(' + this.pos + 'px, ' + this.width + 'px, ' + this.height + 'px, 0)');
				break;

			case 'horizontal':
			default:
				if (typeof this.pos === 'undefined') {
					this.pos = Math.ceil(this.width/2);
				} else if (typeof event !== 'undefined') {
					this.pos = event.pageX - this.$wrapper.offset().left;
				}

				this.$after.css('clip', 'rect(0, ' + this.width + 'px, ' + this.height + 'px, ' + this.pos + 'px)');
				break;
		}
	};

	compare.prototype.validate = function () {
		if (this.$before.length === 0) {
			$.error('Could not find a before image.')
		}

		if (this.$after.length === 0) {
			$.error('Could not find an after image.')
		}

		if (this.$before.length > 1) {
			$.error('Too many before images.')
			//$before = $before.first().nextAll().remove();
		}

		if (this.$after.length > 1) {
			$.error('Too many after images.')
			//$after = $after.first().nextAll().remove();
		}

		if (this.$before.next() !== this.$after) {
			//$.error('Before and after images should be placed after each other in the DOM tree.');
		}

		if (this.$before.width() !== this.$after.width() || this.$before.height() !== this.$after.height()) {
			$.error('Before and after images should have the same dimensions.');
		} else {
			this.width = this.$before.width();
			this.height = this.$before.height();
		}
	};
	
	compare.prototype.constructor = compare;
	return compare;

})(jQuery);

(function ($, compare) {

	$.fn.compare = function (options) {
		return this.each(function () {
			new compare(this, $.fn.compare.defaults, options);
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
