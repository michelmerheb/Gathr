import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, StyleSheet, SafeAreaView, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchPosts } from '../../redux/Slices/UserSlice';

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error, pagination } = useSelector((state: RootState) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const pageSize = 25;

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

  const onRefresh = () => {
    setIsRefreshing(true);
    handleFetchPosts(1, pageSize);
    setIsRefreshing(false);
  };

  const renderItem = ({ item }: any) => (
    <Text style={styles.post}>{item.title}</Text>
  );

  return (
    <SafeAreaView style={styles.container}>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {error && <Text style={styles.error}>Error: {error}</Text>}

        <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        onEndReached={handleEndReached}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
        ListFooterComponent={() => (
          reachedEnd && pagination &&
          <View style={styles.pagination}>
            <TouchableOpacity style={styles.button} onPress={handlePreviousPage} disabled={!pagination?.hasPrevPage}>
              <Text style={styles.buttonText}>PREVIOUS</Text>
            </TouchableOpacity>
            <Text>Page {currentPage} of {pagination?.totalPages}</Text>
            <TouchableOpacity style={styles.button} onPress={handleNextPage} disabled={!pagination?.hasNextPage}>
              <Text style={styles.buttonText}>NEXT</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  post: {
    marginTop: 10,
    color: 'white',
    backgroundColor: 'purple',
    padding: 20,
    borderRadius: 10,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-evenly'
  },
  button: {
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 10
  },
  buttonText: {
    color: 'white'
  },
  error: {
    color: 'red',
    textAlign: 'center'
  },
});
