export const stylesTask = async () => {
    const { plugins, production, paths } = global.app
    const sass = plugins.gulpsass(plugins.dartsass);

    if (production) {
        await plugins.deleteAsync([paths.styles.app]);
    }

    return plugins.gulp.src(paths.styles.src)
        .pipe(plugins.gulpif(!production, plugins.sourcemaps.init()))
        .pipe(plugins.plumber(
            plugins.notify.onError({
                title: 'SCSS',
                message: 'Error: <%= error.message %>',
            }),
        ))
        .pipe(sass())
        .pipe(plugins.groupmedia())
        .pipe(plugins.autoprefixer({
            cascade: false,
            grid: true,
            overrideBrowserslist: ['last 5 versions'],
        }))
        .pipe(plugins.gulpif(production, plugins.mincss({
            compatibility: 'ie8',
            level: {
                1: {
                    specialComments: 0,
                    removeEmpty: true,
                    removeWhitespace: true,
                },
                2: {
                    mergeMedia: true,
                    removeEmpty: true,
                    removeDuplicateFontRules: true,
                    removeDuplicateMediaBlocks: true,
                    removeDuplicateRules: true,
                    removeUnusedAtRules: false,
                },
            },
        })))
        .pipe(plugins.plumber.stop())
        .pipe(plugins.gulpif(!production, plugins.sourcemaps.write('.')))

        .pipe(plugins.gulp.dest(paths.styles.app))
        .pipe(plugins.debug({
            title: 'CSS files',
        }))
        .on('end', plugins.browsersync.reload)
        .pipe(plugins.browsersync.stream());
};
