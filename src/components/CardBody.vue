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
        {cName: 'potato', cID: '986985104092690793014958', 
         cPrice: '100000', cDate: '09/09/2009', cCat: 'Food', cBuyer: 'Brad', 
         cBuyerID: '123', cImg: 'https://stoller.com.au/wp-content/uploads/2019/03/potato_crop.jpg', 
         cDesc: 'was old and starchy. 4/10'},
        {cName: 'lorde melodrama album', cID: '439834891304460729124595', 
         cPrice: '20', cDate: '09/09/2022', cCat: 'Entertainment', cBuyer: 'Lachlan', 
         cBuyerID: '123', cImg: 'https://i.ytimg.com/vi/ee5eakyG8c0/maxresdefault.jpg', 
         cDesc: 'lorde is my favourite song'},
        {cName: 'chair', cID: '538258958460101598435863', 
         cPrice: '78.56', cDate: '17/10/2022', cCat: 'Furniture', cBuyer: 'andrea', 
         cBuyerID: '123', cImg: 'https://www.ikea.com/au/en/images/products/stefan-chair-brown-black__0727320_pe735593_s5.jpg', 
         cDesc: 'chair'},
         {cName: 'qantas flight to dubbo', cID: '769829385094603945140945', 
         cPrice: '149.99', cDate: '25/10/2020', cCat: 'Entertainment', cBuyer: 'quentin', 
         cBuyerID: '123', cImg: 'https://www.qantas.com/images/qantas/aircraft/exterior/boeing-787-dreamliner/jpg/article.mobile.jpg', 
         cDesc: 'at least i got to watch air bud'},
         {cName: 'st kilda saints membership (burned)', cID: '769829385094603945140945', 
         cPrice: '149.99', cDate: '13/10/2022', cCat: 'Food', cBuyer: 'brett', 
         cBuyerID: '123', cImg: 'https://library.sportingnews.com/styles/crop_style_16_9_mobile_2x/s3/2021-08/st-kilda-fan-burn-membership_w1uraiyez6xi1e0th1deeahqs.png', 
         cDesc: 'i don\'t event like football haha :)'},
         {cName: 'optus', cID: '666666666666666666666666', 
         cPrice: '1000000', cDate: '23/08/2005', cCat: 'Entertainment', cBuyer: 'gladys', 
         cBuyerID: '123', cImg: 'https://www.crikey.com.au/wp-content/uploads/2022/09/Optus_740x400-1.jpg', 
         cDesc: 'more like,, , opt out hahahaha@!'},
    ],
  }),
};

</script>
