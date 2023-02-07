import { Box, Button, MenuItem, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add'
import theme from "../../theme";
import { useReactFlowContext } from "../../contexts/ReactflowContext";

export default function InfoType(){

    const { handleSetNewHeight } = useReactFlowContext()

    handleSetNewHeight(300)

    return (
        <>
            <Box display={"flex"} gap={2}>
                <TextField
                    onChange={() => {}}
                    value={'teste'}
                    label="Link do arquivo ou upload"
                    className="nodrag"
                    sx={{width: '100%'}}
                />

                <Button
                    color="primary"
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ color: theme.palette.success.contrastText, paddingX: 5  }}
                    onClick={() => {}}
                >
                    UPLOAD
                </Button>
            </Box>
            
            <TextField
                rows={8}
                onChange={() => {}}
                value={'teste'}
                label="Descrição"
                className="nodrag"
                sx={{width: '100%'}}
            />

            <TextField
                rows={8}
                onChange={() => {}}
                value={'teste'}
                label="Mensagem"
                className="nodrag"
                sx={{width: '100%'}}
            />

            <Box display={"flex"} gap={2}>
                <TextField
                    onChange={() => {}}
                    value={'Sim'}
                    label="Botão positivo"
                    className="nodrag"
                    sx={{width: '100%'}}
                />
                <TextField
                    onChange={() => {}}
                    value={'Não'}
                    label="Botão negativo"
                    className="nodrag"
                    sx={{width: '100%'}}
                />
            </Box>
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
            
        </>
    );
}