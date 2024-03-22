import React, { useState, useEffect } from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const InfoModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [articleData, setArticleData] = useState(null);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1'); // Exempel API för teständamål
        const data = await response.json();
        setArticleData(data);
      } catch (error) {
        console.error('Error fetching article data:', error);
      }
    };

    if (isModalVisible) {
      fetchArticleData();
    }
  }, [isModalVisible]);

  return (
    <Modal
      className="flex-1 justify-center bg-black items-center"
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => setIsModalVisible(false)}
          style={{ position: 'absolute', top: 20, left: 20 }}
        >
          <AntDesign name="close" size={24} color="grey" />
        </TouchableOpacity>
        <View className="px-4 h-2/3">
          {articleData && (
            <>
              <Text className="px-2 text-xl mb-1 font-bold text-gray-800 md:text-xl dark:text-gray-400">
                {articleData.title}
              </Text>
              <Text className="px-2 mb-3 text-sl font-bold text-gray-600 md:text-xl dark:text-gray-400">
                {articleData.body}
              </Text>
            </>
          )}
        </View>
        <Button
          title="Close modal"
          color="red"
          onPress={() => setIsModalVisible(false)}
        />
      </View>
    </Modal>
  );
};

export default InfoModal;
