// wagmi.ts 예시 (정상 config)
import { createConfig, http } from "wagmi";
import { defineChain } from "viem";

const baobab = defineChain({
    id: 1001,
    name: "Klaytn Baobab",
    nativeCurrency: {
        name: "KLAY",
        symbol: "KLAY",
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ["https://public-en-kairos.node.kaia.io"] },
    },
    blockExplorers: {
        default: { name: "BaobabScope", url: "https://baobab.klaytnscope.com" },
    },
});

export const config = createConfig({
    chains: [baobab],
    transports: {
        [baobab.id]: http(),
    },
});
