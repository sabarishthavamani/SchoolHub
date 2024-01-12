import React from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";

const ProgressChart = (props) => {    
    const {graphData} = props
    return (
        <PieChart width={200} height={200}>
          <Pie
            data={graphData}
            innerRadius={60}
            outerRadius={90}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {graphData.map((entry, index) => (
              <Cell key={`cell-${index}`}  fill={entry.colors} />
            ))}
          </Pie>
        </PieChart>
      );
}



export default ProgressChart