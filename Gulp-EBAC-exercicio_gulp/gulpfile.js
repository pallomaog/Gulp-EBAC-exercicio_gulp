import gulp from 'gulp';
import sassModule from 'gulp-sass';
import sassCompiler from 'sass';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import obfuscate from 'gulp-obfuscate';
import imagemin from 'gulp-imagemin';

const sass = sassModule(sassCompiler);

function minifyImages() {
  return gulp.src('source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/images'));
}

function comprimeJavaScript(){
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'))
}

function compilaSass(){
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

export const sassTask = compilaSass;
export const watch = function() {
    gulp.watch('./source/styles/*.scss',{ignoreInitial: false}, gulp.series(compilaSass));
}
export const javascript = comprimeJavaScript;
export const minifyImagesTask = minifyImages;