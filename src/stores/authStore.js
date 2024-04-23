import {ref} from 'vue';
import {useRouter} from 'vue-router'
import {defineStore} from 'pinia';
import { useProductsStore } from './productsStore';


export const useAuthStore = defineStore('auth', () => {
    const router = useRouter();
    const productsStore = useProductsStore();

    const validateEmail = (email) => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }

    const login = (formData) => {
        if(Object.values(formData).includes('')){
          console.log('complete the fields');
          return;
        }
  
        if(!validateEmail(formData.email)){
          productsStore.alert.active = true;
          productsStore.alert.title = 'Invalid Email';
          productsStore.alert.message = 'Please enter a valid Email';
          productsStore.alert.type = 'error';

          setTimeout(() => {
            productsStore.alert.active = false;
            productsStore.alert.title = '';
            productsStore.alert.message = '';
            productsStore.alert.type = '';
          }, 3000);
          return;
        }
  
        //set user
        localStorage.setItem('user', JSON.stringify(formData))
  
        router.push({name: 'control-panel'});
      }

    return{
        login,
    }
})