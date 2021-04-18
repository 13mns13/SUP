export default class FetchData {
    async post_server(method, data) {
        const response = await fetch("https://e.not-undo.xyz/api/" + method, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        });
        return response.json()

    }

    async get_server(path) {
        const response = await fetch("https://e.not-undo.xyz/api" + path, {
            method: "GET",

        });
        return await response.json();
    }

    // Логин
    login(params) {
        return this.post_server("auth/", params);
    }


    // Регистрация
    reg(params) {
        return this.post_server("reg", params);
    }

    auth() {
        return this.post_server("auth/")
    }

    market() {
        return this.post_server("markets/")
    }

    user(id) {
        return this.post_server("user/"+id)
    }

}

