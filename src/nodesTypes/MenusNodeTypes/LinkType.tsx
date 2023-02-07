import { MenuItem, TextField } from "@mui/material";


export default function LinkType(){
    return (
        <>
            <TextField
                onChange={() => {}}
                value={''}
                label="Link"
                className="nodrag"
                sx={{width: '100%'}}
            />

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