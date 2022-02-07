<template>
<div class="skill">
    <v-container>
        <v-row class="d-flex justify-center ma-5">
            <v-flex md5 sm5 sm-5 ma-3 v-for="(card,i) in cards" :key="i">
              <v-card
                class="mx-auto"
                max-width="344"
              >
                <v-img
                  :src="card.img"
                  height="200px"
                ></v-img>

                <v-card-title>
                  {{card.title}}
                </v-card-title>

                <v-card-subtitle>
                  {{card.desc}}
                </v-card-subtitle>

                <v-card-actions>

                  <v-spacer></v-spacer>

                </v-card-actions>

              </v-card>
            </v-flex>

        </v-row>
    </v-container>
</div>
</template>


<script>
  export default {
    data () {
      return {
        cards: [
            {
            title:"Trust",
            img: require('@/assets/truck.png'),
            desc:"Amanah anda adalah tanggung jawab kami",
            },
            {
            title:"Cek pengiriman",
            img: require('@/assets/box.jpg'),
            desc:"Cek status pengiriman anda",
            },
        ],
      }
    },
  }
</script>