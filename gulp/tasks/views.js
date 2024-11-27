export const viewsTask = () => {
    const { plugins, paths } = global.app

    const result = plugins.gulp.src(paths.html.src)
        .pipe(plugins.include({
            prefix: '@',
            basepath: '@file',
        }))
        .pipe(plugins.gulp.dest(paths.html.app))
        .pipe(plugins.browsersync.stream());
    return result;
};
