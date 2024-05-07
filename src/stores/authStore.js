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
        //Show backend message
        alertStore.alert.active = true;
        alertStore.alert.title = 'Error';
        alertStore.alert.message = error.response.data.msg;
        alertStore.alert.type = 'error';

        setTimeout(() => {
          alertStore.alert.active = false;
          alertStore.alert.title = '';
          alertStore.alert.message = '';
          alertStore.alert.type = '';
        }, 3000);
      }
    }
    
    const verifyAccount = async (token) => {
      try {
        const {data} = await authServices.verifyUser(token);

        setTimeout(() => {
          router.push({name: 'login'})
        }, 3000);

      } catch (error) {
        alertStore.alert.active = true;
        alertStore.alert.title = 'Error';
        alertStore.alert.message = 'Verify your account was not possible: ' + error.response.data.msg;
        alertStore.alert.type = 'error';
      }
    }

    return{
        login,
        register,
        verifyAccount
    }
})