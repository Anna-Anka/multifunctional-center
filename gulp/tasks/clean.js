export const cleanTask = () => {
    const { plugins, paths } = global.app
    return plugins.deleteAsync([`${paths.productFolder}/*`]);
}
