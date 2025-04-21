// wagmi.config.ts
import { http, createConfig } from 'wagmi'
import { defineChain } from 'viem'

const baobab = defineChain({
    id: 1001,
    name: 'Klaytn Baobab',
    network: 'klaytn-baobab',
    nativeCurrency: {
        name: 'KLAY',
        symbol: 'KLAY',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://public-en-kairos.node.kaia.io'],
        },
    },
})

export const config = createConfig({
    chains: [baobab],
    transports: {
        [baobab.id]: http(baobab.rpcUrls.default.http[0]),
    },
})
