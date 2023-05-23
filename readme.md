# Sui Gas Price Tools

This repo helps with rudimentary analysis of Sui validators' future reference gas price to allow operators to apply their own algorithms in determining their ideal future reference gas price.

WARNING: THIS CODE IS EXPERIMENTAL, THE MATH HAS NOT BEEN EXTENSIVELY VERIFIED. USE AT OWN RISK.

## Basic usage

Copy the .env.sample file to .env and change the RPC URL if you like. The following command gets the latest system state and calculates the next RGP and other statistics.

```bash
ts-node run.ts
```

Will print out a simple statistical analysis.

## What it tells you

The reference gas price is the price submitted by the last validator that falls within the lower two thirds of submitted gas prices in the survey.

From this data you can determine what reference price to set for yourself based on your individual per epoch costs and profitability.