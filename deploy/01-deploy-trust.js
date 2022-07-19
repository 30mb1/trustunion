module.exports = async ({getNamedAccounts, deployments}) => {
    const {deployer} = await getNamedAccounts();

    await deployments.deploy('TRUSTT', {
        from: deployer,
        log: true,
        args: []
    });
};
module.exports.tags = ['trust'];
