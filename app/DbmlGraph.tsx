"use client"
import { FaceIcon, MagicWandIcon } from '@radix-ui/react-icons';
import { addEdge, Background, Connection, ControlButton, Controls, Edge, MiniMap, Node, ReactFlow, ReactFlowProvider, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css';
import DbmlControls from './DbmlControls';
import useZoomStore from '@/stores/zoomStore';


const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function DbmlGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const {setZoom} = useZoomStore();
  return (
    <div className="h-full">
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        proOptions={{ hideAttribution: true }} 
        fitView={true}
        onMove={(_, vp) => setZoom(vp.zoom)}
      >
        <Background />
        <DbmlControls/>
        {/* <Controls/> */}
      </ReactFlow>
    </div>
  )
}
