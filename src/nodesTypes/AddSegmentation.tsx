import { Box } from "@mui/system";
import { Handle, NodeProps, Position } from "reactflow";
import BoxReactFlowModel from "../components/reactFlow/BoxModel";
import HandleBase from "../components/reactFlow/HandleBase";
import { useReactFlowContext } from "../contexts/ReactflowContext";
import theme from "../theme";


export default function AddSegmentation(props: NodeProps){
    const { newWidth } = useReactFlowContext()

    return (
        <BoxReactFlowModel props={props} selected={props.selected} >
            <HandleBase type="target" idItem={props.id} position={Position.Top} />

            Configuração de segmentação
        </BoxReactFlowModel>
    );
}