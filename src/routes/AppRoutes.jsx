import { Navigate, Route, Routes } from "react-router";
import { ShoppingCart,AddItemsShoppingCart } from "../ShoppingCart/pages";

export const AppRoutes = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<AddItemsShoppingCart/>}/>
            <Route path='/shoppingCart' element={<ShoppingCart/>}/>
            <Route path='/*' element={<Navigate to='/'/>}/>
        </Routes>
    </>
  )
}

export default AppRoutes
