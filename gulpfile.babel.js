// Gulp
import gulp from 'gulp';

// Gulp css related plugins
// import sass from 'gulp-sass';
// import cleancss from 'gulp-clean-css';
// import autoprefixer from 'gulp-autoprefixer';

// Gulp JS related plugins
// import babel from 'gulp-babel';
// import babelify from 'babelify';
// import uglify from 'gulp-uglify';
// import concat from 'gulp-concat';

// Gulp utility plugins
// import browserSync from 'browser-sync';
// import browserify from 'browserify';
// import watchify from 'watchify';
// import sourcemaps from 'gulp-sourcemaps';
import imagemin from 'gulp-imagemin';
import changed from 'gulp-changed';
import plumber from 'gulp-plumber';
import gutil from 'gulp-util';
import del from 'del';
import rename from 'gulp-rename';
// import source from 'vinyl-source-stream';
// import buffer from 'vinyl-buffer';
// import transform from 'vinyl-transform';
// import dotenv from 'dotenv';

// configs
import config from './gulpfile.config';
// dotenv.load();

// constants
// const ENV = process.env.ENVIRONMENT;
// const bs = browserSync.create();
// const reload = browserSync.reload;
// const autoprefixerconfig = ['> 5%', 'ie >= 10', 'Firefox < 20', 'ios 6', 'android 4'];
const gs = gulp.series;
const gp = gulp.parallel;


// create server task
// export function browserTask() {
//     bs.init({
//         proxy: {
//             target: config.project,
//             ws: true
//         },
//         serveStatic: [
//             '.',
//             config.styles.DEST,
//             config.scripts.DEST,
//             config.images.DEST
//         ],
//         ghostMode: false,
//         logLevel: 'debug',
//         logSnippet: false,
//         open: false,
//         reloadOnRestart: true,
//         injectChanges: true,
//         minify: false,
//         timestamps: true
//     });
// }

// build css
// export function stylesTask(done) {
//     return gulp.src(config.styles.SRC)
//         .pipe(plumber(function (error) {
//             console.log(error);
//             this.emit('end');
//         }))
//         .pipe(sourcemaps.init())
//         .pipe(sass().on('error', sass.logError))
//         .pipe(autoprefixer(autoprefixerconfig))
//         .pipe(cleancss())
//         .pipe(rename({
//             suffix: '.min'
//         }))
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest(config.styles.DEST))
//         .pipe(bs.stream())
//         .on('end', () => {
//             done();
//         });
// }

// build js
// export function babelfy() {
//     return gulp.src(config.scripts.SRC)
//         .pipe(sourcemaps.init())
//         .pipe(babel({
//             presets: ['es2015']
//         }))
//         .pipe(concat('main.min.js'))
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest(config.scripts.DEST));
// }

/**
 * Browserify everything
 * Putt everything which [require]
 * In bundle.js
 **/
// export function browserfy() {
//
//     watchify.args.debug = true;
//
//     return browserify(config.scripts.DEST + 'main.min.js', watchify.args)
//         .bundle()
//         .on('error', function(err) { console.log('Error: ' + err.message); })
//         .pipe(source('main.min.js'))
//         .pipe(buffer())
//         .pipe(gulp.dest(config.scripts.DEST))
//         .pipe(bs.stream());
// }

// export function javaScriptTask() {
//     return browserify({entries: "./src/WeddingBundle/Resources/assets/app/scripts/main.js", debug: true})
//         .transform("babelify", { presets: ["es2015"] })
//         .bundle()
//         .on('error', function(err) { console.log('Error: ' + err.message); })
//         .pipe(source('main.min.js'))
//         .pipe(buffer())
//         .pipe(sourcemaps.init())
//         .pipe(uglify())
//         .pipe(sourcemaps.write('./maps'))
//         .pipe(gulp.dest('./dist/js'))
//         .pipe(bs.stream());
// }

