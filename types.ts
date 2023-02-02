export type Validator = {
    sui_address: String,
    pubkey_bytes: Uint8Array,
    network_pubkey_bytes: Uint8Array,
    worker_pubkey_bytes: Uint8Array,
    proof_of_possession_bytes: Uint8Array,
    name: Uint8Array,
    description: Uint8Array,
    image_url: Uint8Array,
    project_url: Uint8Array,
    net_address: Uint8Array,
    consensus_address: Uint8Array,
    worker_address: Uint8Array,
    next_epoch_stake: number,
    next_epoch_delegation: number,
    next_epoch_gas_price: number,
    next_epoch_commission_rate: number,
    voting_power?: number
}