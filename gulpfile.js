const config = {
  folder: 'dist',
  src: 'app',
}


const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglifyjs = require('uglify-js');
const uglifyes = require('uglify-es');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const lineec = require('gulp-line-ending-corrector');
const del = require('del');
const composer = require('gulp-uglify/composer');
const uglify = composer(uglifyes, console);


function clean() {

  return del([

    './' + config.folder + '',
  ]);
}


function cleanImage() {

  return del([

    './' + config.folder + '/images',
  ]);
}


function scss() {

  return gulp.src(['./' + config.src + '/css/**/*.css', './' + config.src + '/scss/**/*.scss',])

  .pipe(sass({
    outputStyle: 'expanded'
  }).on('error', sass.logError))

  .pipe(cleanCSS({ compatibility: 'ie8' }))

  .pipe(sourcemaps.init({ loadMaps: true }))

  .pipe(autoprefixer('last 2 versions'))

  //.pipe(sourcemaps.write())

  .pipe(lineec())

  .pipe(concat('main.css'))

  .pipe(gulp.dest('./' + config.folder + '/css'))

  .pipe(browserSync.stream());
}


function javascript() {

  return gulp.src('./' + config.src + '/js/**/*.js')

  .pipe(concat('scripts.min.js'))

  .pipe(sourcemaps.init({ loadMaps: true }))

  .pipe(uglify())

  .pipe(lineec())

  .pipe(gulp.dest('./' + config.folder + '/js'))

  .pipe(browserSync.stream());
}


function images() {

  cleanImage();

  return gulp.src('' + config.src + '/images/**/*')

  .pipe(changed('./' + config.folder + '/images/'))

  .pipe( imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 5})
  ]))

  .pipe(gulp.dest('./' + config.folder + '/images/'))
  .pipe(browserSync.stream());
}


function fonts() {

  return gulp.src('' + config.src + '/fonts/**/*')
  .pipe(gulp.dest('./' + config.folder + '/fonts'));
}


function html() {

  return gulp.src('' + config.src + '/**/*.html')
  .pipe(gulp.dest('./' + config.folder + ''));
}


function observer() {

  browserSync.init({
    server: {
      baseDir: './' + config.folder + '',
      timestamps: true,
    },
    port: 8000
  });

  gulp.watch('./' + config.src + '/scss/**/*.scss', scss);
  gulp.watch('./' + config.src + '/css/**/*.css', scss);
  gulp.watch('./' + config.src + '/js/**/*.js', javascript);
  gulp.watch('./' + config.src + '/fonts/*', fonts);
  gulp.watch('./' + config.src + '/**/*.html', html);
  gulp.watch('' + config.src + '/images/*', images);
  gulp.watch('./' + config.folder + '/*.html').on('change', browserSync.reload);

}


exports.clean = clean;
exports.cleanImage = cleanImage;
exports.scss = scss;
exports.javascript = javascript;
exports.observer = observer;
exports.images = images;
exports.fonts = fonts;
exports.html = html;

gulp.task('build', gulp.series(clean, gulp.parallel(scss, javascript, images, fonts, html)));
gulp.task('watch', gulp.series(clean, gulp.parallel(scss, javascript, images, fonts, html), gulp.parallel(observer)));