import { Validator } from './types'

export const calcMin = (validators: [Validator]) => {
    var min: Number|undefined = undefined;
    validators.forEach((element: Validator) => {
        if(min==undefined || min > element.metadata.next_epoch_gas_price) min = element.metadata.next_epoch_gas_price
    });
    return min
}

export const calcMax = (validators: [Validator]) => {
    var max: Number|undefined = undefined;
    validators.forEach((element: Validator) => {
        if(max==undefined || max < element.metadata.next_epoch_gas_price) max = element.metadata.next_epoch_gas_price
    });
    return max
}

export const calcMean = (validators: [Validator]) => {
    var total: number = 0
    validators.forEach((element: Validator) => {
        total += element.metadata.next_epoch_gas_price
    });
    return total / validators.length
}

export const calcMedian = (validators: [Validator]) => {
    var list = Array()
    validators.forEach((element: Validator) => {
        list.push(element.metadata.next_epoch_gas_price)
    });
    list.sort((a,b) => a - b)
    
    if(validators.length % 2 == 1) return list[Math.floor(validators.length / 2)] // If the set is odd then the floor of half the list length gives us the index of the middle item
    else return (list[(validators.length / 2) - 1] + list[validators.length / 2]) / 2 // If the set is even we take the mean of the middle values, adjusting for zero indexing
    
}

export const calcWeightedMean = (validators: [Validator]) => {
    var gas_multiples: number = 0
    var total_delegation: number = 0
    validators.forEach((element: Validator) => {
        gas_multiples += element.metadata.next_epoch_gas_price * element.metadata.next_epoch_delegation
        total_delegation += element.metadata.next_epoch_delegation+element.metadata.next_epoch_stake
    });
    return gas_multiples / total_delegation
}

export const nextReferenceGasPrice = (validators: [Validator]) => {
    var quorum: number = 6667
    
    validators.sort((a,b) => a.metadata.next_epoch_gas_price - b.metadata.next_epoch_gas_price)
    var cumulative_power: number = 0
    var reference_gas_price:number = 0

    validators.forEach((element: Validator) => {
        if(cumulative_power < quorum) {
            reference_gas_price = element.metadata.next_epoch_gas_price
            cumulative_power += element.voting_power
        }
    });
    return reference_gas_price
}