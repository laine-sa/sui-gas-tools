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
        total_delegation += element.next_epoch_delegation+element.next_epoch_stake
    });
    return gas_multiples / total_delegation
}

export const nextReferenceGasPrice = (validators: [Validator]) => {
    var total_power: number = 10000
    var quorum: number = 6667
    var max_power: number = 1000
    var total_stake: number = 0
    var excess_power: number = 0
    var excess_receiving_stake: number = 0

    // Get the total stake in the network
    validators.forEach((element: Validator) => {
        total_stake += element.next_epoch_delegation + element.next_epoch_stake
        
    });

    // Assign relative voting power and get the power to be redistributed
    validators.forEach((element: Validator) => {
        let power = ((element.next_epoch_delegation + element.next_epoch_stake) / total_stake) * total_power
        element.voting_power = (power > max_power) ? max_power : power
        if(power > max_power) {
            excess_power = power - max_power
        }
        else {
            excess_receiving_stake += element.next_epoch_delegation + element.next_epoch_stake
        }
    });

    // Add the excess power to remaining validators
    validators.forEach((element: Validator) => {
        if(element.voting_power != undefined && element.voting_power < max_power) {
            element.voting_power += ((element.next_epoch_delegation + element.next_epoch_stake) / excess_receiving_stake) * excess_power
            if(element.voting_power > max_power) {
                element.voting_power = max_power
            }
        }
    });

    validators.sort((a,b) => a.next_epoch_gas_price - b.next_epoch_gas_price)
    var cumulative_power: number = 0
    var reference_gas_price:number = 0

    validators.forEach((element: Validator) => {
        if(cumulative_power < quorum) {
            reference_gas_price = element.next_epoch_gas_price
            if(element.voting_power != undefined) cumulative_power += element.voting_power
        }
    });
    return reference_gas_price
}