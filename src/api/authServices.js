import api from "@/lib/axios"

export default{
    register(user){
        return api.post('/auth/register', user)
    },
    verifyUser(token){
        return api.get(`/auth/verify/${token}`)
    },
    login(formData){
        return api.post('/auth/login', formData)
    },
    auth(){
        const token = localStorage.getItem('jwt');

        return api.get('/auth/user', {
            headers: {
                Authorization: `Bearer ${token}`  //Check why 'Bearer' go there (in auth middleware in the backend).
            }
        });
    }
}