/*!
 * Express - Template Cache
 * Copyright(c) 2012 Justin Li <j-li.net>
 * MIT Licensed
 */

var express = require('express');


/**
 * Statically render `view` with the given `options` and optional callback `fn`.
 *
 * If a view by the given name hasn't yet been rendered, a call to
 * `express.response.render(view, options, fn)` is made, and the result is cached.
 * 
 * Otherwise, the cached result is used.
 *
 * When a callback function is given a response will _not_ be made
 * automatically, otherwise a response of _200_ and _text/html_ is given.
 *
 * @param  {String} view
 * @param  {Object|Function} options or callback function
 * @param  {Function} fn
 */

express.response.renderStatic = function(view, options, fn) {
	var self = this, req = this.req, app = req.app;

	if ('undefined' == typeof app.cachedViews) {
		app.cachedViews = [];
	}

	if ('function' == typeof options) {
		fn = options, options = {};
	}

	fn = fn || function(err, str){
		if (err) return req.next(err);
		self.send(str);
	};

	if (view in app.cachedViews) {
		fn(null, app.cachedViews[view]);
	} else {
		this.render(view, options, function(err, str) {
			app.cachedViews[view] = str;
			if (err) return req.next(err);
			self.send(str);
		});
	}
};
