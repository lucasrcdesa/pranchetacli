import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#22300b",
  },
  headerContainer: {
    width: "100%",
    height: 170,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  addContainer: {
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  //   width: 100%;
  // height:200px;
  // justify-content: space-around;
  // align-items: center;
  // flex-direction: row;
  backContainer: {
    backgroundColor: "#344d0e",
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  img: {
    width: 70,
    height: 70,
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  listContainer: {
    backgroundColor: "#344d0e",
    width: "88%",
    height: "75%",
    borderRadius: 8,
    padding: 15,
  },

  textContainer: {
    width: "88%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E1E1E6",
    marginHorizontal: "6%",
    borderRadius: 8,
    gap: 5,
  },
  inputContainer: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#aa2834",
    width: "70%",
    borderRadius: 8,
    padding: 10,
    color: "white",
  },
  text: {
    color: "#22300b",
    fontSize: 20,
    fontWeight: "bold",
  },
  Content: {
    flex: 1,
    alignItems: "center",
    gap: 20,
  },

  list: {
    gap: 20,
  },
  touchable: {
    backgroundColor: "#E1E1E6",
    height: 40,
    paddingHorizontal: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textList: {
    fontWeight: "bold",
    color: "#22300b",
  },
  emptyMessage: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  botaoContainer: {
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  botao: {
    height: "70%",
    width: "60%",
    backgroundColor: "#aa2834",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  textBotao: {
    color: "white",
    fontWeight: "bold",
  },
});

export default styles;
