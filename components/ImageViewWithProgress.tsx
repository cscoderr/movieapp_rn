import { Image, StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

type ImageViewWithProgessProps = {
  imageUri: string;
  progress: number;
};
const ImageViewWithProgess = ({
  imageUri,
  progress,
}: ImageViewWithProgessProps) => {
  let progressColor: string;
  if (progress >= 7) {
    progressColor = "#26CA67";
  } else if (progress >= 4) {
    progressColor = "#C9CF26";
  } else {
    progressColor = "#CF004E";
  }
  let backgroundColor: string;
  if (progress >= 7) {
    backgroundColor = "#19361E";
  } else if (progress >= 4) {
    backgroundColor = "#322F0D";
  } else {
    backgroundColor = "#440C28";
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: imageUri,
        }}
      />
      <View style={styles.progressViewContainer}>
        <AnimatedCircularProgress
          size={45}
          width={3}
          fill={progress * 10}
          tintColor={progressColor}
          onAnimationComplete={() => console.log("onAnimationComplete")}
          backgroundColor={backgroundColor}
          rotation={0}
        >
          {(_) => (
            <Text style={styles.progressViewText}>
              {(progress * 10).toFixed() + "%"}
            </Text>
          )}
        </AnimatedCircularProgress>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    marginBottom: 20,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    borderRadius: 15,
  },
  progressViewText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  progressViewContainer: {
    position: "absolute",
    backgroundColor: "#091619",
    height: 50,
    width: 50,
    borderRadius: 25,
    left: 10,
    bottom: -25,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ImageViewWithProgess;
