SUI Gas Price Tools

Get list of validators:
```bash
curl -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","id":1,"method":"sui_getValidators"}' https://fullnode.testnet.sui.io:443/ > validators.json