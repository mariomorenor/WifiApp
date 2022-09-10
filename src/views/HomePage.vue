<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-searchbar
        @ionChange="searchUser"
        show-cancel-button="focus"
        placeholder="Buscar Usuario..."
        autocomplete="on"
      ></ion-searchbar>

      <ion-list>
        <ion-item-sliding v-for="user in store.users" :key="user.id">
          <ion-item>
            <ion-label>
              <h2><strong>Usuario:</strong> {{ user.username }}</h2>
              <h3><strong>Identidad:</strong> {{ user.identity }}</h3>
              <p>
                <strong>Nombre:</strong> {{ user.name }} {{ user.last_name }}
              </p>
              <p><strong>Correo:</strong> {{ user.email }}</p>
            </ion-label>
          </ion-item>

          <ion-item-options side="end">
            <ion-item-option @click="editUser(user)">Editar</ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonSearchbar,
  IonItemSliding,
  IonLabel,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonList,
} from "@ionic/vue";
import { defineComponent } from "vue";

import { Http, HttpResponse } from "@capacitor-community/http";

import { store } from "../store";

export default defineComponent({
  name: "HomePage",
  components: {
    IonContent,
    IonPage,
    IonSearchbar,
    IonItemSliding,
    IonLabel,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonList,
  },
  data() {
    return {
      host: process.env.VUE_APP_SERVER_HOST,
      store,
    };
  },
  methods: {
    async searchUser(ctx: any) {
      if (ctx.detail.value == "") {
        this.store.users = [];
        return;
      }
      const options = {
        url: `${this.host}/getUser`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          identity: ctx.detail.value,
        },
      };

      const response: HttpResponse = await Http.post(options);
      this.store.users = response.data;
    },
    editUser(user: any) {
      this.store.user = Object.assign({}, user);
      this.$router.push({
        name: "edit",
      });
    },
  },
});
</script>

<style scoped></style>
