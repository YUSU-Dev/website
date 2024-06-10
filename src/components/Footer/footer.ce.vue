<template>
  <footer id="footer">
    <div class="w-full bg-black">
      <div class="sm:px8 container mx-auto px-6 pb-12 pt-6 lg:px-6">
        <h1 class="sr-only">Footer</h1>
        <div
          class="flex flex-col gap-y-12 py-4 text-white lg:grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-0 xl:gap-x-12"
        >
          <div class="flex flex-col gap-y-6 border-white pr-2 lg:border-r-2">
            <div>
              <a href="/">
                <img
                  src="https://assets-cdn.sums.su/YU/website/img/yorksu-logo-white-full.png"
                  alt="YorkSU Logo"
                  class="w-52"
                />
              </a>
            </div>
            <div class="hidden text-xs lg:flex">
              <ul class="flex flex-col gap-y-1">
                <li>
                  Registered in England and Wales | Charity Registration
                  #1173404
                </li>
                <li>Charity Company #10688097 | VAT #GB272458389</li>
                <li>
                  © University of York Students' Union 2024 | All rights
                  reserved | Powered by
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
            class="flex flex-col gap-y-10 border-b-[1px] border-white pb-16 lg:flex-row lg:gap-x-4 lg:gap-y-0 lg:border-none lg:pb-0 xl:gap-x-6"
          >
            <div class="flex flex-col gap-y-4">
              <div>
                <h2 class="text-xl">Useful Links</h2>
              </div>
              <div class="flex gap-x-6 text-sm">
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
                      <a href="https://apply.yorksu.org" target="_blank"
                        >Jobs</a
                      >
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
                      <a
                        href="/about-us/organisational-policies/terms-conditions"
                        >Terms & Conditions</a
                      >
                    </li>
                    <li>
                      <a
                        href="/about-us/organisational-policies/data-protection"
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
                    <a href="mailto:reception@yorksu.org"
                      >reception@yorksu.org</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="flex text-xs lg:hidden">
            <ul class="flex flex-col gap-y-3">
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
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "Footer",
  props: {},
  methods: {},
};
</script>
