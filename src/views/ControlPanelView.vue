<script setup>
  import {useProductsStore} from '../stores/productsStore'
  import {useDialogStore} from '../stores/dialogStore'
  import { formatCurrency } from '@/helpers';
  import Dialog from '../components/Dialog.vue'
  import Alert from '../components/Alert.vue'

  const productsStore = useProductsStore();
  const dialogStore = useDialogStore();

</script>

<template>
    <main class="pa-3 w-100">
      <Alert v-if="productsStore.alert.active" :title="productsStore.alert.title" :message="productsStore.alert.message" :type="productsStore.alert.type" class="my-5"/>
      <h1 class="mt-3">Control Panel</h1>
      <p class="text-subtitle-1 text-blue-grey-darken-2">Here you will can filter and administrate data</p>
  
      <div class="mt-5 w-50">
          <v-select
            label="Filter by category"
            :items="productsStore.categories"
            v-model="productsStore.selectedCategory"
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
        @click="dialogStore.openDialog(product._id)"
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

  <Dialog :isOpen="dialogStore.isOpenDialog" v-if="dialogStore.isOpenDialog" :product="dialogStore.dialogProduct"/>

    </main>
</template>

<style>
.gray-hover:hover{
  background-color: #CFD8DC;
  transition: .2s ease-in-out;
}
</style>