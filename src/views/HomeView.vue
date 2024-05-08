<script setup>
  import {formatCurrency} from '../helpers/index.js'
  import { useProductsStore } from '@/stores/productsStore';

  const productsStore = useProductsStore();

</script>

<template>

  <main class="pa-3 w-100 scroll">
    <h1 class="mt-3">Products</h1>

    <div class="mt-5 w-50">
          <v-select
            label="Filter by category"
            :items="productsStore.categories"
            v-model="productsStore.selectedCategory"
          ></v-select>
    </div>

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
  </main>
</template>
<style>
  .scroll{
    overflow-y: scroll;
  }
  .scroll::-webkit-scrollbar {
  width: 12px;
}

.scroll::-webkit-scrollbar-track {
  background-color: transparent;
}

.scroll::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 6px;
}
</style>