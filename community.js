import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, TextInput, Image } from 'react-native';
import Logo from './assets/logo.svg';
import Staff from './assets/staff.svg';
import Privilege from './assets/privilege.svg';
import colors from './colors';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import Nav from './nav';
import config from './config';
import * as ImagePicker from 'expo-image-picker';

SplashScreen.preventAutoHideAsync();

const CommunityScreen = () => {
    const navigation = useNavigation();
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [selectedImages, setSelectedImages] = useState([]); // To store the selected image
    const [expandedPostIds, setExpandedPostIds] = useState([]); // Store expanded posts

    useEffect(() => {
        async function loadFontsAndHideSplash() {
            try {
                await Font.loadAsync({
                    'Alike': require('./assets/fonts/Alike-Regular.ttf'),
                    'SegoeUI': require('./assets/fonts/Segoe UI.ttf'),
                });

                setFontsLoaded(true);
                await SplashScreen.hideAsync();
            } catch (error) {
                console.warn(error);
            }
        }
        loadFontsAndHideSplash();
    }, []);

    useEffect(() => {
        fetchPosts();
        const intervalId = setInterval(() => {
            fetchPosts();
        }, 500);    // every 0.5s fetch post for auto update

        return () => clearInterval(intervalId);
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`${config.SERVER}/posts`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // Ensure data is an array before sorting
            const sortedPosts = Array.isArray(data) ? 
                data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) : [];

            setPosts(sortedPosts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleCreatePost = async () => {
        if (!newPost && selectedImages.length === 0) {
            alert("Post content or image cannot be empty!");
            return;
        }

        const formData = new FormData();
        formData.append('content', newPost);

        // Append each selected image to the formData
        selectedImages.forEach((imageUri, index) => {
            formData.append('images', {
                uri: imageUri,
                name: `image_${index}.jpg`, // Give a dynamic name to each image
                type: 'image/jpeg',
            });
        });

        try {
            const response = await fetch(`${config.SERVER}/posts`, {
                method: 'POST',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData,
            });
            if (response.ok) {
                setNewPost('');
                setSelectedImages([]); // Clear the selected images after the post
                fetchPosts();
            } else {
                alert('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImages([...selectedImages, result.assets[0].uri]); // Add the new image to the array
        }
    };

    // Function to remove a selected image
    const removeImage = (index) => {
        const updatedImages = selectedImages.filter((_, i) => i !== index); // Remove the image at the specified index
        setSelectedImages(updatedImages);
    };

    // Function to expand the post to view more images
    const toggleExpandPost = (postId) => {
        if (expandedPostIds.includes(postId)) {
            setExpandedPostIds(expandedPostIds.filter(id => id !== postId)); // Collapse
        } else {
            setExpandedPostIds([...expandedPostIds, postId]); // Expand
        }
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Nav />
                <View style={styles.logo}>
                    <TouchableOpacity onPress={() => navigation.navigate('MainMenu')}>
                        <Logo width={100} height={100} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.main}>
                <Text style={styles.title}>Community</Text>

                {/* Post Input Section */}
                <View style={styles.postInput}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Write your post..."
                        placeholderTextColor={colors.text}
                        value={newPost}
                        onChangeText={setNewPost}
                    />
                    <TouchableOpacity style={styles.button} onPress={pickImage}>
                        <Text style={styles.buttonText}>Add Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleCreatePost}>
                        <Text style={styles.buttonText}>Post</Text>
                    </TouchableOpacity>
                </View>

                {/* Selected Image Preview */}
                {selectedImages.length > 0 && (
                    <View style={styles.imageContainer}>
                        {selectedImages.map((imageUri, index) => (
                            <View key={index} style={styles.imagePreviewContainer}>
                                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                                <TouchableOpacity style={styles.removeButton} onPress={() => removeImage(index)}>
                                    <Text style={styles.removeButtonText}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}

                {/* Posts List */}
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.postItem}>
                            <View style={styles.userContainer}>
                                <Text style={styles.postUserName}>Posted by: {item.username}</Text>
                                {item.role_id === 1 && <Privilege style={styles.badge} width={20} height={20} />}
                                {item.role_id === 2 && <Staff style={styles.badge} width={20} height={20} />}
                            </View>

                            <Text style={styles.postText}>{item.content}</Text>

                            {/* Show the first image */}
                            {item.images && item.images.length > 0 && (
                                <Image source={{ uri: item.images[0] }} style={styles.postImage} />
                            )}

                            {/* Button to toggle view more images */}
                            {item.images && item.images.length > 1 && (
                                <TouchableOpacity onPress={() => toggleExpandPost(item.id)}>
                                    <Text style={styles.viewMoreButton}>
                                        {expandedPostIds.includes(item.id)
                                            ? 'Hide images'
                                            : `Click to view ${item.images.length - 1} more image(s)`}
                                    </Text>
                                </TouchableOpacity>
                            )}

                            {/* Show additional images if expanded */}
                            {expandedPostIds.includes(item.id) && (
                                <View style={styles.imageContainerExpand}>
                                    {item.images.slice(1).map((imageUri, index) => (
                                        <Image key={index} source={{ uri: imageUri }} style={styles.postImage} />
                                    ))}
                                </View>
                            )}

                            <Text style={styles.postDate}>{new Date(item.created_at).toLocaleString()}</Text>
                        </View>
                    )}
                    contentContainerStyle={styles.flatListContent}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: -10,
        padding: 0,
        backgroundColor: colors.background,
    },
    headerContainer: {
        marginTop: 30,
        minWidth: '100%',
        flex: 1,
        flexDirection: 'row',
        marginBottom: -150,
        backgroundColor: colors.background,
        zIndex: 999,
        position: 'absolute',
        alignContent: 'center',
        borderStyle: 'solid',
        borderColor: colors.secondary,
        borderBottomWidth: 0.2,
    },
    logo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 50,
    },
    main: {
        marginTop: 130,
        padding: 10,
        flex: 1,
    },
    title: {
        color: colors.primary,
        fontSize: 40,
        fontFamily: 'Alike',
    },
    postInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        fontFamily: 'SegoeUI',
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        color: colors.text,
        borderColor: colors.secondary,
        padding: 10,
        borderRadius: 5,
        maxWidth: '60%',
        fontFamily: 'SegoeUI',
    },
    button: {
        backgroundColor: colors.secondary,
        borderRadius: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
    buttonText: {
        color: colors.text,
        fontFamily: 'SegoeUI',
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    imagePreviewContainer: {
        position: 'relative',
        marginRight: 10,
        marginBottom: 10,
    },
    imagePreview: {
        width: 70,
        height: 70,
        borderRadius: 5,
    },
    removeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'rgba(255, 0, 0, 0.7)',
        borderRadius: 5,
        padding: 2,
    },
    removeButtonText: {
        color: colors.text,
        fontFamily: 'SegoeUI',
        fontSize: 10,
    },
    postItem: {
        backgroundColor: colors.accent,
        padding: 30,
        paddingTop: 0,
        marginTop: 5,
        marginBottom: 10,
        borderRadius: 5,
        position: 'relative',
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 15,
        marginLeft: -40,
        width: '65%',
        height: 50,
    },
    postUserName: {
        color: colors.primary,
        fontSize: 14,
        fontFamily: 'SegoeUI',
        flex: 1, // Username will take available space
        marginLeft: 10,
    },
    badge: {
        top: -2,
        marginLeft: 5,
    },
    postText: {
        color: colors.text,
        fontSize: 16,
        fontFamily: 'SegoeUI',
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    viewMoreButton: {
        color: colors.secondary,
        fontFamily: 'SegoeUI',
        marginTop: 5,
    },
    postDate: {
        color: colors.secondary,
        fontSize: 10,
        fontFamily: 'SegoeUI',
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    flatListContent: {
        paddingBottom: 80,
    },
    imageContainerExpand: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export default CommunityScreen;
