import "./shop-product-id.component.js";

export default {
  title: "Pages/Shop Product ID",
  component: "shop-product-id",
};

export const Default = {
  args: {
    productId: 9788,
    title: "Long Boi Bobble Beanie",
    description:
      "Our Long Boi heavy cable nit bobble beanie have a cuffed design with a Suprafleece thermal band. Available in burgundy and grey.",
    price: "£15.95",
    image:
      "https://d7c4643dcbda7415a35e-80960cc71f8ebfe47418d0eb60e429bc.ssl.cf3.rackcdn.com/369ce38245_1000x1000_WinterMerch_Hat_(4).jpg",
  },
};

export const Membership = {
  args: {
    productId: 8439,
    title: "Test Membership",
    description:
      "Memberships expire on Monday 9th September 2024. By signing up you agree for your name and email address to be held by the student group committee using our online platform, SUMS. The committee will be able to contact you with information about student group activities and events. You will be able to opt out of these communications if you wish by making a request to the committee. The YUSU Code of Conduct sets out the personal conduct expectations for all its members. As a member, you must abide by the Code of Conduct at all times. Please read YUSU's Code of Conduct and by purchasing this product you are confirming you have done so.",
    price: "£4.00",
    image: "https://assets-cdn.sums.su/YU/IMG/NewBrand/500x500_Blue.jpg",
  },
};
