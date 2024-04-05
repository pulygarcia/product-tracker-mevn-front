<script setup>
  import apiServices from '../api/apiServices.js';
  import {onMounted, ref, watch} from 'vue';
  import {useProductsStore} from '../stores/productsStore'
  import { formatCurrency } from '@/helpers';
  import Dialog from '../components/Dialog.vue'

  const productsStore = useProductsStore();
 
  const selectedCategory = ref('');
  const allProducts = ref([]);
  const isOpenDialog = ref(false);
  const dialogProduct = ref({});

  //filter products using watch
  watch(selectedCategory, () => {
    if(selectedCategory.value !== ''){
      productsStore.products = allProducts.value.filter(product => product.category == selectedCategory.value);
    }else{
      productsStore.products = allProducts.value;
    }
  })

  onMounted(async () => {
    try {
      const {data} = await apiServices.getAllProducts();
      allProducts.value = data;
    } catch (error) {
      console.log(error);
    }
  })

  const openDialog = async (productId) => {
    try {
      const {data} = await apiServices.getProductById(productId);

      dialogProduct.value = data;

    } catch (error) {
      console.log(error);
    }

    isOpenDialog.value = true;
  }
</script>

<template>
    <main class="pa-3 w-100">
      <h1 class="mt-3">Control Panel</h1>
      <p class="text-subtitle-1 text-blue-grey-darken-2">Here you will can filter and administrate data</p>
  
      <div class="mt-5 w-50">
          <v-select
            label="Filter by category"
            :items="productsStore.categories"
            v-model="selectedCategory"
          ></v-select>
      </div>

      <span class="d-block text-subtitle-2 text-blue-grey-darken-2 font-weight-bold">{{ productsStore.products.length }} registered products in total</span>

      <v-table class="mt-6">
    <thead>
      <tr>
        <th class="text-left text-indigo-darken-2 font-weight-bold text-subtitle-1">
          Name
        </th>
        <th class="text-left text-indigo-darken-2 font-weight-bold text-subtitle-1">
          Brand
        </th>
        <th class="text-left text-indigo-darken-2 font-weight-bold text-subtitle-1">
          Price
        </th>
        <th class="text-left text-indigo-darken-2 font-weight-bold text-subtitle-1">
          Category
        </th>
        <th class="text-left text-indigo-darken-2 font-weight-bold text-subtitle-1">
          Quantity
        </th>
        <th class="text-left text-indigo-darken-2 font-weight-bold text-subtitle-1">
          ID
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="product in productsStore.products"
        :key="product._id"
        class="cursor-pointer gray-hover"
        @click="openDialog(product._id)"
      >
        <td>{{ product.name }}</td>
        <td>{{ product.brand }}</td>
        <td>US<span class="font-weight-bold">{{ formatCurrency(product.price) }}</span></td>

        <td>{{ product.category }}</td>

        <td
          :class="product.quantity <= 0 ? 'bg-red-darken-1 text-center font-weight-bold' : ''"
        >
        {{ product.quantity <= 0 ? 'Not available' : product.quantity }}
        </td>
        
        <td>{{ product._id }}</td>
      </tr>
    </tbody>
  </v-table>

  <Dialog :isOpen="isOpenDialog" v-if="isOpenDialog" :product="dialogProduct"/>

    </main>
</template>

<style>
.gray-hover:hover{
  background-color: #CFD8DC;
  transition: .2s ease-in-out;
}
</style>