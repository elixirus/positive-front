// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Groth16Verifier} from "./verifier.sol";

contract Underconstrained is Groth16Verifier {
    uint256 public immutable out;
    bool public flag;

    constructor(uint256 _out) {
        out = _out;
    }

    function verify(
        uint256[2] calldata _pA,
        uint256[2][2] calldata _pB,
        uint256[2] calldata _pC,
        uint256[1] calldata _pubSignals
    ) public {
        require(_pubSignals[0] == out, "error public");
        flag = verifyProof(_pA, _pB, _pC, _pubSignals);
        require(flag, "wrong proof");
    }
}
