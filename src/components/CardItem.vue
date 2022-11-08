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
                    {{mdiIcons[cat]}}
                </v-icon>
                <span style="display: inline; line-height: 24px;">
                    {{itemName}}
                </span>
            </v-card-title>

            <v-img
                class="white--text align-end mb-2"
                height="200px"
                :src="img"
            >
            </v-img>

            <div style="display: flex; 
                        justify-content: space-around"
            >
                <v-chip color="sWhiteBlue" class="">
                    <v-icon left>mdi-currency-usd</v-icon>
                    {{numberWithCommas(parseFloat(price).toFixed(2))}}
                </v-chip>
                <v-chip color="sWhiteBlue">
                    <v-icon left>mdi-calendar</v-icon>
                    {{date}}
                </v-chip>
            </div>

            <v-card-text class="text--primary pt-2 pb-2">
                <p class="mb-0">{{desc}}</p>
            </v-card-text>

            <v-card-actions style="display: flex; 
                            flex-wrap; nowrap;
                            justify-content: space-around;">
                <v-dialog
                    v-model="dialog"
                    width="800"
                    v-if="showEdit==true"
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

                    <CardModal 
                        :itemName="itemName"
                        :id="id"
                        :price="price"
                        :date="date"
                        :cat="cat"
                        :buyer="buyer"
                        :buyerID="buyer"
                        :img="img"
                        :desc="desc"
                        :rawDate="rawDate"
                    />
                    
                </v-dialog>

                <v-chip
                    color="sLightBlue"
                    elevation="0"
                    class="mx-0"
                >
                    <v-icon left>mdi-account</v-icon>
                    {{buyer}}
                </v-chip>
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

  components: {
    CardModal
  },
  data () {
    return {
      dialog: false,
      mdiIcons: {Entertainment: 'mdi-movie', Furniture: 'mdi-seat', Food: 'mdi-food'},
    }
  },
  props: {
    itemName: String,
    id: String,
    price: String,
    date: String,
    cat: String,
    buyer: String,
    buyerID: String,
    img: String,
    desc: String,
    rawDate: String,
    showEdit: Boolean
  },
  methods: {
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }, replaceBlankImages(image) {
      return image == "NULL"
        ? "https://storage.googleapis.com/stockpileapp/StockpileBLUENOTXT.png"
        : image;
    },
  }
};


</script>
