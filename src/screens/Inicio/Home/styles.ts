import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 70,
    height: 70,
  },
  textContainer: {
    width: "88%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c72b32",
    marginLeft: "6%",
    marginRight: "6%",
    borderRadius: 4,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 50,
    alignItems: "center",
    gap: 20,
  },
  button: {
    backgroundColor: "#e1e1e6",
    width: "88%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "6%",
    marginRight: "6%",
    borderRadius: 4,
  },
});

export default styles;
