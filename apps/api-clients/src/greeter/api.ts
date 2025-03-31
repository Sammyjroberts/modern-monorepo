/* tslint:disable */
/* eslint-disable */
/**
 * types/proto/greeter/greeter.proto
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: version not set
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError, operationServerMap } from './base';

/**
 * 
 * @export
 * @interface ProtobufAny
 */
export interface ProtobufAny {
    [key: string]: object | any;

    /**
     * 
     * @type {string}
     * @memberof ProtobufAny
     */
    '@type'?: string;
}
/**
 * 
 * @export
 * @interface RpcStatus
 */
export interface RpcStatus {
    /**
     * 
     * @type {number}
     * @memberof RpcStatus
     */
    'code'?: number;
    /**
     * 
     * @type {string}
     * @memberof RpcStatus
     */
    'message'?: string;
    /**
     * 
     * @type {Array<ProtobufAny>}
     * @memberof RpcStatus
     */
    'details'?: Array<ProtobufAny>;
}
/**
 * 
 * @export
 * @interface V1HelloRequest
 */
export interface V1HelloRequest {
    /**
     * 
     * @type {string}
     * @memberof V1HelloRequest
     */
    'name'?: string;
}
/**
 * 
 * @export
 * @interface V1HelloResponse
 */
export interface V1HelloResponse {
    /**
     * 
     * @type {string}
     * @memberof V1HelloResponse
     */
    'greeting'?: string;
}

/**
 * GreeterServiceApi - axios parameter creator
 * @export
 */
export const GreeterServiceApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Sends a greeting
         * @param {V1HelloRequest} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        greeterServiceSayHello: async (body: V1HelloRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            assertParamExists('greeterServiceSayHello', 'body', body)
            const localVarPath = `/v1/example/echo`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * GreeterServiceApi - functional programming interface
 * @export
 */
export const GreeterServiceApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = GreeterServiceApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Sends a greeting
         * @param {V1HelloRequest} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async greeterServiceSayHello(body: V1HelloRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<V1HelloResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.greeterServiceSayHello(body, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['GreeterServiceApi.greeterServiceSayHello']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * GreeterServiceApi - factory interface
 * @export
 */
export const GreeterServiceApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = GreeterServiceApiFp(configuration)
    return {
        /**
         * 
         * @summary Sends a greeting
         * @param {V1HelloRequest} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        greeterServiceSayHello(body: V1HelloRequest, options?: RawAxiosRequestConfig): AxiosPromise<V1HelloResponse> {
            return localVarFp.greeterServiceSayHello(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * GreeterServiceApi - object-oriented interface
 * @export
 * @class GreeterServiceApi
 * @extends {BaseAPI}
 */
export class GreeterServiceApi extends BaseAPI {
    /**
     * 
     * @summary Sends a greeting
     * @param {V1HelloRequest} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GreeterServiceApi
     */
    public greeterServiceSayHello(body: V1HelloRequest, options?: RawAxiosRequestConfig) {
        return GreeterServiceApiFp(this.configuration).greeterServiceSayHello(body, options).then((request) => request(this.axios, this.basePath));
    }
}



