const request = require('supertest')
const app = require('../../server')

const endpint = "/api/calculator/calculus"

describe("calculus", () => {
    describe("wrong query", () => {
        describe("query don't send", () => {
            it('should return required error', async () => {
                const {body, statusCode} = await request(app).get(`${endpint}`);

                expect(statusCode).toBe(400);
                expect(body.details[0].message).toBe('\"query\" is required');
            });
        })

        describe("send blank query", () => {
            it("should return empty error", async () => {
                const {body, statusCode} = await request(app).get(`${endpint}` + "?query=");

                expect(statusCode).toBe(400);
                expect(body.details[0].message).toBe('\"query\" is not allowed to be empty')
            })
        })

        describe("send number query", () => {
            it("should return syntax error", async () => {
                const {body, statusCode} = await request(app).get(`${endpint}` + "?query=123");

                expect(statusCode).toBe(400);
                expect(body.message.split(' ')[0]).toBe('Syntax');
            })
        })

        describe("send nonsense string query", () => {
            it("should return syntax error", async () => {
                const {body, statusCode} = await request(app).get(`${endpint}` + "?query=fooboo");

                expect(statusCode).toBe(400);
                expect(body.message.split(' ')[0]).toBe('Syntax');
            })
        })

        describe("send wrong base64 string query", () => {
            it("should return error as true", async () => {
                const {body, statusCode} = await request(app).get(`${endpint}` + "?query=MSArIDEgKyBhc2Q=");

                expect(statusCode).toBe(400);
                expect(body.error).toBe(true);
            })
        })

        describe("send wrong base64 string query with zero division error", () => {
            it("should return error as true", async () => {
                const {body, statusCode} = await request(app).get(`${endpint}` + "?query=MS8w");

                expect(statusCode).toBe(400);
                expect(body.message).toBe("zero division error");
            })
        })

        // 1/a + b
        describe("send query with with undefined symbol", () => {
            it("should return error as true", async () => {
                const {body, statusCode} = await request(app).get(`${endpint}` + "?query=MS9hICsgYg==");

                expect(statusCode).toBe(400);
                expect(body.message.split(' ')[0]).toBe("Undefined");
            })
        })
    })

    describe("correct query", () => {
        describe("correct query with base64", () => {
            it("should return result", async () => {
                const {
                    body,
                    statusCode
                } = await request(app).get(`${endpint}` + "?query=MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk");

                expect(statusCode).toBe(200);
                expect(body.error).toBe(false);
                expect(body.result).toBe(-132.89);
            })
        })

        // 45 + 12 * 6 = 117
        describe("test priority order", () => {
            it("should return result 117", async () => {
                const {body, statusCode} = await request(app).get(`${endpint}` + "?query=NDUgKyAxMiAqIDY=");

                expect(statusCode).toBe(200);
                expect(body.error).toBe(false);
                expect(body.result).toBe(117);
            })
        })

        // (45 + 12 * 6) * 88 + 1000 *         59999
        describe("test spaces", () => {
            it("should return result 60009296", async () => {
                const {
                    body,
                    statusCode
                } = await request(app).get(`${endpint}` + "?query=KDQ1ICsgMTIgKiA2KSAqIDg4ICsgMTAwMCAqICAgICAgICAgNTk5OTk=");

                expect(statusCode).toBe(200);
                expect(body.error).toBe(false);
                expect(body.result).toBe(60009296);
            })
        })

    })

})