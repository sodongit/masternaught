import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);


const state = {
    deliveries: {},
    deliveryIds: [],
    currentLocation: [],
    deliveryRoute: [],
    name: '',
    currentDelivery: 0,
    currentDeliveryRoute: []
}

const mutations = {
    addDeliveries(state, deliveries) {
        state.deliveries = deliveries;
    },
    addDeliveryIds(state, deliveryIds) {
        state.deliveryIds = deliveryIds;
    },
    clearDeliveries(state) {
        state.deliveries = {};
        state.deliveryIds = [];
        state.currentDelivery = 0;
    },
    setCurrentLocation(state, currentLocation) {
        state.currentLocation = currentLocation;
    },
    setCurrentDelivery(state, currentDeleivery) {
        state.currentDelivery = currentDeleivery;
    },
    setName(state, name) {
        state.name = name;
    },
    setDeliveryRoute(state, route) {
        state.deliveryRoute = route;
    },
    setCurrentDeliveryRoute(state, route) {
        state.currentDdeliveryRoute = route;
    }
}

const actions = {
    setCurrentLocation: ({commit}, location) => {
        commit('setCurrentLocation', location);
    },
    setName: ({commit}, name) => {
        commit('setName', name);
    },
    setDeliveries: ({commit, state}, deliveries) => {
        const deliveriesObj = deliveries.reduce((ac, cr, index) => {
            ac[`${index}`] = cr;
            return ac;
        }, {});
        const deliveryIds = Object.keys(deliveriesObj);
        const deliveryRoute = deliveries.reduce((ac, cr,) => {
                return [...ac, cr.location];
            },
            []);
        commit('addDeliveries', deliveriesObj);
        commit('addDeliveryIds', deliveryIds);
        commit('setDeliveryRoute', deliveryRoute);

    },
    setCurrentDelivery({commit, state}, deliveryId) {
        const deliveryInfo = state.deliveries[deliveryId];
        const locations = state.deliveryRoute.slice(0, Number(deliveryId) + 1);
        commit('setCurrentDeliveryRoute', [state.currentLocation, ...locations]);
        commit('setCurrentDelivery', deliveryInfo);
    },
}

const getters = {
    deliveries: (state) => state.deliveries,
    deliveryIds: (state) => state.deliveryIds,
    pizzaName: (state) => (id) => state.deliveries[id].pizza,
    currentLocation: (state) => state.currentLocation
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
