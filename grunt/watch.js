module.exports = {
    js: {
        files: ["public/js/**/*.js"],
        tasks: ["eslint", "webpack"]
    },
    node: {
        files: ["src/**/*.js"],
        tasks: ["eslint"]
    },
    sass: {
        options: {
            livereload: false
        },
        files: ["public/scss/**/*.scss"],
        tasks: ['sasslint', "webpack"],
    },
};
