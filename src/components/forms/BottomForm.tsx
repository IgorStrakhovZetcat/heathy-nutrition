import { Box } from "@mui/material";
import CSS from 'csstype';

const styleHeader = {
    width: '100%',
    height: '85px',
    bgcolor: '#6ECA1C',
    marginTop: '40px',
    alignItems: 'flex-end',
    bottom: 0,
    padding: 0,
    //position: 'absolute',

};
const styleLogo: CSS.Properties = {
    fontFamily: 'Montserrat', 
    fontSize: '30px',
    fontWeight: 450,
    color: 'white',
    float: 'left',
    marginTop: '16px',
    marginLeft: '10px'
};

const BottomForm: React.FC = () => {


    return <Box sx={styleHeader}>
    <label style={styleLogo}>Healthy Nutrition</label>
    
    {/* <FaShoppingCart style={{float: 'right', cursor: 'pointer', color: 'white'}} className="icon-cart"/> */}
    </Box>
}
export default BottomForm;