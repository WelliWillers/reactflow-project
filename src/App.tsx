import { Box } from '@mui/material';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useReactFlowContext } from './contexts/reactflowContext';
import theme from './theme';
import { EDGE_TYPES, NODE_TYPES } from './utils/reactflowFunction';

export function App() {
  const { edges, nodes, onConnect, onEdgesChange, onNodesChange } = useReactFlowContext()

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
        fitViewOptions={{padding: 3,}}
      >
        <Background color={theme.palette.primary.main} variant={BackgroundVariant.Dots} />
        <Controls />
      </ReactFlow>
    </Box>
  );
}
