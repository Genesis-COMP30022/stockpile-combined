<template>
    <div>
        <v-card
            class="mx-auto"
            max-width="400"	
        >
            <v-card-title 
                style="word-break: break-word; 
                        display: flex;
                        flex-wrap: nowrap
                        "
            >
                <v-icon 
                    class="mr-3 d-inline" 
                    style="display: inline">
                    mdi-movie
                </v-icon>
                <span style="display: inline; line-height: 24px;">
                    lorde melodrama album lorem ipsum dolor sit amet
                </span>
            </v-card-title>
            <v-img
                class="white--text align-end mb-2"
                height="200px"
                src="https://i.ytimg.com/vi/ee5eakyG8c0/maxresdefault.jpg"
            >
            </v-img>

            <v-card-actions style="display: flex; 
                            flex-wrap; nowrap;
                            justify-content: space-around;">
                <v-dialog
                    v-model="dialog"
                    width="500"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="sYellow"
                            elevation="0"
                            v-bind="attrs"
                            v-on="on"
                        >
                            Expand
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-title class="text-h5 grey lighten-2">
                        more info on lorde
                        </v-card-title>

                        <v-card-text>
                        she is from the country new zealand. she makes music that is enjoyed by many people. 
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="sLightBlue"
                            text
                            @click="dialog = false"
                        >
                            I accept
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-btn
                    color="sYellow"
                    elevation="0"
                >
                    Hello
                </v-btn>
                <v-btn
                    color="sLightBlue"
                    elevation="0"
                    class="mx-0"
                >
                    World
                </v-btn>
            </v-card-actions>

            <v-card-subtitle class="pb-0">
                Replace later based on sketch
            </v-card-subtitle>

            <v-card-text class="text--primary">
                <div>Information</div>

                <div>Lorde is good, probably</div>
            </v-card-text>
        </v-card>
        <!--<CardModal
            v-show="isModalVisible"
            @close="closeModal"
        />-->
    </div>
</template>

<script>

//import CardModal from './CardModal';

export default {
  name: 'CardItem',
  components: {

  },
  data () {
    return {
      dialog: false,
    }
  }
};


</script>

<!--
data() {
      return {
        isModalVisible: false,
      };
    },
    methods: {
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      }
    }
-->