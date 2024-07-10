import "./events-products.component.js";

export default {
  title: "Components/Events/Products",
  component: "events-products",
};

export const Default = {
  args: {
    event_name: "Test Name",
    activity_name: "Test Activity",
    event_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam et felis sit amet varius. Proin vitae pharetra dolor, nec rutrum orci. Mauris sagittis diam sed lacinia tincidunt. Morbi et libero sed libero scelerisque pellentesque. Sed tristique mattis scelerisque. Nulla sed ex urna. Etiam condimentum nisi ullamcorper tellus accumsan, sit amet convallis enim venenatis. Proin consectetur condimentum nulla, eu varius tellus vestibulum quis. Phasellus congue felis elit, at suscipit urna lobortis in. Etiam efficitur, arcu id sollicitudin malesuada, nibh dolor fringilla sapien, quis imperdiet est tellus a arcu. Ut bibendum nisl a elit venenatis, sit amet vulputate nibh scelerisque. Quisque malesuada, metus non mollis condimentum, ante dolor tempor leo, vitae vestibulum elit lectus ac nisl. Fusce ut magna finibus, auctor nulla ut, cursus felis. Aenean non orci et arcu consectetur tincidunt ut vitae nisi. Fusce faucibus eget neque sed fermentum.",
    u_next_on: "1719648000",
    date_name: "Test Date Name",
    date_venue: "Test Venue",
    u_start_date: "1719648000",
    u_all_day: false,
    date_id: "4564",
    from_price: "£1.00",
    external_tickets: false,
    event_url: "test-society-trip-to-big-tesco",
  },
};

export const signedIn = {
  args: {
    signed_in: true,
    event_name: "Test Name",
    activity_name: "Test Activity",
    event_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam et felis sit amet varius. Proin vitae pharetra dolor, nec rutrum orci. Mauris sagittis diam sed lacinia tincidunt. Morbi et libero sed libero scelerisque pellentesque. Sed tristique mattis scelerisque. Nulla sed ex urna. Etiam condimentum nisi ullamcorper tellus accumsan, sit amet convallis enim venenatis. Proin consectetur condimentum nulla, eu varius tellus vestibulum quis. Phasellus congue felis elit, at suscipit urna lobortis in. Etiam efficitur, arcu id sollicitudin malesuada, nibh dolor fringilla sapien, quis imperdiet est tellus a arcu. Ut bibendum nisl a elit venenatis, sit amet vulputate nibh scelerisque. Quisque malesuada, metus non mollis condimentum, ante dolor tempor leo, vitae vestibulum elit lectus ac nisl. Fusce ut magna finibus, auctor nulla ut, cursus felis. Aenean non orci et arcu consectetur tincidunt ut vitae nisi. Fusce faucibus eget neque sed fermentum.",
    u_next_on: "1719648000",
    date_name: "Test Date Name",
    date_venue: "Test Venue",
    u_start_date: "1719648000",
    u_all_day: false,
    date_id: "4564",
    from_price: "£1.00",
    external_tickets: false,
    event_url: "test-society-trip-to-big-tesco",
    show_products: true,
    event_products: true,
    product_name: "Test Product",
    product_price: "0",
    product_inventory: 10,
  },
};

export const noProducts = {
  args: {
    signed_in: true,
    event_name: "Test Name",
    activity_name: "Test Activity",
    event_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam et felis sit amet varius. Proin vitae pharetra dolor, nec rutrum orci. Mauris sagittis diam sed lacinia tincidunt. Morbi et libero sed libero scelerisque pellentesque. Sed tristique mattis scelerisque. Nulla sed ex urna. Etiam condimentum nisi ullamcorper tellus accumsan, sit amet convallis enim venenatis. Proin consectetur condimentum nulla, eu varius tellus vestibulum quis. Phasellus congue felis elit, at suscipit urna lobortis in. Etiam efficitur, arcu id sollicitudin malesuada, nibh dolor fringilla sapien, quis imperdiet est tellus a arcu. Ut bibendum nisl a elit venenatis, sit amet vulputate nibh scelerisque. Quisque malesuada, metus non mollis condimentum, ante dolor tempor leo, vitae vestibulum elit lectus ac nisl. Fusce ut magna finibus, auctor nulla ut, cursus felis. Aenean non orci et arcu consectetur tincidunt ut vitae nisi. Fusce faucibus eget neque sed fermentum.",
    u_next_on: "1719648000",
    date_name: "Test Date Name",
    date_venue: "Test Venue",
    u_start_date: "1719648000",
    u_all_day: false,
    date_id: "4564",
    from_price: "£1.00",
    external_tickets: false,
    event_url: "test-society-trip-to-big-tesco",
    no_products: true,
  },
};

export const productsError = {
  args: {
    signed_in: true,
    event_name: "Test Name",
    activity_name: "Test Activity",
    event_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam et felis sit amet varius. Proin vitae pharetra dolor, nec rutrum orci. Mauris sagittis diam sed lacinia tincidunt. Morbi et libero sed libero scelerisque pellentesque. Sed tristique mattis scelerisque. Nulla sed ex urna. Etiam condimentum nisi ullamcorper tellus accumsan, sit amet convallis enim venenatis. Proin consectetur condimentum nulla, eu varius tellus vestibulum quis. Phasellus congue felis elit, at suscipit urna lobortis in. Etiam efficitur, arcu id sollicitudin malesuada, nibh dolor fringilla sapien, quis imperdiet est tellus a arcu. Ut bibendum nisl a elit venenatis, sit amet vulputate nibh scelerisque. Quisque malesuada, metus non mollis condimentum, ante dolor tempor leo, vitae vestibulum elit lectus ac nisl. Fusce ut magna finibus, auctor nulla ut, cursus felis. Aenean non orci et arcu consectetur tincidunt ut vitae nisi. Fusce faucibus eget neque sed fermentum.",
    u_next_on: "1719648000",
    date_name: "Test Date Name",
    date_venue: "Test Venue",
    u_start_date: "1719648000",
    u_all_day: false,
    date_id: "4564",
    from_price: "£1.00",
    external_tickets: false,
    event_url: "test-society-trip-to-big-tesco",
    no_products: false,
    show_products: true,
    event_error: "Test error message",
  },
};
