import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'd1b253485emsh872f68497668612p1644e2jsn38705c831f3b'
}

const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        })
    })
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery } = cryptoApi;