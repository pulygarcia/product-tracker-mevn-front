import api from "@/lib/axios"

export default{
    getAllProducts(){
        return api.get('/products')
    },
    addNewProduct(product){
        return api.post('/products', product)
    }
}