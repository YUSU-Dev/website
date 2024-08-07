<template>
  <div id="skiptocontent"><a href="#maincontent">skip to main content</a></div>
  <Navbar />
  <main id="maincontent">
    <div class="container mx-auto flex flex-col justify-center pt-4">
      <!-- {if pre_error != ""} -->
      <div>
        <div class="my-5 text-center">
          <p>{pre_error}</p>
        </div>
        <Button :is-primary="true" title="View Basket" :url="'/shop/basket'" />
      </div>
      <!-- {if:else} -->
      <div>
        <h1 class="text-2xl font-bold">Additional Information</h1>
        <h2 class="text-xl font-bold">{product_name}</h2>

        <!-- {if field_error != ""} -->
        <div class="g-mt-20 border-l-4 border-red-400 bg-red-100 p-2">
          {field_error}
        </div>
        <!-- {/if} -->

        <form method="POST" class="g-brd-around g-brd-gray-light-v4 py-4">
          <input type="hidden" name="do" value="post" />
          <!-- {fields} -->
          <!-- {if field_id == 10} -->
          <div
            class="flex items-center text-wrap bg-light-blue p-2 text-sm md:text-base"
          >
            <svg
              class="mr-2 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"
              />
            </svg>
            This is your University of York Student ID / Enrolment Number and
            not your UCAS number.
          </div>
          <!-- {/if} -->
          <div class="mb-2">
            <label
              >{field_name}
              <!-- {if field_required}  -->
              <span class="text-red-600">* Required</span>
              <!-- {/if} -->
            </label>
            <!-- {if field_type == "A" || field_type == "S" || field_type == "Y"} -->
            <textarea
              class="form-input"
              name="field[{field_id}]"
              type="text"
              value="{field_value}"
            ></textarea>
            <!-- {if field_type == "S"} -->
            <small class="mt-4 font-thin"
              >Only characters a-z, A-Z and spaces are permitted.</small
            >
            <!-- {/if} -->
            <!-- {if:elseif field_type == "E"} -->
            <input
              class="form-input"
              name="field[{field_id}]"
              type="email"
              value="{field_value}"
            />
            <!-- {if:elseif field_type == "N"} -->
            <input
              class="form-input"
              name="field[{field_id}]"
              type="number"
              min="{field_min}"
              max="{field_max}"
              value="{field_value}"
            />
            <small class="mt-4 font-thin"
              >A number between {field_min} and {field_max}.</small
            >
            <!-- {if:elseif field_type == "D"} -->
            <div>
              <select
                name="field[{field_id}]"
                class="form-select"
                aria-label="{field_name}"
              >
                <!-- {field_options} -->
                <option value="{option_id}">{option_value}</option>
                <!-- {/field_options} -->
              </select>
              <!-- {/if} -->
            </div>
          </div>
          <!-- {/fields} -->
          <div class="mt-2">
            <input
              type="submit"
              class="btn btn-primary flex w-fit items-center"
              value="Add to Basket"
            />
          </div>
        </form>
      </div>
      <!-- {/if} -->
    </div>
  </main>
  <Footer />
</template>

<script>
import Button from "../../components/button/button.ce.vue";
import Navbar from "../../components/Navbar/navbar.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";

export default {
  name: "ShopOldFields",
  components: {
    Navbar,
    Footer,
    Button,
  },
  props: {
    image: {
      type: String,
      default:
        "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Blue.webp",
    },
    title: {
      type: String,
      default: null,
    },
    price: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    productId: {
      type: Number,
      default: null,
    },
  },
};
</script>
