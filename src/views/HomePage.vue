<template>
  <ion-page>
    <ion-content :fullscreen="true" class="">
      <ion-searchbar
        @ionChange="searchUser"
        show-cancel-button="focus"
        placeholder="Buscar Usuario..."
        autocomplete="on"
      ></ion-searchbar>

      <ion-list class="contenido">
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
            <ion-item-option color="white">
              <ion-button @click="editUser(user)" color="primary">
                <ion-icon :icon="pencil"></ion-icon>
              </ion-button>
            </ion-item-option>
          </ion-item-options>
          <ion-item-options side="start">
            <ion-item-option color="white">
              <ion-button @click="deleteUserAlert(user)" color="danger">
                <ion-icon :icon="trash"></ion-icon>
              </ion-button>
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>

      <!-- fab placed to the bottom end -->
      <ion-fab vertical="bottom" slot="fixed" horizontal="end">
        <ion-fab-button>
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button @click="addUserView()" color="success">
            <ion-icon :icon="personAddOutline"></ion-icon>
          </ion-fab-button>
          <ion-fab-button @click="configView()" color="tertiary">
            <ion-icon :icon="build"></ion-icon>
          </ion-fab-button>
        </ion-fab-list>
      </ion-fab>
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
  IonIcon,
  IonFabButton,
  IonFab,
  IonFabList,
  IonButton,
  alertController,
  toastController,
} from "@ionic/vue";

import { add, build, personAddOutline, trash, pencil } from "ionicons/icons";

import { defineComponent } from "vue";

import { Http, HttpResponse } from "@capacitor-community/http";

import { store } from "../store";

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
    IonIcon,
    IonFabButton,
    IonFab,
    IonFabList,
    IonButton,
  },
  setup() {
    return {
      add,
      build,
      personAddOutline,
      trash,
      pencil,
    };
  },
  data() {
    return {
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
        url: `${this.store.host}/getUser`,
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
    editUser(user: User) {
      this.store.user = Object.assign({}, user);
      this.$router.push({
        name: "EditView",
      });
    },
    async deleteUserAlert(user: User) {
      const alert = await alertController.create({
        header: "Cuidado!",
        subHeader: "Está a punto de ELIMINAR un usuario",
        message: "¿Está Seguro de realizar esta acción?",
        buttons: [
          {
            text: "Sí, Capo!",
            role: "confirm",
            cssClass: "danger",
            handler: async () => {
              const toast = await toastController.create({
                message: "Se ha eliminado el egistro con éxito!",
                color: "success",
                duration: 2000,
              });
              this.deleteUser(user).then((r) => {
                if (r.data.affectedRows) {
                  toast.present();
                  this.store.users = this.store.users.filter(
                    (u) => u.id != user.id
                  );
                }
              });
            },
          },
          {
            text: "Cancelar",
            role: "cancel",
          },
        ],
      });

      await alert.present();
    },
    configView() {
      this.$router.push({
        name: "ConfigView",
      });
    },
    addUserView() {
      this.$router.push({
        name: "AddUserView",
      });
    },
    async deleteUser(user: User) {
      const options = {
        url: `${this.store.host}/deleteUser`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          user_id: user.id,
        },
      };

      return await Http.post(options);
    },
  },
});
</script>

<style>
.contenido {
  padding-bottom: 100px !important;
}
</style>
