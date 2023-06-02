import request from 'supertest';
import app from './app';

describe('Testing api endpoint', () => {
  test('sanity check for /test', async () => {
    const res = await request(app).get('/api/test');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      test: 'is working as it should',
    });
  });
});

describe('/api/milks get methond', () => {
  it('it should return all milks if no page', async () => {
    const res = await request(app).get('/api/milks');
    expect(res.statusCode).toEqual(200);
    expect(res.body.count).toEqual(99); 
  });
  it('it should return proper milk data', async () => {
    const res = await request(app).get('/api/milks');
    expect(res.statusCode).toEqual(200);
    expect(res.body.results[0].type).toEqual('Cashew milk');
  })
  it('it should return 9 milks if page is 1', async () => {
    const res = await request(app).get('/api/milks?page=1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.results.length).toEqual(9);
  })
  it('it should return correct milks if page is 2', async () => {
    const res = await request(app).get('/api/milks?page=2');
    expect(res.statusCode).toEqual(200);
    expect(res.body.results[0].name).toEqual("Tea's scientific rice milk");
  })
  it('it should return correct results if searching cashew', async () => {
    const res = await request(app).get('/api/milks/search?q=cashew');
    expect(res.statusCode).toEqual(200);
    expect(res.body.results[0].name).toContain("cashew");
  })
});

// return milk types
describe('/api/milks/types get method', () => {
  it('it should return all milk types', async () => {
    const res = await request(app).get('/api/milks/types');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(11);
  }
  )
})

// return milks of a type
describe('/api/milks/types/:type get method', () => {
  it('it should return all milks of a type', async () => {
    const res = await request(app).get('/api/milks/types/Cashew milk');
    expect(res.statusCode).toEqual(200);
    expect(res.body.results[0].type).toEqual('Cashew milk');
  }
  )
})

// return milk by id
describe('/api/milks/id/:id get method', () => {
  it('it should return a milk by id', async () => {
    const res = await request(app).get('/api/milks/id/301d5dcf-a2a8-4a34-b26b-efcaa103963c'); // First milk in db
    expect(res.statusCode).toEqual(200);
    expect(res.body.type).toEqual('Cashew milk');
    expect(res.body.id).toEqual('301d5dcf-a2a8-4a34-b26b-efcaa103963c');
  }
  )
})