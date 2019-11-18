<template>
    <v-app>
        <Header></Header>
        <LeftPanel></LeftPanel>
        <v-content>
            <v-container class="fill-height" fluid>
                <RouteMap></RouteMap>
            </v-container>
        </v-content>
    </v-app>
</template>

<script lang="ts">
import RouteMap from './components/Map.vue';
import LeftPanel from './components/LeftPanel.vue';
import Header from './components/Header.vue';
import jsonData from '../data.json'

export default {
    components: {
        RouteMap,
        Header,
        LeftPanel
    },
    created () {
        this.$vuetify.theme.dark = true;
        this.$store.dispatch('setCurrentLocation', jsonData.location);
        this.$store.dispatch('setDeliveries', jsonData.deliveries);
        this.$store.dispatch('setName', jsonData.name);
    },
};
</script>
