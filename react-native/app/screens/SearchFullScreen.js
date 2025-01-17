import globalStyle from "../../assets/style/globalStyle"
import { useState, useEffect } from 'react/cjs/react.development';
import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TextInput, Image, ScrollView, TouchableWithoutFeedbackBase} from 'react-native';
import FullPageScreen from "./FullPageScreenTypeNoScroll";
import axios from "axios";


export default function WelcomeScreen({navigation, route}) {

    const [search, setSearch] = useState("");
    let searchTextInput = React.createRef();
    const [searchHistory, setSearchHistory] = useState([]);
    useEffect(() => {
      if (searchTextInput.current != null && searchTextInput.current) {
        searchTextInput.current.focus();
      }

      axios.get(window.api_prefix+"/searchHistory").then(resp=>{
        let {groupsHistory, communitiesHistory} = resp.data;
        let mergedSearchHistory = groupsHistory.concat(communitiesHistory);
        mergedSearchHistory = mergedSearchHistory.map(entry=>{
          entry.timestamp = new Date(entry.timestamp);
          return entry;
        });
        mergedSearchHistory.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1);
        setSearchHistory(mergedSearchHistory);
      }).catch();

      }, []);

    function handleTextChange(e){
        setSearch(e);
    }

    let searchResults = [
        {
            text:"Bitcoin (BTC)"
        },
        {
            text:"GBP/USD"
        }
    ]

   let searchContent;
   if(search.length == 0){
    searchContent = (
        <ScrollView style={styles.searchResultScrollView}>
            <View style={styles.sectionView}>
                <Text style={globalStyle.title2}>Recent searches</Text>
            </View>
            <View style={styles.sectionView}>
                {
                searchHistory.map((query, key) => {
                    return (
                    <View key={key} style={styles.searchResultTextParentContainer}>
                        <Image source={require("../../assets/icons/history.png")} style={styles.searchSmallIcon} /> 
                        <View key={key} style={styles.searchResultTextContainer}>
                            <Text>{query.name}</Text>
                        </View>
                    </View>
                    
                    );
                })
                }
            </View>
        </ScrollView>
    );
   }else{
       searchContent = (
        <ScrollView style={styles.searchResultScrollView}>
        <View style={styles.sectionView}>
            <Text style={globalStyle.title2}>Search results</Text>
        </View>
        <View style={styles.sectionView}>
            {
            searchResults.map((query, key) => {
                return (
                <View key={key} style={styles.searchResultTextParentContainer}>
                    <Image source={require("../../assets/icons/search.png")} style={styles.searchSmallIcon} /> 
                    <View key={key} style={styles.searchResultTextContainer}>
                        <Text>{query.text}</Text>
                    </View>
                </View>
                );
            })
            }
        </View>
    </ScrollView>
       );
   }

  return (
      <FullPageScreen pageName={"Search"} navigation={navigation}>
        <View style={{flex:1}}>
            <View style={styles.sectionView}>
                <View style={styles.searchBoxAround}>
                    <Image source={require("../../assets/icons/search.png")} style={styles.searchIcon}/>
                    <TextInput multiline={false} blurOnSubmit={true} style={[globalStyle.regularText, styles.textInput]} ref={searchTextInput} placeholder="Find traders and communities" value={search} onChangeText={handleTextChange} />
                    {
                        search.length > 0 ? <TouchableWithoutFeedback onPress={()=>{
                            setSearch("");
                        }}>
                            <Image source={require("../../assets/icons/x.png")} style={styles.searchIcon}/>
                        </TouchableWithoutFeedback> : null
                    }
                </View>
            </View>
            {searchContent}  
        </View>
      </FullPageScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionView:{
    width:"100%",
    paddingBottom:10,
    paddingLeft:15,
    paddingRight:15,
    paddingTop:10,
  },
  searchBoxAround:{
    width:"100%",
    borderColor:"black",
    borderWidth:1,
    padding:10,
    borderRadius:50,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-start",
  },
  textInput:{
    alignSelf:"stretch",
    flex:1,
    marginRight:10
  },
  searchIcon:{
    height:30,
    width:30,
    marginRight:10
  },
  searchSmallIcon:{
    height:20,
    width:20,
    marginRight:10
  },
  postCardContainer:{
    borderWidth:1,
    borderColor:"#000",
    padding:10,
    borderRadius:5
  },
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchResultScrollView:{
      flex:1
  },
  searchResultTextParentContainer:{
    width:"100%",
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center"
  },
  searchResultTextContainer:{
      borderBottomWidth:1,
      borderBottomColor:"#a1a1a1",
      paddingBottom:20,
    paddingTop:20,
    flex:1,
    alignSelf:"stretch"
  }
});
