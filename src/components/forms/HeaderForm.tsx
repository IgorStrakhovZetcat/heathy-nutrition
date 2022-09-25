import { Box } from "@mui/material";
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { ClientData } from "../../models/ClientData";
import { StateType } from "../../redux/store";
import CSS from 'csstype';

const styleHeader = {
    width: '100%',
    height: '85px',
    bgcolor: '#6ECA1C',
  };
  const styleLogo: CSS.Properties = {
    float: 'left',
    marginLeft: '10px',
    marginTop: '18px',
    fontFamily: 'Montserrat', 
    fontSize: '30px',
    fontWeight: 450,
    color: 'white',
};
const styleDIsplayName: CSS.Properties = {
  float: 'right', 
  marginTop: '20px',
  marginRight: '10px',
  fontFamily: 'Montserrat', 
  fontSize: '20px',
  fontWeight: 300,
  color: 'white',
}

const HeaderForm: React.FC = () => {
    const clientData: ClientData = useSelector<StateType, ClientData>(state => state.clientData);
    
    return <Box sx={styleHeader}>
        <label style={styleLogo}>Healthy Nutrition</label>
        {clientData.email ? <label style={styleDIsplayName}>Welcome {clientData.displayName}</label> : <div></div>}
        {/* <FaShoppingCart style={{float: 'right', cursor: 'pointer', color: 'white'}} className="icon-cart"/> */}
        </Box>

}
export default HeaderForm;