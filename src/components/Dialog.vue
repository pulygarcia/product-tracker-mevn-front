<script setup>
    import { useRouter } from 'vue-router';
    import { formatCurrency } from '@/helpers';
    import {useProductsStore} from '../stores/productsStore'
    import { useDialogStore } from '@/stores/dialogStore';

    const productsStore = useProductsStore();
    const dialogStore = useDialogStore();
    const router = useRouter();

    const {isOpen, product} = defineProps({
        isOpen:{
            type: Boolean
        },
        product:{
            type: Object
        },
    })

    const deleteProduct = async (id) => {
        try {
            await productsStore.deleteProduct(id);

            dialogStore.isOpenDialog = false;

        } catch (error) {
            console.log(error);
        }
    }
</script>

<template>
    <v-card
        position="absolute"
        min-width="350"
        location="center"
        class="bg-grey-darken-4 pa-2 w-md-30"
        elevation="15"
        :class="isOpen == false ? 'd-none' : ''"
    >
        <v-card-text>
            <p class="my-2 text-uppercase font-weight-bold text-h5">{{ product.name }}</p>
            <p class="mt-3 text-blue-darken-2 font-weight-black text-h6">USD{{ formatCurrency(product.price) }}</p>
            <p class="mt-3 text-subtitle-1">Brand: {{ product.brand }}</p>
            <p class="mt-3 text-subtitle-1">Category: {{ product.category }}</p>

            <p class="mt-3 text-subtitle-1">Stock: <span :class="product.quantity > 1 ? 'text-green-darken-1' : 'text-red-darken-1'" class="font-weight-bold">{{ product.quantity }}</span></p>

            <p class="mt-3 text-subtitle-1">ID: {{ product._id }}</p>
        </v-card-text>
    
        <v-card-actions>
            <v-spacer></v-spacer>
    
            <div class="d-flex justify-space-between w-100 mt-3">
                <div>
                    <v-btn
                        text="Edit"
                        class="bg-blue-darken-2"
                        @click="router.push({name: 'update-product', params:{id: product._id}})"
                    ></v-btn>
                    <v-btn
                        text="Delete"
                        class="bg-red-darken-2"
                        @click="deleteProduct(product._id)"
                    ></v-btn>
                </div>
                
                <v-btn
                text="Close"
                @click="dialogStore.isOpenDialog = false"
                variant="outlined"
                ></v-btn>
            </div>

        </v-card-actions>
        </v-card>
</template>

<style>
@media (min-width: 768px){
    .w-md-30{
        width: 30rem;
    }
}
</style>