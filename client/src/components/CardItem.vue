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

            <v-card-text class="text--primary pt-2 pb-2">
                <div>Information</div>

                <div>Lorde is good, probably</div>
            </v-card-text>

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
                            <v-icon left>mdi-wrench</v-icon>
                            Edit
                        </v-btn>
                    </template>

                    <CardModal @exit="closeModal"/>
                    
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

        </v-card>
        <!--<CardModal
            v-show="isModalVisible"
            @close="closeModal"
        />-->
    </div>
</template>

<script>

import CardModal from './CardModal';

export default {
  name: 'CardItem',
  itemNames: ['lorde melodrama album lorem ipsum dolor sit amet'],
  itemPrices: [20],
  itemDates: ['06/06/2022'],
  itemCats: ['Entertainment'],
  itemBuyers: ['Lachlan'],
  itemImages: ['https://i.ytimg.com/vi/ee5eakyG8c0/maxresdefault.jpg'],
  itemDescs: ['lorde melodrama is an album. lorde is a new zealand artist who is liked by many people.'],
  components: {
    CardModal
  },
  data () {
    return {
      dialog: false,
    }
  },
  methods: {
      closeModal() {
        
      }
    }
};


</script>
