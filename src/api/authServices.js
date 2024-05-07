import api from "@/lib/axios"

export default{
    register(user){
        return api.post('/auth/register', user)
    },
    verifyUser(token){
        return api.get(`/auth/verify/${token}`)
    }
}