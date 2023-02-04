import { ReactNode, createContext, useState, useEffect, useContext, useCallback } from 'react'
import { addEdge, Connection, Edge, EdgeChange, Node, NodeChange, useEdgesState, useNodesState } from 'reactflow'
import { getLayoutedElements, layoutedEdges, layoutedNodes, NODE_TYPES, positionInitial } from '../utils/reactflowFunction'

type ReactFlowContextType = {
    onConnect: (connection: Connection) => void
    addEvent: (idSourse: string, idTarget: string, type: keyof typeof NODE_TYPES) => void
    onNodesChange: (OnChange: NodeChange[]) => void
    onEdgesChange: (OnChange: EdgeChange[]) => void
    nodes: Node<Node<any, string | undefined>[], string | undefined>[]
    edges: Edge<Edge<any>[]>[]
    setNodes: ( nodes: Node[]) => void
    setEdges: ( edges: Edge[]) => void
    setNewWidth: ( number: number) => void
    setNewHeight: ( number: number) => void
    newWidth: number
    newHeight: number
}

type ReactFlowContextProviderProps = {
    children: ReactNode
}

export const ReactFlowContext = createContext({} as ReactFlowContextType)

export function ReactFlowContextProvider({ children }: ReactFlowContextProviderProps) {

    const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(layoutedNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(layoutedEdges);
    const [ newWidth, setNewWidth ] = useState<number>(450)
    const [ newHeight, setNewHeight ] = useState<number>(200)

    const onConnect = useCallback(
        (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );

    function addEvent(idSourse: string, idTarget: string, type: keyof typeof NODE_TYPES){
        console.log('addEvent', idSourse, idTarget, type);
        const newNode = [
            ...nodes,
            { id: idTarget, type, data: { label: `node id: ${idTarget}` }, position: positionInitial}
        ]
        const newEdge = [
            ...edges,
            { id: `e${idSourse}-${idTarget}`, source: idSourse, target: idTarget }
        ]

        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            newNode,
            newEdge,
            newWidth, 
            newHeight
        );

        setNodes([...layoutedNodes]);
        setEdges([...layoutedEdges]);
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
                setNewWidth,
                setNewHeight,
                newWidth,
                newHeight
            }}
        >
            {children}
        </ReactFlowContext.Provider>
    )
}


export const useReactFlowContext = () => {
    return useContext(ReactFlowContext)
}
