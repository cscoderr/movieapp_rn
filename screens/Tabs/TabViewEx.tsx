import * as React from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import MoviesScreen from './MoviesScreen';
import TVShowsScreen from './TvShowsScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const FirstRoute = () => {
    return <Text>First</Text>
}

const SecondRoute = () => {
    return <Text>Second</Text>
}

const renderScene = SceneMap({
    first: MoviesScreen,
    second: TVShowsScreen,
    third: SecondRoute,
    fourth: SecondRoute,
  });

const routes = [
  { key: 'first', title: 'Popular' },
  { key: 'second', title: 'Now Playing' },
  { key: 'third', title: 'Upcoming' },
  { key: 'fourth', title: 'Top Rated' },
];

const renderTabBar = props => (
    <TabBar
      {...props}
      activeColor='tomato'
      inactiveColor='grey'
      pressOpacity={0.5}
      gap={0}
      indicatorStyle={{ backgroundColor: 'tomato' }}
      style={{ backgroundColor: 'white', borderWidth: 0 }}
    />
  );

export default function TabViewEx() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      pagerStyle={{backgroundColor: "white"}}
      lazy
      swipeEnabled={false}
    />
    </SafeAreaView>
  );
}

