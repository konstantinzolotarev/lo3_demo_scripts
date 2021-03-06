'use strict'

const erisContracts = require('eris-contracts-promise')
const config = require('config')
const contract = require('./contract')
const crypto = require('crypto')

if (!process.argv[2]) {
  console.log('==========================')
  console.log('Please use script in format: node node1.js DEPLOYED_ADDRESS_HERE')
  console.log('==========================')
  return process.exit()
}

const deployedAddress = process.argv[2]
const value = process.argv[3] || 10
const manager = erisContracts.newContractManager(config.rpc.node2, config.accounts.lo3_demo_chain_root_001)
const instance = manager.newContract(contract.abi, contract.bytecode, deployedAddress)

instance.at(deployedAddress)
  .then((con) => {
    return con
      .add(deployedAddress, value)
      .then(() => con.get(deployedAddress))
      .then((value) => {
        console.log('==========================')
        console.log(`Set for address: ${deployedAddress} value: ${value.toNumber()}`)
        console.log('==========================')
      })
  })
