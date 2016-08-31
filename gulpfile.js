var gulp = require("gulp");
var babel = require('gulp-babel');


gulp.task("jsx", function () {
    gulp.src(["jsx/**/*.jsx"])
    .pipe(babel({
        presets: ['react']
    }))
    .pipe(gulp.dest("."));
});

gulp.task("watch:jsx", ['jsx'], function () {
    gulp.watch("jsx/**/*.jsx", ['jsx']);
});