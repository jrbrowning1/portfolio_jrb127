<template>
    <div>
        <b-navbar type="light" variant="accent">
            <b-navbar-brand>
                <h1>Teach Tech NC</h1>
            </b-navbar-brand>
            <b-navbar-nav class="ml-auto">
                <b-nav-item>
                    <router-link to="/">Home</router-link>
                </b-nav-item>
                <b-nav-item>
                    <router-link to="/about">About</router-link>
                </b-nav-item>
                <b-nav-item>
                    <router-link to="/curriculum">Curriculum Database</router-link>
                </b-nav-item>
                <b-nav-item>
                    <router-link to="/partners">Student Curriculum Partners</router-link>
                </b-nav-item>
                <b-nav-item>
                    <router-link to="/user">Profile</router-link>
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<style scoped>

h1 {
    font-family: "AstroSpace";
}
</style>
