# lo3_demo_scripts

## Steps to use
First of all you will need to configure nodes

In folder `config/default.js` are list of rpc urls for nodes and accounts for nodes
You could create `config.local.js` for your local testing. It has same format as `config/default.js`
And will override it.

## Step 1 - deployment
First of all you will have to deploy contract to nodes:

```bash
$ node deploy.js
```

It will return address of newly deployed contract
```bash
==========================
B68AA61BAD943572AEC47DA52E2C3D0935FDE8F5
==========================
```

You will use this address later in other scripts

## Step 2 - set value

Will set amount of `100` for address `ED6CBC023EF8DF313E3B7CF7E9A5B702CCC95B22`

```bash
$ node node2.js ED6CBC023EF8DF313E3B7CF7E9A5B702CCC95B22 100
```

Will return notification:

```bash
==========================
Set for address: ED6CBC023EF8DF313E3B7CF7E9A5B702CCC95B22 value: 100
==========================
```

## Step 3 - load from another node

After that you will be able to load value from another node using script

```bash
$ node node1_load.js ED6CBC023EF8DF313E3B7CF7E9A5B702CCC95B22
```

And it should return same info that prev script

```bash
==========================
Set for address: ED6CBC023EF8DF313E3B7CF7E9A5B702CCC95B22 value: 100
==========================
```
