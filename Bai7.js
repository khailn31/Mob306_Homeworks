import { View, Text, FlatList, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState, } from 'react'

const Bai7 = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getMovies = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/photos');
            const json = await response.json();
            console.log(json)
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <View style={{ flex: 1, padding: 10 }}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={data}

                    renderItem={({ item }) => (
                        <View style={{
                            flexDirection: 'row', alignItems: 'center', backgroundColor: 'white',
                            borderRadius: 12, 
                            marginVertical: 5,
                            padding:8
                        }}>
                            <Image style={{ width: 50, height: 50, borderRadius: 8 }} source={{ uri: item.url }} />
                            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                <Text >
                                    id:{item.id}
                                </Text>
                                <Text  >
                                    title:{item.title}
                                </Text>
                            </View>
                        </View>
                    )}
                 
                />
            )}
        </View>
    );
}

export default Bai7