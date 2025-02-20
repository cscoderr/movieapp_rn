import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import DetailsScreen from "../screens/DetailsScreen";
import { Movie } from "../types";
import AllScreen from "../screens/AllScreen";
import SettingsScreen from "../screens/Tabs/Settings";

export type StackParamsList = {
  Main: undefined;
  Details: { movie: Movie };
  All: { title: string; type: string };
  Settings: undefined;
};
const Stack = createNativeStackNavigator<StackParamsList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen
        name="All"
        component={AllScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
