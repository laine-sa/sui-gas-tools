import { Validator } from './types'

export const calcMin = (validators: [Validator]) => {
    var min: number | undefined = undefined;
    validators.forEach((element: Validator) => {
        if (min == undefined || min > parseInt(element.nextEpochGasPrice)) min = parseInt(element.nextEpochGasPrice)
    });
    return min
}

export const calcMax = (validators: [Validator]) => {
    var max: number | undefined = undefined;
    validators.forEach((element: Validator) => {
        if (max == undefined || max < parseInt(element.nextEpochGasPrice)) max = parseInt(element.nextEpochGasPrice)
    });
    return max
}

export const calcMean = (validators: [Validator]) => {
    var total: number = 0
    validators.forEach((element: Validator) => {
        total += parseInt(element.nextEpochGasPrice)
    });
    return total / validators.length
}

export const calcMedian = (validators: [Validator]) => {
    var list = Array()
    validators.forEach((element: Validator) => {
        list.push(parseInt(element.nextEpochGasPrice))
    });
    list.sort((a, b) => a - b)

    if (validators.length % 2 == 1) return list[Math.floor(validators.length / 2)] // If the set is odd then the floor of half the list length gives us the index of the middle item
    else return (list[(validators.length / 2) - 1] + list[validators.length / 2]) / 2 // If the set is even we take the mean of the middle values, adjusting for zero indexing

}

export const calcWeightedMean = (validators: [Validator]) => {
    var gas_multiples: number = 0
    var total_delegation: number = 0
    validators.forEach((element: Validator) => {
        gas_multiples += parseInt(element.nextEpochGasPrice) * parseInt(element.nextEpochStake)
        total_delegation += parseInt(element.nextEpochStake)
    });
    return gas_multiples / total_delegation
}

export const nextReferenceGasPrice = (validators: [Validator]) => {
    var quorum: number = 6667

    validators.sort((a, b) => parseInt(a.nextEpochGasPrice) - parseInt(b.nextEpochGasPrice))
    var cumulative_power: number = 0
    var reference_gas_price: number = 0

    validators.forEach((element: Validator) => {
        if (cumulative_power < quorum) {
            reference_gas_price = parseInt(element.nextEpochGasPrice)
            cumulative_power += parseInt(element.votingPower)
        }
    });
    return reference_gas_price
}