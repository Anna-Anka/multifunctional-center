export const avifTask = (done) => {
    const { plugins, paths } = global.app

    return plugins.gulp.src([`${paths.images.src}/**/**.{jpg,jpeg,png}`,
    ...paths.images.srcExceptions
    ], { encoding: false })
        .pipe(plugins.newer(paths.images.app))
        .pipe(plugins.avif({ quality: 50 }))
        .pipe(plugins.gulp.dest(paths.images.app))
        .pipe(plugins.debug({
            title: 'Images',
        }))
        .on('end', () => {
            plugins.browsersync.reload();
            done();
        });
};
