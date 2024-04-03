import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addQuantity, emptyCart, removeFromCart, removeQuantity } from '../redux/slices/cartSlice'
import { Link } from 'react-router-dom'

function Cart() {
  const dispatch = useDispatch()
  const { cart } = useSelector((state) => state.cartReducer)
  const [amount,SetAmount] = useState(0)
  const [products,SetProducts] = useState(0)
  useEffect(()=>{
     
    SetAmount(cart.reduce((prev,next)=>{return prev+(next.price*next.quantity)},0))
    SetProducts(cart.length)
  },[cart])
  const handleDelete=(id)=>{
    dispatch(removeFromCart(id))
  }
  return (
    <>

      <div className="pb-5 mt-5">
        <div className="container">
          <div className="row">
            {/* cart  */}
            <div className="col-lg-8 p-5 bg-white rounded shadow-sm mb-5">

              {
                cart.length>0?
              <div className="table-responsive me-2">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">ID</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="p-2 px-3 text-uppercase">Product</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">Price</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">quantity</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">Remove</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                
                cart.map(item=>( 
                    <tr>
                      <td className="border-0 align-middle"><strong>{item.id}</strong></td>
                      <th scope="row" className="border-0">
                        <div className="p-2">
                          <img src={item.thumbnail} alt="" width="85" className="img-fluid rounded shadow-sm" />
                          <div className="ml-3 d-inline-block align-middle ms-2">
                            <h5 className="mb-0"> {item.title}</h5>
                            <span className="text-muted font-weight-normal font-italic d-block">Category: {item.category}</span>
                          </div>
                        </div>
                      </th>
                      <td className="border-0 align-middle"><strong>${item.price}</strong></td>
                      <td className="border-0 align-middle">
                        <div className='d-flex'>

                      <button className='btn btn-light' onClick={()=>{dispatch(removeQuantity(item))}}>-</button>
                        <strong className='p-2'>{item.quantity}</strong>
                     
                      <button className='btn btn-light' onClick={()=>{dispatch(addQuantity(item))}}>+</button>
                        </div>
                      </td>
                      <td className="border-0 align-middle"><i className="fa fa-trash" onClick={()=>{handleDelete(item.id)}}></i></td>
                    </tr>
                    ))
                    }
                  </tbody>
                </table>
              </div>:
              <h2>cart empty</h2>
              }

            </div>

            {/* checkout page */}
            <div className="col-lg-4 border-start">
              <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
              <div className="p-4">
                <p className="font-italic mb-4">Shipping and additional costs are calculated based on values you have entered.</p>
                <ul className="list-unstyled mb-4">
                  
                    
                  
                  <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Order Subtotal </strong><strong>${amount}</strong></li>
                  <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Shipping and handling</strong><strong><strike>$10.00</strike></strong></li>
                  <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total Products</strong><strong>{products}</strong></li>
                  <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total</strong>
                    <h5 className="font-weight-bold"><strong>${amount}</strong></h5>
                  </li>
                </ul>
                <Link to={'/'}>
                <button className="btn btn-dark rounded-pill py-2 btn-block" onClick={()=>{dispatch(emptyCart())}}>Procceed to checkout</button>
                </Link>
              </div>
            </div>


          </div>
        </div>
      </div>
    </>

  )
}

export default Cart