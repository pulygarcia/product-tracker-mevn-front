<script setup>
  import {ref} from 'vue';
  import { useProductsStore } from '@/stores/productsStore';
  import Alert from '../components/Alert.vue'
  import { useAlertStore } from '@/stores/alertStore';

  const productsStore = useProductsStore();
  const alertStore = useAlertStore();

  const formData = ref({
    name: '',
    brand: '',
    price: '',
    category: '',
    quantity: '',
  });

  const addNewProduct = async () => {
    try {
      await productsStore.addNewProduct(formData.value);

      //reset form
      formData.value = {};

    } catch (error) {
      console.log(error);
    }
  }
</script>

<template>
  <v-container>
    <main class="pa-3 w-100">
      <h1 class="mt-3">Add new Product</h1>

      <Alert 
        v-if="alertStore.alert.active"
        :title="alertStore.alert.title"
        :message="alertStore.alert.message"
        :type="alertStore.alert.type"
        class="my-5"
      />

      <v-form @submit.prevent="addNewProduct(formData)" class="mt-6">
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="formData.name"
              label="Name"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="formData.brand"
              label="Brand"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="formData.price"
              label="Price"
              type="Number"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-select
              label="Category"
              :items="productsStore.categories"
              v-model="formData.category"
            ></v-select>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="formData.quantity"
              label="Quantity"
              type="Number"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-btn class="mt-4 bg-indigo-darken-2" type="submit">Add Product</v-btn>

      </v-form>
  </main>
</v-container>
</template>