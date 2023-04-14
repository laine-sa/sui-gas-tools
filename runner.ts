import { nextReferenceGasPrice } from './stats_helpers'
const validators: any = require('./validators.json').result.activeValidators
const { spawn } = require('node:child_process')

const validator = validators.find((v: any) => v.suiAddress === '0x407f2bd2d36f40e57e4b725e7b80d4afc588fd2deb746ad62ccc6ed086798e48')

let nrgp = nextReferenceGasPrice(validators)

if (validator.gasPrice == nrgp) {
    console.log('Reference Gas Price is correct')
}
else {
    // const set_rgp = nrgp * 0.95
    // console.log('setting reference gas price to: ', set_rgp)
    // fetch('https://rpc-testnet.suiscan.xyz:443',
    //     {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'body': JSON.stringify({
    //                 "jsonrpc": "2.0",
    //                 "id": 1,
    //                 "method": "suix_getLatestSuiSystemState",
    //                 "params": ["0x5"]
    //             },
    //             )//body
    //         } //headers
    //     } //fetch
    // ) //fetch
    nrgp = nrgp * 0.98
    const command: string = `sui validator update-gas-price ${nrgp}`
    // loop over each word in command and place each word in an array
    const args: string[] = command.split(' ')
    const options: any = args.slice(1, -1)
    const child: any = spawn(args[0], options)
    child.stdout.on('data', (data) => {
        console.log(`child stdout:\n${data}`);
    });

    child.stderr.on('data', (data) => {
        console.error(`child stderr:\n${data}`);
    })
}