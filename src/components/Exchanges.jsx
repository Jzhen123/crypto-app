import React from 'react';
import { Avatar, Table, Typography } from 'antd';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';

import { useGetCryptoExchangesQuery } from '../services/cryptoApi';
import { Loader } from '../components';

const { Title, Text } = Typography;

const Exchanges = () => {
    const { data, isFetching } = useGetCryptoExchangesQuery();
    const cryptoExchanges = data?.data?.exchanges;
    const columns = [
        { title: 'Exchange', dataIndex: 'exchange', key: 'exchange' },
        { title: '24h Trade Volume', dataIndex: 'volume', key: 'volume' },
        { title: 'Markets', dataIndex: 'markets', key: 'markets' },
        { title: 'Market Share', dataIndex: 'marketShare', key: 'marketShare' },
    ]
    const tableData = [];

    if (isFetching) return <Loader />;

    for (let i = 0; i < cryptoExchanges.length; i++) {
        let exchange = cryptoExchanges[i]
        tableData.push({
            key: i,
            exchange: (
                <>
                    <Text>{i + 1}.</Text>
                    <Avatar src={exchange.iconUrl} className="exchange-image" alt="icon" />
                    <Text>{exchange.name}</Text>
                </>
            ),
            volume: `${data.data.currencies[0].sign}${millify(exchange.volume)}`,
            markets: millify(exchange.numberOfMarkets),
            marketShare: `${millify(exchange.marketShare)}%`,
            description: exchange.description,
        })
    }

    return (
        <>
            <Title level={2}>All Exchanges</Title>
            <Table
                columns={columns}
                expandable={{
                    expandIconColumnIndex: -1,
                    expandRowByClick: true,
                    expandedRowRender: (exchange) => HTMLReactParser(exchange.description),
                }}
                dataSource={tableData}
            />
        </>
    );
}

export default Exchanges