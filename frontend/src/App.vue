<script setup lang="ts">
import {ref} from "vue";
import axios from 'axios'
import config from './config';

const city = ref('');
const apidata = ref('')



const test = async () => {
  console.info('test')

  let result:any
  try {
    result = await axios.get(config.AWS.apiUrl + '/weather?city=' + city.value)
    if (result.data?.body) {
      apidata.value = JSON.stringify( JSON.parse(result.data.body), null, '  ' )
      console.info(apidata.value)
    }
  } catch (e) {
    console.error(e)
  }


}
</script>

<template>
<form @submit.prevent="test">
  <div>
    <h3>Weather API</h3>
  </div>
  <div>
    <input type="text" v-model="city" placeholder="enter city name" />
    <input type="submit" value="Get weather data">
  </div>
  <textarea v-model="apidata" />
</form>
</template>

<style>
@import './assets/base.css';

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1280px;
  font-weight: normal;
  width: 100%;
}

form {
  display: flex;
  flex-direction: column;
  margin: auto;
}

form > div {
  display: flex;
  flex-direction: row;
  justify-content: stretch;
}

input, textarea {
  padding: 0.4rem 0.5rem;
  border: 0;
}

textarea {
  min-height: 15rem;
  resize: none;
}

input[type=submit] {
  background-color: #f82;
  color: #fff;
  margin-left: 2rem;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #f91;
}

input[type=text], textarea {
  border: 1px solid #bbb;
  outline: none;
}

input[type=text]:focus, textarea:focus {
  border: 1px solid #999;
}

a {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }
}

textarea {
  margin-top: 1rem;
}


h3 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

</style>


