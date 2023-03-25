import { View, Text, StyleSheet } from 'react-native';
import { useState } from "react";
import {Pressable} from 'react-native';
import {SegmentedSwitchProps} from '../types';

const defaultStyle = StyleSheet.create({
		switch: {
				width: "100%",
				height: 32,
				flexDirection: "row",
				flexWrap: "nowrap",
		},
		segment: {
				flexBasis: 1,
				width: "100%",
				fontSize: 32,
				color: 'black',
				textAlign: 'center',
				backgroundColor: 'lightgray',
		},
		selectedSegment: {
				backgroundColor: 'white',
		},
});

const SegmentedSwitch = (props : SegmentedSwitchProps) => {
		const [ selectedSegment, setSelectedSegment ] = useState(0);

		return(
						<View style={[defaultStyle.switch, props.switchStyle]}>
						{props.segments.map((segment : string, index : number) => (
								<Pressable 
										key={ index } 
										onPress={() => {setSelectedSegment(index); props.onSegmentSwitch(index); }}
								>
								<View
										style={
										index === selectedSegment ? [defaultStyle.segment, props.segmentStyle, defaultStyle.selectedSegment, props.selectedSegmentStyle] : [defaultStyle.segment,props.segmentStyle]
										}
								>
								<Text>{segment}</Text>
								</View>
								</Pressable>
						))}
						</View>
			  )
};

export default SegmentedSwitch;
