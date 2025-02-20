import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RootNavigator from "./navigators/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onSuccess(data, query) {
      console.log(`[========== ${JSON.stringify(query.queryKey)} ==========]`);
    },
  }),
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
        <StatusBar />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
