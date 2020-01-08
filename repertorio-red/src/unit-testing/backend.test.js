const request = require('supertest');
const app = require('../backend/app.js')

describe('Test the root path', () => {
    test('It should response the GET method', () => {
        return request(app).get('/').expect(200);
    });
});

describe('Test any Table any Column Table', () => {
    test('I should get something truthy ', () => {
        return request(app).get('/api/compositor/*').then(res => {
            expect(res).not.toBeUndefined();
        })
    })
})

describe('Test Customizable queries', () => {
    let mozart = [{
        "ID": 1,
        "Compositor": "Wolfang Amadeus Mozart",
        "Pais": "Austria",
        "Periodo": "Clásico",
        "Descripcion": "Morzat",
    }]
    test('Gotta mock Morzat data for Compositor', () => {
        return request(app).get('/api/compositor/*/12/*').then(res => {
            expect(JSON.parse(res.text)).toEqual(mozart);
        })
    })

    let divertimento = [{
        "ID": 17,
        "Obra": "Divertimento D Major Mozart",
        "Compositor": "Wolfang Amadeus Mozart",
        "Tonalidad": "D",
        "Nivel": "Orquesta",
        "EsArreglo": 0
    }];

    it('Gotta mock funny data', () => {
        return request(app).get("/api/obra/*/1/*/*/*").then(res => {
            expect(JSON.parse(res.text)).toEqual(divertimento);
        });
    })
});

describe("Test PDF Stuff", () => {
    it("Should Return an object or something", ()=> {
        request(app).get("/api/obra/download/17").then(res => {
            expect(res).toBeTruthy();
        })
    })

    it("Should give me a 502 when looking for something that it's not in the db", () => {
        return request(app).get("/api/obra/download/1").expect(500);
    })
});