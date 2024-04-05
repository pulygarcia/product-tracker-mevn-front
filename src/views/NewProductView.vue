<script setup>
  import {ref} from 'vue';
  import apiServices from '@/api/apiServices';
  import Alert from '../components/Alert.vue'
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const formData = ref({
    name: '',
    brand: '',
    price: '',
    category: '',
    quantity: '',
  });

  const alert = ref({
    title: '',
    message: '',
    type: '',
    active: false
  })

  const addNewProduct = async () => {
    //validate fields
    if(Object.values(formData.value).includes('')){
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
    if(formData.value.price <= 0 || formData.value.quantity <= 0){
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
      await apiServices.addNewProduct(formData.value);
      alert.value.title = 'Success';
      alert.value.message = 'Product added successfully';
      alert.value.type = 'success';
      alert.value.active = true;
      setTimeout(() => {
        alert.value.title = '';
        alert.value.message = '';
        alert.value.type = '';
        alert.value.active = false;
        router.push({name: 'home'});
      }, 3000);
      
      //reset form
      formData.value = {};

    } catch (error) {
      alert.value.title = 'Error';
      alert.value.message = 'Failed to add product';
      alert.value.type = 'error';
      alert.value.active = true;

      setTimeout(() => {
          alert.value.title = '';
          alert.value.message = '';
          alert.value.type = '';
          alert.value.active = false;
      }, 3000);
    }
  }
</script>

<template>
  <v-container>
    <main class="pa-3 w-100">
      <h1 class="mt-3">Add new Product</h1>

      <Alert 
        v-if="alert.active"
        :title="alert.title"
        :message="alert.message"
        :type="alert.type"
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
            <v-text-field
              v-model="formData.category"
              label="Category"
              required
            ></v-text-field>
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