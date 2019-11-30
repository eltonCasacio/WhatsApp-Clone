
export class Format {

    static getCamelCase(elementId) {

        let div = document.createElement('div');

        div.innerHTML = `<div data-${elementId}="id"></div>`;

        return Object.keys(div.firstChild.dataset)[0]

    }

    static toTime(duration) {
        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        if (hours) {
            return `${hours}: ${minutes.toString().padStart(2, '0')}: ${seconds.toString().padStart(2, '0')}`;
        }
        else {
            return `${minutes}: ${seconds.toString().padStart(2, '0')}`;

        }
    }

}