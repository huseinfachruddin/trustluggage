<template>
<div class="visitmore">
    <v-container>
        <v-row class="d-flex justify-center my-3 text-center">
                    <div v-for="button in buttons" :key="button.icon">
                      <a :href="button.link" style="text-decoration: none;">
                      <v-btn
                        class="mx-2"
                        fab
                        small
                        :href="button.link"
                      >
                      <v-icon dark>
                        {{button.icon}}
                      </v-icon>
                    </v-btn>
                    </a>
                  </div>
        </v-row>
    </v-container>
</div>
</template>


<script>
  export default {
    data () {
      return {
          buttons:[
            {
            icon:'mdi-facebook',
            link:'https://www.facebook.com/trust.luggage.3/'
            },
            {
            icon:'mdi-instagram',
            link:'https://www.instagram.com/trust.luggage/'
            },
            {
            icon:'mdi-whatsapp',
            link:'https://wa.me/6281215663393'
            },
          ]
      }
    },
  }
</script>