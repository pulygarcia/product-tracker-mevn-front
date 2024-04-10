import {ref, onMounted, watch} from 'vue';
import { useRouter } from 'vue-router';
import {defineStore} from 'pinia';
import apiServices from '../api/apiServices';

export const useProductsStore = defineStore('products', () => {

    const router = useRouter();
    const products = ref([]);
    const categories = ref(['Hardware', 'Peripherals', 'Others', 'All']);
    const selectedCategory = ref('All');
    const allProducts = ref([]);
    const alert = ref({
        title: '',
        message: '',
        type: '',
        active: false
    })

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
            alert.value.title = 'Empty fields';
            alert.value.message = 'Please complete the fields correctly'
            alert.value.type = 'error'
            alert.value.active = true;
            setTimeout(() => {
                alert.value.title = '';
                alert.value.message = '';
                alert.value.type = '';
                alert.value.active = false;
            }, 3000);

          return;
        }

        //check if price and quantity are >= 1 as minimun
        if(product.price <= 0 || product.quantity <= 0){
            alert.value.title = 'Check values';
            alert.value.message = 'Please complete the fields with valid data'
            alert.value.type = 'error'
            alert.value.active = true;
            setTimeout(() => {
            alert.value.title = '';
            alert.value.message = '';
            alert.value.type = '';
            alert.value.active = false;
            }, 3000);
    
            return;
        }
    
        try {
            await apiServices.addNewProduct(product);
            alert.value.title = 'Success';
            alert.value.message = 'Product added successfully';
            alert.value.type = 'success';
            alert.value.active = true;

            //update list
            const {data} = await apiServices.getAllProducts()
            products.value = data;

            setTimeout(() => {
                alert.value.title = '';
                alert.value.message = '';
                alert.value.type = '';
                alert.value.active = false;
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

                alert.value.title = 'Success';
                alert.value.message = 'The product has been deleted';
                alert.value.type = 'success';
                alert.value.active = true;

                setTimeout(() => {
                    alert.value.title = '';
                    alert.value.message = '';
                    alert.value.type = '';
                    alert.value.active = false;
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
        alert,
        selectedCategory,
        addNewProduct,
        deleteProduct,
    }
})