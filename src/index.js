import $ from 'jquery';
import './sass/_index.scss';

const elementId = 'lp-multi-channel-engagement';
var container;

const defaults = {
	imagemain: 'https://d1hryyr5hiabsc.cloudfront.net/web2020/img/chat-engagements/LP_Sun_2020_Engagement_Icon.svg',
	imagefacebook: 'https://d1hryyr5hiabsc.cloudfront.net/web2020/img/chat-engagements/Facebook_Messenger2.svg',
	imagewhatsapp: 'https://d1hryyr5hiabsc.cloudfront.net/web2020/img/chat-engagements/WhatsApp2.svg',
	imageapple: 'https://d1hryyr5hiabsc.cloudfront.net/web2020/img/chat-engagements/Apple_Business_Chat2.svg',
	imagesms: 'https://d1hryyr5hiabsc.cloudfront.net/web2020/img/chat-engagements/SMS2.svg',
	channels: 'facebook,whatsapp,apple,sms',
	containerclass: 'lp-multi-channel-engagement',
	zindex: 10000,
	css: 'https://cdn.jsdelivr.net/gh/LivePersonNY/MultiButtonEngagement@1.1.1/engagement.min.css',
	debug: false,
	smsmessage: "I would like to connect with SMS!",
};
var settings = {};

const channels = {
	main: function() {
		var image = $('<img>');
		image.attr('src', this.owner.defaults.imagemain);
		image.addClass('lp-multi-channel-main lp-multi-channel-image');
		//image.attr('data-LP-event', 'click');
		container.prepend(image);
	},
	facebook: function() {
		var image = $('<img>');
		image.attr('src', this.owner.defaults.imagefacebook);
		image.addClass('lp-multi-channel-facebook lp-multi-channel-image');
		var _this = this;
		image.click(function(e) {
			if (_this.owner.defaults.onClickFacebook) {
				_this.owner.defaults.onClickFacebook();
			} else {
				_this.owner.callbacks.facebook();
			}
		});
		container.prepend(image);
	},
	whatsapp: function() {
		var image = $('<img>');
		image.attr('src', this.owner.defaults.imagewhatsapp);
		image.addClass('lp-multi-channel-whatsapp lp-multi-channel-image');
		var _this = this;
		image.click(function(e) {
			if (_this.owner.defaults.onClickWhatsapp) {
				_this.owner.defaults.onClickWhatsapp();
			} else {
				_this.owner.callbacks.whatsapp();
			}
		});
		container.prepend(image);
	},
	apple: function() {
		var image = $('<img>');
		image.attr('src', this.owner.defaults.imageapple);
		image.addClass('lp-multi-channel-apple lp-multi-channel-image');
		var _this = this;
		image.click(function(e) {
			if (_this.owner.defaults.onClickApple) {
				_this.owner.defaults.onClickApple();
			} else {
				_this.owner.callbacks.apple();
			}
		});
		container.prepend(image);
	},
	sms: function() {
		var image = $('<img>');
		image.attr('src', this.owner.defaults.imagesms);
		image.addClass('lp-multi-channel-sms lp-multi-channel-image');
		var _this = this;
		image.click(function(e) {
			if (_this.owner.defaults.onClickSms) {
				_this.owner.defaults.onClickSms();
			} else {
				_this.owner.callbacks.sms();
			}
		});
		container.prepend(image);
	}
};

export function init(options) {
	config(options);
	lp_wait_for_tag();
	lp_wait_for_jquery();
}

function config(options) {
	settings = $.extend(defaults, options);
}

function createElement() {
	var el = $("#"+elementId);

	el.addClass(settings.containerclass);
	el.css({
		'z-index': settings.zindex,
		'display': 'none'
	});

	var buttonContainer = $('<div>');
	buttonContainer.addClass('lp-multi-channel-buttons');

	el.wrap(buttonContainer);
	container = el.parent();
	var configuration = el.data();

	config(configuration);
	channels.owner = this;

	channels.main();
	settings.channels.split(',').forEach(function(item) {
		if (!channels[item]) {
			console.error(item + " is not a supported channel.");
		} else {
			console.warn(item + " being added...");
			channels[item]();
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
	if ($ && $("#" + elementId).length > 0) {

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

		createElement();
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
	channels[key] = function() {
		var image = $('<img>');
		image.attr('src', url);
		image.addClass('lp-multi-channel-'+key+' lp-multi-channel-image');
		
		image.click(function(e) {
			callback();
		});
		container.prepend(image);
	}
}