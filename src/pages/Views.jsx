import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsThunk } from '../redux/slices/productSlice';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { addToWishList } from '../redux/slices/wishlistSlice';
import { ToastContainer, toast } from 'react-toastify';

function Views() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { product } = useSelector((state) => state.productReducer)
  const { wishlist } = useSelector((state) => state.wishlistReducer)


  useEffect(() => {
    dispatch(fetchProductsThunk())
  }, [])

  const data=product.find((item) =>item.id == id)
  
  console.log(data);
  const handleAddWishList=(product)=>{
    const existing = wishlist.find(item=>item.id==product.id)
    if (existing) {
      toast("Already added")

    } else {
      
      dispatch(addToWishList(product))
      toast("Added to wishlist")
    }
  }

  return (
    <div>
      {
        data?
        <section className="py-5">
          <div className="container px-4 px-lg-5 my-5">
            <div className="row gx-4 gx-lg-5 align-items-center">
              <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={data.thumbnail} alt="..." /></div>
              <div className="col-md-6">
                <h3 className="display-5 fw-bolder">{data.title}</h3>
                <div className="fs-5 mb-2">
                  <span>${data.price}</span>
                </div>
                <div className="large mb-1">Brand - {data.brand}</div>
                <div className="large mb-1">Category - {data.category}</div>
                <div className='mb-1'>Description-{data.description}</div>
                  <div className='mb-1'>Rating - {data.rating}<i className='fa-solid fa-star' style={{color:"orange"}}></i></div>
                <div className="d-flex">
                  <button className="btn btn-light flex-shrink-0" type="button" onClick={()=>{handleAddWishList(data)}}>
                    <i className="fa-solid fa-heart-circle-plus"></i>
                    Add to wishlist
                  </button>&nbsp;
                  <button className="btn btn-warning flex-shrink-0" type="button">
                    <i className="fa-solid fa-cart-plus"></i>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        :
        <div className='p-5 d-flex justify-content-center'>
          <Spinner animation="border" role="status" size='xl' />
        </div>
      }
      <ToastContainer />
    </div>
  )
}

export default Views