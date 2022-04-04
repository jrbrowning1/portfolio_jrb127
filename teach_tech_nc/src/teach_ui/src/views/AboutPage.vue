<template>
    <div>
        <h1><strong>About Us</strong></h1>
        <div id="about">
           <h2><strong>Our Mission</strong></h2>
           <p>
                The mission of Teach Tech NC is to provide high school teachers with
                appropriate and relevant technology education resources that apply to
                specific North Carolina educational standards.
            </p>
            <h2><strong>Our Team</strong></h2>
            <div>
                <b-container
                    fluid
                >
                    <b-row cols="1" cols-sm="2" cols-md="3" cols-lg="4">
                        <b-col
                            v-for="(name, i) in names"
                            :key="i"
                            col
                            no-gutters
                            class="mb-2"
                        >
                            <b-card
                                :title="name"
                                :img-src="pic[i]"
                                :img-alt="name"
                                img-top
                            >
                            </b-card>
                        </b-col>
                    </b-row>
                </b-container>
            </div>
        </div>
    </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import Jonathan from '@/assets/jonathan.jpg';
// eslint-disable-next-line import/no-unresolved
import Skylar from '@/assets/skylar.jpeg';
// eslint-disable-next-line import/no-unresolved
import Krista from '@/assets/krista.png';
// eslint-disable-next-line import/no-unresolved
import Kam from '@/assets/kam.png';

export default {
    data() {
        return {
            onePath: '@/assets/jonathan.jpg',
            picturePaths: [
                '@/assets/jonathan.jpg',
                '@/assets/krista.png',
                '@/assets/skylar.jpeg',
                '@/assets/kam.png',
            ],
            names: [
                'Jonathan', 'Krista', 'Skylar', 'Kam',
            ],
            pic: [
                Jonathan,
                Skylar,
                Krista,
                Kam,
            ],
        };
    },
};
</script>

<style scoped>
#about {
    text-align: left;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 30px;
}

p {
    font-size: 20px;
}
</style>
