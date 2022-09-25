import { useDispatch } from "react-redux";
import { Product } from "../../models/Product";
import { addProduct } from "../../redux/actions";
import ProductForm from "../forms/ProductForm";


 
const AddProduct: React.FC = () => {
    const dispatch = useDispatch<any>();
    function onSubmit(product: Product) {
        dispatch(addProduct(product))
    }
    return <ProductForm submitFn={onSubmit}/>
}
export default AddProduct;