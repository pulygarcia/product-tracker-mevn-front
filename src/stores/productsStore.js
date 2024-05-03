import {ref, onMounted, watch} from 'vue';
import { useRouter } from 'vue-router';
import {defineStore} from 'pinia';
import apiServices from '../api/apiServices';
import { useAlertStore } from './alertStore';

export const useProductsStore = defineStore('products', () => {

    const router = useRouter();
    const alertStore = useAlertStore();

    const products = ref([]);
    const categories = ref(['Hardware', 'Peripherals', 'Others', 'All']);
    const selectedCategory = ref('All');
    const allProducts = ref([]);

    onMounted( async() => {
        try {
            const {data} = await apiServices.getAllProducts();
            products.value = data;
            allProducts.value = data;
        } catch (error) {
            console.log(error);
        }
    })

    //filter products
    watch(selectedCategory, () => {
        if(selectedCategory.value !== ''){
        products.value = allProducts.value.filter(product => product.category == selectedCategory.value);
        }else{
        products.value = allProducts.value;
        }

        if(selectedCategory.value == 'All'){
            products.value = allProducts.value;
        }
    })

    const addNewProduct = async (product) => {
        //validate fields
        if(Object.values(product).includes('')){
            alertStore.alert.title = 'Empty fields';
            alertStore.alert.message = 'Please complete the fields correctly'
            alertStore.alert.type = 'error'
            alertStore.alert.active = true;
            setTimeout(() => {
                alertStore.alert.title = '';
                alertStore.alert.message = '';
                alertStore.alert.type = '';
                alertStore.alert.active = false;
            }, 3000);

          return;
        }

        //check if price and quantity are >= 1 as minimun
        if(product.price <= 0 || product.quantity <= 0){
            alertStore.alert.title = 'Checks';
            alertStore.alert.message = 'Please complete the fields with valid data'
            alertStore.alert.type = 'error'
            alertStore.alert.active = true;
            setTimeout(() => {
            alertStore.alert.title = '';
            alertStore.alert.message = '';
            alertStore.alert.type = '';
            alertStore.alert.active = false;
            }, 3000);
    
            return;
        }
    
        try {
            await apiServices.addNewProduct(product);
            alertStore.alert.title = 'Success';
            alertStore.alert.message = 'Product added successfully';
            alertStore.alert.type = 'success';
            alertStore.alert.active = true;

            //update list
            const {data} = await apiServices.getAllProducts()
            products.value = data;

            setTimeout(() => {
                alertStore.alert.title = '';
                alertStore.alert.message = '';
                alertStore.alert.type = '';
                alertStore.alert.active = false;
                router.push({name: 'home'});
            }, 3000);
    
        } catch (error) {
          console.log(error);
        }
    }

    const deleteProduct = async (id) => {
        if(confirm('The product will be deleted, are you sure?')){
            try {
                await apiServices.deleteProduct(id);

                alertStore.alert.title = 'Success';
                alertStore.alert.message = 'The product has been deleted';
                alertStore.alert.type = 'success';
                alertStore.alert.active = true;

                setTimeout(() => {
                    alertStore.alert.title = '';
                    alertStore.alert.message = '';
                    alertStore.alert.type = '';
                    alertStore.alert.active = false;
                }, 3000);

                //refresh list
                const {data} = await apiServices.getAllProducts();
                allProducts.value = data;
                products.value = data;

            } catch (error) {
                console.log(error);
            }
        }
    }

    return{
        products,
        allProducts,
        categories,
        selectedCategory,
        addNewProduct,
        deleteProduct,
    }
})