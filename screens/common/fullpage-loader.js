import React from 'react-native';
import colors from '../../colors';

const {
  ActivityIndicatorIOS,
  View,
} = React;

class FullpageLoader extends React.Component {
  render(){
    return (
      <View style={[
        styles.background,
        this.props.addBottomPadding ? styles.bottomBarMargin : null,
        this.props.styles,
      ]} >
        <ActivityIndicatorIOS color={colors.light} size="large"/>
      </View>
    );
  }
}

const styles = {
  bottomBarMargin:{
    marginBottom: 110,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.dark,
  },
};

export default FullpageLoader;
