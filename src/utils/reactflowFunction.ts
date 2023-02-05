import {
  Node,
  Edge,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre'

import DefaultEdge from '../EdgeTypes/DefaultEdge';

import ButtonType from '../nodesTypes/ButtomType';
import SelectType from '../nodesTypes/SelectType';
import Event from '../nodesTypes/Event';

import EventType from '../nodesTypes/MenusNodeTypes/EventType';
import InfoType from '../nodesTypes/MenusNodeTypes/InfoType';
import LinkType from '../nodesTypes/MenusNodeTypes/LinkType';
import ShedulingRobotType from '../nodesTypes/MenusNodeTypes/ShedulingRobotType';
import MenuType from '../nodesTypes/MenusNodeTypes/MenuType';
import AddSegmentation from '../nodesTypes/AddSegmentation';

export const NODE_TYPES = {
  buttom: ButtonType,
  selectCompany: SelectType,
  event: Event,
  eventType: EventType,
  infoType: InfoType,
  linkType: LinkType,
  shedulingRobotType: ShedulingRobotType,
  menuType: MenuType,
  addSegmentation: AddSegmentation
}

export const EDGE_TYPES = {
  default: DefaultEdge
}

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export const startWidth = 300
export const startHeight = 200
export const positionInitial = { x: 0, y: 0 }

const initialNodes: Node[] = [
  { id: '1', type: 'selectCompany', data: { selects: { 'select-1': '1'} }, position: positionInitial}
];

const initialEdges: Edge[] = [];

export const getLayoutedElements = (nodes: Node[], edges: Edge[], newWidth: number, newHeight:number) => {
  dagreGraph.setGraph({ rankdir: 'TB' });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: newWidth, height: newHeight });
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
      x: nodeWithPosition.x - newWidth / 2,
      y: nodeWithPosition.y - newHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

export const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges,
  startWidth,
  startHeight
);