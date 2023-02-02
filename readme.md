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