import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, StyleSheet, SafeAreaView, FlatList, RefreshControl, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchPosts, clearError } from '../../redux/Slices/UserSlice';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../context/ThemeContext';

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error, pagination } = useSelector((state: RootState) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState('title');
  const pageSize = 25;
  const { isDarkTheme } = useTheme();

  const sortedPosts = useMemo(() => {
    switch (sortBy) {
      case 'title':
        return [...posts].sort((a, b) => a.title.localeCompare(b.title));
      case 'date':
        return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      default:
        return posts;
    }
  }, [posts, sortBy]);

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  useEffect(() => {
    if (!isRefreshing) {
      handleFetchPosts(currentPage, pageSize);
    }
  }, [currentPage, pageSize, isRefreshing]);

  const handleFetchPosts = (page: number, pageSize: number) => {
    dispatch(fetchPosts({ page, pageSize }));
  };

  const handleNextPage = () => {
    if (pagination && pagination.hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEndReached = () => {
    setReachedEnd(true);
  };

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(fetchPosts({ page: 1, pageSize })).unwrap();
    } catch (error) {
      console.error('Error refreshing posts:', error);
    }
    setIsRefreshing(false);
  }, [dispatch, pageSize]);
  

  const renderItem = ({ item }: any) => (
    <Text style={styles.post}>{item.title}</Text>
  );


  const renderPicker = () => {
    if (posts.length > 0 && !error) {
      return (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={sortBy}
            onValueChange={(itemValue, itemIndex) => setSortBy(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Sort by: Title" value="title" />
            <Picker.Item label="Sort by: Date" value="date" />
          </Picker>
        </View>
      );
    }
    return null;
  };
  


  return (
    <SafeAreaView style={styles.container}>
        {loading && <ActivityIndicator size="large" color="purple" />}
        {error && <Text style={styles.error}>Oops! Something went wrong. Please try to refresh.</Text>}

        <FlatList
        data={sortedPosts}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        onEndReached={handleEndReached}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
        ListHeaderComponent={renderPicker}
        ListFooterComponent={() => (
          reachedEnd && pagination &&
          <View style={styles.pagination}>
            <TouchableOpacity style={styles.button} onPress={handlePreviousPage} disabled={!pagination?.hasPrevPage}>
              <Text style={styles.buttonText}>PREVIOUS</Text>
            </TouchableOpacity>
            <Text style={styles.pageNumber}>Page {currentPage} of {pagination?.totalPages}</Text>
            <TouchableOpacity style={styles.button} onPress={handleNextPage} disabled={!pagination?.hasNextPage}>
              <Text style={styles.buttonText}>NEXT</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#5B2C6F'
  },
  pickerContainer: {
    marginVertical: 10,
    width: screenWidth / 3,
    borderWidth: 1,
    borderColor: 'purple',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    color: 'purple',
  },
  post: {
    marginTop: 30,
    color: 'black',
    fontSize: 25,
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-evenly'
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10
  },
  buttonText: {
    color: 'purple'
  },
  pageNumber: {
    color: 'white'
  },
  error: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center'
  },
});
