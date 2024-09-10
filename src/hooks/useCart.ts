import { useState, useEffect, useMemo } from 'react'
import { db } from '../data/db' 
import type {Guitar, CartItem } from '../types'



export const useCart = () => {

        const initialCart = () : CartItem[] => {
            const localStorageCart = localStorage.getItem('cart')
            return localStorageCart ? JSON.parse(localStorageCart) : []
        }
        //asi definimos el state 
        //estado de la data -> inicia con la bd local
        const [data]  =useState(db)
    
        //estado del carrito de compras -> inicia con un arreglo vacio
        const [cart, setCart] = useState(initialCart)
    
        const MAX_ITEMS = 5
        const MIN_ITEMS = 1
  
  
        useEffect(() =>{
            localStorage.setItem('cart', JSON.stringify(cart))
        },[cart])
    
  
        function addToCart(item : Guitar){
            const itemExists = cart.findIndex( (guitar) => guitar.id === item.id)
            if(itemExists >= 0){ //existe en el carrito
            if(cart[itemExists].quantity >= MAX_ITEMS) return
            const updateCart = [...cart]  //sacamos una copia del carrito
            updateCart[itemExists].quantity++  //sacamos la cantidad del carrito
            setCart(updateCart)  //actualizamos el carrito
            }
            else{
            //item.quantity = 1
            const newItem : CartItem = {...item, quantity : 1}
            setCart([...cart, newItem])
            }
        
        }
  
  
        function removefromCart(id : Guitar['id']){
            //console.log('Eliminando...', id)
            setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
        }
  
        function increseQuantity(id:  Guitar['id']){
            const updatedCart = cart.map(item => {
            if(item.id === id && item.quantity < MAX_ITEMS){
                return {
                ...item,
                quantity: item.quantity + 1
                }
            }
            return item
            })
            setCart(updatedCart)
        }
    
      
        function decreaseQuantity(id :  Guitar['id']){
            const downgradeCart = cart.map(item => {
            if(item.id === id && item.quantity > MIN_ITEMS){
                return {
                ...item,
                quantity: item.quantity - 1
                }
            }
            return item
            })
            setCart(downgradeCart)
        }
  
        function clearcart(){
            setCart([])
        }
  
            //state derivado porque depende del cart
        //este estate solo se ejecuta cuando el carrito ha sido modificado
        const isEmpty =  useMemo (() => cart.length === 0, [cart])

        //este state solo se ejcuta cada que el carrito cambia, para eso es el useMemo
        const carTotal = useMemo( () => cart.reduce((total, item ) => total + (item.quantity * item.price), 0) , [cart])


    return {
      data,
      cart,
      addToCart,
      removefromCart,
      decreaseQuantity,
      increseQuantity,
      clearcart,
      isEmpty,
      carTotal
    }
}

