import { Box, Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Handle, NodeProps, NodeToolbar, Position } from "reactflow";
import { useReactFlowContext } from "../contexts/ReactflowContext";
import theme from "../theme";
import AddIcon from '@mui/icons-material/Add';

export default function Event(props: NodeProps){

    const { handleSetNewHeight, newWidth, nodes, addEvent } = useReactFlowContext()
    const [ eventType, setEventType ] = useState<string>('eventType')
    const [ addSegmentation, setAddSegmentation ] = useState(true)

    const [ types, setTypes ] = useState([
        {id: 'eventType', title: 'Evento'},
        {id: 'infoType', title: 'Informação'},
        {id: 'linkType', title: 'Link'},
        {id: 'shedulingRobotType', title: 'Robô agendamento'},
    ])
    
    useEffect(() => {
        console.log('props', props)
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
        handleSetNewHeight(450)
    }, [eventType])

    return (
        <Box
            bgcolor={theme.palette.grey[100]}
            boxShadow={props.selected ? `0 0 10px -1.5px ${theme.palette.primary.main}` : `0 0 10px -1.5px ${theme.palette.grey[500]}`}
            borderColor={theme.palette.success.main}
            borderRadius={2}
            padding={5}
            width={newWidth}
        >
            {
                addSegmentation && props.id.includes('firstEvent') && (
                    <NodeToolbar 
                        isVisible={eventType === 'menuType' && props.selected} 
                        position={Position.Top}
                        style={{ marginLeft: -newWidth / 2 - 20, marginTop: -15}}
                    >
                        <Button
                            color="secondary"
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{ color: theme.palette.success.contrastText, width: newWidth  }}
                            onClick={() => handleAddSegmentation(props.id, nodes.length)}
                        >
                            Segmentar
                        </Button>
                    </NodeToolbar>
                )
            }

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

            <TextField
                select
                onChange={(e) => setEventType(e.target.value)}
                value={eventType}
                label="Tipo"
                className="nodrag"
                sx={{width: '100%'}}
            >
                {types.map((type) => {
                    return (
                        <MenuItem key={type.id} value={type.id}>
                            {type.title}
                        </MenuItem>
                    )
                })}
            </TextField>
        </Box>
    );
}