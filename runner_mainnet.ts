import { nextReferenceGasPrice } from './stats_helpers'
const validators: any = require('./validators.json').result.activeValidators
const { spawn, exec } = require('node:child_process')
const env: any = require('./env.json')

export const starter = () => {
    const scriptPrep: any = spawn('sh', ['./update_validators.sh'])
    scriptPrep.stderr.on('data', (data: string) => {
        console.error(`child stderr:\n${data}`);
    })

}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const ender = async () => {
    await starter()
    await delay(10000)
    const validator = validators.find((v: any) => v.suiAddress === env.ACTIVE_ADD_MAINNET)

    let nrgp = nextReferenceGasPrice(validators)
    if (validator.gasPrice == nrgp * 0.98) {
        console.log('Reference Gas Price is correct')
    }
    else if (validator.nextEpochGasPrice == nrgp * 0.98) {
        console.log('Reference Gas Price is set to become correct')
    }
    else {
        console.log('Reference Gas Price is incorrect')
        console.log(nrgp)
        nrgp = nrgp * 0.98
        console.log(`setting reference gas price to: ${nrgp}`)
        const command: string = `/home/sui/sui/target/debug/sui validator update-gas-price ${nrgp}`
        // loop over each word in command and place each word in an array
        const args: string[] = command.split(' ')
        const options: any = args.slice(1)
        const child: any = spawn(args[0], options)
        child.stdout.on('data', (data: string) => {
            console.log(`child stdout:\n${data}`);
        });

        child.stderr.on('data', (data: string) => {
            console.error(`child stderr:\n${data}`);
        })
    }
}

ender()