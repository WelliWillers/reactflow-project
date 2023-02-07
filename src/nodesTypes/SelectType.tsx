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
import HandleBase from "../components/reactFlow/HandleBase";
import BoxReactFlowModel from "../components/reactFlow/BoxModel";

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
    <BoxReactFlowModel props={props} selected={props.selected}>
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

      <HandleBase type="source" idItem={props.id} position={Position.Bottom} />
    </BoxReactFlowModel>
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
