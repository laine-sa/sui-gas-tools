import { Validator } from './types'

export const calcMin = (validators: [Validator]) => {
    var min: Number|undefined = undefined;
    validators.forEach((element: Validator) => {
        if(min==undefined || min > element.next_epoch_gas_price) min = element.next_epoch_gas_price
    });
    return min
}

export const calcMax = (validators: [Validator]) => {
    var max: Number|undefined = undefined;
    validators.forEach((element: Validator) => {
        if(max==undefined || max < element.next_epoch_gas_price) max = element.next_epoch_gas_price
    });
    return max
}

export const calcMean = (validators: [Validator]) => {
    var total: number = 0
    validators.forEach((element: Validator) => {
        total += element.next_epoch_gas_price
    });
    return total / validators.length
}

export const calcMedian = (validators: [Validator]) => {
    var list = Array()
    validators.forEach((element: Validator) => {
        list.push(element.next_epoch_gas_price)
    });
    list.sort((a,b) => a - b)
    
    if(validators.length % 2 == 1) return list[Math.floor(validators.length / 2)] // If the set is odd then the floor of half the list length gives us the index of the middle item
    else return (list[(validators.length / 2) - 1] + list[validators.length / 2]) / 2 // If the set is even we take the mean of the middle values, adjusting for zero indexing
    
}

export const calcWeightedMean = (validators: [Validator]) => {
    var gas_multiples: number = 0
    var total_delegation: number = 0
    validators.forEach((element: Validator) => {
        gas_multiples += element.next_epoch_gas_price * element.next_epoch_delegation
        total_delegation += element.next_epoch_delegation
    });
    return gas_multiples / total_delegation
}

export const nextReferenceGasPrice = (validators: [Validator]) => {
    var total_delegation: number = 0
    validators.forEach((element: Validator) => {
        total_delegation += element.next_epoch_delegation
    });

    var quorum = (2/3) * total_delegation

    validators.sort((a,b) => a.next_epoch_gas_price - b.next_epoch_gas_price)
    var cumulative_delegation: number = 0
    var reference_gas_price:number = 0

    validators.forEach((element: Validator) => {
        if(cumulative_delegation < quorum) {
            reference_gas_price = element.next_epoch_gas_price
            cumulative_delegation += element.next_epoch_delegation
        }
    });
    return reference_gas_price
}