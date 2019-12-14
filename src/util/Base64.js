export class Base64 {

    static getMimeType(urlBase64) {

        let regex = /^data:(.+);base64,(.*)$/;
        let result = urlBase64.match(regex);

        if (result)
            return result[1];
    }

    static toFile(urlBase64) {

        let ext = '';
        let filename = '';

        let mimeType = Base64.getMimeType(urlBase64);

        if (mimeType) {
            ext = mimeType.split('/')[1];
            filename = `file${Date.now()}.${ext}`;

        }

        return fetch(urlBase64)
            .then(res => { return res.arrayBuffer(); })
            .then(buffer => { return new File([buffer], filename, { type: mimeType }) });
    }
}