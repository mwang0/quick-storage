import $ from '@system.storage';
export default class Storage {
  constructor(opts = {}) {
    const { prefix } = opts;
    this._prefix = prefix;
  }

  get(key, opts = { toJson: !0 }) {
    return new Promise((resolve, reject) => {
      $.get({
        key: `${this._prefix}_${key}`,
        success(data) {
          if (opts && opts.toJson) {
            try {
              let d = JSON.parse(data);
              data = d;
            } catch (err) {
              console.log(err);
            }
          }
          resolve(data);
        },
        fail(data, code) {
          reject(data, code);
        },
      });
    });
  }

  set(key, value) {
    if (!value) return;
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    return new Promise((resolve, reject) => {
      $.set({
        key: `${this._prefix}_${key}`,
        value,
        success() {
          resolve(true);
        },
        faile() {
          reject(false);
        },
      });
    });
  }

  delete(key) {
    return new Promise((resolve, reject) => {
      $.delete({
        key: `${this._prefix}_${key}`,
        success() {
          resolve(true);
        },
        faile() {
          reject(false);
        },
      });
    });
  }

  clear() {
    return new Promise((resolve, reject) => {
      $.clear({
        success() {
          resolve(true);
        },
        faile() {
          reject(false);
        },
      });
    });
  }

  length() {
    return $.length;
  }
}
