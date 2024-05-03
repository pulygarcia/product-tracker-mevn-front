import {ref} from 'vue';
import {defineStore} from 'pinia';

export const useAlertStore = defineStore('alert', () => {
    const alert = ref({
        title: '',
        message: '',
        type: '',
        active: false
    })

    return{
        alert
    }
})