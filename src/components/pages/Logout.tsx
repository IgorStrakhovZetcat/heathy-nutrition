import { Label, Visibility } from "@mui/icons-material";
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, List, ListItem, Modal, Paper } from "@mui/material";
import React, { useCallback } from "react";
import { Selector, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN_PATH } from "../../config/routes-config";
import { authService } from "../../config/service-config";
import { ClientData, emptyClientData } from "../../models/ClientData";
import { authAction, removeCart } from "../../redux/actions";
import { StateType } from "../../redux/store";
import CSS from 'csstype';
import LogoutIcon from '@mui/icons-material/Logout';
import { Order } from "../../models/Order";
import { DataGrid, GridActionsCellItem, GridColumns, GridRowParams } from "@mui/x-data-grid";
import useLayout from "../../util/useLayout";




const pageTitle: CSS.Properties = {
    fontFamily: 'Montserrat', 
    fontSize: '35px',
    fontWeight: 600,
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    //marginTop: '10px',
    backgroundColor: '#6ECA1C',
    marginBottom: '10px'
  }
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  function getColumns(actionsFn: (params: GridRowParams)=>JSX.Element[], layout:string): GridColumns {
    const columns: GridColumns = [
        {field: "id", type: "string", headerName: "ID", align: "center", headerAlign: "center", flex:0.5},
    { field: "email", type: "string", headerName: "Email", align: "center", headerAlign: "center", flex:1 },
    { field: "totalCost", type: "number", headerName: "Total Cost $", align: "center", headerAlign: "center", flex: 0.7 },
    { field: "address", type: "string", headerName: "Address", align: "right", headerAlign: "center", flex: 0.5 },
    { field: "phoneNumber", type: "number", headerName: "Phone Number", align: "right", headerAlign: "center", flex: 0.6 },
    { field: "shippingNotes", type: "string", headerName: "Shipping Notes", align: "right", headerAlign: "center", flex: 0.7 },
    { field: "dateOrder", type: "date", headerName: "Date Delivery", align: "center", headerAlign: "center", flex: 0.7 },
    // { field: "actions", type: "actions", flex: 0.5, getActions:actionsFn}

    ]
    return columns;
  }


const Logout: React.FC = () => {   
    const orders: Order[] = useSelector<StateType, Order[]>(state => state.orders)
    const clientData: ClientData = useSelector<StateType, ClientData>(state => state.clientData)
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const layout = useLayout();
    const [open, setOpen] = React.useState(false);
    const shownOrder = React.useRef<Order>();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);

    function handleClickOpen(){
        setOpen(true);
    };

    function handleClose(){
        setOpen(false);
    };
    function getOrdersClient() {
        const copyOrders: Order[] = orders.filter(or => or.email === clientData.email)
        return copyOrders;
    }

    function actionsFn(params: GridRowParams): JSX.Element[] {
        const actionElements: JSX.Element[] = [
             <GridActionsCellItem label="Details" icon={<Visibility/>}
              onClick={showDetails.bind( undefined, params.id as number)}/>
        ]
        // if(clientData.isAdmin) {
        //     actionElements.push(<GridActionsCellItem label="Remove" onClick={() => showRemoveConfirmation(params.id as number)} icon={<Delete/>}/>,
        //     <GridActionsCellItem label="Edit" onClick={() => editFn(params.id as number)} icon={<Edit/>}/>)
        // }
        return actionElements;
    }
    function showDetails(id: number) {
        shownOrder.current = orders.find(c => c.id === id);
        setModalOpen(true);
    }

    async function onLogout() {
        if(await authService.logout()) {
            //dispatch(removeCart(clientData.email))
            dispatch(authAction(emptyClientData))
             navigate(LOGIN_PATH)
        }
       
    }

    const getActionsCallback = useCallback(getColumns, [orders, layout]);
    const columns = getActionsCallback(actionsFn, layout);

    return  <Box><label style={pageTitle}>My profile</label>


        <label style={{marginTop: '10px', fontFamily: 'Montserrat', fontSize: '35px',fontWeight: 600,}}>History orders</label>
        <IconButton  onClick={() => handleClickOpen()} style={{float: 'right', marginRight: '20px'}}>
            <LogoutIcon fontSize="large"  color="error" />
        </IconButton>
        
        <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
            <Paper sx={{height: {xs: '90vh', sm: '85vh', md: '80vh'}, width: {xs: '100%', md: '85%'}}}>
            <DataGrid rows={getOrdersClient()} columns={columns}/>
        </Paper>
        </Box>
        <Modal
        open={modalOpen}
        onClose={()=>setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <List>
              {shownOrder.current && Object.entries(shownOrder.current as any).map(e => <ListItem key={e[0]}>{`${e[0]}: ${e[1]}`}</ListItem>)}
          </List>
        </Box>
      </Modal>

        <Container component="main" maxWidth="xs">
        

        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        {`User ${clientData.displayName} are you sure that you want to leave?`}
        </DialogTitle>
        
        <DialogActions>
          <Button onClick={() => handleClose()} color='success'>Cancel</Button>
          <Button onClick={() => onLogout()} color="error" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
        
        
        </Container></Box>
}
export default Logout;