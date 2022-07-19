const chai = require("chai");
const { ethers, deployments} = require("hardhat");
const { solidity } = require("ethereum-waffle");
chai.use(solidity);
const { expect } = chai;

describe("Trust ecosystem test", function () {
    let usdt, trust, token_swap, router;
    let owner, alice, bob, carl, eve;

    it('Deploy contracts', async () => {
        [owner, alice, bob, carl, eve] = await ethers.getSigners();
        await deployments.fixture();

        usdt = await ethers.getContract("MockERC20");
        trust = await ethers.getContract("TRUSTT");
        router = await ethers.getContract("Router");
        token_swap = await ethers.getContract("TokenSwap");

        // send to alice and bob
        await usdt.connect(owner).transfer(alice.address, 1000000);
        await usdt.connect(owner).transfer(bob.address, 1000000);
    });

    it("Set new minter", async () => {
        await trust.connect(owner).setMinter(token_swap.address);
        const minter = await trust.minter();

        expect(minter).to.be.eq(token_swap.address);
    });

    it("Check admin functions protected", async () => {
        // try to change minter from non-owner address
        await expect(trust.connect(alice).setMinter(token_swap.address)).to.be.revertedWith("Ownable: caller is not the owner");
        await expect(trust.connect(alice).burn(token_swap.address, 1000)).to.be.revertedWith("Ownable: caller is not the minter");
        await expect(trust.connect(alice).mint(token_swap.address, 1000)).to.be.revertedWith("Ownable: caller is not the minter");
    })

    it("Mint TRUSTT base test", async () => {
        const alice_balance_usdt_prev = await usdt.balanceOf(alice.address);

        await usdt.connect(alice).approve(token_swap.address, 1000);
        await token_swap.connect(alice).getTRUSTT(1000);

        const alice_balance_usdt = await usdt.balanceOf(alice.address);
        const alice_balance_trustt = await trust.balanceOf(alice.address);

        // alice balance decreased by exact number
        const expected_usdt_balance = alice_balance_usdt_prev.sub(1000);
        expect(expected_usdt_balance.toString()).to.be.eq(alice_balance_usdt.toString());
        expect(alice_balance_trustt.toString()).to.be.eq('1000');
    })

    it("Burn TRUSTT base test", async () => {
        const alice_balance_usdt_prev = await usdt.balanceOf(alice.address);

        await token_swap.connect(alice).sellTRUSTT(1000);

        const alice_balance_usdt = await usdt.balanceOf(alice.address);
        const alice_balance_trustt = await trust.balanceOf(alice.address);

        // alice balance decreased by exact number
        const expected_usdt_balance = alice_balance_usdt_prev.add(1000);
        expect(expected_usdt_balance.toString()).to.be.eq(alice_balance_usdt.toString());
        expect(alice_balance_trustt.toString()).to.be.eq('0');
    });

    it("Check router works correctly", async () => {
        await usdt.connect(owner).approve(router.address, 2000);

        // bad input arrays
        await expect(router.connect(owner).routTokens(usdt.address, [carl.address, eve.address], [1000], 2000))
            .to.be.revertedWith("Router::routTokens: bad input arrays dimension");

        // bad sum
        await expect(router.connect(owner).routTokens(usdt.address, [carl.address, eve.address], [1000, 1000], 1500))
            .to.be.revertedWith("Router::routTokens: values sum != amount");

        await router.connect(owner).routTokens(usdt.address, [carl.address, eve.address], [1000, 1000], 2000);
        const carl_balance = await usdt.balanceOf(carl.address);
        const eve_balance = await usdt.balanceOf(eve.address);

        expect(carl_balance.toString()).to.be.eq('1000');
        expect(eve_balance.toString()).to.be.eq('1000');
    });
});
