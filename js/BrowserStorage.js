class BrowserStorage {
  getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  setItem(key, object) {
    localStorage.setItem(key, JSON.stringify(structuredClone(object)));
  }

  defaultGet(key, type, def) {
    if (type == "array") {
      const arr = this.getItem(key);
      return arr && arr.length ? arr : def;
    }
    return this.getItem(key) || def;
  }
}

export default new BrowserStorage();
