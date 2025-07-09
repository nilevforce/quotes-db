class ApiSuccess {
  constructor({ statusCode = 200, data, meta = {} }) {
    this.statusCode = statusCode;
    this.data = data;
    this.meta = meta;
  }

  toJSON() {
    const json = {
      ok: true,
      data: this.data,
    };

    if (Object.keys(this.meta).length > 0) {
      json.meta = this.meta;
    }

    return json;
  }

  send(res) {
    return res.status(this.statusCode).json(this.toJSON());
  }
}

module.exports = ApiSuccess;
