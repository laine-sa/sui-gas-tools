import { Validator } from './types'
import { calcMax, calcMin, calcMean, calcMedian, calcWeightedMean, nextReferenceGasPrice } from './stats_helpers'
const axios = require ('axios')
require('dotenv').config()

axios.post(process.env.RPC_URL,{jsonrpc: "2.0",id: 1,method: "suix_getLatestSuiSystemState" }, {
    headers: {'Content-Type':'application/json'}
})
    .then((response: any) => {

        const validators: [Validator] = response.data.result.activeValidators

        console.log("==== Statistics on current validator set ====")
        console.log("Total validators: "+validators.length)
        console.log("Min Reference Gas Price: "+calcMin(validators))
        console.log("Max Reference Gas Price: "+calcMax(validators))
        console.log("Mean Reference Gas Price: "+calcMean(validators))
        console.log("Stake Weighted Mean Reference Gas Price: "+calcWeightedMean(validators))
        console.log("Median Reference Gas Price: "+calcMedian(validators))
        console.log("Estimated Next Reference Gas Price: "+nextReferenceGasPrice(validators))
    })
    .catch((err: any) => {
        console.error('Error processing: ', err)
    })

    
