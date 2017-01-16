'use strict'

const erisDb = require('eris-db-promise')
const config = require('config')

if (!process.argv[2]) {
  console.log('==========================')
  console.log('Please use script in format: node node1.js DEPLOYED_ADDRESS_HERE')
  console.log('==========================')
  return process.exit()
}

const deployedAddress = process.argv[2]
const eris = erisDb.createInstance(config.rpc.node1)

let subId

// eris
//   .events
//   .eventSubscribe()

// Handle kill event
process.on('SIGINT', () => {
  if (!subId)
    return process.exit()

  eris
    .events
    .eventUnsubscribe(subId)
    .then(() => {
      process.exit()
    })
})
