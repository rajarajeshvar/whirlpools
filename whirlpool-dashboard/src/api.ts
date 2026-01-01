const BACKEND_URL = 'http://localhost:3001';

export interface PositionInfo {
    positionMint: string;
    positionAddress: string;
    whirlpoolAddress: string;
    tickLowerIndex: number;
    tickUpperIndex: number;
    liquidity: string;
    tokenAAmount: string;
    tokenBAmount: string;
    feeOwedA: string;
    feeOwedB: string;
    symbolA?: string;
    symbolB?: string;
    price?: string;
    minPrice: string;
    maxPrice: string;
    currentPrice: string;
    inRange: boolean;
    poolPair: string;
    tokenA: string;
    tokenB: string;
}

export interface TransactionResponse {
    success: boolean;
    serializedTransaction: string;
    error?: string;
    positionMint?: string;
}

export const api = {
    async getPositions(wallet: string): Promise<PositionInfo[]> {
        const response = await fetch(`${BACKEND_URL}/api/positions/${wallet}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch positions: ${response.statusText}`);
        }
        return response.json();
    },

    async createOrDeposit(params: {
        wallet: string,
        whirlpool: string,
        tickLower?: number,
        tickUpper?: number,
        priceLower?: string,
        priceUpper?: string,
        amountA: string,
        amountB?: string
    }): Promise<TransactionResponse> {
        const response = await fetch(`${BACKEND_URL}/api/position/create-or-deposit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });
        return response.json();
    },

    async withdraw(params: {
        wallet: string,
        positionMint: string,
        liquidity: string
    }): Promise<TransactionResponse> {
        const response = await fetch(`${BACKEND_URL}/api/position/withdraw`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });
        return response.json();
    },

    async closePosition(params: {
        wallet: string,
        positionMint: string
    }): Promise<TransactionResponse> {
        const response = await fetch(`${BACKEND_URL}/api/position/close`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });
        return response.json();
    },

    async collectFees(params: {
        wallet: string,
        positionMint: string
    }): Promise<TransactionResponse> {
        const response = await fetch(`${BACKEND_URL}/api/position/collect-fees`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });
        return response.json();
    },

    async getPool(address: string): Promise<any> {
        const response = await fetch(`${BACKEND_URL}/api/pool/${address}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch pool: ${response.statusText}`);
        }
        return response.json();
    },

    async getMarketHistory(days: string = '1'): Promise<any> {
        const response = await fetch(`${BACKEND_URL}/api/market/history?days=${days}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch market history: ${response.statusText}`);
        }
        return response.json();
    },

    async getLiquidityDistribution(address: string): Promise<any> {
        const response = await fetch(`${BACKEND_URL}/api/pool/${address}/liquidity`);
        if (!response.ok) {
            throw new Error(`Failed to fetch liquidity distribution: ${response.statusText}`);
        }
        return response.json();
    },

    async getYieldHistory(address: string): Promise<any> {
        const response = await fetch(`${BACKEND_URL}/api/pool/${address}/yield`);
        if (!response.ok) {
            throw new Error(`Failed to fetch yield history: ${response.statusText}`);
        }
        return response.json();
    }
};
