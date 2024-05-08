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

    <v-dialog
        v-model="dialogStore.isOpenDialog"
        width="400"
        :class="isOpen == false ? 'd-none' : ''"
    >
      <v-card
        max-width="600"
        class="pa-4"
      >

      <v-card-title>
        {{product.name}}
      </v-card-title>

      <v-card-subtitle>
        <span class="me-1">{{ product.brand }}</span>

        <v-icon
          color="error"
          icon="mdi-check-decagram"
          size="small"
        ></v-icon>
      </v-card-subtitle>

      <div class="mt-3 text-subtitle-1 ps-4">
        {{product.category}}
      </div>
      
      <p class="mt-3 text-subtitle-1 ps-4">Stock: <span :class="product.quantity > 1 ? 'text-green-darken-1' : 'text-red-darken-1'" class="font-weight-bold">{{ product.quantity }}</span></p>
      
      <p class="mt-3 text-subtitle-1 ps-4">ID: {{ product._id }}</p>
      
      <v-divider class="mx-4 mt-2"></v-divider>

      <p class="mt-3 text-blue-darken-2 font-weight-black text-subtitle-1 ps-4">USD{{ formatCurrency(product.price) }}</p>

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
    </v-dialog>
</template>

<style>
@media (min-width: 768px){
    .w-md-30{
        width: 30rem;
    }
}
</style>