import { useContext } from "react";
import { CounterContext } from "./global_content";
import { Text } from "react-native";

const CounterMainScreen = () => {
    const counter = useContext(CounterContext);

    <CounterContext.Provider value={counter + 1}>
        <CounterScreen />
    </CounterContext.Provider>
}


const CounterScreen = () => {
    const counter = useContext(CounterContext);
    return <Text>{counter}</Text>
}

export default CounterScreen;