import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { View, Text, Image, ScrollView, ActivityIndicator,
    TouchableOpacity, StyleSheet } from "react-native";
import { fetchShowDetail } from "../services/api";

export default function DetailScreen({ route }) {
    const { id } = route.params;

    const { state, dispatch } = useFavorites();

    const [show, setShow] = useState(null);
    const [loading, setLoading] = useState(true);

    const isFavorite = state.favorites.some(
        (item) => item.id === show?.id
    );

    const getDetail = async () => {
        try {
            const data = await fetchShowDetail(id);
            setShow(data);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDetail();
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!show) {
        return (
            <View style={styles.center}>
                <Text>Data Tidak ditemukan</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: show.image?.original }}
                style={styles.poster} />
            <View style={styles.content}>
                <Text style={styles.title}>{show.name}</Text>

                <Text style={styles.rating}>
                    ⭐ {show.rating?.average || "N/A"}
                </Text>

                <Text style={styles.genre}>
                    {show.genres.join(", ")}
                </Text>

                <Text style={styles.schedule}>
                    📅 {show.schedule?.days.join(", ")} | 
                    ⏰ {show.schedule?.time}
                </Text>

                <Text style={styles.summary}>
                    {show.summary?.replace(/<[^>]+>/g, "")}
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        if (isFavorite) {
                        dispatch({ type: "REMOVE_FAVORITE", payload: show.id });
                        } else {
                        dispatch({ type: "ADD_FAVORITE", payload: show });
                        }
                    }}
                    >
                    <Text style={styles.buttonText}>
                        {isFavorite ? "Hapus dari Favorit" : "+ Tambah ke Favorit"}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F1E8",
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    poster: {
        width: "100%",
        height: 500,
    },

    content: {
        padding: 15,
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#2C2C2C",
    },

    rating: {
        marginTop: 5,
        fontSize: 16,
    },

    genre: {
        marginTop: 5,
        color: "#555",
    },

    schedule: {
        marginTop: 5,
        fontSize: 14,
        color: "#777",
    },

    summary: {
        marginTop: 10,
        lineHeight: 20,
        color: "#333",
    },

    button: {
        marginTop: 20,
        backgroundColor: "#C2A878",
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 25,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});