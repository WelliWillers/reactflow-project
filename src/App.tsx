import { Box } from '@mui/material';
import { useState } from 'react';
import ReactJoyride, { CallBackProps, STATUS } from 'react-joyride';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useReactFlowContext } from './contexts/ReactflowContext';
import theme from './theme';
import { EDGE_TYPES, NODE_TYPES } from './utils/reactflowFunction';

export function App() {
  const { edges, nodes, onConnect, onEdgesChange, onNodesChange } = useReactFlowContext()

  const [ run, setRun ] = useState(false)
  const [ steps, setSteps ] = useState([
    {
      target: '.my-first-step',
      content: 'This is my awesome feature!',
    }
  ])

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
    }
  };

  return (
    <Box width={'100%'} height={'100vh'} className='app'>
      {/* <ReactJoyride
        callback={handleJoyrideCallback}
        continuous
        hideCloseButton
        run={run}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={steps}
      /> */}

      {/* <Box position={"absolute"} bottom={3} right={3} width={5} height={5} borderRadius={10} className='my-first-step'>

      </Box> */}

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
