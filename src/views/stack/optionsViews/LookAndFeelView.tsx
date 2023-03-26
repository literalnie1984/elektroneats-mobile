import { View, Text } from 'react-native'
import { lookAndFeelStyle } from '../../../styles/OptionViewsStyles';

const LookAndFeelView = ({navigation}) => {
		return(
				<View style={lookAndFeelStyle.root}>
						<Text>Look And Feel Settings</Text>
				</View>
		);
};

export default LookAndFeelView;
