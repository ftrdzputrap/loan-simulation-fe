<script setup lang="ts">
const menus = [
  {
    id: "tenor",
    label: "Tenor",
    path: "/tenor"
  },
  {
    id: "loan",
    label: "Pinjaman",
    path: "/loan"
  },
];
</script>

<template>
  <div id="base-layout" class="min-h-screen flex flex-col">
    <header class="h-14 bg-slate-800 text-white flex items-center px-6">
      <h1 class="text-lg font-semibold">My App</h1>
    </header>

    <div class="flex flex-1">
      <aside class="w-64 bg-slate-900 text-slate-100 p-4">
        <nav class="space-y-2">
          <a :href="menu.path" class="block px-3 py-2 rounded hover:bg-slate-700" v-for="menu in menus">
            {{ menu.label }}
          </a>
        </nav>
      </aside>

      <main class="flex-1 p-6 bg-slate-100 overflow-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>
