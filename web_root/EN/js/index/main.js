requirejs.config({
    baseURL: 'js/index',
    paths: {
        jquery	: '../vendor/jquery',
        config	: '../config',
        app	: 'app'
    }
});

require(['jquery','app','config'], function($,app,config) {
    app.init();
});
