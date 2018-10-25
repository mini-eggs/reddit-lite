class Bus {
  constructor() {
    this.listeners = {};
  }

  on(key, f) {
    var value = this.listeners[key] || [];
    this.listeners[key] = [...value, f];
  }

  off(key, f) {
    for (var e = 0; e < this.listeners[key].length; e++) {
      var value = this.listeners[key][e];
      if (value === f) {
        this.listeners[key].splice(e, 1);
      }
    }
  }

  emit(key, ...args) {
    for (var e = 0; e < this.listeners[key].length; e++) {
      var f = this.listeners[key][e];
      f(...args);
    }
  }
}

export default new Bus();
