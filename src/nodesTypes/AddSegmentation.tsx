import { Box } from "@mui/system";
import { Handle, NodeProps, Position } from "reactflow";
import { useReactFlowContext } from "../contexts/ReactflowContext";
import theme from "../theme";


export default function AddSegmentation(props: NodeProps){
    const { newWidth } = useReactFlowContext()

    return (
        <Box
            bgcolor={theme.palette.grey[100]}
            boxShadow={props.selected ? `0 0 10px -1.5px ${theme.palette.primary.main}` : `0 0 10px -1.5px ${theme.palette.grey[500]}`}
            borderColor={theme.palette.success.main}
            borderRadius={2}
            padding={5}
            width={newWidth}
        >
            <Handle
                style={{
                    width: "10px",
                    height: "10px",
                    marginTop: "-20px",
                    backgroundColor: theme.palette.success.main,
                }}
                id="top"
                type={"target"}
                position={Position.Top}
            />

            Configuração de segmentação
        </Box>
    );
}