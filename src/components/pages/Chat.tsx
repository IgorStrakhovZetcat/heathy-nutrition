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
    marginBottom: '10px'
  }
const Chat: React.FC = () => {


    return <div>
        <label style={pageTitle}>Chat</label>

    </div>
}

export default Chat;