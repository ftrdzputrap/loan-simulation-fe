<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import LoginForm from '../../components/auth/LoginForm.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

console.log('1. Setup / Component Created');
const el = ref(null);

onBeforeMount(() => {
  router.replace("loan")
});

onMounted(() => {
  console.log('3. onMounted - DOM ready:', el.value);
});

</script>

<template>
  <LoginForm />
</template>