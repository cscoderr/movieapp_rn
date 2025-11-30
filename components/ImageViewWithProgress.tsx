import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

type ImageViewWithProgressProps = {
  imageUri: string;
  progress: number;
};
const ImageViewWithProgess = ({
  imageUri,
  progress,
}: ImageViewWithProgressProps) => {
  const [progressColor, setProgressColor] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const progressFn = (): string => {
      if (progress >= 7) {
        return "#26CA67";
      } else if (progress >= 4) {
        return "#C9CF26";
      } else {
        return "#CF004E";
      }
    };
    const backgroundFn = (): string => {
      if (progress >= 7) {
        return "#19361E";
      } else if (progress >= 4) {
        return "#322F0D";
      } else {
        return "#440C28";
      }
    };
    setProgressColor(progressFn());
    setBackgroundColor(backgroundFn());
  }, [progress]);

  return (
    <View style={styles.container}>
      <View style={[StyleSheet.absoluteFill]}>
        <Image
          style={styles.image}
          source={{
            uri: imageUri,
          }}
          onLoadEnd={() => setImageLoading(false)}
        />
        {imageLoading && (
          <ActivityIndicator
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          />
        )}
      </View>
      <View style={styles.progressViewContainer}>
        <AnimatedCircularProgress
          size={45}
          width={3}
          fill={progress * 10}
          tintColor={progressColor}
          onAnimationComplete={() => {}}
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
