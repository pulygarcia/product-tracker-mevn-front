import {ref, onMounted} from 'vue';
import {defineStore} from 'pinia';
import apiServices from '../api/apiServices';

export const useProductsStore = defineStore('products', () => {

    const products = ref([]);
    const categories = ref(['Hardware', 'Peripherals', 'Others']);

    onMounted( async() => {
        try {
            const {data} = await apiServices.getAllProducts();
            products.value = data;
        } catch (error) {
            console.log(error);
        }
    })

    return{
        products,
        categories
    }
})