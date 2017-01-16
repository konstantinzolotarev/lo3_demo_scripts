'use strict'

const solc = require('solc')

const Contract = `
contract DeviceContract {

    mapping(bytes32 => int) map;

    function add(bytes32 value, int amount)
    {
        map[value] = amount;
    }

    function get(bytes32 key) returns (int)
    {
        return map[key];
    }
}
`

const compiled = solc.compile(Contract, 1).contracts['DeviceContract']
const abi = JSON.parse(compiled.interface)

module.exports = {
  abi: abi,
  bytecode: compiled.bytecode
}
