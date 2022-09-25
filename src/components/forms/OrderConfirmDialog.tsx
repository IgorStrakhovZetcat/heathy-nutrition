import { Box, Button, Dialog, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, Slide, TextField, Typography } from "@mui/material";
import React from "react";
import { createOrder, Order } from "../../models/Order";
import { Product } from "../../models/Product";
import CSS from 'csstype';
import { TransitionProps } from "@mui/material/transitions";




const buttonStyle: CSS.Properties = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '30px',
    
    
}
const pageTitle: CSS.Properties = {
    fontFamily: 'Montserrat', 
    fontSize: '35px',
    fontWeight: 600,
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    //marginTop: '10px',
    backgroundColor: '#6ECA1C',
    marginBottom: '10px',
    
  }
const aboveDescription: CSS.Properties = {
    display: 'flex', 
    justifyContent: 'center', 
    marginTop: '10px', marginBottom: '10px',
    fontFamily: 'Montserrat',
    fontSize: '35px',
    fontWeight: 600,
}
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

type Props = {
    submitFn: (order: Order) => void;
    open: boolean;
    totalCost: number;
    email: string;
    cart: Product[];
    orderUpdate?: Order;
    cancel: (openOrderDialog: boolean) => void;
}
const initialOrder: Order = createOrder(0, [], '', 0, '', 0, '', new Date("0000-00-00"))
const OrderConfirmDialoge: React.FC<Props> = ({submitFn, open, orderUpdate, totalCost, email, cart, cancel}) => {
    const [order, setOrder] = React.useState(orderUpdate || initialOrder);



    function onSubmit(event: any) {
        event.preventDefault();
        submitFn(order);
        document.querySelector('form')!.reset();
    }
    function onCancel() {
        cancel(false)
    }
    function handlerAddress(event: any) {
        const orderCopy = { ...order };
        orderCopy.address = event.target.value;
        orderCopy.totalCost = totalCost + 10;
        orderCopy.email = email;
        orderCopy.cart = cart;
        setOrder(orderCopy);
    }
    function handlerPhoneNumber(event: any) {
        const orderCopy = { ...order };
        orderCopy.phoneNumber = +event.target.value;
        setOrder(orderCopy);
    }
    function handlerShippingNotes(event: any) {
        const orderCopy = { ...order };
        orderCopy.shippingNotes = event.target.value;
        setOrder(orderCopy);
    }
    function handlerDateOrder(event: any) {
        const orderCopy = { ...order };
        orderCopy.dateOrder = new Date(event.target.value);
        setOrder(orderCopy);
    }
    function onReset() {
        setOrder(orderUpdate || initialOrder)  
       
    }
   

    return <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <label style={pageTitle}>My Order</label>
        <label style={aboveDescription}>Total cost {totalCost + 10} $</label>
<DialogContent>
        <form onSubmit={onSubmit} onReset={onReset}>

    <Grid container spacing={{ xs: 6, sm: 3, md: 3 }} justifyContent="center">
        <Grid item xs={8} sm={7}  >
            <TextField type="string" label="Address" fullWidth required
                onChange={handlerAddress} helperText={`Enter your addressy`}
                value={order.address || ''}>
                <InputLabel id="product-select-label">Product Name</InputLabel>
            
            </TextField>
        </Grid>

        <Grid item xs={8} sm={7}>
            <TextField type="number" label="Phone Number" fullWidth required
                onChange={handlerPhoneNumber} helperText={`Enter your phone number`}
                value={order.phoneNumber || ''}
                />
        </Grid>

   

    
    
    

        <Grid item xs={8} sm={7}>
            < TextField type="string" label="Shipping Notes" fullWidth required
                onChange={handlerShippingNotes} helperText={`Enter shipping notes`}
                value={order.shippingNotes || ''}
                />
        </Grid>

        <Grid item xs={8} sm={7} >
                <TextField required label={'Date Delivery'} type={'date'} fullWidth
                    onChange={handlerDateOrder}
                    value={!!order.dateOrder.getFullYear() ?
                        getIsoDate(order.dateOrder) : ''} 
                    inputProps={
                            {
                                 min: getMinDate(),
                                // max: `${maxYear}-12-31`
                            }
                        } InputLabelProps={{
                            shrink: true
                        }} />

        </Grid>

    
        
        

    </Grid>
        <div style={buttonStyle}>
                <Button style={{marginLeft: '40px'}} variant="contained" color="success" type="submit">Submit</Button>
                <Button style={{marginLeft: '40px'}} variant="contained" type="reset">Reset</Button>
                <Button style={{marginLeft: '40px'}} variant="contained" color="error" onClick={() => onCancel()}>Cancel</Button>
        </div>
    
    </form>
    </DialogContent>
    </Dialog>
}

export default OrderConfirmDialoge;

function getMinDate(): string {
    const dateNow = new Date()
    const day = dateNow.getDate() + 2;
    const month = dateNow.getMonth();
    const year = dateNow.getFullYear();
    const dateUTC = new Date(year, month, day);
    return dateUTC.toISOString().substring(0, 10);

}
function getIsoDate(dateValue: Date): string {
    const day = dateValue.getDate() + 1;
    const month = dateValue.getMonth();
    const year = dateValue.getFullYear();
    const dateUTC = new Date(year, month, day);
    return dateUTC.toISOString().substring(0, 10);

}