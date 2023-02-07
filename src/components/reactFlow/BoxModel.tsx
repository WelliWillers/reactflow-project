import { Box, IconButton } from "@mui/material";
import { ReactNode } from "react";
import { useReactFlowContext } from "../../contexts/ReactflowContext";
import theme from "../../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import { NodeProps } from "reactflow";

type Props = {
  children: ReactNode;
  selected: boolean;
  props: NodeProps;
};

export default function BoxReactFlowModel({ children, selected, props }: Props) {
  const { newWidth, removeNodeAndEdge } = useReactFlowContext();

  return (
    <Box
      bgcolor={theme.palette.grey[100]}
      boxShadow={
        selected
          ? `0 0 10px -1.5px ${theme.palette.primary.main}`
          : `0 0 10px -1.5px ${theme.palette.grey[500]}`
      }
      borderColor={theme.palette.success.main}
      borderRadius={2}
      padding={5}
      width={newWidth}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: -10,
          right: -10,
          visibility: props.id === '1' ? 'hidden' : 'visible',
          backgroundColor: theme.palette.grey[300],
        }}
        aria-label="delete"
        size="large"
        onClick={() => removeNodeAndEdge(props.id) }
      >
        <DeleteIcon
          sx={{ fontSize: 15, color: theme.palette.error.main }}
          fontSize="inherit"
        />
      </IconButton>

      {children}
    </Box>
  );
}
