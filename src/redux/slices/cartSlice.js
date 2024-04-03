import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cartSlice",
    initialState:{
        cart:[]
    },
    reducers:{
        addToCart:(state,action)=>{
            const existingItem=state.cart.find(item=>item.id==action.payload.id)
            if (existingItem) {
                existingItem.quantity++
            } else {
                state.cart.push({...action.payload,quantity:1})
            }
        },
        removeFromCart:(state,action)=>{
            state.cart = state.cart.filter(item=>item.id!=action.payload)
        },
        emptyCart:(state)=>{
            state.cart = []
        },
        addQuantity:(state,action)=>{
            const product = state.cart.find(item=>item.id==action.payload.id)
            product.quantity++
        },
        removeQuantity:(state,action)=>{
            const product = state.cart.find(item=>item.id==action.payload.id)
            product.quantity--
            if (product.quantity<=0) {
                state.cart = state.cart.filter(item=>item.id!=action.payload.id)
            }
        }
    }
})

export const {addToCart,removeFromCart,emptyCart,addQuantity,removeQuantity} = cartSlice.actions
export default cartSlice.reducer