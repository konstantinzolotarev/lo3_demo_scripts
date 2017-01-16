'use strict'

const erisDb = require('eris-db-promise')
const config = require('config')
const contract = require('./contract')


const deployer = config.accounts.lo3_demo_chain_root_000
const tx = {
  data: contract.bytecode.toUpperCase(),
  input: {
    address: deployer.address
  }
}

const eris = erisDb.createInstance(config.rpc.node1)

eris
  .unsafe
  .transactAndHold(deployer.privKey, contract.bytecode, '', 0, 10000)
  .then((info) => {
    console.log('==========================')
    console.log(info.call_data.callee)
    console.log('==========================')
  })
  .catch((err) => {
    console.log('==========================')
    console.log('error: ', err)
    console.log('==========================')
  })

process.on('uncaughtException', (err) => {
  console.log('==========================')
  console.log('error: ', err)
  console.log('==========================')
})
