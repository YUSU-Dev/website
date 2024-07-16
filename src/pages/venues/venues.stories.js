import "./venues.component.js";

export default {
  title: "Pages/Venues",
  component: "venues",
};

export const Default = {
  args: {},
};

export const Courtyard = {
  args: {
    title: "Courtyard",
    page_content: `<p>Whether you&#39;re just looking for a daytime coffee or wanting to watch some live sports on an evening, The Courtyard is the place to be! With a range of events from quizzes to karaoke, a beer garden, and a variety of food to satisfy your taste buds, you can always find what you need at The Courtyard.</p><hr /><h2>Opening hours</h2><p>Monday - Friday 8:30-23:00</p><p>Saturday - Sunday 11:00-23:00</p><hr /><h2>Order to table</h2><p>You can now order food and drink directly to your table in Courtyard!</p><!-- <p><a href="https://order.storekit.com/yusu-courtyard/menu">Use this link to get started!</a></p> --><p>Snap the QR code on your table to get started or <a href="https://order.storekit.com/yusu-courtyard/menu">click here to open our ordering portal.</a></p><hr /><h2>Food and drink</h2><p>We have a range of food and drinks on offer, so why not pop in and take a look?</p><ul><li><a href="https://assets-cdn.sums.su/YU/Venues/Weirdough_Menu.pdf" target="_blank">WeirDough menu</a></li></ul>`,
    page_class: "1",
    page_key_image:
      "https://assets-cdn.sums.su/YU/website/Venue_logos/TheCourtyardYUSU_Logo_desktopv2.png",
    additional_page_content: `<h2>Additional Information</h2><ul><li>Please note vaping is not permitted inside any University of York Students&#39; Union&nbsp;Venue.</li><li>Our staff are mainly your fellow students. Its not fair to be abusive, rude or threatening towards any of our staff. If your behaviour towards our staff is unacceptable you will be asked to leave and may be barred from the premises.</li><li>Whilst we&rsquo;ll do our best to let you know of any changes to our opening hours on our website, we&rsquo;re aware that staff isolating due to Covid-19 could quickly change our ability to open or mean we need to be flexible with our opening hours. If you&rsquo;d like to check on a venue, take a look at our instagram pages</li></ul>`,
  },
};
