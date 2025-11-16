<template>
  <div class="admin-layout">
    <nav>
      <NuxtLink to="/admin">Dashboard</NuxtLink> |
      <NuxtLink to="/admin/users">Users</NuxtLink> |
      <NuxtLink to="/admin/settings">Settings</NuxtLink>
    </nav>

    <main>
      <slot />
    </main>
  </div>
</template>
