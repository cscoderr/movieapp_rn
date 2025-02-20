import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextProps,
  View,
  ViewProps,
} from "react-native";
import * as AppleColors from "@bacons/apple-colors";

const SettingsScreen = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        gap: 24,
        paddingBottom: 64,
      }}
    >
      <Section title="App Config">
        <CsText trailing="Trailing">Cs is saying Hello</CsText>
        <Text>Hello here</Text>
        <Text>Hello here</Text>
        <Text>Hello here</Text>
      </Section>

      <Section title="About">
        <CsText trailing="Trailing">Cs is saying Hello</CsText>
        <Text>Hello here</Text>
        <Text>Hello here</Text>
        <Text>Hello here</Text>
      </Section>

      <Section
        title="Social Medias"
        footer="Check out my website and the project source code"
      >
        <CsText trailing="tomiwaidowu.dev">Website</CsText>
        <CsText trailing="cscoderr">Github</CsText>
      </Section>
    </ScrollView>
  );
};

const CsText = (props: TextProps & { trailing?: string }) => {
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
  const elementChildren = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return null;
    }
    const isLastChild = index === React.Children.count(children) - 1;

    if (child.type === Text || child.type === CsText) {
      child = React.cloneElement(child, {
        ...child.props,
        dynamicTypeRamp: "body",
        numberOfLines: 1,
        style: [{ fontSize: 17, color: AppleColors.label }, child.props.style],
      });

      const trailingView = (() => {
        if (!child.props.trailing) {
          return;
        }
        return React.Children.map(child.props.trailing, (child, index) => {
          if (typeof child === "string") {
            return (
              <CsText
                dynamicTypeRamp="body"
                style={{ color: AppleColors.secondaryLabel }}
              >
                {child}
              </CsText>
            );
          }
          return child;
        });
      })();

      if (trailingView) {
        child = (
          <HStack>
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
      {elementChildren}
    </View>
  );

  if (!title && !footer) {
    return body;
  }
  return (
    <View>
      {title && (
        <CsText
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
        </CsText>
      )}
      {body}
      {footer && (
        <CsText
          dynamicTypeRamp="footnote"
          style={{
            paddingHorizontal: 20,
            paddingVertical: 8,
            fontSize: 14,
            color: AppleColors.secondaryLabel,
          }}
        >
          {footer}
        </CsText>
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
  return <View {...props} style={[{ flexDirection: "row" }, props.style]} />;
};

const VStack = (props: ViewProps) => {
  return <View {...props} style={[{ flexDirection: "column" }, props.style]} />;
};

const Spacer = (props: ViewProps) => {
  return <View {...props} style={[{ flex: 1 }, props.style]} />;
};

export default SettingsScreen;
