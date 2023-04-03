import { Text, StyleSheet } from "react-native";
import { useState } from "react";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { SegmentedSwitchProps } from "../types";
import { COLORS } from "../views/colors";

const defaultStyle = StyleSheet.create({
  switch: {
    height: 32,
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
  },
  segment: {
    flex: 1,
    height: "100%",
    padding: 5,
    backgroundColor: COLORS.chestnut,
  },
  segmentText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
  selectedSegment: {
    backgroundColor: COLORS.lighterColar,
  },
});

const SegmentedSwitch = (props: SegmentedSwitchProps) => {
  const [selectedSegment, setSelectedSegment] = useState(0);

  // useEffect(() => console.log(props.switchHeight), [props.switchHeight]);

  return (
    <Animated.View style={[defaultStyle.switch, props.switchStyle]}>
      {props.segments.map((segment: string, index: number) => (
        <Pressable
          key={index}
          onPress={() => {
            setSelectedSegment(index);
            props.onSegmentSwitch(index);
          }}
          style={index === selectedSegment ? [defaultStyle.segment, props.segmentStyle, defaultStyle.selectedSegment, props.selectedSegmentStyle] : [defaultStyle.segment, props.segmentStyle]}
        >
          <Text style={[defaultStyle.segmentText, props.segmentTextStyle]}>{segment}</Text>
        </Pressable>
      ))}
    </Animated.View>
  );
};

export default SegmentedSwitch;
