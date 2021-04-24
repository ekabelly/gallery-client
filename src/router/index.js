import Vue from "vue";
import VueRouter from "vue-router";
import Gallery from "../views/Gallery.vue";
import PicChat from "../views/PicChat.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Gallery",
    component: Gallery,
  },
  {
    path: "/pic-chat/:picId",
    name: "PicChat",
    component: PicChat,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  routes,
});

export default router;
