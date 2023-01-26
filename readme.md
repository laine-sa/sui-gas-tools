# Sui Gas Price Tools

This repo helps with rudimentary analysis of Sui validators' future reference gas price to allow operators to apply their own algorithms in determining their ideal future reference gas price.

## Basic usage

Get list of validators and put it into a file called validators.json:

```bash
curl -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","id":1,"method":"sui_getValidators"}' https://fullnode.testnet.sui.io:443/ > validators.json
```

This is the current list at this point in time, be sure to repeat this everytime you want to do a fresh analysis (at least every epoch).