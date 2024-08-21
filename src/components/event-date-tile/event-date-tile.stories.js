import "./event-date-tile.component.js";

export default {
  title: "Components/Events/Event Date Tile",
  component: "event-date-tile",
};

export const Default = {
  args: {
    date_name: "Test Date Name",
    date_venue: "Test Venue",
    u_start_date: "1719648000",
    u_all_day: false,
    date_id: "4564",
    from_price: "£1.00",
    external_tickets: false,
  },
};

export const testWelcome = {
  args: {
    date_id: "4702",
  },
};
