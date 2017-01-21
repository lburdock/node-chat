module.exports = function(grunt) {
    require( "load-grunt-config" )(grunt, {
        data: {
            pkg: grunt.file.readJSON('package.json')
        }
    });
};
