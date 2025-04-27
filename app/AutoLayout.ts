import dagre, { GraphLabel } from 'dagre';
import { Node, Edge, Position } from '@xyflow/react';


// for now we will use fixed node size
// TODO: use dynamic node size based on component type 
const nodeWidth = 300;
const nodeHeight = 40;


export function dagreAutoLayout(nodes: Node[], edges: Edge[], direction: GraphLabel["rankdir"] = 'TB'): {
    nodes: Node[],
    edges: Edge[],
} {
    const isHorizontal = direction === 'LR'; 

    const g = new dagre.graphlib.Graph();
    g.setGraph({ rankdir: direction });
    g.setDefaultEdgeLabel(() => ({}));

    nodes.forEach(node => {
        g.setNode(node.id, {
            label: node.data.title,
            width: nodeWidth, 
            height: nodeHeight, 
        });
    }); 
    edges.forEach(edge => {
        g.setEdge(edge.source, edge.target); 
    });

    const autoLayoutNodes = nodes.map(node => {
        const dagreNode = g.node(node.id); 
        
        return { 
            ...node, 
            targetPosition: isHorizontal? Position.Left : Position.Top, 
            sourcePosition: isHorizontal? Position.Right : Position.Bottom, 
            position: {
                x: dagreNode.x - nodeWidth / 2, 
                y: dagreNode.y - nodeHeight / 2, 
            }
        }

    });
    
    return {
        nodes: autoLayoutNodes,
        edges: edges,
    }
}