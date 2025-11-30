import React from "react";
import {
  Alert,
  Button,
  Linking,
  ScrollView,
  Text,
  TextProps,
  View,
  ViewProps,
} from "react-native";
import * as AppleColors from "@bacons/apple-colors";
import { Ionicons } from "@expo/vector-icons";

const SettingsScreen = () => {
  const handleOpenURL = React.useCallback(async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert("Error", "Cannot open URL");
    }
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        gap: 24,
        paddingBottom: 64,
      }}
    >
      <Section title="App">
        <RNText
          trailing={
            <Button
              title="Github"
              onPress={() =>
                handleOpenURL("https://github.com/cscoderr/movieapp_rn")
              }
            />
          }
        >
          Source Code
        </RNText>
      </Section>

      <Section title="About Me" footer="Connect with me on all social medias">
        <RNText
          leading={
            <Ionicons name="globe" size={24} color={AppleColors.label} />
          }
          trailing="tomiwaidowu.com"
        >
          Website
        </RNText>
        <RNText
          leading={
            <Ionicons name="logo-github" size={24} color={AppleColors.label} />
          }
          trailing={
            <Button
              title="cscoderr"
              onPress={() => handleOpenURL("https://github.com/cscoderr")}
            />
          }
        >
          Github
        </RNText>
        <RNText
          leading={
            <Ionicons name="logo-twitter" size={24} color={AppleColors.label} />
          }
          trailing="cscoderr"
        >
          X(Twitter)
        </RNText>
        <RNText
          leading={
            <Ionicons
              name="logo-linkedin"
              size={24}
              color={AppleColors.label}
            />
          }
          trailing="Tomiwa Idowu"
        >
          Linkedin
        </RNText>
      </Section>
    </ScrollView>
  );
};

const RNText = (
  props: TextProps & {
    trailing?: string | React.ReactElement;
    leading?: string | React.ReactElement;
  }
) => {
  return <Text {...props} dynamicTypeRamp="body" />;
};

const Section = ({
  children,
  title,
  footer,
  ...props
}: ViewProps & {
  title?: string | React.ReactNode;
  footer?: string | React.ReactNode;
}) => {
  const childrenWithSeperator = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return null;
    }
    const isLastChild = index === React.Children.count(children) - 1;

    if (child.type === Text || child.type === RNText) {
      child = React.cloneElement(child, {
        ...child.props,
        dynamicTypeRamp: "body",
        numberOfLines: 1,
        style: [{ fontSize: 17, color: AppleColors.label }, child.props.style],
      });

      const leadingView = (() => {
        if (!child.props.leading) {
          return;
        }

        return React.Children.map(child.props.leading, (child, index) => {
          if (typeof child === "string") {
            return (
              <RNText
                dynamicTypeRamp="body"
                style={{ color: AppleColors.secondaryLabel }}
              >
                {child}
              </RNText>
            );
          }
          return child;
        });
      })();

      const trailingView = (() => {
        if (!child.props.trailing) {
          return;
        }
        return React.Children.map(child.props.trailing, (child, index) => {
          if (typeof child === "string") {
            return (
              <RNText
                dynamicTypeRamp="body"
                style={{ color: AppleColors.secondaryLabel }}
              >
                {child}
              </RNText>
            );
          }
          return child;
        });
      })();

      if (trailingView) {
        child = (
          <HStack>
            {leadingView && (
              <View style={{ marginEnd: 16 }}>{leadingView}</View>
            )}
            {child}
            {trailingView && <Spacer />}
            {trailingView}
          </HStack>
        );
      }
    }
    return (
      <>
        <View style={{ paddingVertical: 11, paddingHorizontal: 20 }}>
          {child}
        </View>
        {!isLastChild && <Seperator />}
      </>
    );
  });
  const body = (
    <View
      {...props}
      style={[
        {
          borderCurve: "continuous",
          borderRadius: 10,
          overflow: "hidden",
          backgroundColor: AppleColors.secondarySystemGroupedBackground,
        },
        props.style,
      ]}
    >
      {childrenWithSeperator}
    </View>
  );

  if (!title && !footer) {
    return body;
  }
  return (
    <View>
      {title && (
        <RNText
          dynamicTypeRamp="footnote"
          style={{
            textTransform: "uppercase",
            paddingHorizontal: 20,
            paddingVertical: 8,
            fontSize: 14,
            color: AppleColors.secondaryLabel,
          }}
        >
          {title}
        </RNText>
      )}
      {body}
      {footer && (
        <RNText
          dynamicTypeRamp="footnote"
          style={{
            paddingHorizontal: 20,
            paddingVertical: 8,
            fontSize: 14,
            color: AppleColors.secondaryLabel,
          }}
        >
          {footer}
        </RNText>
      )}
    </View>
  );
};

const Seperator = () => {
  return (
    <View
      style={{
        borderBottomWidth: 0.5,
        marginTop: -0.5,
        borderColor: "grey",
        marginStart: 60,
        borderBottomColor: AppleColors.separator,
      }}
    />
  );
};

const HStack = (props: ViewProps) => {
  return (
    <View
      {...props}
      style={[
        {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        },
        props.style,
      ]}
    />
  );
};

const VStack = (props: ViewProps) => {
  return <View {...props} style={[{ flexDirection: "column" }, props.style]} />;
};

const Spacer = (props: ViewProps) => {
  return <View {...props} style={[{ flex: 1 }, props.style]} />;
};

export default SettingsScreen;
