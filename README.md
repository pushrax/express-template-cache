# Express Template Cache

  express-template-cache is a simple and lightweight module that adds cached rendering of templates to Express. It is useful for serving static pages that only need to be rendered once.

  The first time a particular template is requested, it is rendered and the result is cached to memory. Subsequent requests will simply be served from the cache, instead of rendering the template again. This eliminates the need to manually render templates for static pages, while keeping page load times to a minimum.

## Installation

npm:

    $ npm install express-template-cache

## Usage

  To use this module, just `require('express-template-cache')`, and it will monkey-patch Express, adding the `res.renderStatic()` method. It is used in the exact same way as [`res.render()`][res-render-docs], however it implements the caching strategy described above.

  	require('express-static-render');

    app.get('/', function(req, res) {
        res.renderStatic('index', { title: 'My Awesome Website' });
    });

[res-render-docs]: http://expressjs.com/guide.html#res.render()

## Planned Features

 - HTTP Cache-Control and conditional GET support
 - Way to define unique views to be rendered other than just by name
