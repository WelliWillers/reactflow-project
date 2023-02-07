import { MenuItem, TextField } from "@mui/material";

export default function MenuType(){
    return (
        <>
            <TextField
                select
                onChange={() => {}}
                value={1}
                label="Evento"
                className="nodrag"
                sx={{width: '100%'}}
            >
                {
                    [1, 2, 3, 4, 5].map((item) => (
                        <MenuItem>
                            {item}
                        </MenuItem>
                    ))
                }
            </TextField>

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