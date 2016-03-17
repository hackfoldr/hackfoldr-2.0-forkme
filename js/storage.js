
export default {
  getFoldrHistory() {
    return JSON.parse(localStorage.getItem("hackfoldr")) || [];
  },

  setFoldrHistory(history) {
    localStorage.setItem("hackfoldr", JSON.stringify(history));
  },

  getFoldrScale() {
    return JSON.parse(localStorage.getItem("hackfoldr-scale")) || "";
  },

  setFoldrScale(scale) {
    localStorage.setItem("hackfoldr-scale", JSON.stringify(scale));
  }
};
