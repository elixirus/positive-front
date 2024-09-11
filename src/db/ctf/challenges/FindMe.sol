// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract FindMe {
    bool public isUnlock;
    string constant text = "Very important text";
    uint256 public time = block.timestamp;
    uint16 private small = 160;
    uint8 private smaller = 8;
    uint16 private special = uint16(block.timestamp);
    uint16 immutable setMe;
    bytes32[3] private data;

    constructor(uint16 _setMe, bytes32[3] memory _data) {
        setMe = _setMe;
        data = _data;
    }

    function unLock(bytes16 _key) public {
        require(_key == bytes16(data[1]));
        isUnlock = true;
    }
}
