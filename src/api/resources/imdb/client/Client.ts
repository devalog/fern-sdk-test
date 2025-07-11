/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as core from "../../../../core/index.js";
import * as YourClientNameTesting from "../../../index.js";
import { mergeHeaders } from "../../../../core/headers.js";
import * as errors from "../../../../errors/index.js";

export declare namespace Imdb {
    export interface Options {
        environment: core.Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: core.Supplier<string>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | core.Supplier<string | undefined> | undefined>;
    }

    export interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | core.Supplier<string | undefined> | undefined>;
    }
}

export class Imdb {
    protected readonly _options: Imdb.Options;

    constructor(_options: Imdb.Options) {
        this._options = _options;
    }

    /**
     * Add a movie to the database
     *
     * @param {YourClientNameTesting.CreateMovieRequest} request
     * @param {Imdb.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.imdb.createMovie({
     *         title: "title",
     *         rating: 1.1
     *     })
     */
    public createMovie(
        request: YourClientNameTesting.CreateMovieRequest,
        requestOptions?: Imdb.RequestOptions,
    ): core.HttpResponsePromise<YourClientNameTesting.MovieId> {
        return core.HttpResponsePromise.fromPromise(this.__createMovie(request, requestOptions));
    }

    private async __createMovie(
        request: YourClientNameTesting.CreateMovieRequest,
        requestOptions?: Imdb.RequestOptions,
    ): Promise<core.WithRawResponse<YourClientNameTesting.MovieId>> {
        const _response = await core.fetcher({
            url: core.url.join(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)),
                "/movies/create-movie",
            ),
            method: "POST",
            headers: mergeHeaders(this._options?.headers, requestOptions?.headers),
            contentType: "application/json",
            requestType: "json",
            body: request,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return { data: _response.body as YourClientNameTesting.MovieId, rawResponse: _response.rawResponse };
        }

        if (_response.error.reason === "status-code") {
            throw new errors.YourClientNameTestingError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
                rawResponse: _response.rawResponse,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.YourClientNameTestingError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                    rawResponse: _response.rawResponse,
                });
            case "timeout":
                throw new errors.YourClientNameTestingTimeoutError(
                    "Timeout exceeded when calling POST /movies/create-movie.",
                );
            case "unknown":
                throw new errors.YourClientNameTestingError({
                    message: _response.error.errorMessage,
                    rawResponse: _response.rawResponse,
                });
        }
    }

    /**
     * Retrieve a movie from the database based on the ID
     *
     * @param {YourClientNameTesting.MovieId} id
     * @param {Imdb.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link YourClientNameTesting.MovieDoesNotExistError}
     *
     * @example
     *     await client.imdb.getMovie("tt0111161")
     *
     * @example
     *     await client.imdb.getMovie("tt1234")
     */
    public getMovie(
        id: YourClientNameTesting.MovieId,
        requestOptions?: Imdb.RequestOptions,
    ): core.HttpResponsePromise<YourClientNameTesting.Movie> {
        return core.HttpResponsePromise.fromPromise(this.__getMovie(id, requestOptions));
    }

    private async __getMovie(
        id: YourClientNameTesting.MovieId,
        requestOptions?: Imdb.RequestOptions,
    ): Promise<core.WithRawResponse<YourClientNameTesting.Movie>> {
        const _response = await core.fetcher({
            url: core.url.join(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)),
                `/movies/${encodeURIComponent(id)}`,
            ),
            method: "GET",
            headers: mergeHeaders(this._options?.headers, requestOptions?.headers),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return { data: _response.body as YourClientNameTesting.Movie, rawResponse: _response.rawResponse };
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 404:
                    throw new YourClientNameTesting.MovieDoesNotExistError(
                        _response.error.body as YourClientNameTesting.MovieId,
                        _response.rawResponse,
                    );
                default:
                    throw new errors.YourClientNameTestingError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                        rawResponse: _response.rawResponse,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.YourClientNameTestingError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                    rawResponse: _response.rawResponse,
                });
            case "timeout":
                throw new errors.YourClientNameTestingTimeoutError("Timeout exceeded when calling GET /movies/{id}.");
            case "unknown":
                throw new errors.YourClientNameTestingError({
                    message: _response.error.errorMessage,
                    rawResponse: _response.rawResponse,
                });
        }
    }
}
