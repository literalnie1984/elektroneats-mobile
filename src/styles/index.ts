import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {},
  accountView: {
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export const menuViewStyles = StyleSheet.create({
  root:{
		flex: 1,
  },
  menu: {
		paddingVertical: 30,
		paddingHorizontal: 30,
  },
  menuBlankContainerStyle:{
		flexDirection: 'column',
		flexWrap: 'nowrap',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
  },
  menuBlankWindowStyle:{
		  flexDirection: 'column',
		  flexWrap: 'nowrap',
		  alignItems: 'center',
		  justifyContent: 'center',
		  width: '100%',
  },
  menuBlankIconStyle:{
		fontSize: 96,
		color: "#2246b6"
  },
  menuBlankHeadingStyle:{
		textAlign: 'center',
		fontSize: 48,
		color: "#2246b6",
  },
  menuBlankTextStyle:{
		textAlign: 'center',
		fontSize: 16,
		color: "#2246b6",
  },
  menuItem: {
		flexDirection: "column",
		flexWrap: "nowrap",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
  },
  menuItemSeparator: {
		  height: 40,
  },
  menuItemContainer: {
		width: "100%",
		flexDirection: "column",
		flexWrap: "nowrap",
		alignItems: "center",
		justifyContent: "center",
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		backgroundColor: "#2247b7",
  },
  menuItemBar:{
		flexDirection: "row",
		flexWrap: "nowrap",
		alignItems: "center",
		justifyContent: "space-between",
		paddingLeft: 25,
		paddingRight: 25,
		backgroundColor: "#2246b6",
		borderRadius: 10,
		color: "#fff",
		width: "100%",
		height: 50,
  },
  menuItemBarDate: {
		  color: "#fff",
		  textAlign: "center",
		  fontSize: 24,
  },
  menuItemBarFolded:{
		borderRadius: 10,
  },
  menuItemBarUnfolded:{
		borderRadius: 0,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
  },
  menuVariant: {
		flexDirection: "column",
		flexWrap: "nowrap",
		alignItems: "center",
		justifyContent: "space-evenly",
		padding: 10,
		width: "100%",
		backgroundColor: "#557dfa",
		rowGap: 10,
		flexGrow: 1,
		borderBottomEndRadius: 10,
		borderBottomStartRadius: 10,
  },
  menuVariantRow: {
		flexDirection: "row",
		flexWrap: "nowrap",
		alignItems: "center",
		width: "100%",
		justifyContent:"flex-start", 
  },
  menuVariantRowTitle: {
		textAlign: 'left',
		fontWeight: 'bold',
		color: "#fff",
		width: "30%",
  },
  menuVariantElement: {
		width: "70%",
		textAlign: 'center',
		flexGrow: 1,
		color: "#fff",
  }
});

export const orderViewStyles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    color: "#808080",
    marginLeft: 20,
    marginBottom: 10,
  },
  orderContainer: {
    marginBottom: 15,
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  topPressableContainer: {
    backgroundColor: "#2246b6",
    color: "#fff",
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 40,
  },
  expandableContainer: {
    backgroundColor: "#557dfa",
    color: "#fff",
    width: "85%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  orderText: {
    color: "#fff",
    fontSize: 18,
  },
  noBottomBorder: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});
