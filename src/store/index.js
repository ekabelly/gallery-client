import Vue from "vue";
import Vuex from "vuex";
import { fetchPicDetails } from "@/services/pics.service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    picsDetails: {
      // String |
      // [key: pic id]: {
      //  resolution: string
      //  imgWeight: string
      // }
    },
  },
  mutations: {
    picDetails(state, payload) {
      state.picsDetails[payload.id] = payload;
    },
  },
  actions: {
    async picDetails(context, picId) {
      const localPicDetails = context.state.picsDetails[picId];
      if (["LOADING", "COMPLETED"].includes(localPicDetails?.status)) {
        return;
      }
      if (!localPicDetails) {
        context.commit("picDetails", { status: "LOADING" });
      }
      const picDetails = await fetchPicDetails(picId);
      context.commit("picDetails", {
        ...picDetails,
        status: "COMPLETED",
      });
      return context.state.picsDetails[picId];
    },
  },
  modules: {},
});
