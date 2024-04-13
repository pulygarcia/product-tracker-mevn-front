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
    updateProduct(productId, data){
        return api.put(`/products/${productId}`, data)
    },
    deleteProduct(productId){
        return api.delete(`/products/${productId}`)
    }
}