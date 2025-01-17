import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import globalStyle from "../../../assets/style/globalStyle"
import { StyleSheet, Text, View, TextInput,SafeAreaView, Image, TouchableOpacity, Alert, TouchableNativeFeedback, Button, TouchableWithoutFeedback } from 'react-native';
import SemiFullPageScreen from "../SemiFullPageScreenType";
import CustomButton from "../../components/button";

export default function HomeScreen({navigation, route}) {
  return (
        <SemiFullPageScreen>
          <View style={styles.sectionView}>
            <Text style={globalStyle.title1}>Your account</Text>
          </View>
          <View style={styles.sectionView}>
            <Text style={[globalStyle.regularText, {marginBottom:20}]}>Sign in to start modifying your account's and payment's settings.</Text>
            <CustomButton onPress={()=>{navigation.navigate("signinScreen")}} style={{marginBottom:30}} title={"Sign in"}/>
            <TouchableWithoutFeedback onPress={()=>{navigation.navigate("signupScreen")}}>
              <Text style={[globalStyle.regularTextBold, {textDecorationLine:"underline", marginBottom:30}]}>Don't have an account? Sign up</Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.sectionView}>
          <TouchableNativeFeedback>
          <View style={styles.rowsContainer}>
            <Image style={styles.iconImage} source={require("../../../assets/icons/unverified.png")} />
            <Text style={globalStyle.regularText}>How WeTrade works</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback >
          <View style={styles.rowsContainer}>
            <Image style={styles.iconImage} source={require("../../../assets/icons/lightbulb.png")} />
            <Text style={globalStyle.regularText}>Get help</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback >
          <View style={styles.rowsContainer}>
            <Image style={styles.iconImage} source={require("../../../assets/icons/megaphone.png")} />
            <Text style={globalStyle.regularText}>Give feedback</Text>
          </View>
        </TouchableNativeFeedback>
          <TouchableNativeFeedback >
            <View style={styles.rowsContainer}>
            <Image style={styles.iconImage} source={require("../../../assets/icons/law.png")} />
              <Text style={globalStyle.regularText}>Terms of service</Text>
            </View>
          </TouchableNativeFeedback>
            <View style={styles.rowsContainer}>
              <Text style={globalStyle.regularText}>contact@wetrade.com</Text>
          </View>
          </View>
        </SemiFullPageScreen>
  );
}

const styles = StyleSheet.create({
  textContainer:{
    alignSelf:"stretch",
    flex:1
  },
  chevronImage:{
    width:20,
    height:40,
    alignSelf:"flex-end"
  },
  profilePhoto:{
    width:40,
    height:40,
    borderColor:"black",
    borderWidth:1,
    borderRadius:100
  },
  profilePhotoContainer:{
    marginRight:10
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
    borderRadius:50
  },
  TextWithBottomMargin:{
    marginBottom:5
  },
  postCardContainer:{
    borderWidth:1,
    borderColor:"#000",
    padding:15,
    borderRadius:10,
    marginBottom:10,
    flexDirection:"row",
    alignItems:"center"  
  },
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionDivisor:{
    width:"100%",
    height:40
  },
  rowsContainer:{
    width:"100%",
    paddingLeft:10,
    justifyContent:"center",
    height:60,
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center"
  },
  iconImage:{
    height:25,
    width:25,
    marginRight:10
  }
});
