import { Box } from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  FitViewOptions,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import DefaultEdge from './EdgeTypes/DefaultEdge';
import ButtonType from './nodesTypes/ButtomType';
import SelectType from './nodesTypes/SelectType';
import theme from './theme';

import dagre from 'dagre'

const NODE_TYPES = {
  buttom: ButtonType,
  selectCompany: SelectType
}
const EDGE_TYPES = {
  default: DefaultEdge
}

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const defaultWidth = 450
const defaultHeight = 250
const position = { x: 0, y: 0}

const initialNodes: Node[] = [
  { id: '1', type: 'selectCompany', data: { selects: { 'select-1': '1'} }, position},
  { id: '2', type: 'buttom', data: { label: 'Node 2' }, position},
  { id: '3', type: 'buttom', data: { label: 'Node 2' }, position},
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
];

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: defaultWidth, height: defaultHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = Position.Top;
    node.sourcePosition = Position.Bottom;

    node.position = {
      x: nodeWithPosition.x - defaultWidth / 2,
      y: nodeWithPosition.y - defaultHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);


const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

export function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(layoutedEdges);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onLayout = useCallback(
    () => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges
      );

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  useEffect(() => {
    onLayout()
  }, [])

  return (
    <Box width={'100%'} height={'100vh'}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        fitViewOptions={fitViewOptions}
      >
        <Background color={theme.palette.primary.main} variant={BackgroundVariant.Dots} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </Box>
  );
}
