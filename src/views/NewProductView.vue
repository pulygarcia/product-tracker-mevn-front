<script setup>
  import {ref} from 'vue';
  import apiServices from '@/api/apiServices';
  import Alert from '../components/Alert.vue'

  const formData = ref({
    name: '',
    brand: '',
    price: '',
    image: '',
    quantity: '',
  });

  const alert = ref({
    title: '',
    message: '',
    type: ''
  })

  const addNewProduct = async () => {
    if(Object.values(formData.value).includes('')){
      alert.value.title = 'Empty fields';
      alert.value.message = 'Please complete the fields'
      alert.value.type = 'error'
      setTimeout(() => {
        alert.value.title = '';
        alert.value.message = '';
        alert.value.type = '';
      }, 3000);

      return;
    }
  }
</script>

<template>
  <v-container>
    <main class="pa-3 w-100">
      <h1 class="mt-3">Add new Product</h1>

      <Alert 
        v-if="!Object.values(alert).includes('')"
        :title="alert.title"
        :message="alert.message"
        :type="alert.type"
        class="my-5"
      />

      <v-form @submit.prevent @submit="addNewProduct" class="mt-6">
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
              v-model="formData.image"
              label="Image"
              type="File"
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