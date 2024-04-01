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
                const newState = state.cart.filter(item=>item.id!=action.payload.id)
                existingItem.quantity++
                state = {...newState,existingItem}
            } else {
                state.cart.push({...action.payload,quantity:1})
            }
        },
        removeFromCart:(state,action)=>{
            state.cart = state.cart.filter(item=>item.id!=action.payload)
        },
        emptyCart:(state,action)=>{
            state.cart = []
        }
    }
})

export const {addToCart,removeFromCart,emptyCart} = cartSlice.actions
export default cartSlice.reducer