<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Home</q-item-label>
        <q-item clickable tag="a" href="/admin_home ">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" href="/piechart">
          <q-item-section avatar>
            <q-icon name="piechart" />
          </q-item-section>
          <q-item-section>
            <q-item-label>PieChart</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" href="/enquiries">
          <q-item-section avatar>
            <q-icon name="enquiries" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Enquiries</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'LayoutDefault',  

  setup () {
    return {
      leftDrawerOpen: ref(false)
    }
  }
}
</script>
