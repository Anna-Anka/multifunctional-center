export const spritesTask = () => {
    const { plugins, paths } = global.app
    const result = plugins.gulp.src(paths.sprites.src)
        .pipe(plugins.svg({
            shape: {
                dest: 'sprites',
            },
            mode: {
                stack: {
                    sprite: '../sprite.svg',
                },
            },
        }))
        .pipe(plugins.gulp.dest(paths.images.app))
        .pipe(plugins.debug({
            title: 'Sprites',
        }))
        .on('end', plugins.browsersync.reload);
    return result;
};
