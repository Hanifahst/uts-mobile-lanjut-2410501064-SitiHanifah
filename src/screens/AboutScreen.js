import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function AboutScreen() {
    return (
        <View style={styles.container}>
        
        <Text style={styles.header}>Profile</Text>

        <View style={styles.avatarContainer}>
            <Image
            source={require("../../assets/images/foto_profil.jpg")}
            style={styles.avatar}
            />
        </View>

        <Text style={styles.section}>General Information</Text>

        <View style={styles.card}>
            <Row label="Name" value="Siti Hanifah" />
            <Row label="SID" value="2410501064" />
            <Row label="Class" value="A" />
            <Row label="Subject" value="Pemrograman Mobile Lanjut" />
        </View>

        <Text style={styles.section}>Personal Information</Text>

        <View style={styles.card}>
            <Row label="Email" value="2410501064@mahasiswa.upnvj.ac.id" />
            <Row label="Birth Date" value="08 June 2005" />
            <Row label="Gender" value="Female" />
        </View>

        <TouchableOpacity style={styles.logoutBtn}>
            <Text style={styles.logoutText}>➜] Logout</Text>
        </TouchableOpacity>

        </View>
    );
}

const Row = ({ label, value }) => (
    <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F1E8",
        padding: 16,
    },

    header: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
        color: "#2C2C2C",
    },

    avatarContainer: {
        alignItems: "center",
        marginBottom: 20,
    },

    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#C2A878",
    },

    section: {
        marginTop: 10,
        marginBottom: 5,
        fontWeight: "bold",
        color: "#555",
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
        elevation: 2, 
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        borderBottomWidth: 0.5,
        borderColor: "#ddd",
    },

    label: {
        color: "#555",
    },

    value: {
        fontWeight: "bold",
        color: "#2C2C2C",
    },

    logoutBtn: {
        marginTop: 20,
        backgroundColor: "#C2A878",
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
    },

    logoutText: {
        color: "#fff",
        fontWeight: "bold",
    },
});