import React, { useEffect, useState } from "react";
import { Animated } from "react-native";
import { ExpandableProps } from "../types";

const ExpandableView = (props: ExpandableProps) => {
  const [height] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(height, {
      toValue: !props.expanded ? props.height : 0,
      duration: props.duration,
      useNativeDriver: false,
    }).start(() => props.afterAnimationCallback?.());
  }, [props.expanded, height]);

  return <Animated.View style={{ height, ...props.style }}>{props.children}</Animated.View>;
};

export default ExpandableView;
