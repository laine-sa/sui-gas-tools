import { Validator } from './types'
import { calcMax, calcMin, calcMean, calcMedian, calcWeightedMean, nextReferenceGasPrice } from './stats_helpers'
const validators: any = require('./validators.json').result.activeValidators

console.log("==== Statistics on current validator set ====")
console.log("Total validators: "+validators.length)
console.log("Min Reference Gas Price: "+calcMin(validators))
console.log("Max Reference Gas Price: "+calcMax(validators))
console.log("Mean Reference Gas Price: "+calcMean(validators))
console.log("Stake Weighted Mean Reference Gas Price: "+calcWeightedMean(validators))
console.log("Median Reference Gas Price: "+calcMedian(validators))
console.log("Estimated Next Reference Gas Price: "+nextReferenceGasPrice(validators))