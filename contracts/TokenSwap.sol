// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/ITRUSTT.sol";


contract TokenSwap is Ownable {
    using SafeERC20 for IERC20;

    IERC20 public USDT;
    ITRUSTT public TRUSTT;

    constructor(
        address _USDT,
        address _TRUSTT
    ) {
        USDT = IERC20(_USDT);
        TRUSTT = ITRUSTT(_TRUSTT);
    }

    function getTRUSTT(uint amountUSDT) external {
        USDT.safeTransferFrom(msg.sender, address(this), amountUSDT);
        TRUSTT.mint(msg.sender, amountUSDT);
    }

    function sellTRUSTT(uint amountUSDT) external {
        TRUSTT.burn(msg.sender, amountUSDT);
        USDT.safeTransfer(msg.sender, amountUSDT);
    }
}