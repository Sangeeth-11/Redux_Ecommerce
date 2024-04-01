import React, { useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsThunk } from '../redux/slices/productSlice';
import Spinner from 'react-bootstrap/Spinner';
import { addToWishList } from '../redux/slices/wishlistSlice';
import { toast,ToastContainer } from 'react-toastify';
import { addToCart } from '../redux/slices/cartSlice';


function Home() {

  const dispatch = useDispatch()
  const { product, loading, error } = useSelector((state) => state.productReducer)
  const { wishlist } = useSelector((state) => state.wishlistReducer)
  console.log(product);

  useEffect(() => {
    dispatch(fetchProductsThunk())
  }, [])
  const handleAddWishList =(product)=>{
    const existingProduct = wishlist.find(item=>item.id==product.id)
    if (existingProduct) {
      toast("already added!!")
    } else {
      dispatch(addToWishList(product))
      toast("Added to Wishlist")
    }
  }

  const handleAddCart=(product)=>{
    dispatch(addToCart(product))
    toast("Added to cart")
  }
  return (
    <div>
      <header className="bg-light py-2">
        <Carousel>
          <Carousel.Item>
            <Image className='w-100' style={{ height: "500px" }} src='https://static.vecteezy.com/system/resources/previews/002/006/775/non_2x/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-backgroud-for-banner-market-ecommerce-free-vector.jpg' />
          </Carousel.Item>
          <Carousel.Item>
            <Image className='w-100' style={{ height: "500px" }} src='https://akm-img-a-in.tosshub.com/indiatoday/images/media_bank/202309/iphone-15-084541573-16x9_3.png?VersionId=7f2lrBsIJhGzRKO6ZdWIqNTf2Tjcfhz7' />
          </Carousel.Item>
          <Carousel.Item>
            <Image className='w-100' style={{ height: "500px" }} src='https://voiro.com/wp-content/uploads/2022/02/photographs_industryPages_Voiro-For-Ecommerce.png' />

          </Carousel.Item>
        </Carousel>
      </header>
      {
        loading ?
        <div className='p-5 d-flex justify-content-center'>
          <Spinner animation="border" role="status" size='xl' />
        </div>
          :
          <section className="py-3">
            <div className="container-fluid px-4 px-lg-5 mt-5">
              <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 ">
                {
                  product?.map(item=>(

                 
                <div className="col mb-5">
                  <div className="card h-100" >
                    <Link to={`/views/${item.id}`}>
                      <img className="card-img-top " src={item.thumbnail} alt="..." height={'200px'} />
                    </Link>
                    <div className="card-body p-1">
                      <div className="text-center">
                        <h5 className="fw-bolder">{item.title.slice(0,10)}...</h5>
                        ${item.price}
                      </div>
                    </div>

                    <div className="d-flex flex-column text-center mx-4 mb-4" >
                      <button className="btn btn-light flex-shrink-0 mb-3" type="button" onClick={()=>{handleAddWishList(item)}}>
                        <i className="fa-solid fa-heart-circle-plus"></i>
                        Add to wishlist
                      </button>
                      <button className="btn flex-shrink-0 btn-warning" type="button" onClick={()=>{handleAddCart(item)}}>
                        <i className="fa-solid fa-cart-plus"></i>
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
                 ))
                }
              </div>
            </div>
          </section>
      }
      <ToastContainer/>
    </div>
  )
}

export default Home