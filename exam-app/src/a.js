import { Text, SafeAreaView, StyleSheet } from 'react-native';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack
import AssetExample from './components/AssetExample';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>
        Change code in the editor and watch it change on your phone! Save to get a shareable url.
      </Text>
      <Card>
        <AssetExample />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


// <div class="css-view-175oi2r" style="width: 360px; height: 120px; padding: 0px;">
//   <svg width="360" height="120">
//     <defs><linearGradient id="backgroundGradient" x1="0" y1="120" x2="120" y2="0" gradientUnits="userSpaceOnUse">
//       <stop offset="0" stop-color="transparent" stop-opacity="0"></stop>
//       <stop offset="1" stop-color="transparent" stop-opacity="0"></stop>
//       </linearGradient><linearGradient id="fillShadowGradientFrom" x1="0" y1="0" x2="0" y2="120" gradientUnits="userSpaceOnUse">
//         <stop offset="0" stop-color="rgba(26, 255, 146, 1)" stop-opacity="0.1"></stop>
//         <stop offset="1" stop-color="rgba(26, 255, 146, 1)" stop-opacity="0.1"></stop></linearGradient>
//         </defs><rect width="100%" height="120" rx="0" ry="0" fill="url(#backgroundGradient)">
//           </rect>
//           <g translate="180, 60" transform="translate(180, 60)">
//             <g>
//               <path d="M 0 -45 A 45 45 0 1 1 -0.282741 -44.999112 L -0.282741 -44.999112 A 45 45 0 1 0 0 -45 Z " stroke-width="7" stroke="rgba(26, 255, 146, 0.2)">
//                 </path></g><g><path stroke-linecap="round" stroke-linejoin="round" d="M NaN NaN A 45 45 0 0 1 NaN NaN L NaN NaN A 45 45 0 0 0 NaN NaN Z " stroke-width="7" stroke="rgba(26, 255, 146, 0.5)"></path>
//             </g>
//           </g>
//     </svg>
// </div>

<SelectDropdown
  data={countriesWithFlags}
  // defaultValueByIndex={1}
  // defaultValue={{
  //   title: 'England',
  //   image: require('./Images/England.jpg'),
  // }}
  onSelect={(selectedItem, index) => {
    console.log(selectedItem, index);
  }}
  buttonStyle={styles.dropdown3BtnStyle}
  renderCustomizedButtonChild={(selectedItem, index) => {
    return (
      <View style={styles.dropdown3BtnChildStyle}>
        {selectedItem ? (
          <Image source={selectedItem.image} style={styles.dropdown3BtnImage} />
        ) : (
          <Ionicons name="md-earth-sharp" color={'#444'} size={32} />
        )}
        <Text style={styles.dropdown3BtnTxt}>{selectedItem ? selectedItem.title : 'Select country'}</Text>
        <FontAwesome name="chevron-down" color={'#444'} size={18} />
      </View>
    );
  }}
  dropdownStyle={styles.dropdown3DropdownStyle}
  rowStyle={styles.dropdown3RowStyle}
  renderCustomizedRowChild={(item, index) => {
    return (
      <View style={styles.dropdown3RowChildStyle}>
        <Image source={item.image} style={styles.dropdownRowImage} />
        <Text style={styles.dropdown3RowTxt}>{item.title}</Text>
      </View>
    );
  }}
/>