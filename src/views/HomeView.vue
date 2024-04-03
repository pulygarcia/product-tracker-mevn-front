<script setup>
  import apiServices from '../api/apiServices.js';
  import {onMounted, ref} from 'vue';
  import {formatCurrency} from '../helpers/index.js'

  const products = ref([]);

  onMounted(async () => {
    try {
      const {data} = await apiServices.getAllProducts();
      //console.log(data);
      products.value = data;
    } catch (error) {
      console.log(error);
    }
  })

</script>

<template>

  <main class="pa-3 w-100">
    <h1 class="mt-3">Products</h1>

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
          Quantity
        </th>
        <th class="text-left text-indigo-darken-2 font-weight-bold text-subtitle-1">
          ID
        </th>
        <th class="text-left text-indigo-darken-2 font-weight-bold text-subtitle-1">
          Category
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="product in products"
        :key="product._id"
      >
        <td>{{ product.name }}</td>
        <td>{{ product.brand }}</td>
        <td class="font-weight-bold">US{{ formatCurrency(product.price) }}</td>
        <td>{{ product.quantity }}</td>
        <td>{{ product._id }}</td>
        <td>{{ product.category }}</td>
      </tr>
    </tbody>
  </v-table>
  </main>
</template>