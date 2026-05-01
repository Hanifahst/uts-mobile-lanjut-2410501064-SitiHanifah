import { useEffect, useState, useRef } from "react";
import { View, Text, Image, FlatList, ActivityIndicator,
    RefreshControl, TouchableOpacity, StyleSheet } from "react-native";
import { fetchShows } from "../services/api";

export default function HomeScreen({ navigation }) {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const getShows = async () => {
        try {
            setError("");
            const data = await fetchShows();
            setShows(data);
        } 
        catch (err) {
            setError("Gagal memuat data");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        getShows();
    }, []);

    const featured = shows.slice(0, 5);

    useEffect(() => {
        if (featured.length === 0) return;

        const interval = setInterval(() => {
        let nextIndex = currentIndex + 1;

        if (nextIndex >= featured.length) {
            nextIndex = 0;
        }

        flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
        });

        setCurrentIndex(nextIndex);
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex, featured]);

    const onRefresh = () => {
        setRefreshing(true);
        getShows();
    };

    const groupByGenre = (shows) => {
        const genres = {};
        shows.forEach((show) => {
        show.genres.forEach((genre) => {
            if (!genres[genre]) genres[genre] = [];
            genres[genre].push(show);
        });
        });
        return genres;
    };

    const genres = groupByGenre(shows);

    if (loading) {
        return (
        <View style={styles.center}>
            <ActivityIndicator size="large" />
        </View>
        );
    }

    if (error) {
        return (
        <View style={styles.center}>
            <Text>{error}</Text>
        </View>
        );
    }

    return (
        <FlatList
        style={{ backgroundColor: "#F5F1E8" }}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={[]}
        renderItem={null}
        ListHeaderComponent={
            <>
            {}
            <FlatList
                ref={flatListRef}
                data={featured}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <Image
                    source={{ uri: item.image?.original }}
                    style={styles.banner}
                />
                )}
                onScrollToIndexFailed={() => {}}
            />

            {}
            {Object.entries(genres).slice(0, 3).map(([genre, items]) => (
                <View key={genre}>
                <Text style={styles.genreTitle}>{genre}</Text>

                <FlatList
                    data={items}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() =>
                            navigation.navigate("Detail", { id: item.id })
                        }
                    >
                        <Image
                            source={{ uri: item.image?.medium }}
                            style={styles.image}
                        />
                        <Text numberOfLines={1}>{item.name}</Text>
                    </TouchableOpacity>
                    )}
                />
                </View>
            ))}
            </>
        }
        />
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    banner: {
        width: 300,
        height: 180,
        borderRadius: 12,
        margin: 10,
    },

    genreTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
        marginTop: 15,
        color: "#2C2C2C",
    },

    card: {
        width: 120,
        margin: 10,
    },

    image: {
        width: "100%",
        height: 150,
        borderRadius: 10,
    },
});