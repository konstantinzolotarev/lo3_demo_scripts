'use strict'

const solc = require('solc')
const erisDb = require('eris-db-promise')
const config = require('config')

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

const deployer = config.accounts.lo3_demo_chain_root_000
const tx = {
  data: compiled.bytecode.toUpperCase(),
  input: {
    address: deployer.address
  }
}

const eris = erisDb.createInstance(config.rpc.node1)

eris
  .transactions
  .sendTransaction(tx, deployer.privKey)
  .then((info) => {
    console.log('==========================')
    console.log(info.call_data.callee)
    console.log('==========================')
  })
