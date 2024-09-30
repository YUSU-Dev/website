<template>
  <div id="skiptocontent"><a href="#maincontent">skip to main content</a></div>
  <Navbar />
  <main id="maincontent">
    {if type_count == 0}
    <section class="my-4 py-4">
      <div class="container mx-auto flex flex-col justify-center pt-4">
        <div class="border-l-4 border-red-400 bg-red-100 p-2">
          <h2 class="text-xl">Sorry!</h2>
          <p>This service isn't currently enabled. Please try again later.</p>
        </div>
      </div>
    </section>
    {if:else}
    <section class="my-4 py-4">
      <div class="container mx-auto flex flex-col justify-center pt-4">
        <form id="associate-login" method="post" class="">
          <div>
            <h1 class="text-2xl font-bold">Associate Member Registration</h1>
          </div>
          {if errors != ""}
          <div class="border-l-4 border-red-400 bg-red-100 p-2">
            <h2 class="text-xl">Uh oh! There appears to be a few errors...</h2>
            <p>{errors}</p>
          </div>
          {/if} {if success}
          <div class="border-l-4 border-green-400 bg-green-100 p-2">
            <h2 class="text-xl">Success!</h2>
            <p>
              Your submission has been received! A member of staff will now
              review it and be in contact with the login information if
              successful.
            </p>
          </div>
          {/if}

          <div>
            <div class="mb-2">
              <label class="mb-2" for="title"
                >Title <span class="text-red-600">* Required</span></label
              >
              <select
                id="title"
                name="title"
                class="form-input"
                autocomplete="honorific-prefix"
                required
              >
                <option disabled selected hidden>Select an option...</option>
                <option>Mr</option>
                <option>Miss</option>
                <option>Mrs</option>
                <option>Mx</option>
                <option>Ms</option>
                <option>Dr</option>
                <option>Professor</option>
              </select>
            </div>

            <div class="mb-2">
              <label for="first_name"
                >First Name <span class="text-red-600">* Required</span></label
              >
              <input
                id="first_name"
                name="first_name"
                class="form-input"
                type="text"
                placeholder="First Name"
                autocomplete="given-name"
                required
              />
            </div>

            <div class="mb-2">
              <label for="last_name"
                >Last Name <span class="text-red-600">* Required</span></label
              >
              <input
                id="last_name"
                name="last_name"
                class="form-input"
                type="text"
                placeholder="Last Name"
                autocomplete="family-name"
                required
              />
            </div>

            <div class="mb-2">
              <label for="gender"
                >Gender <span class="text-red-600">* Required</span></label
              >
              <select
                id="gender"
                name="gender"
                class="form-input"
                autocomplete="sex"
                required
              >
                <option disabled selected hidden>Select an option..</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="N">Other</option>
                <option value="N">Prefer Not To Say</option>
              </select>
            </div>

            <div class="mb-2">
              <label for="dob"
                >Date of Birth
                <span class="text-red-600">* Required</span></label
              >
              <input
                id="dob"
                name="dob"
                class="form-input"
                autocomplete="bday"
                type="date"
                placeholder="15/01/1997"
                required
              />
            </div>

            <div class="mb-2">
              <input
                id="address1"
                name="address1"
                class="form-input"
                type="hidden"
                value="Redacted"
                placeholder="University of York Students' Union"
                required
              />
            </div>

            <div class="mb-2">
              <input
                id="postcode"
                name="postcode"
                class="form-input"
                type="hidden"
                value="YO10 5DD"
                placeholder="YO10 5DD"
                required
              />
            </div>

            <div class="mb-2">
              <label for="email_address"
                >E-mail Address
                <span class="text-red-600">* Required</span></label
              >
              <input
                id="email_address"
                name="email_address"
                class="form-input"
                type="email"
                placeholder="email@yorksu.org"
                autocomplete="email"
                required
              />
            </div>

            <div class="mb-2">
              <!-- <label for="phone_number">Phone Number <span class="text-red-600">* Required</span></label> -->
              <input
                id="phone_number"
                name="phone_number"
                class="form-control rounded-0"
                type="hidden"
                value="0"
                placeholder="07770777077"
                autocomplete="tel"
              />
            </div>

            <div class="mb-2">
              <label class="g-mb-10" for="type"
                >Membership Type
                <span class="text-red-600">* Required</span></label
              >
              <select id="type" name="type" class="form-input">
                <option disabled selected hidden>Select an option...</option>
                {types}
                <option name="type_{type_name}" value="{type_id}">
                  {type_name}
                </option>
                {/types}
              </select>
            </div>

            <div class="mb-2">
              <label class="g-mb-10" for="reason_for_application"
                >Reason for application</label
              >
              <input
                id="reason_for_application"
                name="reason_for_application"
                class="form-input"
                type="text"
                placeholder="Reason for Application"
              />
            </div>

            <div class="mb-2">
              <button
                type="submit"
                class="btn btn-primary g-recaptcha flex w-fit items-center"
                data-sitekey="6LfcJtoZAAAAAMy0Tlo5ctL0Ald0Thn3dUR4GJtc"
                data-callback="onSubmit"
                data-action="submit"
              >
                Submit Application
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </main>
  <Footer />
</template>

<script>
import Navbar from "../../../components/Navbar/navbar.ce.vue";
import Footer from "../../../components/Footer/footer.ce.vue";
export default {
  name: "AssociateApply",
  components: {
    Navbar,
    Footer,
  },
};
</script>
