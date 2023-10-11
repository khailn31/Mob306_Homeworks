import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity, Modal, TextInput, Button } from 'react-native';

const bai14 = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [newItem, setNewItem] = useState({ name: '', email: '' });
    const getMovies = async () => {
        try {
            const response = await fetch('https://652670de917d673fd76c4476.mockapi.io/api/users');
            const json = await response.json();
            console.log(json)
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const addNewItem = async () => {
        try {
            const response = await fetch('https://652670de917d673fd76c4476.mockapi.io/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });

            if (response.ok) {
                setModalVisible(false); // Đóng modal sau khi thêm
                setNewItem({ name: '', email: '' }); // Đặt lại giá trị mới
                getMovies(); // Cập nhật danh sách
            }
        } catch (error) {
            console.error(error);
        }
    };
   
        const handleEdit = (user) => {
            setEditingUser(user);
            setModalVisible(true);
        };
        const updateUser = async () => {
            try {
                const response = await fetch(`https://652670de917d673fd76c4476.mockapi.io/api/users/${editingUser.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editingUser),
                });
        
                if (response.ok) {
                    setModalVisible(false); // Đóng modal sau khi cập nhật
                    setEditingUser(null); // Đặt lại giá trị người dùng đang chỉnh sửa
                    getMovies(); // Cập nhật danh sách
                } else {
                    console.error('Cập nhật không thành công');
                }
            } catch (error) {
                console.error(error);
            }
        };
        
    
      // Hàm gọi API để xóa người dùng
      const deleteUser = async (userId) => {
        try {
          const response = await fetch(`https://652670de917d673fd76c4476.mockapi.io/api/users/${userId}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            getMovies(); // Cập nhật danh sách
          }
        } catch (error) {
          console.error(error);
        }
      };

    useEffect(() => {
        getMovies();
    }, []);


     
         
    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity
                    onPress={() => {
                        setEditingUser(null);
                        setModalVisible(true);
                    }}
                    style={{
                        backgroundColor: 'blue',
                        padding: 10,
                        borderRadius: 50,
                        width: 50,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 24 }}>+</Text>
                </TouchableOpacity>
            </View>

            <Modal
                visible={modalVisible}
                transparent={true}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{
                        backgroundColor: 'gray',
                        padding: 20,
                        borderRadius: 12,
                        width: 300,
                        borderWidth: 1,
                        borderColor: 'black'
                    }}>
                        <TextInput
                            placeholder="Name"
                            value={editingUser ? editingUser.name : newItem.name}
                            onChangeText={(text) => {
                                if (editingUser) {
                                    setEditingUser({ ...editingUser, name: text });
                                } else {
                                    setNewItem({ ...newItem, name: text });
                                }
                            }}
                        />
                        <TextInput
                            placeholder="Email"
                            value={editingUser ? editingUser.email : newItem.email}
                            onChangeText={(text) => {
                                if (editingUser) {
                                    setEditingUser({ ...editingUser, email: text });
                                } else {
                                    setNewItem({ ...newItem, email: text });
                                }
                            }}
                        />
                        <Button title={editingUser ? 'Update' : 'Add'} onPress={editingUser ? updateUser : addNewItem} />
                        <Button title="Cancel" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>

            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            borderRadius: 12,
                            marginVertical: 5,
                            padding: 8
                        }}>
                            <Image style={{ width: 50, height: 50, borderRadius: 8 }} source={{ uri: item.avatar }} />
                            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                <Text>Name: {item.name}</Text>
                                <Text>Email: {item.email}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: 'green',
                                        padding: 5,
                                        borderRadius: 8,
                                        width: 50,
                                        margin: 5
                                    }}
                                    onPress={() => handleEdit(item)}
                                >
                                    <Text style={{ color: 'white', fontSize: 12 }}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: 'red',
                                        padding: 5,
                                        borderRadius: 8,
                                        width: 50,
                                        margin: 5
                                    }}
                                    onPress={() =>deleteUser(item.id)}
                                >
                                    <Text style={{ color: 'white', fontSize: 12 }}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

export default bai14