export const deployTask = (cb) => {
    const { plugins } = global.app
    plugins.deploy.publish(plugins.path.join(process.cwd(), 'app'), cb);
};
