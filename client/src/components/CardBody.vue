<template>
    <v-container fluid> 
        <h1 align="" class="mb-3 ml-2">Recent purchases</h1>
        <v-row>
            <v-col 
                v-bind:key="a.cID"
                v-for="a in items"
                cols="12" 
                sm="6" 
                md="4" 
                lg="3"
            >   
                <CardItem
                    :itemName="a.cName"
                    :id="a.cID"
                    :price="a.cPrice"
                    :date="a.cDate"
                    :cat="a.cCat"
                    :buyer="a.cBuyer"
                    :buyerID="a.cBuyerID"
                    :img="a.cImg"
                    :desc="a.cDesc"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import CardItem from './CardItem'

export default {
  name: 'CardBody',

  components: {
    CardItem
  },

  data: () => ({
    items: [
        {cName: 'lorde melodrama album lorem ipsum dolor sit amet', cID: '439834891304460729124595', 
         cPrice: '20', cDate: '09/09/2022', cCat: 'Entertainment', cBuyer: 'Lachlan', 
         cBuyerID: '123', cImg: 'https://i.ytimg.com/vi/ee5eakyG8c0/maxresdefault.jpg', 
         cDesc: 'lorde melodrama is an album enjoyed by many people'},
        {cName: 'potato', cID: '986985104092690793014958', 
         cPrice: '100000', cDate: '09/09/2009', cCat: 'Food', cBuyer: 'Brad', 
         cBuyerID: '123', cImg: 'https://stoller.com.au/wp-content/uploads/2019/03/potato_crop.jpg', 
         cDesc: 'actually, you will find that a potato is, in fact, a type of food that is edible'},
        {cName: 'chair', cID: '538258958460101598435863', 
         cPrice: '78.56', cDate: '17/10/2022', cCat: 'Furniture', cBuyer: 'andrea', 
         cBuyerID: '123', cImg: 'https://www.ikea.com/au/en/images/products/stefan-chair-brown-black__0727320_pe735593_s5.jpg', 
         cDesc: 'chair'},
    ],
  }),
};

</script>
