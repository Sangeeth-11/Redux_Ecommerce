import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsThunk = createAsyncThunk('product/fetchProductsThunk',()=>{
    return axios.get('https://dummyjson.com/products').then(res=>res.data.products)
})

const productSlice = createSlice({
    name:'product',
    initialState:{
        product:[],
        loading:false,
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProductsThunk.pending,(state,action)=>{
            state.loading=true
        }),
        builder.addCase(fetchProductsThunk.fulfilled,(state,action)=>{
            state.loading=false
            state.product=action.payload
        }),
        builder.addCase(fetchProductsThunk.rejected,(state,action)=>{
            state.loading=false
            state.product=[]
            state.error="cannot fetch products"

        })
    }
})

export default productSlice.reducer