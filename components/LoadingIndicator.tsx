import { ActivityIndicator, StyleSheet } from "react-native"

const LoadingIndicator = () => {
    return <ActivityIndicator size={'large'} style={styles.indicator}/>
}

const styles = StyleSheet.create({
    indicator: {
        flex: 1,
        justifyContent: 'center', alignItems: 'center'
    }
})

export default LoadingIndicator;