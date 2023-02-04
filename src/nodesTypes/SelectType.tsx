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
import { useReactFlowContext } from "../contexts/reactflowContext";
import { getLayoutedElements, positionInitial } from "../utils/reactflowFunction";

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
  const [companies, setCompanies] = useState<string[]>([]);
  const { edges, nodes, setEdges, setNodes, newWidth, newHeight } = useReactFlowContext()

  const handleChange = (event: SelectChangeEvent<typeof companies>) => {
    const { target: { value } } = event;

    setCompanies(typeof value === "string" ? value.split(",") : value);
    
  };

  useEffect(() => {
    if(companies.length > 0 ){
      const newNode = [
        ...nodes,
        { id: '2', type: 'buttom', data: { label: 'Button start to add event' }, position: positionInitial}
      ]
      const newEdge = [
        ...edges,
        { id: 'e1-2', source: '1', target: '2' }
      ]

      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        newNode,
        newEdge,
        newWidth, 
        newHeight
      );

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    }

  },[companies])

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
          value={companies}
          onChange={handleChange}
          input={<OutlinedInput label="Empresas" />}
          renderValue={(selected) => selected.join(", ")}
          sx={{maxWidth: 450, width: 120}}
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
