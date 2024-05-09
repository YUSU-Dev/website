<template>
    <div class="w-full bg-[#F4E9E1]">
        <div class="container mx-auto flex justify-between">
            <div class="my-7">
                <img class="h-[77px]" src="https://assets-cdn.sums.su/YU/IMG/Website/new_logo_beige.png" alt="University of York Students' Union" />
            </div>
            <div class="flex flex-col my-5">
                <div class="flex mb-4 text-sm">
                    <button class="bg-black hover:bg-white text-white hover:text-black px-4 py-1" aria-label="Listen with the ReachDeck Toolbar" title="Listen with the ReachDeck Toolbar" type="button">Accessibility Tools</button>
                    <a class="bg-black hover:bg-white text-white hover:text-black ml-3 px-4 py-1">Associate Sign In</a>
                    <a class="bg-black hover:bg-white text-white hover:text-black ml-3 px-4 py-1">Student Sign In</a>
                </div>
                <div class="flex justify-end items-center">
                    <a><i class="fa-solid fa-magnifying-glass text-3xl"></i></a>
                    <a><i class="fa-solid fa-basket-shopping text-3xl ml-6"></i></a>
                    <button class="ml-12 text-4xl" @click="toggleNavbar" aria-label="Toggle the website navigation bar" title="Toggle the website navigation bar" type="button"><i class="fa-sharp fa-solid fa-bars"></i></button>
                </div>
            </div>
        </div>
        <div class="navbar container mx-auto hidden">
            <div class="flex justify-between">
                <p>Home</p>
                <p>Programs</p>
                <p>Admissions</p>
                <p>Student Services</p>
                <p>Alumni</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    methods: {
        toggleNavbar() {
            document.querySelector('.navbar').classList.toggle('hidden');
        }
    }
}
</script>