import "node-libs-react-native/globals";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MainView from "./src/views/MainView";
import {Colors, Spacing} from "./src/common/styles/styles";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MainView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Spacing.LG
  },
});
