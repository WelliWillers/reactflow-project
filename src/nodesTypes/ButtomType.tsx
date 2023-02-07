
import { Box, Button } from "@mui/material";
import { Handle, NodeProps, Position } from "reactflow";
import theme from "../theme";
import AddIcon from '@mui/icons-material/Add';
import { useReactFlowContext } from "../contexts/ReactflowContext";
import HandleBase from "../components/reactFlow/HandleBase";

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
      <HandleBase type="target" idItem={props.id} position={Position.Top} />
      <HandleBase type="source" idItem={props.id} position={Position.Bottom} />

      Adicionar opção
    </Button>
  );
}