import {ref} from 'vue';
import {defineStore} from 'pinia';
import apiServices from '../api/apiServices';

export const useDialogStore = defineStore('dialog', () => {

    const isOpenDialog = ref(false);
    const dialogProduct = ref({});

    const openDialog = async (productId) => {
        try {
          const {data} = await apiServices.getProductById(productId);
    
          dialogProduct.value = data;
    
        } catch (error) {
          console.log(error);
        }
    
        isOpenDialog.value = true;
    }

    return{
        openDialog,
        isOpenDialog,
        dialogProduct
    }
})