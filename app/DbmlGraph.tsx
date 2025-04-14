"use client"
import { Background, ReactFlow, useEdgesState, useNodesState, } from '@xyflow/react'
import '@xyflow/react/dist/style.css';
import DbmlControls from './DbmlControls';
import useZoomStore from '@/stores/zoomStore';
import TableNode from './TableNode';


const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  { id: '3', position: { x: 0, y: 100 }, data: { title: 'hello', columns: [{ name: 'col1', type: 'varchar2' }] }, type: 'table' },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const nodeTypes = {
  table: TableNode,
};

export default function DbmlGraph() {
  const [nodes, _setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, _setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { setZoom } = useZoomStore();
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
        {/* <Controls/> */}
      </ReactFlow>
    </div>
  )
}
