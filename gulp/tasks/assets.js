export const assetsTask = () => {
    const { plugins, paths } = global.app
    return plugins.gulp.src(paths.assets.src, { encoding: false })
        .pipe(plugins.gulp.dest(paths.assets.app))
}