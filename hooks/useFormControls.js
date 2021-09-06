const cryptocurrency = [
    "Bitcoin",
    "Ethereum",
    "Cardano",
    "Dai",
    "Tether",
    "Solana",
    "Ergo",
    "USDC"
];

const operations = [
    "Sell",
    "Buy"
];

const portfolio = [
    "Portfolio A",
    "Portfolio B"
];

export default function useFormControls(entity) {

    var results = []

    if (entity == "cryptocurrency") {
        results=cryptocurrency;
    }
    if (entity == "operations") {
        results=operations;
    }
    if (entity == "portfolio") {
        results=portfolio;
    }

    return {
        results
    }
}