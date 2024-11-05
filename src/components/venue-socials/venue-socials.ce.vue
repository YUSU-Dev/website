<template>
  <div v-if="venue == 'courtyard'">
    <ActivitiesContacts name="The Courtyard" instagram="thecourtyard_yorksu" />
  </div>
  <div v-else-if="venue == 'glasshouse'">
    <ActivitiesContacts
      name="The Glasshouse"
      instagram="theglasshouse_yorksu"
    />
  </div>
  <div v-else-if="venue == 'kitchen'">
    <ActivitiesContacts
      name="The Kitchen at Alcuin"
      instagram="thekitchenatalcuin"
    />
  </div>
  <div v-else-if="venue == 'lounge'">
    <ActivitiesContacts name="The Lounge" instagram="thelounge_yorksu" />
  </div>
  <div v-else-if="venue == 'vanbrugh-arms'">
    <ActivitiesContacts
      name="The Vanbrugh Arms"
      instagram="thevanbrugharms_yorksu"
    />
  </div>
</template>

<script>
import ActivitiesContacts from "../ActivitiesContacts/activitiescontacts.ce.vue";
export default {
  name: "VenueSocials",
  components: {
    ActivitiesContacts,
  },
  props: {
    venue: {
      type: String,
      default: "",
    },
  },
};
</script>
