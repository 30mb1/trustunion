// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";


contract Router {
    using SafeERC20 for IERC20;

    function routTokens(IERC20 token, address[] memory recipients, uint256[] memory values, uint amount) external {
        require (recipients.length == values.length, "Router::routTokens: bad input arrays dimension");

        uint sum = 0;
        for (uint a = 0; a < values.length; a++)
          sum += values[a];

        require(sum == amount, "Router::routTokens: values sum != amount");

        token.safeTransferFrom(msg.sender, address(this), amount);

        for (uint i = 0; i < recipients.length; i++)
            token.safeTransfer(recipients[i], values[i]);
    }
}