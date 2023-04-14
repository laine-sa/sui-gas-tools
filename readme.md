# Sui Gas Price Tools

This repo helps with rudimentary analysis of Sui validators' future reference gas price to allow operators to apply their own algorithms in determining their ideal future reference gas price.

WARNING: THIS CODE IS EXPERIMENTAL, THE MATH HAS NOT BEEN EXTENSIVELY VERIFIED. USE AT OWN RISK.

## Basic usage

Get list of validators and put it into a file called validators.json:

```bash
sh update_validators.sh
```

This is the current list at this point in time, be sure to repeat this everytime you want to do a fresh analysis (at least every epoch).

```bash
ts-node stats.ts
```

Will print out a simple statistical analysis.

## What it tells you

The reference gas price is the price submitted by the last validator that falls within the lower two thirds of submitted gas prices in the survey.

From this data you can determine what reference price to set for yourself based on your individual per epoch costs and profitability.

## Knoxs Edits

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```
```
nvm install node # "node" is an alias for the latest version
```
```
nvm use node
```
```
npm i -g ts-node typescript
```
```
cd /home/sui
```
```
git clone https://github.com/DataKnox/sui-gas-tools.git && cd sui-gas-tools/
```
## Update your env.json file to have your current active address
```
{
    "ACTIVE_ADD_TESTNET": "Testnet address here",
    "ACTIVE_ADD_MAINNET": "mainnet address here"
}
```
## Schedule the job
```
crontab -e
# select your favorite editer
```
## Paste in the path to the correct file based on which network you are operating on
Example in cron_example.txt
```
0 */4 * * * /home/sui/.nvm/versions/node/v19.9.0/bin/ts-node /home/sui/sui-gas-tools/runner_testnet.ts > /home/sui/sui-gas-tools/gascheck.ts.log 2>&1
```