requirejs.config({
    baseURL: 'js/index',
    paths: {
        jquery	: '../vendor/jquery',
        text 	: '../vendor/text-requirejs',
        underscore : '../vendor/underscore',
        config	: '../config',
        app	: 'app'
    }
});

require(['jquery','underscore','app','config'], function($,_,app,config) {
    app.init();
});
