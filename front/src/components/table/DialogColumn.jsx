import { Button, Dialog, DialogTitle, Typography } from "@mui/material"
import useDialog from "../hooks/useDialog"
import DialogComponent from "./DialogComponent"

const DialogColumn = (props) => {
    const { row } = props

    const dialog = useDialog(false)
    return (
        <>
            <Button onClick={dialog.onClick}>Modifier</Button>
            <Dialog
            open={dialog.open}
            onClose={dialog.handleOnClose}
            maxWidth='xl'
            >
                <DialogTitle><Typography align='center' variant='h6' style={{ fontWeight: 600 }}>Statistiques</Typography></DialogTitle>
                <DialogComponent row={row} />
            </Dialog>
        </>  
    )
}

export default DialogColumn
