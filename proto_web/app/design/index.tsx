import React from "react";
import { Diagram } from "react-easy-diagram";

export default function() {
    <Diagram initState={{
      nodes: [
        {
          id: "node_1",
          position: [300, 300],
          type: "output_horizontal"
        },
        {
          id: "node_2",
          position: [520, 400],
          type: "input_horizontal" 
        },
      ],
      links: [
        {
          source: {
            nodeId: "node_1",
            portId: "output"
          },
          target: {
            nodeId: "node_2",
            portId: "input"
          }
        },
      ]
    }} />
}
