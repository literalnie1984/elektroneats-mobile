import { StyleSheet } from "react-native";
import { COLORS } from "../views/colors";

const optionSwitchStyle = StyleSheet.create({
  body: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10,
    backgroundColor: COLORS.colar,
    borderRadius: 10,
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    color: COLORS.whiteColar,
    textAlign: "left",
  },
  switchBody: {
    width: "auto",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  tag: {
    fontSize: 16,
    paddingHorizontal: 5,
    color: COLORS.gunmetal,
    textAlign: "center",
  },
  switch: {
    width: 40,
  },
  switchEnabled: {
    color: COLORS.whiteColar,
  },
  switchDisabled: {
    color: COLORS.chestnut,
  },
  trackEnabled: {
    color: COLORS.darkerColar,
  },
  trackDisabled: {
    color: COLORS.darkGrey,
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
    fontSize: 16,
    textAlign: "center",
    color: COLORS.chestnut,
    marginBottom: 5,
  },
  currentValue: {
    fontSize: 16,
    textAlign: "center",
    color: COLORS.gunmetal,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  minimumTrack: {
    color: COLORS.darkColar,
  },
  maximumTrack: {
    color: COLORS.lighterColar,
  },
  thumb: {
    color: COLORS.colar,
  },
});

const optionPickerStyle = StyleSheet.create({
  body: {
    width: "90%",
    height: 50,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-evenly",
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.colar,
    borderRadius: 10,
    marginVertical: 30,
  },
  label: optionSwitchStyle.label,
  picker: {
    height: "100%",
    width: "40%",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    color: COLORS.gunmetal,
  },
  dropdownIcon: {
    color: COLORS.chestnut,
  },
  dropdownRipple: {
    color: COLORS.colar,
  },
  itemStyle: {
    fontSize: 16,
    textAlign: "right",
    color: COLORS.gunmetal,
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
    color: COLORS.chestnut,
  },
  ripple: {
    color: COLORS.lighterColar,
  },
});

const optionInputStyle = StyleSheet.create({
  body: {
    width: "100%",
    paddingVertical: 5,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: COLORS.chestnut,
    gap: 15,
  },
  label: {
    fontSize: 16,
    color: COLORS.chestnut,
    textAlign: "left",
  },
  input: {
    flexGrow: 1,
    fontSize: 16,
    color: COLORS.gunmetal,
  },
  underline: {
    color: COLORS.gunmetal,
  },
  cursor: {
    color: COLORS.gunmetal,
  },
});

export { optionSwitchStyle, optionSliderStyle, optionPickerStyle, optionButtonStyle, optionInputStyle };
