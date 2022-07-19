module.exports = async ({getNamedAccounts, deployments}) => {
    const {deployer} = await getNamedAccounts();

    await deployments.deploy('Router', {
        from: deployer,
        log: true,
        args: []
    });
};
module.exports.tags = ['router'];
