import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, StyleSheet, SafeAreaView, FlatList, RefreshControl } from 'react-native';
import styles from './NewsStyles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchPosts, clearError } from '../../../redux/Slices/UserSlice';
import { Picker } from '@react-native-picker/picker';
import { useTheme, Theme } from '../../../context/ThemeContext';
import PostContainer from '../../../components/PostComponent';
import { PostProps } from '../../../components/PostComponent';

export default function NewsScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error, pagination } = useSelector((state: RootState) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState('title');
  const pageSize = 25;
  const { theme } = useTheme();

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
  

  const renderPost = ({item}: {item: PostProps}) => (
    <TouchableOpacity style={themeStyles.postsContainer}>
      <PostContainer
        key={item._id}
        image_url={item.image_url}
        title={item.title}
        description={item.description}
        _id={item._id}
      />
    </TouchableOpacity>
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

  const themeStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme === Theme.Dark ? '#3D1557' : '#5B2C6F',
    },
    postsContainer: {
      paddingHorizontal: 15,
    },
  })
  
  return (
    <SafeAreaView style={themeStyles.container}>
        {loading && <ActivityIndicator size="large" color="purple" />}
        {error && <Text style={styles.error}>Oops! Something went wrong. Please try to refresh.</Text>}

        <FlatList
        data={sortedPosts}
        renderItem={renderPost}
        keyExtractor={(item, index) =>
          item._id ? item._id.toString() : index.toString()
        }
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




