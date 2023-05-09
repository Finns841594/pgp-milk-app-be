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

describe('/api/puppies get methond', () => {
  it('it should return a list of puppies', async () => {
    const res = await request(app).get('/api/puppies');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(4);
  });
  it('it should return proper puppy data', async () => {
    const res = await request(app).get('/api/puppies');
    expect(res.statusCode).toEqual(200);
    expect(res.body[0].id).toEqual(1);
  })
});

describe('/api/puppies/:id', () => {
  it('it should return a single puppy', async () => {
    const res = await request(app).get('/api/puppies/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(1);
    expect(res.body.name).toEqual('Stone');
  });
  it('it should return a 404 if puppy is not found', async () => {
    const res = await request(app).get('/api/puppies/100');
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual('Puppy not found');
  });
});

describe('/api/puppies post method', () => {
  it('it should create a new puppy', async () => {
    const res = await request(app)
      .post('/api/puppies')
      .send({
        id: 5,
        breed: 'German Shepherd',
        name: 'Max',
        birthdate: '2019-01-07',
      })
      .set('Accept', 'application/json');
    expect(res.statusCode).toEqual(201);
    console.log('⭐️resbody: ', res.body)
    expect(res.body.id).toEqual(5);
  })
});

describe('/api/puppies/:id put method', () => {
  it('it should update the name of a puppy', async () => {
    const res = await request(app)
      .put('/api/puppies/4')
      .send({
        name: 'Max',
      })
      .set('Accept', 'application/json');
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(4);
    expect(res.body.name).toEqual('Max');
  });
})