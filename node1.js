'use strict'

const erisDb = require('eris-db-promise')
const config = require('config')
const _ = require('lodash')

if (!process.argv[2]) {
  console.log('==========================')
  console.log('Please use script in format: node node1.js DEPLOYED_ADDRESS_HERE')
  console.log('==========================')
  return process.exit()
}

const deployedAddress = process.argv[2]
const eris = erisDb.createInstance(config.rpc.node1)

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
          console.log('==========================')
          console.log(events)
          console.log('==========================')
        }
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
