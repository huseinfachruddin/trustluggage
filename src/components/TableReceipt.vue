<template>
<v-container fluid>
  <v-card class="pa-5">
    <v-card-title>
      Table Pengiriman
      
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-title>
        <v-col
          cols="12"
          sm="6"
          md="4"
        >
            <v-text-field
            v-model="form.no_receipt"
            class=""
            solo
            label="Nomer Resi"
            hide-details
          >
          </v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
        >
        <v-select
          item-text="name"
          item-value="id"
          :items="status"
          label="Status field"
          hide-details
          v-model="form.status_id"
          solo
        ></v-select>
        </v-col>
        <v-row>
          <v-spacer></v-spacer>
            <v-btn
              class="ma-5"
              @click="searchReceipt(form)"
              dark
              color="cyan"
              small
            >
              cari
            </v-btn>
        </v-row>            
    </v-card-title>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            No resi
          </th>
          <th class="text-left">
            Pengirim
          </th>
          <th class="text-left">
            Tgl
          </th>
          <th class="text-left">
            Status
          </th>
          <th class="text-left">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in receipts"
          :key="item.no_receipt"
        >
          <td>{{ item.no_receipt }}</td>
          <td>{{ item.receiver.name }}</td>
          <td>{{ item.created_at }}</td>
          <td v-if="item.status">{{ item.status.name}}</td>
          <td v-else>Kosong</td>
          <td>
            <router-link style="text-decoration:none" :to="{name:'edit.receipt', params: {id:item.no_receipt}}">

            <v-btn
              class="ma-1"
              fab
              dark
              color="cyan"
              small
            >
              <v-icon dark>
                mdi-pencil
              </v-icon>
            </v-btn>
            </router-link>

            <v-btn
              class="mx-2"
              fab
              dark
              color="error"
              small
              @click="destroy(item.id)"
              ref="deleteUser"
            >
              <v-icon dark>
                mdi-delete
              </v-icon>
            </v-btn>

          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

  </v-card>
</v-container>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    computed:{
      receipts(){
        return this.$store.state.receipt.receipts
      },
      form(){
        return this.$store.state.receipt.form
      },
      status(){
        return this.$store.state.receipt.status
      }
    },
    mounted(){
      this.$store.dispatch('refresh');
      this.$store.dispatch('getReceipts');
      this.getStatus();

    },
    methods:{
      getStatus(){
        return this.$store.dispatch('getStatus');
      },
      searchReceipt(form){
        return this.$store.dispatch('searchReceipt',form);
      },
      destroy(form){
         this.$store.dispatch('destroy',form)
        return this.$store.dispatch('getReceipts');
      },
    },

  }
</script>