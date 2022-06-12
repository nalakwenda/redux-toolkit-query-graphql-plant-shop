import React, { useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';
import { GRAY, GREEN } from '../colors';
import ResusableTextInput from '../Components/ResusableTextInput';
import { api } from '../queries/nala.generated';
import { useAppDispatch } from '../Redux/hooks';

type Props = {}

const Home = (props: Props) =>
{

  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>('');
  const { error, isFetching, isLoading, data, refetch } = api.endpoints.getProducts.useQuery({ first: 6, search: search });
  // console.log(error?.message, data)
  // console.log(isLoading, "isloading")
  // console.log(isFetching, "isFetching")

  if (isLoading) {
    return <View style={tw.style(`flex flex-1 justify-center items-center`)}><ActivityIndicator color={GREEN} size="large" /></View>
  }
  if (error) {
    return <View style={tw.style(` flex flex-1 justify-center items-center`)}><Text style={tw.style(`text-black`)}>{error?.message}</Text></View>
  }



  return (
    <View style={tw.style(`bg-white p-1 flex flex-1`)}>
      <View style={tw.style(`px-5 justify-center flex mb-5 `)}>
        <Text style={tw.style(`text-black text-3xl`, { color: GREEN })}>Find a plant friend</Text>
        <Text style={tw.style(`text-black text-sm`, { color: GRAY })}>We even named them for you!</Text>
      </View>
      <View style={tw.style(`px-5 justify-center flex mb-5 `)}>
        <ResusableTextInput id='search' placeHolder="Search" onChangeText={e => setSearch(e)}
          onBlur={refetch}
          value={search} />
      </View>

      <ScrollView style={tw.style(` flex  `)}>
        {isFetching ?
          <>
            <ActivityIndicator />
          </> :
          <>
            {data?.products ?
              <View style={tw.style(`w-full  flex-row flex flex-wrap justify-evenly px-2 `)}>
                {data.products.edges !== undefined ?
                  <>
                    {data.products?.edges.map(({ node }, index) =>
                    {
                      const { id, name, pricing, thumbnail } = node
                      return (

                        <View key={index} style={tw.style(`w-40 rounded-2xl mt-5 mb-5 bg-white shadow-md pb-5`)}>
                          <TouchableOpacity>
                            <Image style={tw.style(`h-3/4 rounded-t-3xl  h-50 `)} source={{ uri: thumbnail?.url }} />
                            <View style={tw.style(`p-1 `)}>
                              <View style={tw.style(`flex flex-row justify-between p-2 flex-wrap`)}>
                                {/* <Text style={tw.style(`text-xs`, { color: GRAY })}>Nala</Text> */}
                                <View style={tw.style(`flex-row flex`)}>
                                  <Text style={tw.style(`font-bold text-lg text-black`)}>{pricing?.priceRange?.start?.gross.amount} </Text>
                                  <Text style={tw.style(`font-bold text-lg`, { color: GRAY })}>{pricing?.priceRange?.start?.gross.currency}</Text>
                                </View>
                              </View>
                              <View>
                                <Text style={tw.style(`font-bold pl-2 text-base`, { color: GREEN })}>{name}</Text>
                              </View>
                            </View>
                          </TouchableOpacity>

                        </View>
                      )
                    })}
                  </>
                  : <View style={tw.style(`flex flex-1 justify-center items-center`)} ><Text style={tw.style(`text-black`)}>There are no products available</Text></View>}
              </View>
              : <>
                <Text style={tw.style(`text-center`)}></Text>
              </>}</>}

      </ScrollView>
    </View>
  )
}

export default Home