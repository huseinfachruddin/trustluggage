<template>
  <v-container fluid class=" ma-1 d-flex justify-center">
  <v-card class="pa-3">
    <h2>History receipt {{data}}</h2>
    <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Tanggal
          </th>
          <th class="text-left">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
        v-for="history in histories"
        :key="history.date"
        >
          <td>{{history.date}}</td>
          <td>{{history.status}}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </v-card>

</v-container>

</template>

<script>
export default {
  data(){
    return{
      domain:'www.'+window.location.hostname,
      data:this.$route.params.id
    }
  },
  computed:{
    histories(){
      return this.$store.state.receipt.histories
    }
  },
  mounted(){
    this.$store.dispatch('getHistories',this.$route.params.id);
  }
}
</script>