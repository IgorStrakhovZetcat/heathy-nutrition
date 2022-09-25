import { useDispatch, useSelector } from "react-redux";
import { Cart, createCart } from "../../models/Cart";
import { ClientData } from "../../models/ClientData";
import { StateType } from "../../redux/store";
import { Alert, Box, Button, Typography } from '@mui/material';
import CSS from 'csstype';
import { Product } from '../../models/Product';
import DeleteIcon from '@mui/icons-material/Delete';
import { addOrder, cleanCart, removeFromCart } from "../../redux/actions";
import { Order } from "../../models/Order";
import { useState } from "react";
import OrderConfirmDialoge from "../forms/OrderConfirmDialog";
import { useNavigate } from "react-router-dom";
import ConfirmationData from "../../models/ConfirmationData";
import React from "react";
import CheckIcon from '@mui/icons-material/Check';

const productBoxStyle: CSS.Properties = {
  width: '100%',
  //overflowX: 'scroll',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  marginTop: '20px',
}
const productTitle: CSS.Properties = {
  fontFamily: 'Montserrat', 
  color: '#BEC105', 
  fontWeight: 600,
  fontSize: '20px',
  marginRight: '20px'
}
const prodictDescription: CSS.Properties = {
  fontFamily: 'Montserrat', 
  fontSize: '15px',
  fontWeight: 300,
  color: 'black',
  marginRight: '20px',
  width: '250px',
  textAlign: 'center',

}
const prodDescribeCWC = {
  fontFamily: 'Montserrat', 
  fontSize: '15px',
  fontWeight: 300,
  color: 'black',
  marginRight: '20px',
}
const productStyle: CSS.Properties = {

  //width: '500px',
  height: "auto", 
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  //marginBottom: '5px',
  //marginRight: '10px',
  //marginLeft: '20px',
  //transition: all 0.3s ease-in-out,
  padding: '2px',
  borderRadius: '20px',
  
  
}
const productImg: CSS.Properties = {
  width: '100%',
  height: '100%',
  
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
const toOrderBox: CSS.Properties = {
    fontFamily: 'Montserrat', 
    marginTop: '100px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
}
const productDivImg = {
  width: '190px',
  height: '260px', 
 
}



const MyOrder: React.FC = () => {
    const clientData: ClientData = useSelector<StateType, ClientData>(state => state.clientData);
    const carts: Cart[] = useSelector<StateType, Cart[]>(state => state.carts);
    const dispatch = useDispatch<any>();
    
    const [openOrderDialog, setOpenOrderDialog] = useState<boolean>(false)
    //const [freeDelivery, setFreeDelivery] = useState<string>('Free delivery after 50 $')
   

    
    function getProducts(){
        const cart: Cart | undefined = carts.find(c => c.email === clientData.email)
        if(cart){
            return cart.productsInCart;
        }
        return []
    }
    function getTotalCost() {
      let res = 0;
      const products: Product[] = getProducts()
      for(let i = 0; i < products.length; i++){
        res = res + products[i].cost
      }
      // if(res >= 50){
      //   setFreeDelivery('Free delivery')
      // }
      return res;
    }
    function removeFromCartHandler(product: Product){
      const cart: Cart | undefined = carts.find(c => c.email === clientData.email)
        if(cart){
            dispatch(removeFromCart(cart, product))
        }  
    }
    function openOrderDIalogHandler() {
      setOpenOrderDialog(true)
    }
    
   
   function onSubmit(order: Order) {
       
       dispatch(addOrder(order));
       setOpenOrderDialog(false)
       const cart: Cart | undefined = carts.find(c => c.email === clientData.email)
        if(cart !== undefined){
          dispatch(cleanCart(cart))
        }    
       

   }
   function onCancel(openOrderDialog: boolean) {
      setOpenOrderDialog(openOrderDialog)
   }

    
    

    return <Box>
      <label style={pageTitle}>My cart</label>
      {getProducts().length > 0 ? 
        <Box>
          <div style={productBoxStyle}>
            {getProducts().map(prod => 
                        <div key={prod.id} style={productStyle}>
                        <div style={productDivImg}>
                            <img src={prod.img} style={productImg}/>
                        </div>
                        <div style={productTitle}>{prod.title}  </div>
                        <div style={prodictDescription}>{prod.description}</div>
                        <div style={prodDescribeCWC}>Weight: {prod.weight} g</div>
                        <div style={prodDescribeCWC}>Calories: {prod.calories} kcal</div>
                        <div style={{color: '#5fa36a', marginRight: '30px'}}>{prod.cost}$</div>
                        <DeleteIcon  onClick={() => removeFromCartHandler(prod)}/>
                    </div> )}
        </div>
          
          
          
          
        
        <div style={toOrderBox}>
          <label >Total cost: {getTotalCost()} $</label>
          {/* <label style={{marginTop: '10px'}}>{freeDelivery}</label> */}
          
          <Button style={{marginTop: '10px'}} variant="contained" color="success" onClick={() => openOrderDIalogHandler()}>TO ORDER</Button>

        </div>
        {openOrderDialog ? <OrderConfirmDialoge cancel={onCancel} cart={getProducts()} email={clientData.email} open={openOrderDialog} totalCost={getTotalCost()} submitFn={onSubmit}/> : <div></div>}
        
        </Box>
      
              
      
    
    : <label style={{display: 'flex', justifyContent: 'center', marginTop: '100px', fontFamily: 'Montserrat', fontSize: '35px',
    fontWeight: 600, marginBottom: '340px'}}>Your cart is empty</label>}
    </Box>
}

export default MyOrder;