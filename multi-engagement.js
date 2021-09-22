
var lpMultiChannelEngagement = {

    elementId: 'lp-multi-channel-engagement',
    defaults: {
        imagemain: 'https://d1hryyr5hiabsc.cloudfront.net/web2020/img/chat-engagements/LP_Sun_2020_Engagement_Icon.svg',
        imagefacebook: 'https://d1hryyr5hiabsc.cloudfront.net/web2020/img/chat-engagements/Facebook_Messenger2.svg',
        imagewhatsapp: 'https://d1hryyr5hiabsc.cloudfront.net/web2020/img/chat-engagements/WhatsApp2.svg',
        imageapple: 'https://d1hryyr5hiabsc.cloudfront.net/web2020/img/chat-engagements/Apple_Business_Chat2.svg',
        imagesms: 'https://d1hryyr5hiabsc.cloudfront.net/web2020/img/chat-engagements/SMS2.svg',
        channels: 'facebook,whatsapp,apple,sms',
        containerclass: 'lp-multi-channel-engagement',
        zindex: 10000,
        css: 'https://d1hryyr5hiabsc.cloudfront.net/web2020/js/engagement.min.css',
        debug: false,
        smsmessage: "I would like to connect with SMS!",
    },
    log: function(message, data) {
        if (this.debug) {
            console.log(message, data);
        }
    },
    config: function(options) {
        this.defaults = $.extend(this.defaults, options);
    },
    startWebWithMessage: function(message, elementID) {
        var _this = this;
        if (document.getElementById(elementID || this.elementId)) {
            document.getElementById(elementID || this.elementId).click();
        }
        if ($('#lpChat div[data-lp-point="lines_area"]').length < 1) {
    		setTimeout(function() {_this.startWebWithMessage(message, elementID);}, 500);
    	} else {
    		_this.webDirectMessage(message);
    	}
    },
    webDirectMessage: function(message) {
        $('.lpview_form_textarea').val(message);
        $('.lp_paper_plane_button').prop('disabled', false).trigger('click');
        $('.conversation-starter').hide();
    },
    channels: {
        main: function() {
            var image = $('<img>');
            image.attr('src', this.owner.defaults.imagemain);
            image.addClass('lp-multi-channel-main lp-multi-channel-image');
            //image.attr('data-LP-event', 'click');
            this.owner.container.prepend(image);
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
            this.owner.container.prepend(image);
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
            this.owner.container.prepend(image);
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
            this.owner.container.prepend(image);
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
            this.owner.container.prepend(image);
        }
    },
    callbacks: {
        sms: function() {
            lpMultiChannelEngagement.startWebWithMessage('SMS');
        },
        apple: function() {
            lpMultiChannelEngagement.startWebWithMessage('Apple Business Chat');
        },
        facebook: function() {
            lpMultiChannelEngagement.startWebWithMessage('Facebook Messenger');
        },
        whatsapp: function() {
            lpMultiChannelEngagement.startWebWithMessage('WhatsApp');
        }
    },
    openContext: function(channel) {
        this.context = channel;
    },
    createElement: function() {
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
    },
    init: function() {

        var _this = this;
        //lpMultiChannelEngagement.createElement();
        if (!$('link#lp-multichannel-css').length) {
            $("head").append("<link id='lp-multichannel-css' href='"+this.defaults.css+"' type='text/css' rel='stylesheet' onload=\"lpMultiChannelEngagement.createElement();\" />");
        }

    },
    addButton: function(key, url, callback) {
        var _this = this;
        var defaultChannels = this.defaults.channels.split(',');
        defaultChannels.push(key);
        this.defaults.channels = defaultChannels;
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
};

var intervals = {};
var removeListener = function(selector) {

    if (intervals[selector]) {

        window.clearInterval(intervals[selector]);
        intervals[selector] = null;
    }
};
var found = 'waitUntilExists.found';

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
        lpMultiChannelEngagement.init();
    } else {
        setTimeout(lp_wait_for_jquery, 50);
    }
}
lp_wait_for_jquery();

function lp_wait_for_tag() {
    if (window.lpTag) {
        lpTag.events.bind('lpUnifiedWindow', 'windowClosed', function(data) {
            lp_wait_for_jquery();
        });
    } else {
        setTimeout(lp_wait_for_tag, 50);
    }
}
lp_wait_for_tag();
