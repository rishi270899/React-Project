import React, { useEffect, useState } from 'react'
import "./Pagination.css"

const Pagination = () => {

  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)

  const fetechProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100")
    const data = await res.json()
    // console.log(data);
    console.log(data.products);
    console.log(products);


    if (data && data.products) {
      setProducts(data.products)

    }
    console.log("after condition", products);
    console.log(data.products);
    console.log(typeof products);
    console.log([...Array(products)]);
    // console.log("this page number",page);






  }

  useEffect(() => {
    fetechProducts()
  }, [])


  const selectedPageHandler = (selectedpage) => {

    if (selectedpage >= 1
      &&
      selectedpage <= products.length / 10
      &&
      selectedpage !== page

    ) setPage(selectedpage)

  }

  return (
    <div>
      {
        products.length > 0 && <div className='products'>

          {
            products.slice(page * 10 - 10, page * 10).map((prod) => {
              return <div key={prod.id} className='container'>
                <img src={prod.thumbnail} alt="" />
                <h1>{prod.title}</h1>

              </div>
            })
          }
        </div>
      }

      {
        products.length > 0 && <div className='pagination'>

          <span
            onClick={() => selectedPageHandler(page - 1)
            }
            className={page > 1 ? "" : "paginationHidden"}
          >⬅️</span>

          {
            [...Array(products.length / 10)].map((_, i) => {
              return <span
                className={page === i + 1 ? "paginationColor" : ""}
                onClick={() => selectedPageHandler(i + 1)} key={i}>{i + 1}</span>
            })
          }
          <span
            onClick={() => selectedPageHandler(page + 1)}
            className={page < products.length / 10 ? "" : "paginationHidden"}
          >▶️</span>
        </div>
      }

      <h1>This is Page number {page}</h1>
    </div>
  )
}

export default Pagination

