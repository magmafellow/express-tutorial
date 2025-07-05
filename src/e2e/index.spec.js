import request from 'supertest'
import express from 'express'

const app = express()

app.get('/hello', (req, res) => res.status(200).send({ msg: 'really hello' }))

describe('hello endpoint', () => {
  it('get /hello and expect 200', async () => {
    const res = await request(app).get('/hello')
    expect(res.statusCode).toBe(200)
    expect(res.body).toStrictEqual({ msg: 'really hello' })
  })
})
