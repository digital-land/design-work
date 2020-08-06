const gulp = require('gulp')
const sass = require('gulp-sass')
const sassLint = require('gulp-sass-lint')
const clean = require('gulp-clean')

// set paths ...
const config = {
  scssPath: 'src/scss',
  destPath: 'application/static/stylesheets'
}

// Tasks used to generate latest stylesheets
// =========================================
const cleanCSS = () =>
  gulp
    .src('application/static/stylesheets/**/*', { read: false })
    .pipe(clean())
cleanCSS.description = 'Delete old stylesheets files'

// compile scss to CSS
const compileStylesheets = () =>
  gulp
    .src(config.scssPath + '/*.scss')
    .pipe(
      sass({ outputStyle: 'expanded', includePaths: ['src/scss'] })
    )
    .on('error', sass.logError)
    .pipe(gulp.dest(config.destPath))

// check .scss files against .sass-lint.yml config
const lintSCSS = () =>
  gulp
    .src('src/scss/**/*.s+(a|c)ss')
    .pipe(
      sassLint({
        // files: { ignore: "src/scss/styleguide/_highlight-style.scss" },
        configFile: '.sass-lint.yml'
      })
    )
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())

// Tasks to expose to CLI
// ======================
const latestStylesheets = gulp.series(
  cleanCSS,
  lintSCSS,
  compileStylesheets
)
latestStylesheets.description = 'Generate the latest stylesheets'

exports.stylesheets = latestStylesheets
