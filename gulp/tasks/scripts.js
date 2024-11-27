import webpackConfig from '../../webpack.config.js';

export const scriptsTask = () => {
    const { plugins, production, paths } = global.app
    webpackConfig.mode = production ? 'production' : 'development';
    webpackConfig.devtool = production ? false : 'source-map';

    plugins.gulpif(production, plugins.deleteAsync([paths.scripts.app]));
    const result = plugins.gulp.src(paths.scripts.src)
        .pipe(plugins.plumber(
            plugins.notify.onError({
                title: 'JS',
                message: 'Error: <%= error.message %>',
            }),
        ))
        .pipe(plugins.webpackStream(webpackConfig), plugins.webpack)
        .pipe(plugins.gulp.dest(paths.scripts.app))
        .pipe(plugins.debug({
            title: 'JS files',
        }))
        .pipe(plugins.browsersync.stream());
    return result;
};
