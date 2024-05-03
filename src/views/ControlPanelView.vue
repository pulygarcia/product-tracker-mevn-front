<script setup>
  import {useProductsStore} from '../stores/productsStore'
  import {useDialogStore} from '../stores/dialogStore'
  import { formatCurrency } from '@/helpers';
  import Dialog from '../components/Dialog.vue'
  import Alert from '../components/Alert.vue'
  import { useAlertStore } from '@/stores/alertStore';

  const productsStore = useProductsStore();
  const dialogStore = useDialogStore();
  const alertStore = useAlertStore();

  const currentUser = JSON.parse(localStorage.getItem('user')).email;
</script>

<template>
    <main class="pa-3 w-100">
      <Alert v-if="alertStore.alert.active" :title="alertStore.alert.title" :message="alertStore.alert.message" :type="alertStore.alert.type" class="my-5"/>

      <div class="d-flex flex-column flex-md-row justify-space-between align-md-center">
        <h1 class="mt-3">Control Panel</h1>
        <div class="d-flex ga-2 align-center bg-indigo-darken-2 pa-1 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20px">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          <span class="text-subtitle-1">{{ currentUser }}</span>
        </div>
      </div>

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