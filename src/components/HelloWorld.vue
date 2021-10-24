<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup() {
    async function getDummyProducts() {
      try {
        const response = await axios.get('/api/products');
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }

    async function getDummyReviews() {
      try {
        const response = await axios.get('/api/products/1/reviews');
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }

    // async function postDummyData() {
    //   try {
    //     const review = {
    //       text: 'this ebook it is ok',
    //       rating: 3,
    //       productId: '1',
    //     };
    //     const response = await axios.post('/api/reviews', review);
    //     console.log(response);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }

    getDummyProducts();
    getDummyReviews();
    // postDummyData();

    return {
      getDummyProducts,
      getDummyReviews,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
