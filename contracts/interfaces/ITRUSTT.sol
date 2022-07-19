pragma solidity 0.8.13;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


interface ITRUSTT is IERC20 {
    function mint(address to, uint256 amount) external;
    function burn(address account, uint256 amount) external;
}
