import { createServer, Model, hasMany, belongsTo } from 'miragejs';

export function makeServer() {
  let server = createServer({
    models: {
      product: Model.extend({
        reviews: hasMany(),
      }),

      review: Model.extend({
        product: belongsTo(),
      }),
    },

    routes() {
      this.namespace = 'api';

      this.get('/products', (schema) => {
        return schema.products.all();
      });

      this.get('/products/:id', (schema, request) => {
        let id = request.params.id;

        return schema.products.find(id);
      });

      this.post('/products', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);

        return schema.products.create(attrs);
      });

      this.get('/products/:id/reviews', (schema, request) => {
        let productId = request.params.id;
        let product = schema.products.find(productId);

        return product.reviews;
      });

      this.post('/reviews', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);

        return schema.reviews.create(attrs);
      });

      this.patch('/products/:id', (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let product = schema.products.find(id);

        return product.update(newAttrs);
      });

      this.delete('/products/:id', (schema, request) => {
        let id = request.params.id;

        return schema.products.find(id).destroy();
      });
    },

    seeds(server) {
      let ebookProduct = server.create('product', { name: 'Ebook', rating: 5 });
      server.create('review', {
        product: ebookProduct,
        text: 'very good',
        rating: 5,
      });

      let appProduct = server.create('product', { name: 'App', rating: 4 });
      server.create('review', {
        product: appProduct,
        text: 'useful app',
        rating: 4,
      });
    },
  });

  return server;
}
