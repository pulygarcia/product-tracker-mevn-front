import api from "@/lib/axios"

export default{
    getAllProducts(){
        return api.get('/products')
    }
}