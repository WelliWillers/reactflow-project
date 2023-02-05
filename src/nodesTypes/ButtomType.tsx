
import { Box, Button } from "@mui/material";
import { Handle, NodeProps, Position } from "reactflow";
import theme from "../theme";
import AddIcon from '@mui/icons-material/Add';
import { useReactFlowContext } from "../contexts/ReactflowContext";

export default function ButtonType(props: NodeProps) {
  const { addEvent, nodes, newWidth } = useReactFlowContext()

  return (
    <Button
      color="primary"
      variant="contained"
      startIcon={<AddIcon />}
      sx={{ color: theme.palette.success.contrastText, width: newWidth  }}
      onClick={() => addEvent(props.id, String(nodes.length + 1), 'event', props.data.idHelper)}
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