import { StyleSheet } from "react-native";

const optionSwitchStyle = StyleSheet.create({
  body: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  label: {
    fontSize: 16,
    color: "#000",
    textAlign: "left",
  },
  switch: {
    flexGrow: 1,
  },
  switchEnabled: {
    color: "#b5c7fd",
  },
  switchDisabled: {
    color: "#2246b6",
  },
  trackEnabled: {
    color: "#2246b6",
  },
  trackDisabled: {
    color: "#b5c7fd",
  },
});

const optionSliderStyle = StyleSheet.create({
  body: {
    width: "100%",
    height: "auto",
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "stretch",
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    textAlign: "center",
    color: "#000",
    marginBottom: 5,
  },
  currentValue: {
    fontSize: 16,
    textAlign: "center",
    color: "#000",
  },
  slider: {
    width: "90%",
    height: 40,
  },
  minimumTrack: {
    color: "#2246b6",
  },
  maximumTrack: {
    color: "#b5c7fd",
  },
  thumb: {
    color: "#fff",
  },
});

const optionPickerStyle = StyleSheet.create({
  body: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 10,
    gap: 25,
  },
  label: optionSwitchStyle.label,
  picker: {
    height: 20,
    flexGrow: 1,
    color: "#000",
  },
  dropdownIcon: {
    color: "#2246b6",
  },
  dropdownRipple: {
    color: "#b5c7fd",
  },
  itemStyle: {
    fontSize: 16,
    textAlign: "right",
    color: "#000",
  },
});

const optionButtonStyle = StyleSheet.create({
  body: {
    width: "100%",
    height: 35,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  label: {
    width: "80%",
    fontSize: 16,
    textAlign: "center",
    color: "#000",
  },
});

export { optionSwitchStyle, optionSliderStyle, optionPickerStyle, optionButtonStyle };
