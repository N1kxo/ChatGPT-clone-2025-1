import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    backGround: {
        backgroundColor: '#343541',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 30,
        height: 30,
        marginBottom: 20,
    },
    logoexamples: {
        width: 20,
        height: 20,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: "white",
        fontSize: 24,
        textAlign: "center",
        fontWeight: "600",
    },
    subtitle: {
        color: "#B3B3B3",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 30,
    },
    examplesTitle: {
        color: "white",
        fontSize: 18,
        textAlign: "center",
        marginBottom: 10,
    },
    examplesContainer: {
        width: "100%",
        alignItems: "center",
    },
    exampleCard: {
        backgroundColor: "#4A4B5A",
        color: "white",
        padding: 15,
        borderRadius: 10,
        width: "100%",
        textAlign: "center",
        marginBottom: 10,
        fontSize: 14,
    },
    nextButton: {
        backgroundColor: "#10A37F",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginTop: 20,
    },
    nextButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        backgroundColor: "#202123",
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    newChat: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#2A2B32",
        padding: 15,
        borderRadius: 10,
    },
    newChatText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        flex: 1,
        marginLeft: 10,
    },
    divider: {
        height: 1,
        backgroundColor: "#3A3B43",
        marginVertical: 20,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
    },
    optionText: {
        color: "white",
        fontSize: 16,
        marginLeft: 10,
        flex: 1,
    },
    newBadge: {
        backgroundColor: "#FFD700",
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#202123",
    },
    logout: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        paddingVertical: 15,
    },
    logoutText: {
        color: "#E55353",
        fontSize: 16,
        marginLeft: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    backText: {
        color: "white",
        fontSize: 16,
        marginLeft: 5,
    },
    centerMessage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#40414F",
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 50,
        width: "100%",
        marginBottom: 20,
    },
    input: {
        flex: 1,
        color: "white",
        fontSize: 16,
    },
    sendButton: {
        backgroundColor: "#10A37F",
        borderRadius: 8,
        padding: 10,
        marginLeft: 10,
    },
    text: {
        color: "#A0A0A0",
        fontSize: 16,
    },
    chatContainer: {
        flex: 1,
        marginVertical: 10,
    },
    chatListContainer: {
        flex: 1,
        backgroundColor: "#202123",
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    chatItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#3A3B43",
        backgroundColor: "#2A2B32",
        borderRadius: 10,
        marginBottom: 10,
    },
    chatText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
    },
    chatDetailContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: "#121212",
    },
    message: {
        fontSize: 16,
        color: "#ccc",
        marginBottom: 5,
        padding: 8,
        backgroundColor: "#333",
        borderRadius: 8,
    },
    noMessages: {
        fontSize: 16,
        color: "#888",
        textAlign: "center",
        marginTop: 20,
    },
    chatId: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
    },
    chatDateText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
    },
    messageBubble: {
        maxWidth: "80%",
        padding: 12,
        borderRadius: 15,
        marginBottom: 8,
    },
    userBubble: {
        alignSelf: "flex-end",
        backgroundColor: "#10A37F",
    },
    botBubble: {
        alignSelf: "flex-start",
        backgroundColor: "#4A4B5A",
    },
    messageText: {
        color: "white",
        fontSize: 16,
    },
    messageContainer: {
        backgroundColor: "#2A2B32",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    sender: {
        color: "#10A37F",
        fontSize: 16,
        fontWeight: "bold",
    },
    date: {
        color: "#888",
        fontSize: 12,
        marginTop: 5,
    },
    noChatsText: {
        color: "#777",
        textAlign: "center",
        marginVertical: 20,
        fontSize: 14,
    },
    textInput: {
        flex: 1,
        color: "white",
        fontSize: 16,
    },
    sendButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});