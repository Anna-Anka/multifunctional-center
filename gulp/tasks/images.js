export const imagesTask = (done) => {
    const { plugins, production, paths } = global.app

    return plugins.gulp.src([`${paths.images.src}/**/**.{jpg,jpeg,png,svg}`, ...paths.images.srcExceptions], { encoding: false })
        .pipe(plugins.newer(paths.images.app))
        .pipe(plugins.gulpif(production, plugins.imagemin([
            plugins.imageminGiflossy({
                optimizationLevel: 3,
                optimize: 3,
                lossy: 2,
            }),
            plugins.imageminPngquant({
                speed: 5,
                quality: [0.7, 0.9],
            }),
            plugins.imageminZopfli({
                more: true,
            }),
            plugins.imageminMozjpeg({
                progressive: true,
                quality: 95,
            }),
            plugins.svgo({
                plugins: [
                    {
                        name: 'removeViewBox',
                        active: false
                    },
                    {
                        name: 'removeUnusedNS',
                        active: false
                    },
                    {
                        name: 'removeUselessStrokeAndFill',
                        active: false
                    },
                    {
                        name: 'cleanupIDs',
                        active: false
                    },
                    {
                        name: 'removeComments',
                        active: true
                    },
                    {
                        name: 'removeEmptyAttrs',
                        active: true
                    },
                    {
                        name: 'removeEmptyText',
                        active: true
                    },
                    {
                        name: 'collapseGroups',
                        active: true
                    },
                ]
            }),
        ])))
        .pipe(plugins.gulp.dest(`${paths.images.app}/`))
        .pipe(plugins.debug({
            title: 'Images',
        }))
        .pipe(plugins.browsersync.stream())
        .on('end', () => {
            plugins.browsersync.reload();
            done();
        });
};
