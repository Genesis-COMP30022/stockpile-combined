// client/src/services/EventService.js

import axios from "axios";

export default {
  async getEvents() {
    let res = await axios.get("http://localhost:9000/api/");
    return res.data;
  },
  async getEventSingle(eventId) {
    let res = await axios.get("http://localhost:9000/api/" + eventId);
    return res.data;
  },
};
