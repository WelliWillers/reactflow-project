import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Handle, NodeProps, NodeToolbar, Position } from "reactflow";
import { useReactFlowContext } from "../contexts/ReactflowContext";
import theme from "../theme";
import AddIcon from '@mui/icons-material/Add';
import HandleBase from "../components/reactFlow/HandleBase";
import BoxReactFlowModel from "../components/reactFlow/BoxModel";
import EventType from "./MenusNodeTypes/EventType";
import InfoType from "./MenusNodeTypes/InfoType";
import MenuType from "./MenusNodeTypes/MenuType";
import LinkType from "./MenusNodeTypes/LinkType";
import ShedulingRobotType from "./MenusNodeTypes/ShedulingRobotType";

export default function Event(props: NodeProps){

    const { handleSetNewWidth, newWidth, nodes, addEvent } = useReactFlowContext()
    const [ eventType, setEventType ] = useState<string>('eventType')
    const [ addSegmentation, setAddSegmentation ] = useState(true)

    const [ types, setTypes ] = useState([
        {id: 'eventType', title: 'Evento'},
        {id: 'infoType', title: 'Informação'},
        {id: 'linkType', title: 'Link'},
        {id: 'shedulingRobotType', title: 'Robô agendamento'},
    ])
    
    useEffect(() => {
        if(props.id.includes('firstEvent')){
            setTypes([...types, {id: 'menuType', title: 'Menu'}])
        }
    }, [])


    function handleAddSegmentation(sourse: string, target: number){
        addEvent(sourse, String(target + 1), 'addSegmentation')
        setAddSegmentation(false)
    }
    
    useEffect(() => {
        if(eventType === 'menuType'){
            addEvent(props.id, String(nodes.length + 1), 'buttom')
        }
        handleSetNewWidth(450)
    }, [eventType])

    return (
      <BoxReactFlowModel props={props} selected={props.selected}>
        {addSegmentation && props.id.includes("firstEvent") && (
          <NodeToolbar
            isVisible={eventType === "menuType" && props.selected}
            position={Position.Top}
            style={{ marginLeft: -newWidth / 2 - 20, marginTop: -15 }}
          >
            <Button
              color="secondary"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                color: theme.palette.success.contrastText,
                width: newWidth,
              }}
              onClick={() => handleAddSegmentation(props.id, nodes.length)}
            >
              Segmentar
            </Button>
          </NodeToolbar>
        )}

        <HandleBase type="target" idItem={props.id} position={Position.Top} />

        <HandleBase type="source" idItem={props.id} position={Position.Bottom} />

        <Box display={"flex"} flexDirection={'column'} gap={2}>
            <TextField
                select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                label="Tipo"
                className="nodrag"
                sx={{ width: "100%" }}
            >
            
            {types.map((type) => {
                return (
                    <MenuItem key={type.id} value={type.id}>
                        {type.title}
                    </MenuItem>
                );
            })}

            </TextField>
            
            {
                eventType === "eventType" ? (
                    <EventType />
                ) : eventType === "infoType" ? (
                    <InfoType />
                ) : eventType === "menuType" ? (
                    <MenuType />
                ) : eventType === "linkType" ? (
                    <LinkType />
                ) : eventType === "shedulingRobotType" ? (
                    <ShedulingRobotType/>
                ) : (
                    <Box>
                        <Typography>Nada selecionado</Typography>
                    </Box>
                )
            }
        </Box>
      </BoxReactFlowModel>
    );
}