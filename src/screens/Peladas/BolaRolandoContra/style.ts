import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  gol: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 30,
  },
  placarContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: "99.99%",
  },
  but: {
    backgroundColor: "#344d0e",
    height: 35,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  placarback: {
    height: 30,
    backgroundColor: "black",
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#aa2834",
  },
  textPlacar: { fontWeight: "bold", color: "white", fontSize: 20 },
  xPlacar: { color: "white" },
  textProx: {
    alignItems: "center",
    justifyContent: "center",
  },
  textProxBla: {
    color: "white",
    fontWeight: "bold",
  },
  proxContainer: {
    width: "100%",
    height: 200,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  prox: {
    marginTop: 5,
    height: "92%",
    width: "45%",
    backgroundColor: "#e1e1e6",
    borderRadius: 4,
  },
  jogoContainer: {
    height: "45%",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    flexDirection: "row",
  },
  times: {
    height: "96%",
    backgroundColor: "#e1e1e6",
    width: "44%",
    borderRadius: 4,
  },
  xContainer: {
    height: 15,
    width: 15,
    backgroundColor: "#aa2834",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    borderRadius: 2,
  },
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
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#e1e1e6",
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
    width: "100%",
    height: "100%",
    borderRadius: 8,
    padding: 10,
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
    height: 35,
    paddingHorizontal: "10%",
    alignItems: "center",
  },
  textList: {
    fontWeight: "bold",
    color: "#22300b",
    maxWidth: "85%",
  },
  emptyMessage: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  botaoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 10,
  },
  botao: {
    height: "70%",
    width: "70%",
    backgroundColor: "#aa2834",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  swit: {
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  switText: { color: "white", fontWeight: "bold" },
  textBotao: {
    color: "white",
    fontWeight: "bold",
  },
});

export default styles;
