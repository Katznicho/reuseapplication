import { StyleSheet, View, FlatList } from 'react-native'
import React, {
  useState, useEffect
} from 'react'
import DonaterCard from '../../components/DonatorCard';
import { dynamicGeneralStyles } from '../../utils/generalstyles/dynamicGeneralStyles';
import { useUserPreferredTheme } from '../../hooks/useUserPreferredTheme';
import { useFirebase } from '../../hooks/useFirebase';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import NotAvailable from '../../components/NotAvailable';


const AllDonaters = () => {

  const { reuseTheme } = useUserPreferredTheme();
  const generalstyles = dynamicGeneralStyles(reuseTheme);

  const [loading, setLoading] = useState<boolean>(false);
  const { getAllDonors } = useFirebase();
  const [donaters, setDonaters] = useState<any[]>([]);

  useEffect(() => {

    getAllDonors().then((res) => {
      setLoading(true);
      setDonaters(res);
      setLoading(false);
    }).catch((err) => {
      setLoading(false);
    })
  })

  if (loading) return <ActivityIndicator />


  return (
    <View style={generalstyles.container}>
      {
        donaters.length > 0 ? (
          <FlatList
            data={donaters}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <DonaterCard
                item={item}
                key={item.id}
              //   showAvailable={true}
              />
            )}
            showsVerticalScrollIndicator={false}
          />

        ) : (
          <View >
            <NotAvailable
              text={"No Donaters available"}
            />

          </View>
        )
      }

    </View>
  )
}

export default AllDonaters

