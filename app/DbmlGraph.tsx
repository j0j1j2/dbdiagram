"use client"
import { Background, ReactFlow, useEdgesState, useNodesState, } from '@xyflow/react'
import '@xyflow/react/dist/style.css';
import DbmlControls from './DbmlControls';
import useZoomStore from '@/stores/zoomStore';
import TableNode from './TableNode';
import useDbmlStore from '@/stores/dbmlStore';
import { useEffect } from 'react';
import type { Node, Edge } from '@xyflow/react'
import { dagreAutoLayout } from './AutoLayout';

const initialNodes: Node[] = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  { id: '3', position: { x: 0, y: 100 }, data: { title: 'hello', columns: [{ name: 'col1', type: 'varchar2' }] }, type: 'table' },
];
const initialEdges: Edge[] = [];

const nodeTypes = {
  table: TableNode,
};

export default function DbmlGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { setZoom } = useZoomStore();
  const { dbml } = useDbmlStore();

  useEffect(() => {
    const tableNodes: Node[] = dbml.tables.map((table, idx) => {
      return { 
        id: `table-${idx}`, 
        position: {x: 300 * idx, y: 100}, 
        data: {
          title: table.name, 
          columns: table.fields.map(field => ({
            name: field.name, 
            type: field.type.type_name,
          })), 
        },
        type: 'table'
      }
    });

    // const {nodes, edges} = dagreAutoLayout(tableNodes, []);
    setNodes(tableNodes); 
    setEdges(edges);
  }, [dbml]);

  return (
    <div className="h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        proOptions={{ hideAttribution: true }}
        fitView={true}
        nodeTypes={nodeTypes}
        onMove={(_, vp) => setZoom(vp.zoom)}
      >
        <Background />
        <DbmlControls />
      </ReactFlow>
    </div>
  )
}
