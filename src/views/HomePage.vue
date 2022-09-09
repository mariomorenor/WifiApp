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
        <ion-item-sliding v-for="user in users" :key="user.id">
          <ion-item>
            <ion-label>
              <h2><strong>Usuario:</strong> {{ user.username }}</h2>
              <h3><strong>Identidad:</strong> {{ user.value }}</h3>
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

import axios from "axios";
type User = {
  id: number;
  username: string;
  value: string;
  name: string;
  last_name: string;
  status: number;
};

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
      users: [] as Array<User>,
    };
  },
  methods: {
    searchUser(ctx: any) {
      if (ctx.detail.value == "") {
        this.users = [];
        return;
      }
      this.axios.post(`getUser/${ctx.detail.value}`).then((result) => {
        this.users = result.data;
      });
    },
    editUser(user: any) {
      this.$router.push({
        name: "editUser",
        params: {
          us: Object.assign({}, user),
        },
      });
    },
  },
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
