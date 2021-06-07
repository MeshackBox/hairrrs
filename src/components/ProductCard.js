import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { SaveListContext } from '../contexts/GlobalStore';
import { db } from '../firebase';
import { hasSaved, save, Unsave } from '../fuctions';

function ProductCard({ catg }) {
    const [products, setProducts] = useState([])
    const [saveList] = useContext(SaveListContext)

    useEffect(() => {
        db.collection('products').where('category', '==', catg).orderBy('createdAt', 'desc').get().then(doc => {
            let r = doc.docs.map(doc => ({ product: doc.data(), id: doc.id }))
            setProducts(r)
        })
    }, [catg]);
    return (<>
        {products?.map(({ product, id }) => (
            <Link key={id} to={`product?title=${id}`} className="products" >
                <div className="shopper">
                    <div className="imgbox">
                        <img src={product.featuredImage} alt="images" className="images" />
                        <div className="details">
                            <h2>{product.title}</h2>
                            <span>{product.price}</span>
                            <div className="seller">{product.sellerName}</div>
                            <div className="likes--save">
                                <div className="promo-validity">
                                    <div className="goldpromotion">{product.promotion}</div>
                                </div>
                                <div style={{}}>{hasSaved(saveList, id) ?
                                    <img
                                        onClick={(e) => { e.preventDefault(); Unsave(id) }} 
                                        src="/images/circle-arrow-down-color.svg"
                                        alt=""
                                        className="group84" 
                                    />
                                    : <img
                                        onClick={(e) => { e.preventDefault(); save(id, product.featuredImage, product.title, `/product?title=${product.title}`, 'product') }}
                                        src="/images/saturday save icon.svg"
                                        alt=""
                                        className="group84" 
                                    />
                                }</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        ))}
    </>)
}

export default ProductCard