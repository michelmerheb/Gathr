import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchPosts } from '../../redux/Slices/UserSlice';

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error, pagination } = useSelector((state: RootState) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    handleFetchPosts(currentPage, pageSize);
  }, [currentPage]);

  const handleFetchPosts = async (page: number, pageSize: number) => {
    setIsRefreshing(true); // Enable refreshing indicator
    dispatch(fetchPosts({ page, pageSize }))
      .then(response => {
        // Handle success if necessary
      })
      .catch(error => {
        console.error("Failed to fetch posts:", error);
        // Handle the error state
      })
      .finally(() => {
        setIsRefreshing(false); // Always turn off refreshing indicator
      });
  };
  
  

  const onRefresh = useCallback(() => {
    handleFetchPosts(1, pageSize); // Always refresh the first page
  }, [pageSize]);
  

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

  const renderItem = ({ item } : any) => (
    <Text style={styles.post}>{item.title}</Text>
  );

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.error}>Error: {error}</Text>}
      <Text style={styles.title}>Posts</Text>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
      />
      <View style={styles.pagination}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handlePreviousPage} 
          disabled={!pagination?.hasPrevPage}
        >
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <Text>Page {currentPage} of {pagination?.totalPages}</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleNextPage} 
          disabled={!pagination?.hasNextPage}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  post: {
    marginTop: 10,
    color: 'black'
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  error: {
    color: 'red',
  },
  list: {
    width: '100%',
  },
  button: {
    backgroundColor: 'purple',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    opacity: 1
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
