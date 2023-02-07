import { Box } from "@mui/material";
import { Handle, PanelPosition, Position } from "reactflow";
import theme from "../../theme";

type HandleBaseProps = {
    idItem: string
    type: 'target' | 'source'
    position: Position
}

export default function HandleBase({idItem, type, position}:HandleBaseProps){
    return (
        <Box>
            <Handle
                style={{
                    width: "12px",
                    height: "11px",
                    borderWidth: 3,
                    borderColor: theme.palette.success.dark,
                    backgroundColor: theme.palette.success.main,
                }}
                id={idItem + "-" + type}
                type={type}
                position={position}
            />
        </Box>
    );
}