<template>
    <div>
        <!-- used resource 2 to inform design -->
        <b-container
            fluid
            v-for="(topic, y) in topicContent"
            :key="y"
        >
            <br>
            <h3 class="underline">
                <strong>{{topic.title}}</strong>
            </h3>
            <b-row cols="1" cols-sm="2" cols-md="3" cols-lg="4">
                <b-col
                    v-for="(resource, i) in topic.resources"
                    :key="i"
                    col
                    no-gutters
                    class="mb-2"
                >
                    <b-card
                        border-variant="primary"
                        no-body
                    >
                        <div id="saved">
                            <b-button id="saved-button" size="sm" variant="outline-danger">
                                <span v-if="savedResource">
                                    <b-icon-bookmark-fill></b-icon-bookmark-fill>
                                </span>
                                <span v-else>
                                    <b-icon-bookmark></b-icon-bookmark>
                                </span>
                            </b-button>
                        </div>
                        <b-card-title class="card-title">
                            <strong>{{resource.name}}</strong>
                        </b-card-title>
                        <b-tabs pills card end small>
                            <b-tab title="Resource" active>
                                <b-card-text>
                                    This is where a brief summary of the resource will go
                                </b-card-text>
                                <b-button
                                    v-b-toggle="'collapse'+hash(resource.name, topic.title)"
                                    variant="outline-primary" class="more-info" >
                                    Details
                                    <b-icon-caret-down-square aria-hidden="true" class="icon">
                                    </b-icon-caret-down-square>
                                </b-button>
                                <b-collapse
                                    :id="'collapse'+hash(resource.name, topic.title)"
                                    class="mt-2"
                                >
                                    <b-list-group>
                                        <strong>Links</strong>
                                        <b-list-group-item
                                            button
                                            v-for="url in resource.url"
                                            :key="url.id"
                                            @click="newTab(url.link)"
                                        >
                                            {{url.name}}
                                        </b-list-group-item>
                                    </b-list-group>
                                    <br>
                                    <b-card-text>
                                        <strong>Source:</strong> {{resource.source}}
                                    </b-card-text>
                                </b-collapse>
                            </b-tab>
                            <b-tab title="Standards">
                                <b-card
                                    v-for="standard in resource.standards"
                                    :key="standard.id"
                                >
                                    <b-button
                                        v-b-toggle="'collapse'+hash(resource.name+standard.code)"
                                        variant="outline-success" class="more-info"
                                    >
                                        {{standard.code}}
                                    <b-icon-caret-down-square aria-hidden="true" class="icon">
                                    </b-icon-caret-down-square>
                                    </b-button>
                                    <b-collapse
                                        :id="'collapse'+hash(resource.name+standard.code)"
                                        class="mt-2"
                                    >
                                        <b-card-text>
                                            <strong>Subject:</strong> {{standard.subject}}
                                            <br>
                                            <strong>Standard text:</strong> {{standard.text}}
                                        </b-card-text>
                                    </b-collapse>
                                </b-card>
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { BIconCaretDownSquare, BIconBookmark, BIconBookmarkFill } from 'bootstrap-vue';

export default {
    name: 'ResourceCards',
    components: {
        BIconCaretDownSquare,
        BIconBookmark,
        BIconBookmarkFill,
    },
    props: {
        topicContent: Array,
    },
    data() {
        return {
            savedResource: false,
        };
    },
    methods: {
        newTab(linkLocation) {
            console.log('the link location is ', linkLocation);
            window.open(linkLocation);
        },
        // adapted from resource 3
        hash(ogName, topic) {
            // from resource 4
            // const name = str.replace(/\s+/g, '');
            const name = ogName + topic;
            // console.log('combined the two strings to form ', name);
            // console.log('the og string is ', name);
            let hash = 0; let i; let
                chr;
            if (name.length === 0) return hash;
            // eslint-disable-next-line no-plusplus
            for (i = 0; i < name.length; i++) {
                chr = name.charCodeAt(i);
                // eslint-disable-next-line no-bitwise
                hash = ((hash << 5) - hash) + chr;
                // eslint-disable-next-line no-bitwise
                hash |= 0; // Convert to 32bit integer
            }
            // console.log('the hash is ', hash);
            return hash;
        },
    },
};
</script>

<style scoped>

.card:hover {
    transform: scale(1.05);
}

.underline {
    text-decoration: underline;
}

.more-info {
    width: 100%;
}

.icon {
    float: right;
}

.card-title {
    padding: 2px;
}

#saved {
    margin: 2px;
}

#saved-button {
    float: right;
    padding: 0;
    border: none;
    /* background: none; */
}

</style>
