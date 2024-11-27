export const resourcesTask = () => {
    const { plugins, paths } = global.app
    return plugins.gulp.src(paths.resources.src, { encoding: false })
        .pipe(plugins.gulp.dest(paths.productFolder))
}