// export function javaScriptTask() {
//
//     watchify.args.debug = true;
//
//     let bundler;
//
//     const getBundler = () => {
//         if (!bundler) {
//             bundler = watchify(browserify(config.scripts.SRC, watchify.args));
//         }
//         return bundler;
//     };
//
//     const rebundle = () => {
//         return getBundler()
//             .transform(babelify.configure({
//                 presets : ["es2015"]
//             }))
//             .bundle()
//             .on('error', function(err) { console.log('Error: ' + err.message); })
//             .pipe(source('app.js'))
//             .pipe(buffer())
//             .pipe(sourcemaps.init())
//             .pipe(uglify())
//             .pipe(rename({
//                 suffix: '.min'
//             }))
//             .pipe(sourcemaps.write('.'))
//             .pipe(gulp.dest(config.scripts.DEST))
//             .pipe(reload({ stream: true }));
//     };
//
//     getBundler().on('update', rebundle);
//
//     return rebundle();
// }

// export function javaScriptTask() {
//
// //     watchify.args.debug = true;
// // // Input file.
// //     const bundler = watchify(browserify(config.scripts.SRC, watchify.args));
// //
// // // Babel transform
// //     bundler.
// //
// // // On updates recompile
// //     bundler.on('update', bundle);
// //
// //     function bundle() {
// //
// //         gutil.log('Compiling JS...');
// //
// //         return bundler.bundle()
// //             .on('error', function (err) {
// //                 gutil.log(err.message);
// //                 browserSync.notify("Browserify Error!");
// //                 this.emit("end");
// //             })
// //             .pipe(exorcist(config.scripts.DEST +'main.min.js.map'))
// //             .pipe(source('main.js'))
// //             .pipe(gulp.dest(config.scripts.DEST))
// //             .pipe(bs.stream({once: true}));
// //     }
// //
// //     gulp.task('bundle', function () {
// //         return bundle();
// //     });
//
//
//     watchify.args.debug = true;
//
//     let bundler;
//
//     const getBundler = () => {
//         if (!bundler) {
//             bundler = watchify(browserify(config.scripts.SRC, watchify.args));
//         }
//         return bundler;
//     };
//
//     console.log(getBundler());
//
//     const rebundle = () => {
//         return getBundler()
//             .transform(babelify.configure({
//                 presets: ["es2015"],
//                 sourceMapRelative: '.'
//             }))
//             .bundle()
//             .on('error', function (err) {
//                 gutil.log(err.message);
//                 browserSync.notify("Browserify Error!");
//                 this.emit("end");
//             })
//             .pipe(exorcist(config.scripts.DEST +'main.min.js.map'))
//             // .pipe(source('main.js'))
//             // .pipe(uglify())
//             // .pipe(rename({
//             //     suffix: '.min'
//             // }))
//             // .pipe(sourcemaps.write('.'))
//             .pipe(gulp.dest(config.scripts.DEST))
//             .pipe(bs.stream({once: true}));
//     };
//
//     getBundler().on('update', rebundle);
//
//     return rebundle();
// }

// minify images
export function imagesTask (done) {
    return gulp.src(config.images.SRC, { since: gulp.lastRun(imagesTask) })
        .pipe(plumber(function (error) {
            console.log(error);
            this.emit('end');
        }))
        .pipe(changed(config.images.DEST))
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            optimizationLevel: 5
        }))
        .pipe(gulp.dest(config.images.DEST))
        // .pipe(reload({ stream: true }))
        .on('end', () => {
            done();
        });
}

// copy fonts
export function copyFonts (done) {
    return gulp.src(config.fonts.SRC)
        .pipe(changed(config.fonts.DEST))
        .pipe(gulp.dest(config.fonts.DEST))
        .on('end', () => {
            done();
        });
}

// clean build
export function cleanBuild () {

    return del([config.fonts.DEST, config.images.DEST, config.styles.DEST, config.scripts.DEST],
        {force: true}).then(paths => {
        console.log('Files and folders that would be deleted:\n', paths.join('\n'));
    });

}

// watch task
export function watchTask (done) {
    gulp.watch(config.fonts.SRC, gp(copyFonts));
    gulp.watch(config.images.SRC, gp(imagesTask));
    // gulp.watch(config.styles.ALL, gp(stylesTask));
    // gulp.watch(config.scripts.ALL, gp(gs(babelfy, browserfy)));
    gulp.watch(config.views.ALL, gs(reload));
    done();
}

// Global tasks
const serve = gs(gp(watchTask));
export { serve };

const build = gs(cleanBuild, gp(copyFonts, imagesTask ));
export { build };

// ########################################
export default build;
