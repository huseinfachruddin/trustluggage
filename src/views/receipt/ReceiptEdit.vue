<template>
  <div class="edit">
  <Sidebar/>
  <v-container >
    <v-row class="d-flex justify-center ma-5">
      <router-link class="ma-1" v-if="form.no_receipt" style="text-decoration:none" :to="{name:'print.receipt', params: {id:form.no_receipt}}">
        <v-btn color="warning" dense small>
          print
        </v-btn>
      </router-link>
      <router-link class="ma-1" v-if="form.no_receipt" style="text-decoration:none" :to="{name:'history.receipt', params: {id:form.no_receipt}}">
        <v-btn small class="orange">
          history
        </v-btn>
      </router-link>
      <v-card class="col-md-12 pa-3 ma-1">
        <v-card-title primary-title>
        Status edit
        </v-card-title>
        <v-row >
          <v-col
          cols="12"
          sm="6"
          md="6"
          >
          <h6>Status</h6>
            <small
            class="red--text"
            v-for="error in errors.status_id"
            :key="error"
            >
            {{error}}
            </small>
          <v-select
            v-model="form.status_id"
            item-text="name"
            item-value="id"
            :items="status"
            label="role undifined"
            hide-details
            solo
          ></v-select>
          </v-col>
        </v-row>
        <v-row class="pa-3 d-flex justify-end">
            <v-btn
              tile
              color="success"
              small
              @click="statusUp(form)"
            >
              <v-icon left>
                mdi-check
              </v-icon>
              ubah status
            </v-btn>
        </v-row>
      </v-card>
      <v-card class="col-md-12 pa-3">
        <v-card-title primary-title>
          Pengiriman edit
        </v-card-title>
        <h4 class="yellow ma-1">Pengirim</h4>
        <v-row  v-if="form.sender">
          <v-col
          cols="12"
          sm="6"
          md="6"
          >
            <v-text-field
              label="Nama"
              outlined
              dense
              hide-details="auto"
              v-model="form.sender.name"
            ></v-text-field>
            <small class="red--text" v-for="error in errSender.name" :key="error">{{error}}</small>
          </v-col>
          <v-col
          cols="12"
          sm="6"
          md="6"
          >
            <v-text-field
              label="Phone"
              outlined
              dense
              hide-details="auto"
              v-model="form.sender.phone"
            ></v-text-field>
            <small class="red--text" v-for="error in errSender.phone" :key="error">{{error}}</small>
          </v-col>
          <v-col
          cols="12"
          sm="6"
          md="6"
          >
            <v-text-field
              label="Email"
              outlined
              dense
              hide-details="auto"
              v-model="form.sender.email"
            ></v-text-field>
            <small class="red--text" v-for="error in errSender.email" :key="error">{{error}}</small>
          </v-col>
          <v-col
          cols="12"
          sm="12"
          md="12"
          >
            <v-text-field
              label="Alamat Pengirim"
              outlined
              dense
              hide-details="auto"
              v-model="form.sender.address"
            ></v-text-field>
            <small class="red--text" v-for="error in errSender.address" :key="error">{{error}}</small>
          </v-col>
        </v-row>
        <v-row     
        class="pa-3 d-flex justify-end"
        >
          <v-btn
            tile
            color="success"
            small
            @click="senderUp(form.sender)"
          >
            <v-icon left>
              mdi-check
            </v-icon>
            ubah pengirim
          </v-btn>
        </v-row>
      <h4 class="yellow ma-1">Penerima</h4>
        <v-row v-if="form.receiver">
          <v-col
          cols="12"
          sm="6"
          md="6"
          >
            <v-text-field
              label="Nama"
              outlined
              dense
              hide-details="auto"
              v-model="form.receiver.name"
            ></v-text-field>
            <small class="red--text" v-for="error in errReceiver.name" :key="error">{{error}}</small>
          </v-col>
          <v-col
          cols="12"
          sm="6"
          md="6"
          >
            <v-text-field
              label="Phone"
              outlined
              dense
              hide-details="auto"
              v-model="form.receiver.phone"
            ></v-text-field>
            <small class="red--text" v-for="error in errReceiver.phone" :key="error">{{error}}</small>
          </v-col>
          <v-col
          cols="12"
          sm="6"
          md="6"
          >
            <v-text-field
              label="Email"
              outlined
              dense
              hide-details="auto"
              v-model="form.receiver.email"
            ></v-text-field>
            <small class="red--text" v-for="error in errReceiver.email" :key="error">{{error}}</small>
          </v-col>
          <v-col
          cols="12"
          sm="12"
          md="12"
          >
            <v-text-field
              label="Alamat Pengirim"
              outlined
              dense
              hide-details="auto"
              v-model="form.receiver.address"
            ></v-text-field>
            <small class="red--text" v-for="error in errReceiver.address" :key="error">{{error}}</small>
          </v-col>
        </v-row>
        <v-row     
        class="pa-3 d-flex justify-end"
        >
          <v-btn
            tile
            color="success"
            small
            @click="receiverUp(form.receiver)"
          >
            <v-icon left>
              mdi-check
            </v-icon>
            penerima
          </v-btn>
        </v-row>
        <h4 class="yellow ma-1">Data Barang</h4>
        <v-row>
          <v-col
          cols="12"
          sm="6"
          md="6"
          >
            <v-text-field
              label="Berat (gram)"
              outlined
              dense
              hide-details="auto"
              v-model="form.weight"
            ></v-text-field>
            <small class="red--text" v-for="error in errors.weight" :key="error">{{error}}</small>
          </v-col>
          <v-col
          cols="12"
          sm="6"
          md="6"
          >
            <v-text-field
              label="Volume (m3)"
              outlined
              dense
              hide-details="auto"
              v-model="form.volume"
            ></v-text-field>
            <small class="red--text" v-for="error in errors.volume" :key="error">{{error}}</small>
          </v-col>
          <v-col
          cols="12"
          sm="6"
          md="6"
          >
            <v-text-field
              label="Harga (Rp)"
              outlined
              dense
              hide-details="auto"
              v-model="form.price"
            ></v-text-field>
            <small class="red--text" v-for="error in errors.price" :key="error">{{error}}</small>
          </v-col>
          <v-col
          cols="12"
          sm="12"
          md="12"
          >
            <v-text-field
              label="Deskripsi"
              outlined
              dense
              hide-details="auto"
              v-model="form.description"
            ></v-text-field>
            <small class="red--text" v-for="error in errors.description" :key="error">{{error}}</small>
          </v-col>
        </v-row>
        <v-row     
        class="pa-3 d-flex justify-end"
        >
          <v-btn
            tile
            color="success"
            small
            @click="receiptUp(form)"
          >
            <v-icon left>
              mdi-check
            </v-icon>
            barang
          </v-btn>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
  </div>
</template>

<script>
import Sidebar from '../../components/Sidebar'

export default {
  components:{
    Sidebar
  },
 computed:{
      receipt(){
        return this.$store.state.receipt.receipt
      },
      form(){
        return this.$store.state.receipt.form
      },
      errors(){
        return this.$store.state.receipt.errors
      },
      errSender(){
        return this.$store.state.receipt.errSender
      },
      errReceiver(){
        return this.$store.state.receipt.errReceiver
      },
      success(){
        return this.$store.state.receipt.success
      },
      status(){
        return this.$store.state.receipt.status
      },
    },
    mounted(){
      this.getReceipt(),
      this.getStatus()
    },
    methods:{
      async getReceipt(){
        let data = await this.$store.dispatch('receiptForUp',this.$route.params.id)
        return data
      },
      getStatus(){
        return this.$store.dispatch('getStatus')
      },
      statusUp(form){
        return this.$store.dispatch('statusUp',form)
      },
      senderUp(form){
        return this.$store.dispatch('senderUp',form)
      },
      receiverUp(form){
        return this.$store.dispatch('receiverUp',form)
      },
      receiptUp(form){
        return this.$store.dispatch('receiptUp',form)
      },

    }

}
</script>