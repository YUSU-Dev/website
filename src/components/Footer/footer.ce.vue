<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
<template>
  <div class="w-full bg-black">
    <div class="container mx-auto pt-6 pb-12 px-6 sm:px8 lg:px-6">
      <h1 class="sr-only">Footer</h1>
      <div
        class="flex flex-col gap-y-12 lg:gap-y-0 lg:grid lg:grid-cols-2 text-white py-4 lg:gap-x-10 xl:gap-x-12"
      >
        <div class="flex flex-col gap-y-6 lg:border-r-2 border-white pr-2">
          <div>
            <img
              src="https://assets-cdn.sums.su/YU/website/img/yorksu-logo-white-full.png"
              alt="YorkSU Logo"
              class="w-52"
            />
          </div>
          <div class="hidden lg:flex text-xs">
            <ul class="flex flex-col gap-y-1">
              <li>
                Registered in England and Wales | Charity Registration #1173404
              </li>
              <li>Charity Company #10688097 | VAT #GB272458389</li>
              <li>
                © University of York Students' Union 2024 | All rights reserved
                | Powered by
                <a
                  href="https://sums.digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  >SUMS</a
                >
              </li>
            </ul>
          </div>
        </div>

        <div
          class="flex flex-col border-b-[1px] pb-16 lg:pb-0 border-white lg:border-none gap-y-10 lg:gap-y-0 lg:flex-row lg:gap-x-4 xl:gap-x-6"
        >
          <div class="flex flex-col gap-y-4">
            <div>
              <h2 class="text-xl">Useful Links</h2>
            </div>
            <div class="flex text-sm gap-x-6">
              <div>
                <ul class="flex flex-col gap-y-1">
                  <li>
                    <a
                      href="/about-us/organisational-policies/web-accessibility-statement"
                      >Accessibility Statement</a
                    >
                  </li>
                  <li><a href="/advertise-with-us">Advertise With Us</a></li>
                  <li>
                    <a
                      href="/about-us/organisational-policies/environmental-impact"
                      >Environment Impact</a
                    >
                  </li>
                  <li>
                    <a href="https://apply.yorksu.org" target="_blank">Jobs</a>
                  </li>
                </ul>
              </div>
              <div>
                <ul class="flex flex-col gap-y-1">
                  <li><a href="/about-us/staff">Our Staff</a></li>
                  <li>
                    <a href="/about-us/organisational-policies/refund-policy"
                      >Refund Policy</a
                    >
                  </li>
                  <li>
                    <a href="/about-us/organisational-policies/terms-conditions"
                      >Terms & Conditions</a
                    >
                  </li>
                  <li>
                    <a href="/about-us/organisational-policies/data-protection"
                      >Your Privacy</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-y-4">
            <div>
              <h2 class="text-xl">Contact Us</h2>
            </div>
            <div class="text-sm">
              <ul class="flex flex-col gap-y-1">
                <li>
                  <i class="fa-solid fa-phone mr-2"></i>
                  <a href="tel:+441904323724">01904 32 3724</a>
                </li>
                <li>
                  <i class="fa-solid fa-envelope mr-2"></i>
                  <a href="mailto:reception@yorksu.org">reception@yorksu.org</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="flex lg:hidden text-xs">
          <ul class="flex flex-col gap-y-3">
            <li>
              Registered in England and Wales | Charity Registration #1173404
            </li>
            <li>Charity Company #10688097 | VAT #GB272458389</li>
            <li>
              © University of York Students' Union 2024 | All rights reserved |
              Powered by
              <a
                href="https://sums.digital"
                target="_blank"
                rel="noopener noreferrer"
                >SUMS</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Footer",
  props: {},
  methods: {},
};
</script>
