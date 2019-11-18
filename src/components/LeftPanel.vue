<template>
    <v-navigation-drawer app clipped permanent>
            <v-list>
                <v-list-item-title>Order of Deliveries</v-list-item-title>
                <v-list-item-group color="primary">
                    <v-list-item
                            v-for="(id, i) in deliveryIds"
                            :key="i"
                            @click="setClient(id)"
                    >
                        <v-list-item-icon>
                            <v-icon v-text=""></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="deliveries(id)"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>
    </v-navigation-drawer>
</template>

<script lang='ts'>
    import L from 'leaflet';
    import {mapActions, mapState} from "vuex";
    import store from "../store";

    export default {
        computed: mapState({
            deliveryIds: () => store.getters.deliveryIds,
            deliveries: () => store.getters.pizzaName,
        }),
        methods: {
            ...mapActions(['setCurrentLocation']),
            setClient(id) {
                console.log(id);
                store.dispatch('setCurrentDelivery', id);
            }
        }
    }
</script>
