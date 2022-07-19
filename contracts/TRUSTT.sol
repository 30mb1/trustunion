// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/ITRUSTT.sol";


contract TRUSTT is ITRUSTT, ERC20, Ownable {
    address public minter;
    event SetNewMinter(address indexed prevMinter, address indexed newMinter);

    constructor() ERC20("TRUSTT Token", "TRUSTT") {
        minter = msg.sender;
    }

    function mint(address to, uint256 amount) external onlyMinter {
        _mint(to, amount);
    }

    function burn(address account, uint256 amount) external onlyMinter {
      _burn(account, amount);
    }

    modifier onlyMinter() {
        require(msg.sender == minter, "TRUSTT::onlyMinter: caller is not the minter");
        _;
    }

    function setMinter(address newMinter) external onlyOwner {
        require(newMinter != address(0), "TRUSTT::setMinter: new owner is the zero address");
        minter = newMinter;

        emit SetNewMinter(msg.sender, newMinter);
    }
}