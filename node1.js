'use strict'

const erisDb = require('eris-db-promise')
const erisContracts = require('eris-contracts-promise')
const config = require('config')
const contract = require('./contract')
const _ = require('lodash')

if (!process.argv[2]) {
  console.log('==========================')
  console.log('Please use script in format: node node1.js DEPLOYED_ADDRESS_HERE')
  console.log('==========================')
  return process.exit()
}

const deployedAddress = process.argv[2]
const eris = erisDb.createInstance(config.rpc.node1)
const manager = erisContracts.newContractManager(config.rpc.node2, config.accounts.lo3_demo_chain_root_001)
const instance = manager.newContract(contract.abi, contract.bytecode, deployedAddress)

let subId
let interval

function setupListener () {
  if (interval)
    return
  interval = setInterval(() => {
    eris
      .events
      .eventPoll(subId)
      .then((events) => {
        if (_.isArray(events) && events.length > 0) {
          return instance
            .at(deployedAddress)
        }
        return false
      })
      .then((con) => {
        if (!con)
          return

        return con
          .get(deployedAddress)
          .then((value) => {
            console.log('==========================')
            console.log(`Set for address: ${deployedAddress} value: ${value.toNumber()}`)
            console.log('==========================')
          })
      })
  }, 1000)
}

eris
  .events
  .eventSubscribe(`Acc/${deployedAddress}/Call`)
  .then((newSubId) => {
    if (!_.isString(newSubId) || !newSubId.length)
      return Promise.reject(new Error('No subscription id received !'))
    subId = newSubId
    console.log('==========================')
    console.log(subId)
    console.log('==========================')
  })
  .then(() => setupListener())

// Handle kill event
process.on('SIGINT', () => {
  if (interval)
    clearInterval(interval)

  if (!subId)
    return process.exit()

  eris
    .events
    .eventUnsubscribe(subId)
    .then(() => {
      process.exit()
    })
})
