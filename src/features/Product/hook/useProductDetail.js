import productApi from 'api/productApi';
import React from 'react';

export default function useProductDetail(productId) {
    const [product, setProduct] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const product = await productApi.get(productId);
                console.log(product);
                setProduct(product);
            } catch (error) {
                console.log('Fail to fetch product by id:', error);
            }
            setLoading(false);
        })();
    }, [productId]);

    return { product, loading };
}
