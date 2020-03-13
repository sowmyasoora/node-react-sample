import React from 'react';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

export default (props) => {
    return (

        <div className="graphicalView">
            <h3>Graphical View</h3>
            <LineChart
                width={800}
                height={500}
                data={props.data}>
            
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />

                { props.metricKeys.map((metric, index) => 
                    metric["isEnabled"] ? ( <Line key={index} type="monotone" dataKey={metric["key"]} stroke={metric["color"]} activeDot={{ r: 8 }} />) : ''
                )}
        </LineChart>
      </div>
    )}