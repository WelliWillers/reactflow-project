import { Box, MenuItem, TextField } from "@mui/material";
import { useReactFlowContext } from "../../contexts/ReactflowContext";

export default function EventType(){

    const { handleSetNewHeight } = useReactFlowContext()

    handleSetNewHeight(300)

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