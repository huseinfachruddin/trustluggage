<template>
<v-container>
    <v-layout row wrap d-flex justify-center>
    <v-flex md8 sm8 >
<v-card class="ma-5 pa-3 teal white--text">
    <h3 >Cek Nomer Resi</h3>
<div class="form">
            <v-text-field
                v-model="noResi"
              label="Masukan Nomer Resi"
              solo

              dense
              >
            
            </v-text-field>
            <div class="d-flex justify-end"> 
            <v-btn
            @click="getReceipt(noResi)"
            color="success"
            small
            >
                cari
            </v-btn>
            </div>
</div>
<div class="red ma-3 pa-1" v-if="errors">
        <h5>{{errors['0']}}</h5>
</div>
<div v-if="receipt">

<div class="orange black--text ma-3 pa-1">
        <h5 v-if="receipt.status">Status : {{receipt.status.name}}</h5>
        <h5 v-else>Status : Kosong</h5>

</div>
<div class="data my-5">
<v-card class="pa-1">
    <v-container>
              <v-row>
                <v-col
                cols="12"
                md="12"
                sm6="12"
                >
                <h4 class="grey">No Receipt : {{receipt.no_receipt}}</h4>
                <p class="ma-0">
                {{receipt.created_at}} 
                </p>
                </v-col>

            </v-row>
            <v-row >
            <v-col
            cols="6"
            md="6"
            sm6="6"
            
            >
            <h4 class="grey">Pengirim:</h4>
            <p class="ma-0">
            <strong>{{receipt.sender.name}}</strong>
            </p>
            <p class="ma-0">
            {{receipt.sender.address}}
            </p>
            <p class="ma-0">
            Telp : {{receipt.sender.phone}}
            </p>
            <p class="ma-0">
            Email : {{receipt.sender.email}}
            </p>
            </v-col>
            <v-col
            cols="6"
            md="6"
            sm6="6"
            
            >
            <h4 class="grey">Penerima:</h4>
            <p class="ma-0">
            <strong>{{receipt.receiver.name}}</strong>
            </p>
            <p class="ma-0">
            {{receipt.receiver.address}}
            </p>
            <p class="ma-0">
            Telp : {{receipt.receiver.phone}}
            </p>
            <p class="ma-0">
            Email : {{receipt.receiver.email}}
            </p>
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
            <router-link class="ma-1" v-if="receipt.no_receipt" style="text-decoration:none" :to="{name:'print.receipt', params: {id:receipt.no_receipt}}">
            <v-btn small class="info">
                detail
            </v-btn>
            </router-link>
            <router-link class="ma-1" v-if="receipt.no_receipt" style="text-decoration:none" :to="{name:'history.receipt', params: {id:receipt.no_receipt}}">
            <v-btn small class="orange">
                history
            </v-btn>
            </router-link>
        </v-row>
    </v-container>
</v-card>
</div>
</div>
</v-card>
    </v-flex>
        
    </v-layout>
</v-container>
</template>

<script>
export default {
    data(){
        return{
            noResi:''
        }
    },
    computed:{
        receipt(){
            return this.$store.state.receipt.receipt          
        },
        errors(){
            return this.$store.state.receipt.errors.errors         
        },
    },
    mounted(){

    },
    methods:{
    getReceipt(data){
        return this.$store.dispatch('receipt',data)
      },
    }


}
</script>