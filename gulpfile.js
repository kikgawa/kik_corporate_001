const {src,dest,parallel,series,watch} = require("gulp")
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const mqpacker = require("css-mqpacker")
const csswring = require("csswring")
const del = require("del")
const cssimport = require("gulp-cssimport")
const concat = require("gulp-concat")
const rename = require("gulp-rename")
const nano = require("gulp-cssnano")
const imagemin = require("gulp-imagemin")
const pug = require("gulp-pug")
const webserver = require("gulp-webserver")
const browserSync = require("browser-sync")
const prettify = require("gulp-prettify")

function clean(){
  return del(["dest"]);
}
function file_dest(){
  return src("./src/fonts/**")
    .pipe(dest("./dest/fonts"))
}
function css_dest(){
  return src("./src/css/**.css")
    .pipe(dest("./dest/css"))
}
function css(){
  return src("src/scss/style.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest('dest/css/'));
}
function images(){
  return src("src/img/**/*")
    .pipe(imagemin({progressive: true}))
    .pipe(dest("dest/img"))
}
function js(){
  return src("src/js/**/*")
    .pipe(dest("./dest/js"))
}
function fonts(){
  return src("src/fonts/**/*")
    .pipe(dest("./dest/fonts"))
}
function html(){
  return src("./src/templates/**/**.pug")
    .pipe(pug({pretty:true}))
    .pipe(dest("./dest"))
}
function browserSyncTask() {
  browserSync({
    server: {
      baseDir: "dest"
    }
  })
  watch("src/**", function() {
    browserSync.reload()
  })
}
function watch_file() {
  watch("./src/scss/**/*.scss", (css));
  watch("./src/images/**/*", (images));
  watch("./src/js/**/*.js", (js));
  watch("./src/templates/**/*.pug", (html));
}

exports.file_dest = file_dest;
exports.css_dest = css_dest;
exports.clean = clean;
exports.images = images;
exports.fonts = fonts;
exports.css = css;
exports.js = js;
exports.html = html;
exports.browserSyncTask = browserSyncTask;
exports.watch_file = watch_file;
exports.default = series(parallel(images, fonts, css, js, html, watch_file, browserSyncTask),file_dest, css_dest, clean, );
