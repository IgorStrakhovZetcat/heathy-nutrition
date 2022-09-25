
import { Alert, Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, IconButton, List, ListItem, Modal, Paper, Typography} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ClientData } from "../../models/ClientData";
import { Product } from '../../models/Product'
import { StateType } from "../../redux/store";
import { Cart} from "../../models/Cart";
import { addToCart, removeProduct } from "../../redux/actions";
import CSS from 'csstype';
import { useRef, useState } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


const styleProduct = {
    bgcolor: '#68A630',
    border: '2px solid #000'
}
const productStyle: CSS.Properties = {

    width: '250px',
    height: "450px", 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '50px',
    marginRight: '24px',
    marginLeft: '24px',
    //transition: all 0.3s ease-in-out,
    padding: '12px',
    borderRadius: '10px',
}
const productStyleList: CSS.Properties = {

    //width: '250px',
    //height: "auto", 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    //marginBottom: '50px',
    //marginRight: '24px',
    //marginLeft: '24px',
    //transition: all 0.3s ease-in-out,
    //padding: '12px',
    //borderRadius: '10px',
}
const productDivImg = {
    //marginTop: '20px',
    width: '190px',
    height: '260px', 
}
const productImg: CSS.Properties = {
    width: '100%',
    height: '100%',
}
const productBoxStyle: CSS.Properties = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: '20px',
    
}
const productTitle: CSS.Properties = {
    fontFamily: 'Montserrat', 
    fontWeight: 600,
    color: '#BEC105', 
    fontSize: '20px',
    marginTop: '5px',
    marginBottom: '7px',
    textAlign: 'center',
}
const prodictDescription: CSS.Properties = {
    fontFamily: 'Montserrat', 
    fontSize: '15px',
    fontWeight: 300,
    color: 'black',
    //marginTop: '5px',
    textAlign: 'center',
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
    marginBottom: '10px'
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 320,
    height: "600px",
    bgcolor: 'background.paper',
    
    boxShadow: 25,
    p: 6,
  };
const filterBox: CSS.Properties = {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Montserrat', 
    fontSize: '20px',
    fontWeight: 300,
    marginLeft: '10px',
    lineHeight: '30px'
    
}
const titleCategory = {
    display: 'flex', 
    justifyContent: 'center',
    fontFamily: 'Montserrat', 
    fontSize: '40px',
    fontWeight: 400,
}

