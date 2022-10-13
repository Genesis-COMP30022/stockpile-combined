<!-- client/src/views/EventSingle.vue -->
<script>
import EventCard from "@/components/EventCard";
import EventService from "@/services/EventService.js"; // NEW
export default {
  name: "EventsList",
  components: {
    EventCard,
  },
  data() {
    return {
      event: {},
      events: [],
    };
  },
  created() {
    this.getEventsData(); // NEW - call getEventData() when the instance is created
  },
  // NEW
  methods: {
    async getEventsData() {
      // NEW - Use the eventService to call the getEvents() method
      EventService.getEvents().then(
        ((events) => {
          this.$set(this, "events", events);
        }).bind(this)
      );
    },
  },
};
</script>

<!-- <template>
    <div class="home" style="margin: 16px;">
        <h2>Welcome to Stockpile</h2>
        <img alt="Vue logo" src="../assets/stockpile-anim.gif" width="350" />
        <p>This is a temporary home page that will have real contents soon. 
           In the meantime, try clicking the Stockpile logo to visit the main
           cards view, or use the menu drawer!</p>
        <p>(Several menu items will be highlighted when you open this page. 
            This is normal -- they currently all link to the same page.
            That'll change, obviously.)</p>
    </div>
</template>

<script>

export default {
  name: "HomeTemp",
  components: {
    
  },
};
</script> -->
