class Storage {
  constructor({ base }) {
    this.base = base;
  }

  set(key, data) {
    localStorage.setItem(`${this.base}:${key}`, JSON.stringify(data));
  }

  get(key) {
    try {
      return JSON.parse(localStorage.getItem(`${this.base}:${key}`));
    } catch (_) {
      return undefined;
    }
  }
}

export default new Storage({
  base: "__reddit_lite_version_1__"
});
