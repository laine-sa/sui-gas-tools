import { Validator } from './types'
import { calcMax, calcMin, calcMean, calcMedian, calcWeightedMean, nextReferenceGasPrice } from './stats_helpers'
const validators: any = require('./validators.json').result

console.log("==== Statistics on current validator set ====")
console.log("Total validators: "+validators.validators.active_validators.length)
console.log("Min Reference Gas Price: "+calcMin(validators.validators.active_validators))
console.log("Max Reference Gas Price: "+calcMax(validators.validators.active_validators))
console.log("Mean Reference Gas Price: "+calcMean(validators.validators.active_validators))
console.log("Delegation Weighted Mean Reference Gas Price: "+calcWeightedMean(validators.validators.active_validators))
console.log("Median Reference Gas Price: "+calcMedian(validators.validators.active_validators))
console.log("Estimated Next Reference Gas Price: "+nextReferenceGasPrice(validators.validators.active_validators))