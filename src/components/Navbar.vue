<template>
<div id="navbar">
    <v-toolbar 
    color="teal darken-3" class="white--text " >
    <v-toolbar-title>
        <v-img class=""
        max-height="100"
        max-width="70"
        src="../assets/logo2.png" />
    </v-toolbar-title> 

      <v-spacer></v-spacer>
      <a style="text-decoration:none" href="tel:6281215663393">
        <v-btn color="white" rounded small outlined fab class="ma-2 pa-1">
          <v-icon>mdi-phone</v-icon>
        </v-btn>
      </a>
      <router-link style="text-decoration:none" to="/direct" v-if="loggedin">
        <v-btn color="white" rounded small outlined fab class="ma-2 pa-1">
          <v-icon>mdi-key</v-icon>
        </v-btn>
      </router-link>
            <BtnLogin v-if="!loggedin"/>
            <BtnLogout v-if="loggedin"/>
    </v-toolbar>

  </div>
</template>


<script>
import BtnLogout from './BtnLogout.vue';
import BtnLogin from './BtnLogin.vue';


export default {
  components: { 
    BtnLogout,
    BtnLogin
    },
    data(){
      return{
        loggedin:false,
        token:localStorage.getItem('token'),
        }
    },
    mounted(){
        this.cek()
    },
    methods:{
      cek(){
        if (!this.token) {
            this.loggedin=false
        }else{
            this.loggedin=true
        }
      }
    }
};
</script>