import { TextField } from "@mui/material";

export default function ShedulingRobotType(){
    return (
        <>
            <TextField
                rows={8}
                onChange={() => {}}
                value={'teste'}
                label="Descrição"
                className="nodrag"
                sx={{width: '100%'}}
            />
        </>
    );
}