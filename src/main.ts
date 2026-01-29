import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createWebHistory, createRouter } from 'vue-router'
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";

import BaseLayout from './components/layouts/BaseLayout.vue'

const Login = () => import('./pages/Auth/LoginPage.vue')

const Tenor = () => import('./pages/Tenor/Page.vue');
const TenorCreate = () => import('./pages/Tenor/Create.vue');
const TenorUpdate = () => import('./pages/Tenor/Update.vue');

const LoanPage = () => import('./pages/Loan/Page.vue')
const LoanCreate = () => import('./pages/Loan/Create.vue');
const LoanDetail = () => import('./pages/Loan/Detail.vue');

const routes = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/',
    component: BaseLayout,
    children: [
      {
        path: "tenor",
        component: Tenor
      },
      {
        path: "tenor/create",
        component: TenorCreate
      },
      {
        path: "tenor/edit/:id",
        component: TenorUpdate
      },
      {
        path: "loan",
        component: LoanPage
      },
      {
        path: "loan/:id",
        component: LoanDetail
      },
      {
        path: "loan/create",
        component: LoanCreate
      },
    ]
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const app = createApp(App)
app.use(VueQueryPlugin, { queryClient })
app.use(router)
app.mount('#app')