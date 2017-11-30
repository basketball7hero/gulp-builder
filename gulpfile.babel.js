import { resolve, join } from 'path';
import gulp from 'gulp';
import sass from 'gulp-sass';
import pug from 'gulp-pug';
import autoprefixer from 'gulp-autoprefixer';
import cssmin from 'gulp-cssmin';
import browserSync from 'browser-sync';
import svgSymbols from 'gulp-svg-symbols';
import rename from 'gulp-rename';
import changed from 'gulp-changed';
import gulpFlatten from 'gulp-flatten';
import gulpIf from 'gulp-if';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import imagemin from 'gulp-imagemin';
import clean from 'gulp-clean';


gulp.task('clean', () =>
    gulp.src('public', { read: false })
        .pipe(clean())
);


gulp.task('change:fonts', () =>
    gulp.src('src/application/fonts/**/*')
        .pipe(changed('public'))
        .pipe(gulp.dest('public/static/fonts/'))
);


gulp.task('change:images:raster', () =>
    gulp.src([
        'src/application/templates/{components,elements}/**/images/*.{png,gif,jpg,ico}',
        'src/application/images/*.{png,gif,jpg,ico}'
    ])
        .pipe(changed('public'))
        .pipe(gulpFlatten({ subPath: [-1, 1] }))
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5
        }))
        .pipe(gulp.dest('public/static/images/'))
);


gulp.task('change:images:vector', () =>
    gulp.src('src/application/templates/{components,elements}/**/images/*.svg')
        .pipe(changed('public'))
        .pipe(gulpFlatten({ subPath: [-1, 1] }))
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [{ removeViewBox: true }]
        }))
        .pipe(gulp.dest('public/static/images/'))
);


gulp.task('change:images', ['change:images:raster', 'change:images:vector']);


gulp.task('sprite:svg', () =>
    gulp.src('src/application/templates/{components,elements}/**/icons/*.svg')
        .pipe(svgSymbols({
            svgId: '%f',
            class: '.%f',
            title: false,
            templates: [
                join(__dirname, 'src/application/utils/sprite.svg')
            ],
        }))
        .pipe(gulpIf(/\.svg$/, rename('sprite.svg')))
        .pipe(gulpIf(/\.svg$/, gulp.dest('src/application/templates/components/icon')))
);


gulp.task('templates:pug', () =>
    gulp.src('src/application/templates/pages/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('public'))
);


gulp.task('styles:scss', () =>
    gulp.src('src/application/styles/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: [
                'last 10 versions',
                'IE 8',
                'IE 9',
                '> 3%'
            ],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(rename({
            basename: 'styles',
            suffix: '.min'
        }))
        .pipe(gulp.dest('public/static/css'))
        .pipe(browserSync.reload({ stream: true }))
);


gulp.task('bundle:js', () =>
    gulp.src('src/application/scripts/bundle.js')
        .pipe(webpackStream({
            name: `${process.env.NODE_ENV} config`,
            mode: process.env.NODE_ENV,
            entry: {
                main: ['babel-polyfill', resolve(__dirname, './src/application/scripts/index.js')]
            },
            output: {
                path: resolve(__dirname, './public/static/js/'),
                filename: 'bundle.min.js',
                publicPath: '/static/'
            },
            module: {
                rules: [
                    {
                        test: /\.js?$/,
                        exclude: /node_modules/,
                        use: ['babel-loader']
                    }

                ]
            },
            plugins: [
                // new webpack.ProvidePlugin({
                //     $: 'jquery',
                //     'jQuery': 'jquery',
                //     'window.jQuery': 'jquery'
                // }),
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
                })
            ]
        }))
        .pipe(gulp.dest('public/static/js'))
);


gulp.task('reload:default', () => browserSync.reload());


gulp.task('reload:stream', () => browserSync.reload({ stream: true }));


gulp.task('browser-sync', () =>
    browserSync({
        server: {
            baseDir: 'public'
        },
        notify: false
    })
);


const defaultTasks = ['change:fonts', 'change:images', 'sprite:svg', 'templates:pug', 'styles:scss', 'bundle:js'];
const watckTasks = ['browser-sync', ...defaultTasks, 'reload:default'];
const buildTasks = [...defaultTasks];


gulp.task('watch', watckTasks, () => {
    gulp.watch('src/application/fonts/**/*', ['change:fonts']);
    gulp.watch('src/application/templates/{components,elements}/**/images/*.{png,gif,jpg}', ['change:images:raster']);
    gulp.watch('src/application/templates/{components,elements}/**/images/*.svg', ['change:images:vector']);
    gulp.watch('src/application/templates/**/*.svg', ['sprite:svg', 'templates:pug']);
    gulp.watch('src/application/templates/**/*.pug', ['templates:pug']);
    gulp.watch('src/application/{templates,styles}/**/*.scss', ['styles:scss']);
    gulp.watch('src/application/{templates,scripts}/**/*.js', ['bundle:js']);
    gulp.watch('public/*.html', ['reload:default']);
    gulp.watch('public/static/js/*.js', ['reload:default']);
});


gulp.task('build', buildTasks);


gulp.task('watchbuild', buildTasks, () => {
    gulp.watch('src/application/fonts/**/*', ['change:fonts']);
    gulp.watch('src/application/templates/{components,elements}/**/images/*.{png,gif,jpg}', ['change:images:raster']);
    gulp.watch('src/application/templates/{components,elements}/**/images/*.svg', ['change:images:vector']);
    gulp.watch('src/application/templates/**/*.svg', ['sprite:svg', 'templates:pug']);
    gulp.watch('src/application/templates/**/*.pug', ['templates:pug']);
    gulp.watch('src/application/{templates,styles}/**/*.scss', ['styles:scss']);
    gulp.watch('src/application/{templates,scripts}/**/*.js', ['bundle:js']);
    gulp.watch('public/*.html', ['reload:default']);
});