import {
  Handle,
  NodeProps,
  Position,
  useReactFlow,
  useStoreApi,
} from "reactflow";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Box } from "@mui/system";
import { memo, useState } from "react";
import theme from "../theme";

interface props extends NodeProps {
  value: string;
  handleId: string;
  nodeId: string;
}

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function SelectItem(props: props) {
  const [personName, setPersonName] = useState<string[]>([]);

  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const { nodeInternals } = store.getState();
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === props.nodeId) {
          node.data = {
            ...node.data,
            selects: {
              ...node.data.selects,
              [props.handleId]: event.target.value,
            },
          };
        }

        return node;
      })
    );
  };

  return (
    <Box
      bgcolor={theme.palette.primary.contrastText}
      boxShadow={props.selected ? `0 0 10px -1.5px ${theme.palette.primary.main}` : `0 0 10px -1.5px ${theme.palette.grey[500]}`}
      borderColor={theme.palette.success.main}
      borderRadius={2}
      padding={5}
    >
      <FormControl sx={{ position: "relative" }}>
        <InputLabel id="demo-multiple-checkbox-label">Empresas</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          className="nodrag"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Empresas" />}
          renderValue={(selected) => selected.join(", ")}
          sx={{ minWidth: "20rem", zIndex: 99999 }}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
    </Box>
  );
}

function SelectType(props: NodeProps) {
  return (
    <div className="custom-node__body">
      {Object.keys(props.data.selects).map((handleId) => (
        <SelectItem
          {...props}
          key={handleId}
          nodeId={props.id}
          value={props.data.selects[handleId]}
          handleId={handleId}
        />
      ))}
    </div>
  );
}

export default memo(SelectType);