const Menu: React.FC = () => {
    const products: Product[] = useSelector<StateType, Product[]>(state => state.products);
    const clientData: ClientData = useSelector<StateType, ClientData>(state => state.clientData);
    const carts: Cart[] = useSelector<StateType, Cart[]>(state => state.carts);
    const dispatch = useDispatch<any>();
    const shownProduct = useRef<Product>();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [alertOpen, setOpenAlert] = useState<boolean>(true);
    
    const [filterMenu] = useState([
        {id: 'All', text: 'All Our Products'},
        {id: 'Food', text: 'Food'},
        {id: 'Drinks', text: 'Drinks'},
        {id: 'Snaks', text: 'Snaks'}
    ])
    const [active, setActive] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [category, setCategory] = useState('All Our Products');


    function showDetails(product: Product) {
        shownProduct.current = product;
        setModalOpen(true);
    }
    
   
    function addToCartHandler(product: Product) {
        const cart: Cart | undefined = carts.find(c => c.email === clientData.email)
        if(cart){
            dispatch(addToCart(cart, product))
        }  
        
    }
    function getDeleteButton(id: number){
        if(clientData.isAdmin ===true){
            return <Button onClick={() => removeProductHandler(id)}>Delete</Button>
        }
        return <div></div>
    }
    function removeProductHandler(id: number) {
        dispatch(removeProduct(id))
    }
    function closeAlert() {
        setOpenAlert(false)
        console.log(alertOpen)
    }
    
    function handleChangeFilter(individualSpan: any) {
        if(individualSpan.id === 'All'){
            returntoAllProducts()
        }
        setActive(individualSpan.id);
        setCategory(individualSpan.text);
        filterFunction(individualSpan.text);
    }
    const filterFunction = (text: any)=>{
        if(products.length>1){
            const filter = products.filter((product)=>product.type===text);
            setFilteredProducts(filter);
        }
    }

    const returntoAllProducts=()=>{
        setActive('');
        setCategory('All Our Products');
        setFilteredProducts([]);
    }


    return  <Box  >
        
        <label style={pageTitle}>Menu</label>
        {clientData.email || alertOpen === false ? <div></div> : <><Alert onClose={() => closeAlert()} severity="info" >Hello, I'm Igor Strakhov and this is my project! If you want to check everything, you need to sign in!</Alert>
        <Alert onClose={() => closeAlert()} severity="info" >And if you don't want to use some authentication, login: user@gmail.com, password: user1234</Alert></> }
        
        <label className='text-center' style={titleCategory}>{category}</label>

        <Box style={filterBox}>
            
                    {filterMenu.map((individualSpan,index)=>(
                        <span key={index} id={individualSpan.id}
                        onClick={()=>handleChangeFilter(individualSpan)}
                        className={individualSpan.id===active ? active:'deactive'}><label>{individualSpan.text}</label></span>
                    ))}
                
            
                
            
        </Box>
           
            


        <div style={productBoxStyle}>
            
            {filteredProducts.length > 0 ? filteredProducts.map(prod => 

                    <Paper elevation={8} key={prod.id} style={productStyle}>
                        
                        <div style={productDivImg}>
                            <img src={prod.img} style={productImg}/>
                        </div>
                        <div style={productTitle}>{prod.title}</div>
                        <IconButton onClick={() => showDetails(prod)} style={{alignItems: 'flex-end'}}><MoreHorizIcon/></IconButton>
                        <div style={{color: '#5fa36a', marginTop: '5px', marginBottom: '5px'}}>{prod.cost}$</div>
                        {clientData.email ? <Button variant="contained" color="success" onClick={() => addToCartHandler(prod)}>ADD TO CART</Button> : <div></div>}
                        {getDeleteButton(prod.id)}
                        
                    </Paper> ) : products.length > 0 ? products.map(prod => 
                            <Paper elevation={8} key={prod.id} style={productStyle}>
                        
                                <div style={productDivImg}>
                                    <img src={prod.img} style={productImg}/>
                                </div>
                            <div style={productTitle}>{prod.title}</div>
                            <IconButton onClick={() => showDetails(prod)} style={{alignItems: 'flex-end'}}><MoreHorizIcon/></IconButton>
                            <div style={{color: '#5fa36a', marginTop: '5px', marginBottom: '5px'}}>{prod.cost}$</div>
                            {clientData.email ? <Button variant="contained" color="success" onClick={() => addToCartHandler(prod)}>ADD TO CART</Button> : <div></div>}
                            {getDeleteButton(prod.id)}
                        
                            </Paper> ) : <div style={{display: 'flex', flexDirection: 'row',}}><label style={titleCategory}>Please wait...</label><CircularProgress /></div>}


                    
        </div>
        
        
        <Modal
        open={modalOpen}
        onClose={()=>setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >



        <Box sx={style}>
          <List style={productStyleList}>
              <ListItem><div style={productTitle}>{shownProduct.current?.title}</div></ListItem>
                
                <ListItem style={productDivImg}><img style={productImg} src={shownProduct.current?.img}/></ListItem>
                <ListItem><div style={prodictDescription}>{shownProduct.current?.description}</div></ListItem>
                <ListItem><div style={prodictDescription}>Weight: {shownProduct.current?.weight} g</div></ListItem>
                <ListItem><div style={prodictDescription}>Calories: {shownProduct.current?.calories} kcal</div></ListItem>
                <ListItem><div style={{color: '#5fa36a', marginTop: '5px', marginBottom: '5px'}}>{shownProduct.current?.cost}$</div></ListItem>
               
          </List>
        </Box>
      </Modal>
                
        
    </Box>
}


export default Menu;