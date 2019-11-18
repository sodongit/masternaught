<template>
    <div id="map"></div>
</template>

<script lang="ts">
    import L from 'leaflet';
    import {mapActions, mapState} from 'vuex';
    import store from "../store";

    const tileLayerUrl = `https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png`;

    export default {
        computed: mapState({
            name: () => store.state.name,
            currentLocationIcon: () => L.icon({
                iconUrl: './images/location.png',
                iconAnchor: [16, 33]
            }),
            deliveryIcon: () => L.icon({
                iconUrl: './images/delivery.png',
                iconAnchor: [16, 33]
            })
        }),
        beforeCreate(){
            this.subscriptions = [];
        },
        created() {
            this.subscriptions.push(this.$store.subscribe((mutation) => {
                    const {type, payload} = mutation;
                    switch (type) {
                        case 'setCurrentLocation':
                            this.updateCurrentLocationMarker(payload);
                            break;
                        case 'setCurrentDeliveryRoute':
                            this.updateDeliveryRoute(payload);
                            break;
                        case 'setCurrentDelivery':
                            this.updateDeliveryMarker(payload);
                            break;
                    }
                })
            );
        },
        mounted() {
            this.initMap();
        },
        beforeDestroy() {
          this.subscriptions.map((subscription) => {
              subscription();
          })
        },
        methods: {
            ...mapActions(['setDeliveries', 'setCurrentLocation']),
            initMap() {
                this.map = L.map('map').setView([53.821798, -1.344509], 13);

                L.tileLayer(tileLayerUrl, {
                    maxZoom: 18,
                    attribution: `Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,
                    <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>`,
                    id: 'streets'
                }).addTo(this.map);

                this.updateCurrentLocationMarker(this.$store.getters.currentLocation);
            },
            updateCurrentLocationMarker(currentLocation) {

                if (this.currentLocationMarker === undefined) {
                    this.currentLocationMarker = L.marker();
                    this.currentLocationMarker.setIcon(this.currentLocationIcon);
                    this.currentLocationPopup = L.popup({offset: [0, -23]});
                }

                this.currentLocationMarker.setLatLng(currentLocation);
                this.currentLocationMarker.setPopupContent(`${this.name}`)
                    .addTo(this.map);
                this.currentLocationPopup.setLatLng(currentLocation)
                    .setContent(this.name)
                    .openOn(this.map);
            },
            updateDeliveryMarker(delivery) {

                if (this.deliveryMarker === undefined) {
                    this.deliveryMarker = L.marker();
                    this.deliveryMarker.setIcon(this.deliveryIcon);
                    this.popup = L.popup({offset: [0, -23]});
                }

                const {location, pizza, dueBy} = delivery;
                const [latitude, longitude] = location;
                const title = `${pizza} Pizza Due by ${dueBy}`;
                this.deliveryMarker.setLatLng([latitude, longitude]);
                this.deliveryMarker.setPopupContent(`${title}`)
                    .addTo(this.map);
                this.popup.setLatLng([latitude, longitude])
                    .setContent(title)
                    .openOn(this.map);

            },
            updateDeliveryRoute(deliveryRoute) {

                if (this.polyline !== undefined) {
                    this.polyline.remove();
                }

                this.polyline = L.polyline(deliveryRoute)
                    .addTo(this.map);
            }
        },
    };
</script>

<style lang="scss" scoped>
    @import "~leaflet/dist/leaflet.css";

    #map {
        width: 100%;
        height: 100%;
    }
</style>
