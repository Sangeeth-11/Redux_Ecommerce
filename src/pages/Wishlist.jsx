import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { removeFromWishList } from '../redux/slices/wishlistSlice'
import { ToastContainer, toast } from 'react-toastify'
import { addToCart } from '../redux/slices/cartSlice'



function Wishlist() {

  const dispatch = useDispatch()
  const { wishlist } = useSelector((state) => state.wishlistReducer)
  console.log(wishlist);

  const handleRemove = (id) => {
    dispatch(removeFromWishList(id))
    toast("removed from wishlist")
  }
  const handleAddCart=(product)=>{
    dispatch(addToCart(product))
    toast("Added to cart")
  }
  return (
    <div>
      <section className="py-3">
        <div className="container mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4">
            {
              wishlist.length > 0 ?
                wishlist.map(item => (
                  <div className="col mb-5" key={item.id}>
                    <div className="card h-100" >
                      <Link to={`/views/${item.id}`}>
                        <img className="card-img-top" src={item?.thumbnail} alt="..." style={{ height: "200px" }} />
                      </Link>
                      <div className="card-body p-3">
                        <div className="text-center">
                          <h5 className="fw-bolder">{item?.title}</h5>
                          ${item?.price}
                        </div>
                      </div>

                      <div className="d-flex flex-column text-center mx-4 mb-4" >
                        <button className="btn btn-light flex-shrink-0 mb-3" type="button" onClick={() => { handleRemove(item.id) }}>
                          <i className="fa-solid fa-heart-circle-xmark">
                          </i> Remove from wishlist
                        </button>
                        <button className="btn btn-warning flex-shrink-0" type="button" onClick={()=>{handleAddCart(item)}}>
                          <i className="fa-solid fa-cart-plus"></i>
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                )) :
                <div className='p-5 d-flex justify-content-center'>
                  <Spinner animation="border" role="status" size='xl' />No wishlist items
                </div>

            }
          </div>
        </div>
      </section>
      <ToastContainer/>
    </div>
  )
}

export default Wishlist