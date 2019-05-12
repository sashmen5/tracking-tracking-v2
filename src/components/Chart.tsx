import React, {FC} from 'react';
import styled from 'styled-components';
import {RouteComponentProps, withRouter} from 'react-router';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import {Container, Title} from "./CommontStyledComponents";

// This is mock data.
// Real data will be added after implementation of state manager
const data = [
    {
        name: '07.05', Hours: 9
    },
    {
        name: '08.05', Hours: 11
    },
    {
        name: '09.05', Hours: 7
    },
    {
        name: '10.05', Hours: 4.5
    },
    {
        name: '11.05', Hours: 12
    },
    {
        name: '12.05', Hours: 10
    },
    {
        name: '13.05', Hours: 9
    },
];

const ChartContainer = styled(Container)`
  align-items: center;
`;

interface MatchParams {
    project: string;
}

interface ChartProps extends RouteComponentProps<MatchParams> {
}

const Chart: FC<ChartProps> = (props: ChartProps) => {
    const {project} = props.match.params;

    return (
        <>
            <Title>{project} Chart</Title>
            <ChartContainer>
                <LineChart
                    width={900}
                    height={500}
                    data={data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name"/>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Hours" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ChartContainer>
        </>
    );
};

export default withRouter(Chart);
