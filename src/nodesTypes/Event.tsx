import { Box } from "@mui/material";
import { Handle, Position } from "reactflow";
import { useReactFlowContext } from "../contexts/reactflowContext";
import theme from "../theme";

export default function Event(){

    const { setNewWidth, newWidth } = useReactFlowContext()

    return (
        <Box width={newWidth} bgcolor={theme.palette.success.main} border={'1px solid red'}>
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

            <Handle
                style={{
                width: "10px",
                height: "10px",
                marginBottom: "-20px",
                backgroundColor: theme.palette.success.main,
                }}
                id="bottom"
                type={"source"}
                position={Position.Bottom}
            />
            Adicionar evento
        </Box>
    );
}