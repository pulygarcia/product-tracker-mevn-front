<script setup>
    import { ref } from 'vue';
    import { formatCurrency } from '@/helpers';
    import {useProductsStore} from '../stores/productsStore'
    import apiServices from '@/api/apiServices';
    import Alert from './Alert.vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const productsStore = useProductsStore();

    const {isOpen, product} = defineProps({
        isOpen:{
            type: Boolean
        },
        product:{
            type: Object
        },
    })

    const alert = ref({
        title: '',
        message: '',
        type: '',
        active: false
    })

    const isDeleted = ref(false);

    const deleteProduct = async (id) => {
        if(confirm('The product will be deleted, are you sure?')){
            try {
                await apiServices.deleteProduct(id);
    
                alert.value.title = 'Success';
                alert.value.message = 'Product deleted successfully';
                alert.value.type = 'success';
                alert.value.active = true;
    
                isDeleted.value = true;

                //refresh list
                const {data} = await apiServices.getAllProducts();
                productsStore.products = data;
    
                setTimeout(() => {
                    alert.value.title = '';
                    alert.value.message = '';
                    alert.value.type = '';
                    alert.value.active = false;
                }, 3000);
            } catch (error) {
                console.log(error);
            }
        }
    }
</script>

<template>
    <Alert v-if="alert.active" :title="alert.title" :message="alert.message" :type="alert.type" class="my-5"/>

    <v-card 
        :title="product.name" 
        position="absolute"
        min-width="350"
        location="center"
        class="bg-grey-lighten-3"
        :class="isOpen == false || isDeleted == true ? 'd-none' : ''"
    >
        <v-card-text>
            <p class="mt-2">Brand: {{ product.brand }}</p>
            <p class="mt-2">Category: {{ product.category }}</p>
            <p class="mt-2">Price: {{ formatCurrency(product.price) }}</p>
            <p class="mt-2">Stock: {{ product.quantity }}</p>
            <p class="mt-2">ID: {{ product._id }}</p>
        </v-card-text>
    
        <v-card-actions>
            <v-spacer></v-spacer>
    
            <div class="d-flex justify-space-between w-100">
                <div>
                    <v-btn
                        text="Edit"
                        class="bg-blue-darken-2"
                    ></v-btn>
                    <v-btn
                        text="Delete"
                        class="bg-red-darken-2"
                        @click="deleteProduct(product._id)"
                    ></v-btn>
                </div>
                
                <v-btn
                text="Close"
                @click="isOpen = false"
                variant="outlined"
                ></v-btn>
            </div>

        </v-card-actions>
        </v-card>
</template>