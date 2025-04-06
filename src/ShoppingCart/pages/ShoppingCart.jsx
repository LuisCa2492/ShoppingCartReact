import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addToCartLS } from '../../store/ShoppingCartSlice';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid2 from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import { addBuy } from '../../store/thunks';

export const ShoppingCart = () => {

  const {cart} = useSelector((state) => state.shopCart);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false); // Evitar recarga innecesaria


  useEffect(() => {
    if (!loaded) {
      try {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

        // 🔹 Fusionar `cart` con `savedCart` y eliminar duplicados
        const mergedCart = [...cart, ...savedCart].reduce((acc, item) => {
          if (!acc.some((cartItem) => cartItem.name === item.name)) {
            acc.push(item);
          }
          return acc;
        }, []);

        // 🔹 Solo actualizar Redux si hay cambios
        if (mergedCart.length !== cart.length) {
          dispatch(addToCartLS(mergedCart)); // ⬅️ Llamar `addToCart` solo una vez con el array completo
        }

        setLoaded(true); // 🔹 Evita múltiples ejecuciones
      } catch (error) {
        console.error("Error al cargar localStorage:", error);
      }
    }
  }, [loaded]); // Se ejecuta solo al montar el componente

  const validarElementosEnElCart = () => {
      return cart.length > 0 ? true : false;
  }

  const borrarLocalStorage = () => {
      localStorage.removeItem("cart");
  }

  const RealizarCompra = () => {
      console.log("compra realizada");
      console.log(validarElementosEnElCart());
      
      const newArray = cart.map(({ amount, name }) => ({
      cantidad: amount,
      nombre: name
      }));
      //console.log(newArray);
      const result = dispatch(addBuy(newArray));
      eliminarPedidoDelStorage(result);
        
      
  }

  const eliminarPedidoDelStorage = (result) => {
    if(result){
      localStorage.removeItem("cart")
      console.log('pedido borrado del localstorage');
    }else{
      console.log('error al insertar el pedido');
    }
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <img src={row.image} alt={row.name} style={{ width: 50, height: 50, borderRadius: "50%" }} />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid2 container sx={{m:2,justifyContent:"center"}}>
            <Button 
              disabled={cart.length == 0 ? true : false}
              variant="contained" 
              color="error"
              onClick={RealizarCompra}
            >
                Comprar
            </Button>
      </Grid2>
    </>
  );
};
