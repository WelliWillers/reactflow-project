
import { Box, Button } from "@mui/material";
import { Handle, NodeProps, Position } from "reactflow";
import theme from "../theme";
import AddIcon from '@mui/icons-material/Add';

export default function ButtonType(props: NodeProps) {
  return (
    <Button
      color="secondary"
      variant="contained"
      startIcon={<AddIcon />}
      sx={{ color: theme.palette.success.contrastText}}
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
    </Button>
  );
}