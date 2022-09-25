import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";
import { createProduct, Product } from "../../models/Product";
import productData from '../../config/productData.json';
import { IMAGES } from "../../config/constants";
import CSS from 'csstype';


const pageTitle: CSS.Properties = {
    fontFamily: 'Montserrat', 
    fontSize: '35px',
    fontWeight: 600,
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    //marginTop: '10px',
    backgroundColor: '#6ECA1C',
    marginBottom: '40px'
  }

type Props = {
    submitFn: (product: Product) => void;
    productUpdate?: Product;
}
const initialProduct: Product = createProduct(0, '', '', '', 0, 0, 0, '');
const ProductForm: React.FC<Props> = ({submitFn, productUpdate}) => {
    const [product, setProduct] = React.useState(productUpdate || initialProduct);
    const {minCost, maxCost, minCalories, minWeight, typeProduct} = productData;

    function onSubmit(event: any) {
        event.preventDefault();
        submitFn(product);
        document.querySelector('form')!.reset();
    }
    function handlerTitle(event: any) {
        const productCopy = { ...product };
        productCopy.title = event.target.value;
        setProduct(productCopy);
    }
    function handlerImages(event: any) {
        const productCopy = { ...product };
        productCopy.img = event.target.value;
        setProduct(productCopy);
    }
    function handlerDescription(event: any) {
        const productCopy = { ...product };
        productCopy.description = event.target.value;
        setProduct(productCopy);
    }
    function handlerCost(event: any) {
        const productCopy = { ...product };
        productCopy.cost = +event.target.value;
        setProduct(productCopy);
    }
    function handlerWeight(event: any) {
        const productCopy = { ...product };
        productCopy.weight = +event.target.value;
        setProduct(productCopy);
    }
    function handlerCalories(event: any) {
        const productCopy = { ...product };
        productCopy.calories = +event.target.value;
        setProduct(productCopy);
    }
    function typeProductHandler(event: any) {
        const productCopy = { ...product };
        productCopy.type = event.target.value;
        setProduct(productCopy)
    }



    function onReset() {
        setProduct(productUpdate || initialProduct)  
    }

    return  <Box>
        <label style={pageTitle}>{!!productUpdate ? `Update product with id ${productUpdate.id}` : 'Create a new Product'}</label>
    
    <form onSubmit={onSubmit} onReset={onReset}>

    <Grid  container spacing={{ xs: 5, sm: 1.5, md: 13 }} justifyContent="center">
        <Grid item xs={10} sm={2.7} >
            <TextField type="string" label="Title" fullWidth required
                onChange={handlerTitle} helperText={`Enter name product`}
                value={product.title || ''}>
                <InputLabel id="product-select-label">Product Name</InputLabel>
                
            </TextField>
        </Grid>

        <Grid item xs={10} sm={2.7}>
            <FormControl fullWidth required>
                <InputLabel>Type product</InputLabel>
                <Select onChange={typeProductHandler} value={product.type} label='Type product'>
                    {typeProduct.map(tP => <MenuItem value={tP} key={tP}>{tP}</MenuItem>)}
                    </Select>
            </FormControl>
        </Grid>

        <Grid item xs={10} sm={2.7}>
            <TextField  type="string" label="Description" fullWidth required
                onChange={handlerDescription} helperText={`Enter description product`}
                value={product.description || ''}
                 />
        </Grid>

        <Grid item xs={10} sm={2.7}>
            <TextField type="number" label="Cost" fullWidth required
                value={product.cost || ""}
                onChange={handlerCost} helperText={`Enter cost in range [${minCost}-${maxCost} ]`}
                inputProps={{

                    min: `${minCost}`,
                    max: `${maxCost}`
                }} />
        </Grid>

        <Grid item xs={10} sm={2.7} >
            <FormControl fullWidth required>
                <InputLabel id="product-select-label" >Image</InputLabel>
                <Select
                    labelId="product-select-label"
                    id="demo-simple-select"
                    label="Image"
                    value={product.img}
                    
                    onChange={handlerImages}
                >
                    {getProductImages()}
                </Select>
            </FormControl>
        </Grid>
        
        

        <Grid item xs={10} sm={2.7}>
            <TextField type="number" label="Calories" fullWidth required
                onChange={handlerCalories} helperText={`Enter calories product`}
                value={product.calories || ''}
                inputProps={{

                    min: `${minCalories}`
                }}
                 />
        </Grid>

        <Grid item xs={10} sm={2.7}>
            <TextField type="number" label="Weight" fullWidth required
                onChange={handlerWeight} helperText={`Enter weight product`}
                value={product.weight || ''}
                inputProps={{

                    min: `${minWeight}`
                }}
                 />
        </Grid>

        
        
        <Grid item xs={10} sm={8} md={6} >
            <Grid container >
                <Grid item xs={5}>
                    <Button variant="contained" color="success" type="submit">Submit</Button>
                </Grid>
                <Grid item xs={5}>
                    <Button variant="contained" type="reset">Reset</Button>
                </Grid>

            </Grid>

        </Grid>

    </Grid>
</form>
    </Box>
    
}

function getProductImages(): React.ReactNode {
    return IMAGES.map(i => <MenuItem value={i} key={i}><img style={{width:"10vw"}} src={i}/></MenuItem>)
}

export default ProductForm;