<template>
    <nav>
        <v-navigation-drawer
                v-model="drawer"
                right
                app
        >
            <v-sheet
                color="sLightBlue"
                class="pa-4"
            >
                <v-avatar
                    class="mb-2"
                    color="sYellow"
                    size="64"
                >
                    <img 
                        src="..\src\assets\temp\woman-avatar.jpg" 
                        alt="Suzanne"
                    >
                </v-avatar>

                <div><b>Suzanne Cowler</b><br>suze@stockpileapp.au</div>
                
            </v-sheet>

            <v-divider></v-divider>

            <v-list>
                <v-list-item
                v-for="[icon, text] in links"
                :key="icon"
                link
                >
                <v-list-item-icon>
                    <v-icon>{{ icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ text }}</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
                
            </v-list>
            
        </v-navigation-drawer>
        <v-app-bar app dark color="sDarkBlue">
            <!--<v-toolbar-title 
                class="font-weight-black display-1 sWhiteBlue--text"
            >
                <span>STOCKPILE</span>
                <span class="font-weight-light">APP</span>
            </v-toolbar-title>-->
            <v-img
                src="../assets/nologolargewhite.svg"
                max-width="12rem"
                min-width="200px"
                height="3rem"
                class="mr-4"
            >
            </v-img>
            <v-spacer></v-spacer>
            <!--<v-btn 
                depressed 
                color="sBlue" 
                append-icon="mdi-plus" 
                class="ml-4 hidden-xs-only"
            >
                Add
                <v-icon right>mdi-plus</v-icon>
            </v-btn>-->
            <!--<v-btn depressed color="#54a3eb" append-icon="mdi-plus">
                Settings
                <v-icon right>mdi-cog</v-icon>
            </v-btn>-->
            <v-form class="hidden-xs-only">
                <v-container>
                    <v-text-field 
                        label="Search..." 
                        hide-details 
                        solo-inverted
                        flat
                        text
                        dense
                        append-icon="mdi-magnify">
                    </v-text-field>
                </v-container>
            </v-form>
            <!--<v-btn 
                depressed 
                class="hidden-xs-only" 
                fab 
                x-small 
                light 
                color="sYellow"
            >
                <v-icon>mdi-account</v-icon>
            </v-btn>-->
            <v-btn
                text
                small
                color="sWhite"
                fab
                @click="drawer = !drawer"
                
            >
                <v-icon>mdi-menu</v-icon>
            </v-btn>
            
        </v-app-bar>
        
    </nav>
</template>

<script>
//import { defineComponent } from '@vue/composition-api'

export default {
  data: () => ({ 
    drawer: null,
    links: [
      ['mdi-inbox-arrow-down', 'Dashboard'],
      ['mdi-send', 'All items'],
      ['mdi-pencil', 'Create'],
      ['mdi-cog', 'Settings'],
      ['mdi-close', 'Logout'],
    ],
  })
}
</script>
