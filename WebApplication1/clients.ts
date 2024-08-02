//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v14.1.0.0 (NJsonSchema v11.0.2.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

export class Client {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl ?? "";
    }

    get(): Promise<Base> {
        let url_ = this.baseUrl + "/";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGet(_response);
        });
    }

    protected processGet(response: Response): Promise<Base> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = Base.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<Base>(null as any);
    }
}

export abstract class Base implements IBase {
    fromBase?: string;

    protected _discriminator: string;

    constructor(data?: IBase) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        this._discriminator = "Base";
    }

    init(_data?: any) {
        if (_data) {
            this.fromBase = _data["fromBase"];
        }
    }

    static fromJS(data: any): Base {
        data = typeof data === 'object' ? data : {};
        if (data["$type"] === "Intermediate") {
            throw new Error("The abstract class 'Intermediate' cannot be instantiated.");
        }
        if (data["$type"] === "SealedA") {
            let result = new SealedA();
            result.init(data);
            return result;
        }
        if (data["$type"] === "SealedB") {
            let result = new SealedB();
            result.init(data);
            return result;
        }
        throw new Error("The abstract class 'Base' cannot be instantiated.");
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["$type"] = this._discriminator;
        data["fromBase"] = this.fromBase;
        return data;
    }
}

export interface IBase {
    fromBase?: string;
}

export abstract class Intermediate extends Base implements IIntermediate {
    fromIntermediate?: string;

    protected _discriminator: string;

    constructor(data?: IIntermediate) {
        super(data);
        this._discriminator = "Intermediate";
    }

    override init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.fromIntermediate = _data["fromIntermediate"];
        }
    }

    static override fromJS(data: any): Intermediate {
        data = typeof data === 'object' ? data : {};
        if (data["$type"] === "seal-a") {
            let result = new SealedA();
            result.init(data);
            return result;
        }
        if (data["$type"] === "seal-b") {
            let result = new SealedB();
            result.init(data);
            return result;
        }
        throw new Error("The abstract class 'Intermediate' cannot be instantiated.");
    }

    override toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["$type"] = this._discriminator;
        data["fromIntermediate"] = this.fromIntermediate;
        super.toJSON(data);
        return data;
    }
}

export interface IIntermediate extends IBase {
    fromIntermediate?: string;
}

export class SealedA extends Intermediate implements ISealedA {
    fromA?: number;

    constructor(data?: ISealedA) {
        super(data);
        this._discriminator = "seal-a";
    }

    override init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.fromA = _data["fromA"];
        }
    }

    static override fromJS(data: any): SealedA {
        data = typeof data === 'object' ? data : {};
        let result = new SealedA();
        result.init(data);
        return result;
    }

    override toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["fromA"] = this.fromA;
        super.toJSON(data);
        return data;
    }
}

export interface ISealedA extends IIntermediate {
    fromA?: number;
}

export class SealedB extends Intermediate implements ISealedB {
    fromB?: number;

    constructor(data?: ISealedB) {
        super(data);
        this._discriminator = "seal-b";
    }

    override init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.fromB = _data["fromB"];
        }
    }

    static override fromJS(data: any): SealedB {
        data = typeof data === 'object' ? data : {};
        let result = new SealedB();
        result.init(data);
        return result;
    }

    override toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["fromB"] = this.fromB;
        super.toJSON(data);
        return data;
    }
}

export interface ISealedB extends IIntermediate {
    fromB?: number;
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}