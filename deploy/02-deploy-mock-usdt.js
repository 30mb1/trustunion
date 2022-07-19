module.exports = async ({getNamedAccounts, deployments}) => {
    const {deployer} = await getNamedAccounts();

    await deployments.deploy('MockERC20', {
        from: deployer,
        log: true,
        args: ["TEST", "TEST", 1000000000000]
    });
};
module.exports.tags = ['mock'];
