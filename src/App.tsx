import React, { useEffect } from 'react';
import { Alert, Box, LinearProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { cartsService, ordersService, productsService } from './config/service-config';
import { Subscription } from 'rxjs';
import { OperationCode } from './models/OperationCode';
import { addCart, authAction, setCarts, setOperationCode, setOrders, setProducts } from './redux/actions';
import { Product } from './models/Product';
import { StateType } from './redux/store';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RouteType } from './models/RouteType';
import { LOGIN_PATH, LOGOUT_PATH, MENU_PATH, ROUTES } from './config/routes-config';
import Navigator from './components/navigators/Navigator';
import { ClientData, emptyClientData } from './models/ClientData';
import { Cart, createCart } from './models/Cart';
import HeaderForm from './components/forms/HeaderForm';
import BottomForm from './components/forms/BottomForm';
import { Order } from './models/Order';


const SERVER_UNAVAILABLE_MESSAGE = `server is unavailable;
  waiting for retry  `
const UNKNOWN_ERROR_MESSAGE = `unknown error; contact the application staff admin@hn.com`

const emptyCart: Cart = createCart("", new Array);

const App: React.FC = () => {
  const clientData: ClientData = useSelector<StateType, ClientData>(state => state.clientData);
  const operationCode: OperationCode = useSelector<StateType, OperationCode>(state => state.operationCode);
  const dispatch = useDispatch<any>();
  const [flAlert, setAlert] = React.useState(false);
  const [flUnknown, setFlUnknown] = React.useState(false);
  const alertMessage = React.useRef('');
  const carts: Cart[] = useSelector<StateType, Cart[]>(state => state.carts);
  
    

  if(clientData.email){
    const cart: Cart | undefined = carts.find(c => c.email === clientData.email)
        if(cart === undefined){
            dispatch(addCart(emptyCart, clientData.email))
        }
  }
  

  useEffect(() => {
    const subscription = getDataProduct(dispatch);
     return () => subscription.unsubscribe(); 
  }, [clientData])
  useEffect(() => {
      const subscription = getDataCart(dispatch);
       return () => subscription.unsubscribe(); 
  }, [clientData])
  useEffect(() => {
    const subscription = getDataOrder(dispatch);
     return () => subscription.unsubscribe(); 
  }, [clientData])
  
    const flSignIn = React.useRef<boolean>(false);
  const [flNavigate, setFlNavigate] = React.useState<boolean>(true);
  const relevantItems: RouteType[] = React.useMemo<RouteType[]>(() => getRelevantItems(clientData), [clientData])
  React.useEffect(() => setFlNavigate(false), [])
    
  
  function operationCodeHandler() {
    
    if (operationCode === OperationCode.AUTH_ERROR) {
     if (flSignIn.current) {
       dispatch(setOperationCode(OperationCode.UNKNOWN));
       return;
     }
     flSignIn.current = true;
     setTimeout(()=>flSignIn.current=false, 20000)
      dispatch(authAction(emptyClientData));
    } else if (operationCode === OperationCode.SERVER_UNAVAILABLE) {
      setAlert(true);
      setFlUnknown(false);
      alertMessage.current = SERVER_UNAVAILABLE_MESSAGE;
    } else if (operationCode === OperationCode.UNKNOWN) {
      setAlert(true);
      setFlUnknown(true);
      alertMessage.current = UNKNOWN_ERROR_MESSAGE;
    } else {
      setAlert(false);
    
      
    }
  }

  const operationCodeCallback = React.useCallback(operationCodeHandler, [operationCode]);
  React.useEffect(() => {
    operationCodeCallback();
  }, [operationCodeCallback])

  return <div>
    <HeaderForm />
  <Box>
  {flAlert ? <Box>
    <Alert severity='error'>
      {alertMessage.current}
    </Alert>
    {!flUnknown && <LinearProgress />}
  </Box> : <BrowserRouter>
    <Navigator items={relevantItems} />

    {/* <Navigate to={MENU_PATH}></Navigate> */}
    {flNavigate && (clientData.email ? <Navigate to={MENU_PATH}></Navigate> :
      <Navigate to={MENU_PATH}></Navigate>)}
    <Routes>
      {getRoutes(relevantItems, clientData)}
    </Routes>
  </BrowserRouter>}
</Box>
<BottomForm/>
</div>
  
      
    
}

export default App;

function getDataProduct(dispatch: any): Subscription {
  return productsService.getObservableDataProduct().subscribe({
    next: products_err => {
      if (Array.isArray(products_err)) {
          dispatch(setProducts(products_err as Product[]));
          dispatch(setOperationCode(OperationCode.OK));
      } else {
         dispatch(setOperationCode(products_err as OperationCode))
      }
    }
  })
}
function getDataCart(dispatch: any): Subscription {
  return cartsService.getObservableDataCart().subscribe({
    next: carts_err => {
      if (Array.isArray(carts_err)) {
          dispatch(setCarts(carts_err as Cart[]));
          dispatch(setOperationCode(OperationCode.OK));
      } else {
         dispatch(setOperationCode(carts_err as OperationCode))
      }
    }
  })
}
function getDataOrder(dispatch: any): Subscription {
  return ordersService.getObservableDataOrder().subscribe({
    next: orders_err => {
      if (Array.isArray(orders_err)) {
          dispatch(setOrders(orders_err as Order[]));
          dispatch(setOperationCode(OperationCode.OK));
      } else {
         dispatch(setOperationCode(orders_err as OperationCode))
      }
    }
  })
}

function getRoutes(relevantItems: RouteType[], clientData: ClientData): React.ReactNode {
  const logoutRoute = relevantItems.find(ri => ri.path === LOGOUT_PATH);
  if (logoutRoute) {
    logoutRoute.label = clientData.displayName;
  }
  return relevantItems.map(r => <Route key={r.path} path={r.path} element={r.element} />)
}

function getRelevantItems(clientData: ClientData): RouteType[] {
  return ROUTES.filter(r => (!!clientData.email && r.authenticated) ||
    (!clientData.email && !r.authenticated && !r.administrator)
     || (clientData.isAdmin && r.administrator))
}

 