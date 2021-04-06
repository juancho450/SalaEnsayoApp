export class Columna {
    header: string;
    headerClass: string;
    data: string;
    dataClass: string;
    render?: (param: boolean|string|number) => boolean|string|number;

    constructor(header: string, headerClass: string, data: string, dataClass: string,
                render?: (param: boolean | string | number) => boolean|string|number) {
        this.header = header;
        this.headerClass = headerClass;
        this.data = data;
        this.dataClass = dataClass;
        this.render = render;
    }
}
