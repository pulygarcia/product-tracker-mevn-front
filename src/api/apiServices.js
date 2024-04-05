import api from "@/lib/axios"

export default{
    getAllProducts(){
        return api.get('/products')
    },
    getProductById(id){
        return api.get(`/products/${id}`)
    },
    addNewProduct(product){
        return api.post('/products', product)
    },
    deleteProduct(productId){
        return api.delete(`/products/${productId}`)
    }
}