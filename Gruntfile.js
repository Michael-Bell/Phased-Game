module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		bowercopy : {
			options : {
				srcPrefix : 'bower_components'
			},
			scripts : {
				options : {
					destPrefix : 'js/vendor'
				},
				files : {
					'jquery/dist/jquery.min.js' : 'jquery.min.js',
					'foundation/js/foundation.min.js' : 'foundation.min.js',
					'modernizr/modernizr.js' : 'modernizr.js'
				}
			}
		}

	});

grunt.loadNpmTasks('grunt-bowercopy');

	// Default task(s).
	grunt.registerTask('default', ['bowercopy']);

};
