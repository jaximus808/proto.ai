import React, { useCallback, useState, useEffect, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Position,
  applyEdgeChanges,
  applyNodeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { TextUpdaterNode } from './custom_nodes';

interface NodeData {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    value: number;
    nodeName: string;
    nodeType: string;
    nodeLang: string;
    clientPages?: { name: string; desc: string }[];
    serverRoutes?: { method: 'GET' | 'POST'; path: string; description: string }[];
    onChange: (id: string, data: any) => void;
  };
}

export default function Diagram() {
  const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const [nextNodeId, setNextNodeId] = useState(1);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection: any) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onChange = useCallback((nodeId: string, newData: any) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
      )
    );
  }, []);

  const addNewNode = useCallback(() => {
    const newNode: NodeData = {
      id: `node-${nextNodeId}`,
      type: 'textUpdater',
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: {
        value: 123,
        nodeName: '',
        nodeType: '',
        nodeLang: '',
        onChange: onChange, // Pass the onChange function to the node data
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setNextNodeId((id) => id + 1);
  }, [nextNodeId, onChange]);

  const convertToJSON = useCallback(async () => {
    const jsonOutput = {
      nodes: nodes.map((node) => ({
        id: node.id,
        name: node.data.nodeName,
        type: node.data.nodeType,
        language: node.data.nodeLang,
        ...(node.data.nodeType === 'client'
          ? { pages: node.data.clientPages }
          : { routes: node.data.serverRoutes }),
      })),
      edges: edges.map((edge) => ({
        source: edge.source,
        target: edge.target,
      })),
    };
    console.log(JSON.stringify(jsonOutput, null, 2));

    const data = await fetch("/api/prompt_gem", {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            diagramJson: jsonOutput
            })
        })
    return jsonOutput;
  }, [nodes, edges]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{ position: 'absolute', top: 50, left: 10, zIndex: 4 }}>
        <button onClick={addNewNode} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Node
        </button>
        <button
          onClick={convertToJSON}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Convert to JSON
        </button>
      </div>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}