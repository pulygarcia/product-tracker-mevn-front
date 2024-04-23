<script setup>
    import router from '@/router';
    import {ref} from 'vue';
    import {useAuthStore} from '../stores/authStore'
    import { useProductsStore } from '@/stores/productsStore';
    import Alert from '@/components/Alert.vue';

    const authStore = useAuthStore();
    const productsStore = useProductsStore();
    
    const formData = ref({
      email: '',
      password: '',
    });
  </script>

<template>
  <v-container>
    <main class="pa-3 w-100 md-w-30 text-center mt-16 elevation-16">
      <!-- ALERT -->
      <Alert v-if="productsStore.alert.active" :title="productsStore.alert.title" :message="productsStore.alert.message" :type="productsStore.alert.type" class="my-5"/>
      <!-- Error or success messages will be showed here -->

      <h1 class="mt-3">Login</h1>
      
      <p class="text-subtitle-1 text-grey-darken-1">Log in to your account to access the control panel</p>
        
        <v-form @submit.prevent="authStore.login(formData)" class="mt-6">
          <v-row class="justify-center flex-column align-center">
            <v-col
            cols="12"
            >
            <v-text-field
            v-model="formData.email"
              label="Email"
              required
              type="email"
              ></v-text-field>
            </v-col>
            
            <v-col
            cols="12"
            >
            <v-text-field
            v-model="formData.password"
            label="Password"
            required
            type="password"
            ></v-text-field>
          </v-col>
        </v-row>

        <p class="text-subtitle-1 text-grey-darken-1 text-start">Forgot password? <span class="text-blue-darken-1">Get new one</span></p>
        
        <v-btn class="mt-4 bg-indigo-darken-2 w-100" type="submit">Login</v-btn>
        
        <div class="d-flex justify-center align-center ga-2 mt-4">
            <span class="h-1 bg-grey-lighten-1"></span> <span>or</span> <span class="h-1 bg-grey-lighten-1"></span>
        </div>

        <v-btn class="mt-4 border-md w-100 elevation-0 text-indigo-darken-2" type="submit">Sign up</v-btn>
      </v-form>
  </main>
</v-container>
</template>

<style>
    @media (min-width: 768px){
        .md-w-30{
            max-width: 30%;
            margin: 0 auto;
        }
    }
    .h-1{
        height: 1px;
        width: 100%;
    }
</style>