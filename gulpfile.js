const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const notify = require("gulp-notify");
const uglify = require("gulp-uglify");
const del = require("del");
const babel = require("gulp-babel");

function styles() {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", notify.onError())
    )
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp
    .src("./src/js/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(
      uglify({
        toplevel: true,
      })
    )
    .pipe(gulp.dest("./dist/js"))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });

  gulp.watch("./src/scss/**/*.scss", styles);
  gulp.watch("./src/js/**/*.js", scripts);
  gulp.watch("./*.html").on("change", browserSync.reload);
}

function clean() {
  return del(["dist/*"]);
}

gulp.task("styles", styles);
gulp.task("scripts", scripts);
gulp.task("watch", watch);

gulp.task("build", gulp.series(clean, gulp.parallel(styles, scripts)));
