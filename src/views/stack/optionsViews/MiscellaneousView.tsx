import { View, Text } from 'react-native';
import { miscellaneousViewStyle } from '../../../styles/OptionViewsStyles';

const MiscellaneousOptionsView = ({navigation}) => {
		return(
				<View style={miscellaneousViewStyle.root}>
						<Text>Miscellaneous Options View</Text>
				</View>
		);
};

export default MiscellaneousOptionsView;
