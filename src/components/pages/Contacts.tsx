import { Box } from '@mui/material';
import CSS from 'csstype';
import { Link } from 'react-router-dom';


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
  const boxStyle: CSS.Properties = {
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Montserrat', 
    fontSize: '35px',
    fontWeight: 400,
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '50px',
    lineHeight: '80px'

  }
const Contacts: React.FC = () => {



    return <div>
        <label style={pageTitle}>Contacts</label>
        <Box style={boxStyle}>
            <label>Project by: Igor Strakhov</label>
            <a  href='https://www.linkedin.com/in/igor-strakhov-690822185/'>LinkedIn</a>
        <a href='https://drive.google.com/file/d/1d8THTFcSVNHlR_-YArD7bgQowCfH6NoD/view?usp=sharing'>Resume</a>
        <label>Phone number: 0537159679</label>
        <label>Email: igor.strakhov13@gmail.com</label>
        </Box>
        
    </div>
}

export default Contacts;