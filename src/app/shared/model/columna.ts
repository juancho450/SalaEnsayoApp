type tipoRender = boolean | string |  number;
export class Columna {
    header: string;
    headerClass: string;
    data: string;
    dataClass: string;
    render?: (param: tipoRender) => boolean|string|number;

    constructor(header: string, headerClass: string, data: string, dataClass: string,
                render?: (param: tipoRender) => boolean|string|number) {
        this.header = header;
        this.headerClass = headerClass;
        this.data = data;
        this.dataClass = dataClass;
        this.render = render;
    }
}
