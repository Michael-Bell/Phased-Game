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
					'jquery.min.js' : 'jquery/dist/jquery.min.js',
					'foundation.min.js' : 'foundation/js/foundation.min.js',
					'modernizr.js' : 'modernizr/modernizr.js'
				}
			}
		}

	});

grunt.loadNpmTasks('grunt-bowercopy');

	// Default task(s).
	grunt.registerTask('default', ['bowercopy']);

};
