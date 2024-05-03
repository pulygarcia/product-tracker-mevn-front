<script setup>
  import { onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useProductsStore } from '@/stores/productsStore';
  import { useAlertStore } from '@/stores/alertStore';
  import apiServices from '@/api/apiServices';
  import Alert from '@/components/Alert.vue';
  import { reactive } from 'vue';

  const route = useRoute();
  const router = useRouter();
  const productsStore = useProductsStore();
  const alertStore = useAlertStore();

  const currentProduct = ref({});

  const formData = reactive({
    name: '',
    brand: '',
    price: '',
    category: '',
    quantity: '',
  });
  
  onMounted(async () => {
    try {
      const {data} = await apiServices.getProductById(route.params.id);
      currentProduct.value = data;
      Object.assign(formData, currentProduct.value); //get selected product data and showing in form fields
      
    } catch (error) {
      console.log(error);
    }
  })
  
  const updateProduct = async () => {
    if(Object.values(formData).includes('')){
            alertStore.alert.value.title = 'Empty fields';
            alertStore.alert.value.message = 'Please complete the fields correctly'
            alertStore.alert.value.type = 'error'
            alertStore.alert.value.active = true;
            setTimeout(() => {
                alertStore.alert.value.title = '';
                alertStore.alert.value.message = '';
                alertStore.alert.value.type = '';
                alertStore.alert.value.active = false;
            }, 3000);

          return;
    }

    try {
      await apiServices.updateProduct(currentProduct.value._id, formData);

      alertStore.alert.title = 'Updated';
      alertStore.alert.message = 'Product information was updated successfully'
      alertStore.alert.type = 'success'
      alertStore.alert.active = true;
      setTimeout(() => {
          alertStore.alert.title = '';
          alertStore.alert.message = '';
          alertStore.alert.type = '';
          alertStore.alert.active = false;
          //redirect
          router.push({name: 'control-panel'})
      }, 3000);

      // Reset form data visually
      Object.keys(formData).forEach(key => {
        formData[key] = '';
      });

      //refresh product list
      const {data} = await apiServices.getAllProducts();
      productsStore.products = data;

    } catch (error) {
      console.log(error);
    }
  }

</script>

<template>
  <v-container>
    <main class="pa-3 w-100">
      <h1 class="mt-3">Update selected product [ {{ currentProduct.name }} ]</h1>
      <p class="text-grey-darken-1">Here you will can modify the product information</p>

      <Alert 
        v-if="alertStore.alert.active"
        :title="alertStore.alert.title"
        :message="alertStore.alert.message"
        :type="alertStore.alert.type"
        class="my-5"
      />

      <v-form @submit.prevent="updateProduct()" class="mt-6">
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

        <v-btn class="mt-4 bg-indigo-darken-2" type="submit">Update data</v-btn>

      </v-form>
  </main>
</v-container>
</template>