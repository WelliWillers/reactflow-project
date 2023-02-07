import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import {
  addEdge,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  useEdgesState,
  useNodesState,
  OnNodesDelete
} from "reactflow";

import {
  getLayoutedElements,
  layoutedEdges,
  layoutedNodes,
  NODE_TYPES,
  positionInitial,
  startHeight,
  startWidth,
} from "../utils/reactflowFunction";

type ReactFlowContextType = {
  onConnect: (connection: Connection) => void;
  addEvent: (
    idSourse: string,
    idTarget: string,
    type: keyof typeof NODE_TYPES,
    sourceHandle?: string
  ) => void;
  removeNodeAndEdge: (idNode: string) => void
  onNodesChange: (OnChange: NodeChange[]) => void;
  onEdgesChange: (OnChange: EdgeChange[]) => void;
  nodes: Node<Node<any, string | undefined>[], string | undefined>[];
  edges: Edge<Edge<any>[]>[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  handleSetNewWidth: (number: number) => void;
  handleSetNewHeight: (number: number) => void;
  newWidth: number;
  newHeight: number;
};

type ReactFlowContextProviderProps = {
  children: ReactNode;
};

export const ReactFlowContext = createContext({} as ReactFlowContextType);

export function ReactFlowContextProvider({
  children,
}: ReactFlowContextProviderProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(layoutedEdges);
  const [newWidth, setNewWidth] = useState<number>(startWidth);
  const [newHeight, setNewHeight] = useState<number>(startHeight);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  function addEvent(
    idSourse: string,
    idTarget: string,
    type: keyof typeof NODE_TYPES,
    helperId?: string
  ) {
    const newNode = [
      ...nodes,
      {
        id: helperId && type != 'buttom' ? `${helperId}-${idTarget}` : idTarget,
        type,
        data: {
          label: `node id: ${helperId ? `${helperId}-${idTarget}` : idTarget}`,
          idHelper: type === 'buttom' && helperId ? helperId : ''
        },
        position: positionInitial,
      },
    ];

    const newEdge = [
      ...edges,
      {
        id: `e-${idSourse}-${helperId && type != 'buttom' ? `${helperId}-${idTarget}` : idTarget}`,
        source: idSourse,
        target: helperId && type != 'buttom' ? `${helperId}-${idTarget}` : idTarget,
      },
    ];

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      newNode,
      newEdge,
      newWidth,
      newHeight
    );

    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  }

  function removeNodeAndEdge(idNode: string) {
    alert(idNode)
    // const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    //     newNode,
    //     newEdge,
    //     newWidth,
    //     newHeight
    // );
    // setNodes([...layoutedNodes]);
    // setEdges([...layoutedEdges]);
  }

  console.log("nodes", nodes);
  console.log("edges", edges);

  function handleSetNewWidth(newValue: number) {
    setNewWidth(newValue);
  }

  function handleSetNewHeight(newValue: number) {
    setNewHeight(newValue);
  }

  return (
    <ReactFlowContext.Provider
      value={{
        onConnect,
        addEvent,
        onEdgesChange,
        onNodesChange,
        nodes,
        edges,
        setNodes,
        setEdges,
        handleSetNewHeight,
        handleSetNewWidth,
        newWidth,
        newHeight,
        removeNodeAndEdge
      }}
    >
      {children}
    </ReactFlowContext.Provider>
  );
}

export const useReactFlowContext = () => {
  return useContext(ReactFlowContext);
};
