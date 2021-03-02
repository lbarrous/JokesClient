const HTTP_METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE"
};

class RequestUtils {
  sendRequest(params) {
    return fetch(params.URL, {
      credentials: "include",
      method: params.method,
      headers: {
        // 1. Fix for IE: Use only plain object instead of new Headers()
        // 2. Fix for IE: headers must not be undefined (even for GET)
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params.data)
    });
  }

  // response.ok is not working for EI
  // IE returns 1223 http status code instead 204
  checkResponse(response) {
    if (!response.ok || response.status === 1223) {
      return response.json().then(data =>
        Promise.reject({
          status: response.status,
          statusText: response.statusText,
          body: data
        })
      );
    }
    return response;
  }

  getContent(response) {
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.indexOf("application/json") !== -1) {
      return response.json().then(data => {
        if (data) {
          return typeof data.data !== "undefined"
            ? Promise.resolve(data.data)
            : Promise.resolve(data);
        }
        return Promise.resolve(response);
      });
    } else {
      return response.text().then(text => {
        return Promise.resolve(text);
      });
    }
  }

  fetchRequest(params) {
    return this.sendRequest(params)
      .then(this.checkResponse)
      .then(this.getContent);
  }

  get(URL) {
    const params = {
      URL,
      method: HTTP_METHOD.GET
    };
    return this.fetchRequest(params);
  }
}

export default new RequestUtils();
