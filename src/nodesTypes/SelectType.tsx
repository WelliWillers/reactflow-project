import {
  Handle,
  NodeProps,
  Position,
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
import { memo, useEffect, useState } from "react";
import theme from "../theme";
import { useReactFlowContext } from "../contexts/ReactflowContext";

interface props extends NodeProps {
  value: string;
  handleId: string;
  nodeId: string;
}

const names = [
  "Empresa 1",
  "Empresa 2",
  "Empresa 3",
  "Empresa 4",
];

function SelectItem(props: props) {
  const [companies, setCompanies] = useState<string[]>([]);
  const { nodes, newWidth, addEvent } = useReactFlowContext()

  const handleChange = (event: SelectChangeEvent<typeof companies>) => {
    const { target: { value } } = event;

    setCompanies(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    if(companies.length == 1 ){
      addEvent(props.id, String(nodes.length + 1), 'buttom', 'firstEvent')
    }
  },[companies])

  return (
    <Box
      bgcolor={theme.palette.grey[100]}
      boxShadow={props.selected ? `0 0 10px -1.5px ${theme.palette.primary.main}` : `0 0 10px -1.5px ${theme.palette.grey[500]}`}
      borderColor={theme.palette.success.main}
      borderRadius={2}
      padding={5}
      width={newWidth}
    >
      <FormControl sx={{ position: "relative", width: '100%' }}>
        <InputLabel id="demo-multiple-checkbox-label">Empresas</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          className="nodrag"
          multiple
          value={companies}
          onChange={handleChange}
          input={<OutlinedInput label="Empresas" />}
          renderValue={(selected) => selected.join(", ")}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={companies.indexOf(name) > -1} />
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
    <Box width={'auto'}>
      {Object.keys(props.data.selects).map((handleId) => (
        <SelectItem
          {...props}
          key={handleId}
          nodeId={props.id}
          value={props.data.selects[handleId]}
          handleId={handleId}
        />
      ))}
    </Box>
  );
}

export default memo(SelectType);
