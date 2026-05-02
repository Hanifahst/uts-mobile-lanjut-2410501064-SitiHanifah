import { View, Text, FlatList, Image, TouchableOpacity, 
    StyleSheet } from "react-native";
import { useFavorites } from "../context/FavoritesContext";

export default function FavoritesScreen({ navigation }) {
    const { state, dispatch } = useFavorites();

    if (state.favorites.length === 0) {
        return (
        <View style={styles.center}>
            <Text>Belum ada favorit</Text>
        </View>
        );
    }

    return (
        <FlatList
        style={{ backgroundColor: "#F5F1E8" }}
        data={state.favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <View style={styles.card}>
            <TouchableOpacity
                onPress={() => navigation.navigate("Detail", 
                    { id: item.id })}
            >
                <Image
                source={{ uri: item.image?.medium }}
                style={styles.image}
                />
            </TouchableOpacity>

            <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.title}>{item.name}</Text>

                <TouchableOpacity
                onPress={() =>
                    dispatch({ type: "REMOVE_FAVORITE", 
                        payload: item.id })}
                >
                <Text style={{ color: "red" }}>Hapus</Text>
                </TouchableOpacity>
            </View>
            </View>
        )}
        />
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
    },
    image: {
        width: 80,
        height: 100,
        borderRadius: 8,
    },
    title: {
        fontWeight: "bold",
    },
});