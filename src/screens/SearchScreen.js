import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList,
    Image, StyleSheet } from "react-native";
import { searchShows } from "../services/api";

export default function SearchScreen({ navigation }) {
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        if (!query.trim()) {
            setError("Input tidak boleh kosong");
            return;
        }

        if (query.length < 3) {
            setError("Minimal 3 karakter");
            return;
        }

        try {
            setError("");
            const data = await searchShows(query);

            const mapped = data.map((item) => item.show);
            setResults(mapped);
        } 
        catch (err) {
            setError("Gagal mencari data");
        }
    };

    return (
        <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Cari film..."
            value={query}
            onChangeText={setQuery}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate("Detail", 
                        { id: item.id })}
                >
                <Image
                source={{ uri: item.image?.medium }}
                style={styles.image}
                />
                <Text style={styles.title}>{item.name}</Text>
            </TouchableOpacity>
            )}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#F5F1E8",
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        marginBottom: 5,
    },

    error: {
        color: "red",
        marginBottom: 10,
    },

    button: {
        backgroundColor: "#C2A878",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 15,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },

    card: {
        flexDirection: "row",
        marginBottom: 10,
    },

    image: {
        width: 60,
        height: 80,
        borderRadius: 8,
    },

    title: {
        marginLeft: 10,
        fontWeight: "bold",
        flex: 1,
    },
});