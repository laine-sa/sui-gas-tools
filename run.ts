import { Validator } from './types'
import { calcMax, calcMin, calcMean, calcMedian, calcWeightedMean, nextReferenceGasPrice } from './stats_helpers'
import axios from 'axios'
require('dotenv').config()

if(typeof(process.env.RPC_URL) == 'string') {

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
    
}
else {
    console.log("Please create a .env file with an RPC_URL value.")
}
