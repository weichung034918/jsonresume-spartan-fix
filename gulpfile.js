const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');


gulp.task('nodemon', function (cb) {
	var started = false;
	return nodemon({
		script: './server.js'
	}).on('start', function () {
        browserSync.init(null, {
            proxy: "http://localhost:6969",
            files: ["public/**/*.*"],
            port: 5000,
            reloadDelay:1000,
            ignore:[
                "node_modules"
            ],
            ui:false
        });
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});