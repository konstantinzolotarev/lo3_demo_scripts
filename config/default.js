'use strict'

module.exports = {

  rpc: {
    gateway: 'http://localhost:1337/rpc',
    node1: 'http://localhost:1337/rpc',
    node2: 'http://localhost:1337/rpc'
  },

  accounts: {
    // gateway
    'lo3_demo_chain_full_000': {
      'address': '1A1F911058567C3014B020BD6585AA55B2AB16AD',
      'pubKey': '9859392EA823E01C651E92A8B97F04FC87CC4147F18A202DC54DCFA9D167A6C7',
      'privKey': 'F87ABB6B6917D76D640F7E51B95586165ADB0FD97D0216BF8E7DF0B3682154729859392EA823E01C651E92A8B97F04FC87CC4147F18A202DC54DCFA9D167A6C7'
    },
    //node 1
    'lo3_demo_chain_root_000': {
      'address': 'BC5644C2D82EE7B90E60BF0D2B6AEB37596BF246',
      'pubKey': '3B54A051EE71E945EA91E31C95383C088B4132807AC9E16ABC06221F90122809',
      'privKey': '18131946C4907D1A6D7CB627422DBEB9A10274116A77642563A88DEDB54D55FE3B54A051EE71E945EA91E31C95383C088B4132807AC9E16ABC06221F90122809'
    },
    // node 2
    'lo3_demo_chain_root_001': {
      'address': '4995CEC81F14339738E7E4BFBDBBE108455D34FE',
      'pubKey': '6AF0DE66C6701B26BEB0AF6FBD4ED4C632E3152A2C9EC78BE83D0B5FBF6086C8',
      'privKey': '2CD934E9719A0EFB7AA69C1321FAFB88AD21F940F23A7F88B00FEBCF7CA5FC176AF0DE66C6701B26BEB0AF6FBD4ED4C632E3152A2C9EC78BE83D0B5FBF6086C8'
    }
  }
}
