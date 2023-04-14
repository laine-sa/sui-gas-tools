#!/bin/bash
curl -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","id":1,"method":"suix_getLatestSuiSystemState"}' https://rpc-testnet.suiscan.xyz:443/ > validators.json
