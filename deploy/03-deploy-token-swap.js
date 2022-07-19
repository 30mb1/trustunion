module.exports = async ({getNamedAccounts, deployments, getChainId}) => {
    let {deployer, usdt} = await getNamedAccounts();

    const chainId = await getChainId();
    // hardhat test node, get from deployments
    if (chainId.toString() === '1111') {
        usdt = (await deployments.get('MockERC20')).address;
    }
    // get deployed trustt token
    const trustt = await deployments.get('TRUSTT');

    await deployments.deploy('TokenSwap', {
        from: deployer,
        log: true,
        args: [usdt, trustt.address]
    });
};

module.exports.tags = ['token_swap'];
