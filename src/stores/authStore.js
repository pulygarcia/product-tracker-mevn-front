import {useRouter} from 'vue-router'
import {defineStore} from 'pinia';
import { useAlertStore } from './alertStore';
import authServices from '@/api/authServices';


export const useAuthStore = defineStore('auth', () => {
    const router = useRouter();
    const alertStore = useAlertStore();

    const validateEmail = (email) => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }

    const login = (formData) => {
        if(Object.values(formData).includes('')){
          alertStore.alert.active = true;
          alertStore.alert.title = 'Complete the fields';
          alertStore.alert.message = 'Please fill the fields with valid data';
          alertStore.alert.type = 'error';

          setTimeout(() => {
            alertStore.alert.active = false;
            alertStore.alert.title = '';
            alertStore.alert.message = '';
            alertStore.alert.type = '';
          }, 3000);
          return;
        }
  
        if(!validateEmail(formData.email)){
          alertStore.alert.active = true;
          alertStore.alert.title = 'Invalid Email';
          alertStore.alert.message = 'Please enter a valid Email';
          alertStore.alert.type = 'error';

          setTimeout(() => {
            alertStore.alert.active = false;
            alertStore.alert.title = '';
            alertStore.alert.message = '';
            alertStore.alert.type = '';
          }, 3000);
          return;
        }
  
        //set user
        localStorage.setItem('user', JSON.stringify(formData))
  
        router.push({name: 'control-panel'});
    }

    const register = async (formData) => {
      try {
        const {data} = await authServices.register(formData);

        alertStore.alert.active = true;
        alertStore.alert.title = 'Success';
        alertStore.alert.message = data.msg;
        alertStore.alert.type = 'success';

        setTimeout(() => {
          alertStore.alert.active = false;
          alertStore.alert.title = '';
          alertStore.alert.message = '';
          alertStore.alert.type = '';
        }, 3000);

      } catch (error) {
        console.log(error.response.data.msg); //Open axios error and get backend message
      }
    }    

    return{
        login,
        register
    }
})