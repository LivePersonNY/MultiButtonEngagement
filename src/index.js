import $ from 'jquery';
import './sass/_index.scss';

const elementId = 'lp-multi-channel-engagement';

export function init() {
	lp_wait_for_tag();
}

function createElement() {
	var _this = this;
	var el = $("#"+this.elementId);

	el.addClass(this.defaults.containerclass);
	el.css({
		'z-index': _this.defaults.zindex,
		'display': 'none'
	});

	var buttonContainer = $('<div>');
	buttonContainer.addClass('lp-multi-channel-buttons');

	el.wrap(buttonContainer);
	this.container = el.parent();
	var configuration = el.data();

	this.config(configuration);
	this.channels.owner = this;

	this.channels.main();
	this.defaults.channels.split(',').forEach(function(item) {
		if (!_this.channels[item]) {
			console.error(item + " is not a supported channel.");
		} else {
			console.warn(item + " being added...");
			_this.channels[item]();
		}
	});
	setTimeout(function() {
		$('body').addClass('engagement-ready');
	},100);
}

function lp_wait_for_tag() {
	if (window.lpTag) {
		lpTag.events.bind('lpUnifiedWindow', 'windowClosed', function(data) {
			lp_wait_for_jquery();
		});
	} else {
		setTimeout(lp_wait_for_tag, 50);
	}
}

function lp_wait_for_jquery() {
	if ($ && $("#" + lpMultiChannelEngagement.elementId).length > 0) {

		/**
		 * @function
		 * @property {object} jQuery plugin which runs handler function once specified
		 *           element is inserted into the DOM
		 * @param {function|string} handler
		 *            A function to execute at the time when the element is inserted or
		 *            string "remove" to remove the listener from the given selector
		 * @param {bool} shouldRunHandlerOnce
		 *            Optional: if true, handler is unbound after its first invocation
		 * @example jQuery(selector).waitUntilExists(function);
		 */

		$.fn.waitUntilExists = function(handler, shouldRunHandlerOnce, isChild) {

			var selector = this.selector;
			var $this = $(selector);
			var $elements = $this.not(function() { return $(this).data(found); });

			if (handler === 'remove') {

				// Hijack and remove interval immediately if the code requests
				removeListener(selector);
			}
			else {

				// Run the handler on all found elements and mark as found
				$elements.each(handler).data(found, true);

				if (shouldRunHandlerOnce && $this.length) {

					// Element was found, implying the handler already ran for all
					// matched elements
					removeListener(selector);
				}
				else if (!isChild) {

					// If this is a recurring search or if the target has not yet been
					// found, create an interval to continue searching for the target
					intervals[selector] = window.setInterval(function () {

						$this.waitUntilExists(handler, shouldRunHandlerOnce, true);
					}, 50);
				}
			}

			return $this;
		};
		init();
	} else {
		setTimeout(lp_wait_for_jquery, 50);
	}
}

export function startWebWithMessage(message, elementID) {
	var _this = this;
	if (document.getElementById(elementID || this.elementId)) {
		document.getElementById(elementID || this.elementId).click();
	}
	if ($('#lpChat div[data-lp-point="lines_area"]').length < 1) {
		setTimeout(function() {_this.startWebWithMessage(message, elementID);}, 500);
	} else {
		_this.webDirectMessage(message);
	}
}

export function addButton(key, url, callback) {
	var _this = this;
	this.channels[key] = function() {
		var image = $('<img>');
		image.attr('src', url);
		image.addClass('lp-multi-channel-'+key+' lp-multi-channel-image');
		
		image.click(function(e) {
			callback();
		});
		this.owner.container.prepend(image);
	}
}